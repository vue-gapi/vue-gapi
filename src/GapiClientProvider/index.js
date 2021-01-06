import { getObjectCopy, loadGapiScript } from './utils'

export default class GapiClientProvider {
  constructor(clientConfig) {
    this.clientConfig = getObjectCopy(clientConfig)
    this.promise = null
    this.client = null
  }

  getClientConfig() {
    return this.clientConfig
  }

  getClient() {
    if (null !== this.client) {
      return Promise.resolve(this.client)
    }

    if (null === this.promise) {
      this.promise = loadGapiScript().then((gapi) => {
        return new Promise((resolve, reject) => {
          gapi.load('client:auth2', () => {
            gapi.client.init(this.clientConfig).then(() => {
              this.client = {
                gapi,
                authInstance: gapi.auth2.getAuthInstance(),
              }
              resolve(this.client)
            }, reject)
          })
        })
      })
    }

    return this.promise
  }
}
