export default class GoogleAuthService {

  constructor () {
    this.authenticated = this.isAuthenticated()
    this.authInstance = null

    this.login = this.login.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.isSignedIn = this.isSignedIn.bind(this)
  }

  /**
   * Private method that takes in an authResult and returns when the authResult expires
   *
   * @name _expiresAt
   *
   * @since 0.0.10
   *
   * @access Private
   *
   * @param { object } authResult
   *   authResult object from google
   *
   * @returns
   *   a string of when the google auth token expires
   */

  _expiresAt (authResult) {
    return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
  }

  /**
   *  Private method that takes in an authResult and a user Profile setting the values in locaStroage
   *
   * @name _setStorage
   *
   * @since 0.0.10
   *
   * @access Private
   *
   * @param { object } authResult
   *  authResult object from google
   * @param { object } profile
   *  Default is null and if not passed it will be null this is the google user profile object
   *
   * @fires localStorage.setItem
   *
   */

  _setStorage (authResult, profile = null) {
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
   *  Private method used to remove all gapi named spaced item from localStorage
   *
   * @name _clearStorage
   *
   * @since 0.0.10
   *
   * @access Private
   *
   * @fires localStorage.removeItem
   *
   */

  _clearStorage () {
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

  /**
   * Login method takes in the gapi event and sets the settions
   *
   * @name login
   *
   * @since 0.0.10
   *
   * @see setSession
   *
   * @param { object } event
   *  This might not be needed and in the future could be removed
   *
   * @fires this.setSession
   *
   */

  login (event) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    return this.authInstance.signIn()
      .then(this.setSession)
  }

  /**
   * refreshToken method takes in the gapi event and allows calling of a refreshtoken
   *
   * @name refreshToken
   *
   * @since 0.0.10
   *
   * @see _setStorage
   *  Private method that takes in the authResult object
   * @see setSession
   *  Repies on an authInstance to be set by the setSession
   * @param { object } event
   *  NOTE: This might not be needed and could be removed in the future.
   *
   * @fires _setStorage
   *
   */

  refreshToken (event) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    const GoogleUser = this.authInstance.currentUser.get()
    GoogleUser.reloadAuthResponse()
      .then((authResult) => {
        this._setStorage(authResult)
      })
  }

  /**
   * Logout the google user and clear all access and localStroage
   *
   * @name logout
   *
   * @since 0.0.10
   *
   * @param { object } event
   *
   * @fires _clearStorage
   * @fires authInstance.signOut
   * @fires authenticated = false
   *
   */

  logout (event) {
    if (!this.authInstance) throw new Error('gapi not initialized')
    this.authInstance.signOut(response => console.log(response))
    this._clearStorage()
    this.authenticated = false
  }

  /**
   * Set the session of the gapi user
   *
   * @name setSession
   *
   * @since 0.0.10
   *
   * @param { object } response
   *
   * @fires _setStorage
   * @fires authenticated = true
   *
   */

  setSession (response) {
    const profile = this.authInstance.currentUser.get().getBasicProfile()
    const authResult = response.Zi
    this._setStorage(authResult, profile)
    this.authenticated = true
  }

  /**
   * Will determine if the login token is valid using localStorage
   *
   * @name isAuthenticated
   *
   * @since 0.0.10
   *
   * @return Boolean
   *
   */

  isAuthenticated () {
    const expiresAt = JSON.parse(localStorage.getItem('gapi.expires_at'))
    return new Date().getTime() < expiresAt
  }

  /**
   * Will determine if the login token is valid using google methods
   *
   * @name isSignedIn
   *
   * @since 0.0.10
   *
   * @return Boolean
   *
   */

  isSignedIn () {
    const GoogleUser = this.authInstance.currentUser.get()
    return GoogleUser.isSignedIn.get()
  }

  /**
   * Gets the user data from local storage
   *
   * @name getUserData
   *
   * @since 0.0.10
   *
   * @return object with user data from localStorage
   */

  getUserData () {
    return {
      id: localStorage.getItem('gapi.id'),
      firstName: localStorage.getItem('gapi.first_name'),
      lastName: localStorage.getItem('gapi.last_name'),
      fullName: localStorage.getItem('gapi.full_name'),
      email: localStorage.getItem('gapi.email'),
      imageUrl: localStorage.getItem('gapi.image_url'),
      expiresAt: localStorage.getItem('gapi.expires_at'),
      accessToken: localStorage.getItem('gapi.access_token'),
      idToken: localStorage.getItem('gapi.id_token')
    }
  }
}
