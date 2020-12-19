import { getObjectCopy, loadGapiScript } from './utils'

/**
 * Google API Client.
 *
 * @typedef {object} gapi
 * @see https://github.com/google/google-api-javascript-client
 */

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
 * Object that represents the current user.
 *
 * @typedef {object} GoogleUser
 * @see https://developers.google.com/identity/sign-in/web/reference#googleusergetid
 */

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
