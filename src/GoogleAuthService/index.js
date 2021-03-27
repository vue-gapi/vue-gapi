import { sessionFromAuthResponse, sessionFromCurrentUser } from './utils'

/**
 * Google API Client.
 *
 * @typedef GoogleAuthService#gapi
 * @see {@link https://github.com/google/google-api-javascript-client}
 */

/**
 * Singleton class that provides methods to allow the user to sign in with a
 * Google account, get the user's current sign-in status, get specific data
 * from the user's Google profile, request additional scopes, and sign out
 * from the current account.
 *
 * @typedef GoogleAuthService#GoogleAuth
 * @see {@link https://developers.google.com/identity/sign-in/web/reference#authentication}
 */

/**
 * Object that represents the current user.
 *
 * @typedef GoogleAuthService#GoogleUser
 * @see {@link https://developers.google.com/identity/sign-in/web/reference#googleusergetid}
 */

/**
 * Exposed as a <code>$gapi</code> member of the {@link Vue} instance.
 *
 * @class GoogleAuthService
 */
export default class GoogleAuthService {
  constructor(clientProvider, sessionStorage) {
    this.clientProvider = clientProvider
    this.sessionStorage = sessionStorage
  }

  /**
   * Returns an initialized {@link GoogleAuthService#gapi} client.
   *
   * @method GoogleAuthService#getGapiClient
   * @see {@link https://github.com/google/google-api-javascript-client/blob/master/docs/start.md}
   *
   * @return {Promise<GoogleAuthService#gapi>}
   */
  getGapiClient() {
    return this.clientProvider.getClient().then(({ gapi }) => gapi)
  }

  /**
   * Returns the {@link GoogleAuthService#GoogleAuth} object.
   *
   * @method GoogleAuthService#getAuthInstance
   * @see [gapi.auth2.getAuthInstance]{@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance}
   * @since 1.0.0
   *
   * @return {Promise<GoogleAuthService#GoogleAuth>}
   */
  getAuthInstance() {
    return this.clientProvider
      .getClient()
      .then(({ authInstance }) => authInstance)
  }

  /**
   * Returns a {@link GoogleAuthService#GoogleUser} object that represents the current user.
   *
   * @method GoogleAuthService#getCurrentUser
   * @see [GoogleAuth.currentUser.get]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget}
   * @since 1.0.0
   *
   * @return {Promise<GoogleAuthService#GoogleUser>}
   */
  getCurrentUser() {
    return this.getAuthInstance().then((authInstance) => {
      return authInstance.currentUser.get()
    })
  }

  /**
   * Returns the authorization code set via {@link GoogleAuthService#grantOfflineAccess}.
   *
   * @method GoogleAuthService#getOfflineAccessCode
   *
   * @return {string|null}
   */
  getOfflineAccessCode() {
    return this.sessionStorage.getItem('offlineAccessCode')
  }

  /**
   * Get permission from the user to access the specified scopes offline.
   *
   * @method GoogleAuthService#grantOfflineAccess
   * @see [GoogleAuth.grantOfflineAccess]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions}
   *
   * @return {Promise<string>} authorization code
   */
  grantOfflineAccess() {
    return this.getAuthInstance().then((authInstance) => {
      return authInstance.grantOfflineAccess().then(({ code }) => {
        this.sessionStorage.setItem('offlineAccessCode', code)

        return code
      })
    })
  }

  /**
   * Check if requested scopes were granted or not.
   *
   * @private
   * @method GoogleAuthService#hasGrantedRequestedScopes
   * @param {GoogleAuthService#GoogleUser} currentUser
   *
   * @return {boolean}
   */
  hasGrantedRequestedScopes(currentUser) {
    const { scope } = this.clientProvider.getClientConfig()

    return scope ? currentUser.hasGrantedScopes(scope) : true
  }

  /**
   * @typedef GoogleAuthService#LoginOptions
   * @property {boolean} [grantOfflineAccess=false] Additionally gets permission from the user to access the specified scopes offline via {@link GoogleAuthService#getOfflineAccessCode}
   */

  /**
   * @typedef GoogleAuthService#LoginResponse
   * @property {GoogleUser} currentUser Current user
   * @property {gapi} gapi Initialized {@link gapi} client
   * @property {boolean} hasGrantedScopes <code>true</code> if the requested scopes were granted.
   * @property {string} [code] Authorization code if <code>grantOfflineAccess: true</code>
   */

