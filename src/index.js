import { inject } from 'vue'
import { injectKey } from './consts'
import GapiClientProvider from './GapiClientProvider'
import GoogleAuthService from './GoogleAuthService'
import SessionStorage from './SessionStorage'

/**
 * @class Vue
 */

/** @module vue-gapi */

/**
 * <code>gapi.client.init</code> configuration parameters.
 *
 * @typedef {object} Options
 * @static
 * @see [gapi.client.init]{@link https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--}
 *
 * @property {string} [apiKey] The API Key to use
 * @property {string[]} [discoveryDocs] An array of discovery doc URLs or discovery doc JSON objects
 * @property {string} [clientId] The app's client ID, found and created in the Google Developers Console
 * @property {string} [scope] The scopes to request, as a space-delimited string
 */

export default {
  /**
   * @param {Vue} app Vue application instance
   * @param {module:vue-gapi.Options} clientConfig VueGapi plugin options
   * @see [Using a Plugin]{@link https://v3.vuejs.org/guide/plugins.html#using-a-plugin}
   */
  install(app, clientConfig) {
    const clientProvider = new GapiClientProvider(clientConfig)
    const sessionStorage = new SessionStorage()
    const gapi = new GoogleAuthService(clientProvider, sessionStorage)

    /**
     * @memberof Vue
     * @member {GoogleAuthService}
     */
    app.config.globalProperties.$gapi = gapi
    app.provide(injectKey, gapi)
  },
}

export function useGapi() {
  return inject(injectKey)
}

export const version = '__VERSION__'
