export default class GoogleAuthMock {
  constructor(currentUser) {
    this.currentUser = currentUser
  }

  async signIn() {
    return this.currentUser
  }
}
