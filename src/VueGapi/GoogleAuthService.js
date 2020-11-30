import { thenArgsFromCallbacks } from './utils'

/**
 * Singleton class that provides methods to allow the user to sign in with a
 * Google account, get the user's current sign-in status, get specific data
 * from the user's Google profile, request additional scopes, and sign out
 * from the current account.
 *
 * @typedef {object} GoogleAuth
 * @see https://developers.google.com/identity/sign-in/web/reference#authentication
 */

/**
 * Exposed as a <code>$gapi</code> member of the {@link Vue} instance.
 *
 * @package
 * @class GoogleAuthService
 */
export default class GoogleAuthService {
  constructor() {
    this.authenticated = this.isAuthenticated()
    /** @type {GoogleAuth} */
    this.authInstance = null
    this.clientConfig = null

    this.offlineAccessCode = null
    this.getOfflineAccessCode = this.getOfflineAccessCode.bind(this)
    this.grantOfflineAccess = this.grantOfflineAccess.bind(this)
    this.login = this.login.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.isSignedIn = this.isSignedIn.bind(this)
    this.listenUserSignIn = this.listenUserSignIn.bind(this)
  }

  /**
   * Private method that takes in an authResult and returns the authResult expiration time
   *
   * @private
   * @method GoogleAuthService#_expiresAt
   * @since 0.0.10
   *
   * @param {object} authResult
   *   authResult object from google
   *
   * @returns {string}
   *   a string of when the google auth token expires
   */
  _expiresAt(authResult) {
    return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
  }

  /**
   * Private method that takes in an authResult and a user Profile setting the values in locaStorage
   *
   * @private
   * @method GoogleAuthService#_setStorage
   * @since 0.0.10
   *
   * @param {object} authResult
   *  authResult object from google
   * @param {object} profile
   *  Default is null and if not passed it will be null this is the google user profile object
   *
   * @fires localStorage.setItem
   */
  _setStorage(authResult, profile = null) {
    localStorage.setItem('gapi.access_token', authResult.access_token)
    localStorage.setItem('gapi.id_token', authResult.id_token)
    localStorage.setItem('gapi.expires_at', this._expiresAt(authResult))

    if (profile) {
      localStorage.setItem('gapi.id', profile.getId())
      localStorage.setItem('gapi.full_name', profile.getName())
      localStorage.setItem('gapi.first_name', profile.getGivenName())
      localStorage.setItem('gapi.last_name', profile.getFamilyName())
      localStorage.setItem('gapi.image_url', profile.getImageUrl())
      localStorage.setItem('gapi.email', profile.getEmail())
    }
  }

  /**
   * Private method used to remove all gapi named spaced item from localStorage
   *
   * @private
   * @method GoogleAuthService#_clearStorage
   * @since 0.0.10
   *
   * @fires localStorage.removeItem
   */
  _clearStorage() {
    localStorage.removeItem('gapi.access_token')
    localStorage.removeItem('gapi.id_token')
    localStorage.removeItem('gapi.expires_at')
    localStorage.removeItem('gapi.id')
    localStorage.removeItem('gapi.full_name')
    localStorage.removeItem('gapi.first_name')
    localStorage.removeItem('gapi.last_name')
    localStorage.removeItem('gapi.image_url')
    localStorage.removeItem('gapi.email')
  }

  _setOfflineAccessCode(authResult) {
    if (authResult.code) {
      this.offlineAccessCode = authResult.code
    } else {
      throw new Error('Offline access code missing from result', authResult)
    }
  }

  _setSession() {
    const profile = this.authInstance.currentUser.get().getBasicProfile()
    const authResult = this.authInstance.currentUser.get().getAuthResponse(true)
    this._setStorage(authResult, profile)
    this.authenticated = true
  }

  /**
   * Returns the authorization code set via {@link GoogleAuthService#grantOfflineAccess}.
   *
   * @method GoogleAuthService#getOfflineAccessCode
   * @return {string|null}
   */
  getOfflineAccessCode() {
    return this.offlineAccessCode
  }

  /**
   * Get permission from the user to access the specified scopes offline.
   *
   * @method GoogleAuthService#grantOfflineAccess
   * @see [GoogleAuth.grantOfflineAccess]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions}
   * @return {Promise}
   */
  grantOfflineAccess() {
    if (!this.authInstance) throw new Error('gapi not initialized')
    return this.authInstance
      .grantOfflineAccess()
      .then(this._setOfflineAccessCode.bind(this))
  }

