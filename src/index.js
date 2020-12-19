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
   * @param {Vue} Vue Vue constructor
   * @param {module:vue-gapi.Options} clientConfig VueGapi plugin options
   * @see [Using a Plugin]{@link https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin}
   */
  install: (Vue, clientConfig) => {
    const clientProvider = new GapiClientProvider(clientConfig)
    const sessionStorage = new SessionStorage()

    /**
     * @memberof Vue
     * @member {GoogleAuthService}
     *
     * @example
     * <script>
     *   export default {
     *     name: 'my-component',
     *
     *     methods: {
     *       login() {
     *         this.$gapi.getGapiClient().then((gapi) => {
     *           // gapi.sheets.spreadsheet.get(...)
     *           // ...
     *         })
     *       },
     *     },
     *   }
     * </script>
     */
    Vue.prototype.$gapi = new GoogleAuthService(clientProvider, sessionStorage)
  },
}

const version = '__VERSION__'

export { version }
