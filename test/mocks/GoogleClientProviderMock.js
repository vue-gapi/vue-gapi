import GoogleAuthMock from './GoogleAuthMock'

export default class GoogleClientProviderMock {
  constructor(clientConfig, currentUser) {
    this.clientConfig = clientConfig
    this.currentUser = currentUser
  }

  getClientConfig() {
    return this.clientConfig
  }

  async getClient() {
    return {
      gapi: {},
      authInstance: new GoogleAuthMock(this.currentUser),
    }
  }
}
