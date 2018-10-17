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
  _expiresAt = (authResult) => {
    return JSON.stringify(authResult.expires_in * 1000 + new Date().getTime())
  }

  login (event) {
    return this.authInstance.signIn()
      .then(this.setSession)
  }

  refreshToken (event) {
    const GoogleUser = this.authInstance.currentUser.get()
    GoogleUser.reloadAuthResponse()
      .then((authResult) => {
        localStorage.setItem('access_token', authResult.access_token)
        localStorage.setItem('id_token', authResult.id_token)
        localStorage.setItem('expires_at', this._expiresAt(authResult))
      })
  }

  logout (event) {
    this.authInstance.signOut(response => console.log(response))
    localStorage.clear()
    this.authenticated = false
  }

  setSession (response) {
    const profile = this.authInstance.currentUser.get().getBasicProfile()
    const authResult = response.Zi

    localStorage.setItem('access_token', authResult.access_token)
    localStorage.setItem('id_token', authResult.id_token)
    localStorage.setItem('expires_at', this._expiresAt(authResult))

    this.authenticated = true

    localStorage.setItem('id', profile.getId())
    localStorage.setItem('full_name', profile.getName())
    localStorage.setItem('first_name', profile.getGivenName())
    localStorage.setItem('last_name', profile.getFamilyName())
    localStorage.setItem('image_url', profile.getImageUrl())
    localStorage.setItem('email', profile.getEmail())
  }

  isAuthenticated () {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  isSignedIn () {
    const GoogleUser = this.authInstance.currentUser.get()
    return GoogleUser.isSignedIn.get()
  }

  getUserData () {
    return {
      firstName: localStorage.getItem('first_name'),
      lastName: localStorage.getItem('last_name'),
      email: localStorage.getItem('email')
    }
  }
}