  /**
   * Signs in the user and initializes session.
   *
   * @method GoogleAuthService#login
   * @see [GoogleAuth.signIn]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthsignin}
   *
   * @param {GoogleAuthService#LoginOptions} [options]
   *
   * @return {Promise<GoogleAuthService#LoginResponse>}
   *
   * @example
   * <script>
   *   export default {
   *     methods: {
   *       login() {
   *         this.$gapi.login().then(({ gapi }) => {
   *           // gapi.sheets.spreadsheet.get(...)
   *         })
   *       },
   *     },
   *   }
   * </script>
   */
  login() {
    return this.clientProvider.getClient().then(({ gapi, authInstance }) => {
      return authInstance.signIn().then((currentUser) => {
        this.sessionStorage.set(sessionFromCurrentUser(currentUser))

        return {
          currentUser,
          gapi,
          hasGrantedScopes: this.hasGrantedRequestedScopes(currentUser),
        }
      })
    })
  }

  /**
   * Forces a refresh of the access token.
   *
   * This should be placed in your App.vue on the created page and run on a timer of 45min.
   *
   * @method GoogleAuthService#refreshToken
   * @see [GoogleUser.reloadAuthResponse]{@link https://developers.google.com/identity/sign-in/web/reference#googleuserreloadauthresponse}
   *
   * @return {Promise<AuthResponse>}
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
    return this.getCurrentUser()
      .then((currentUser) => currentUser.reloadAuthResponse())
      .then((authResponse) => {
        this.sessionStorage.set({
          ...this.sessionStorage.get(),
          ...sessionFromAuthResponse(authResponse),
        })

        return authResponse
      })
  }

  /**
   * Ask to grant scopes from user.
   *
   * @method GoogleAuthService#grant
   * @see [GoogleUser.grant]{@link https://developers.google.com/identity/sign-in/web/reference#googleusergrantoptions}
   * @since 0.4.0
   *
   * @return {Promise<GoogleAuthService#GoogleUser>}
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
  grant() {
    return this.getCurrentUser().then((currentUser) => {
      if (this.hasGrantedRequestedScopes(currentUser)) {
        return currentUser
      }

      const { scope } = this.clientProvider.getClientConfig()

      return currentUser.grant({ scope }).then(() => currentUser)
    })
  }

  /**
   * Signs out the current account from the application and clear session storage.
   *
   * @method GoogleAuthService#logout
   * @see [GoogleAuth.signOut]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthsignout}
   *
   * @return {Promise}
   *
   * @example
   * <script>
   *   export default {
   *     methods: {
   *       logout() {
   *         this.$gapi.logout()
   *       },
   *     },
   *   }
   * </script>
   */
  logout() {
    return this.getAuthInstance()
      .then((authInstance) => authInstance.signOut())
      .then(() => this.sessionStorage.clear())
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
    return new Date().getTime() < this.sessionStorage.getItem('expiresAt')
  }

  /**
   * Determines if the user is signed in via Google.
   *
   * @method GoogleAuthService#isSignedIn
   * @see [GoogleUser.isSignedIn]{@link https://developers.google.com/identity/sign-in/web/reference#googleuserissignedin}
   * @since 0.0.10
   *
   * @return {Promise<boolean>}
   */
  isSignedIn() {
    return this.getCurrentUser().then((currentUser) => currentUser.isSignedIn())
  }

  /**
   * Accept the callback to be notified when the authentication status changes.
   *
   * @method GoogleAuthService#listenUserSignIn
   * @see [GoogleAuth.isSignedIn.listen]{@link https://developers.google.com/identity/sign-in/web/reference#googleauthissignedinlistenlistener}
   * @since 0.0.10
   *
   * @param {function} callback
   *   the callback function to be notified of an authentication status change
   *
   * @return {Promise<void>}
   */
  listenUserSignIn(callback) {
    return this.getAuthInstance().then((authInstance) => {
      callback(authInstance.currentUser.get().isSignedIn())
      authInstance.isSignedIn.listen(callback)
    })
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
   * @property {number} expiresAt
   * @property {string} accessToken granted access token
   * @property {string} idToken granted ID token
   * @property {string} [offlineAccessCode]
   */

  /**
   * Gets the user data from local storage
   *
   * @method GoogleAuthService#getUserData
   * @since 0.0.10
   *
   * @return {GoogleAuthService#UserData|null}
   */
  getUserData() {
    return this.sessionStorage.get()
  }
}
