import { storageKey } from './methods/storageKey.js'

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

  // NOTE: handle expiresAt method, this is private
  _expiresAt (authResult) {
    return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
  }

  _setStorage (authResult, profile = null) {
    const storageKeys = storageKey(authResult, profile)
    storageKeys.forEach((value) => {
      if (profile) {
        const setValue = value.authKey ? value.authKey : value.profileKey
        localStorage.setItem(`gapi.${value.name}`, setValue)
      }
    })
    // NOTE: this needs to be bound and moved into the storageKey
    localStorage.setItem('gapi.expires_at', this._expiresAt(authResult))
  }

  _clearStorage () {
    const storageKeys = storageKey()
    storageKeys.forEach((value) => {
      localStorage.removeItem(`gapi.${value.name}`)
    })
  }

  login (event) {
    return this.authInstance.signIn()
      .then(this.setSession)
  }

  refreshToken (event) {
    const GoogleUser = this.authInstance.currentUser.get()
    GoogleUser.reloadAuthResponse()
      .then((authResult) => {
        this._setStorage(authResult)
      })
  }

  logout (event) {
    this.authInstance.signOut(response => console.log(response))
    this._clearStorage()
    this.authenticated = false
  }

  setSession (response) {
    const profile = this.authInstance.currentUser.get().getBasicProfile()
    const authResult = response.Zi

    this._setStorage(authResult, profile)
    this.authenticated = true
  }

  isAuthenticated () {
    const expiresAt = JSON.parse(localStorage.getItem('gapi.expires_at'))
    return new Date().getTime() < expiresAt
  }

  isSignedIn () {
    const GoogleUser = this.authInstance.currentUser.get()
    return GoogleUser.isSignedIn.get()
  }

  getUserData () {
    return {
      firstName: localStorage.getItem('gapi.first_name'),
      lastName: localStorage.getItem('gapi.last_name'),
      email: localStorage.getItem('gapi.email')
    }
  }
}