  /**
   * Check if requested scopes were granted or not.
   *
   * @method GoogleAuthService#hasGrantedRequestedScopes
   * @return {boolean}
   */
  hasGrantedRequestedScopes() {
    if (!this.authInstance) throw new Error('gapi not initialized')
    const { scope } = this.clientConfig
    let hasGrantedScopes = true
    if (scope) {
      const GoogleUser = this.authInstance.currentUser.get()
      hasGrantedScopes = GoogleUser.hasGrantedScopes(scope)
    }
    return hasGrantedScopes
  }

  /**
   * @typedef LoginResponse
   * @property {bool} hasGrantedScopes True if the requested scopes were granted.
   */

  /**
   * Signs in the user.
   *
   * @method GoogleAuthService#login
   * @see [GoogleAuth.signIn]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthsignin}
   *
   * @param {onResolved} [onResolve]
   * @param {onRejected} [onReject]
   *
   * @return {Promise<LoginResponse>}
   *
   * @example
   * <script>
   *   export default {
   *     name: 'login-shortcut',
   *
   *     methods: {
   *       login() {
   *         this.$gapi.login().then((resp) => {
   *           console.log( resp.hasGrantedScopes );
   *         })
   *       },
   *     },
   *   }
   * </script>
   */
  login(onResolve, onReject) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    return new Promise((res, rej) => {
      return this.authInstance
        .signIn()
        .then(() => {
          this._setSession()
          const { refreshToken: wantsRefreshToken } = this.clientConfig
          const noOfflineAccess = !wantsRefreshToken
          if (noOfflineAccess) {
            let hasGrantedScopes = this.hasGrantedRequestedScopes()
            return res({ hasGrantedScopes })
          }

          return this.authInstance.grantOfflineAccess()
        })
        .then(function (offlineAccessResponse = null) {
          let hasGrantedScopes = this.hasGrantedRequestedScopes()
          if (!offlineAccessResponse) {
            return res({ hasGrantedScopes })
          }

          const { code } = offlineAccessResponse
          localStorage.setItem('gapi.refresh_token', code)

          res({ hasGrantedScopes })
        })
        .catch(function (error) {
          console.error(error)
          rej(error)
        })
    }).then(...thenArgsFromCallbacks(onResolve, onReject))
  }

  /**
   * Forces a refresh of the access token.
   *
   * This should be placed in your App.vue on the created page and run on a timer of 45min.
   *
   * @method GoogleAuthService#refreshToken
   * @see [GoogleUser.reloadAuthResponse]{@link https://developers.google.com/identity/sign-in/web/reference#googleuserreloadauthresponse}
   *
   * @example
   * <script>
   *     name: 'App'
   *
   *     created () {
   *     try {
   *       // NOTE: 45min refresh policy is what google recommends
   *       window.setInterval(this.$gapi.refreshToken(), 2.7e+6)
   *     } catch (e) {
   *       console.error(e)
   *     }
   *
   *   }
   * </script>
   */
  refreshToken() {
    if (!this.authInstance) throw new Error('gapi not initialized')
    const GoogleUser = this.authInstance.currentUser.get()
    GoogleUser.reloadAuthResponse().then((authResult) => {
      this._setStorage(authResult)
    })
  }

  /**
   * Ask to grant scopes from user.
   *
   * @method GoogleAuthService#grant
   * @see [GoogleUser.grant]{@link https://developers.google.com/identity/sign-in/web/reference#googleusergrantoptions}
   * @since 0.3.2
   *
   * @param {onResolved} [onResolve]
   * @param {onRejected} [onReject]
   *
   * @return {Promise<GoogleUser>}
   *
   * @example
   * <script>
   *   export default {
   *     name: 'grant-scope',
   *
   *     methods: {
   *       grant() {
   *         return this.$gapi.grant()
   *       },
   *     },
   *   }
   * </script>
   */
  grant(onResolve, onReject) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    return new Promise((res) => {
      const GoogleUser = this.authInstance.currentUser.get()
      let hasGrantedScopes = this.hasGrantedRequestedScopes()
      if (hasGrantedScopes) {
        // GoogleUser.grant resolves with GoogleUser object.
        return res(GoogleUser)
      }
      const { scope } = this.clientConfig
      return GoogleUser.grant({ scope })
    }).then(...thenArgsFromCallbacks(onResolve, onReject))
  }

  /**
   * Signs out the current account from the application.
   *
   * @method GoogleAuthService#logout
   * @see [GoogleAuth.signOut]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthsignout}
   *
   * @param {onResolved} [onResolve]
   * @param {onRejected} [onReject]
   *
   * @return {Promise}
   *
   * @example
   * <script>
   *   export default {
   *     name: 'logout-shortcut',
   *
   *     methods: {
   *       login() {
   *         this.$gapi.logout()
   *       },
   *     },
   *   }
   * </script>
   */
  logout(onResolve, onReject) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    return new Promise((res, rej) => {
      this.authInstance.signOut().then(
        () => {
          this._clearStorage()
          this.authenticated = false
          res()
        },
        (error) => {
          rej(error)
        }
      )
    }).then(...thenArgsFromCallbacks(onResolve, onReject))
  }

  /**
   * Determines if the user is signed in via local storage.
   *
   * @method GoogleAuthService#isAuthenticated
   * @since 0.0.10
   * @return {boolean}
   *
   * @example
   * <script>
   *   export default {
   *     name: 'login-shortcut-check',
   *
   *     methods: {
   *       login() {
   *         if (this.$gapi.isAuthenticated() !== true) {
   *           this.$gapi.login()
   *         }
   *       },
   *     },
   *   }
   * </script>
   */
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('gapi.expires_at'))
    return new Date().getTime() < expiresAt
  }

  /**
   * Determines if the user is signed in via Google. Can be used inside v-if views.
   *
   * @method GoogleAuthService#isSignedIn
   * @see [GoogleUser.isSignedIn]{@link https://developers.google.com/identity/sign-in/web/reference#googleuserissignedin}
   * @since 0.0.10
   * @return {boolean}
   *
   * @example
   * <script>
   *   export default {
   *     name: 'is-signed-in',
   *
   *     computed: {
   *       isSignedIn() {
   *         return this.$gapi.isSignedIn()
   *       },
   *     },
   *   }
   * </script>
   */
  isSignedIn() {
    if (!this.authInstance) throw new Error('gapi not initialized')
    const GoogleUser = this.authInstance.currentUser.get()
    return GoogleUser.isSignedIn()
  }

  /**
   * Accept the callback to be notified when the authentication status changes.
   * Will also determine if the login token is valid using google methods and return UserData or false
   *
   * @method GoogleAuthService#listenUserSignIn
   * @see [GoogleAuth.isSignedIn.listen]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinlistenlistener}
   * @since 0.0.10
   *
   * @param {function} callback
   *   the callback function to be notified of an authentication status change
   *
   * @return {boolean|GoogleAuthService#UserData} False if NOT authenticated, UserData if authenticated
   */
  listenUserSignIn(callback) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    this.authInstance.isSignedIn.listen(callback)
    if (this.authInstance.currentUser.get().isSignedIn()) {
      return this.getUserData()
    } else {
      return false
    }
  }

  /**
   * @typedef {object} GoogleAuthService#UserData
   *
   * @see [gapi.auth2.AuthResponse]{@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse}
   * @see [GoogleUser.getBasicProfile]{@link https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile}
   *
   * @property {string} id user's unique ID string
   * @property {string} firstName given name
   * @property {string} lastName family name
   * @property {string} fullName full name
   * @property {string} email
   * @property {string} imageUrl
   * @property {string} expiresAt
   * @property {string} accessToken granted access token
   * @property {string} idToken granted ID token
   */

  /**
   * Gets the user data from local storage
   *
   * @method GoogleAuthService#getUserData
   * @since 0.0.10
   * @return {GoogleAuthService#UserData}
   */
  getUserData() {
    return {
      id: localStorage.getItem('gapi.id'),
      firstName: localStorage.getItem('gapi.first_name'),
      lastName: localStorage.getItem('gapi.last_name'),
      fullName: localStorage.getItem('gapi.full_name'),
      email: localStorage.getItem('gapi.email'),
      imageUrl: localStorage.getItem('gapi.image_url'),
      expiresAt: localStorage.getItem('gapi.expires_at'),
      accessToken: localStorage.getItem('gapi.access_token'),
      idToken: localStorage.getItem('gapi.id_token'),
    }
  }
}
