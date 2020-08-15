import { gapiPromise } from './gapi'
import GoogleAuthService from './GoogleAuthService'

import { getObjectCopy } from '../helpers/index'

const googleAuthService = new GoogleAuthService()
const {
  grantOfflineAccess,
  getOfflineAccessCode,
  login,
  logout,
  isAuthenticated,
  getUserData,
  refreshToken,
  isSignedIn,
  listenUserSignIn,
} = googleAuthService

/**
 * @class Vue
 */

/** @module vue-gapi */

/**
 * VueGapi plugin options and <code>gapi.auth2.init</code> configuration parameters.
 *
 * @typedef {object} Options
 * @static
 * @see [gapi.auth2.ClientConfig]{@link https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig}
 * @todo finish documenting
 */

export default {
  /**
   * @param {Vue} Vue Vue constructor
   * @param {module:vue-gapi.Options} clientConfig VueGapi plugin options
   *
   * @see [Using a Plugin]{@link https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin}
   *
   * @example
   * import Vue from 'vue'
   *
   * // import the plugin
   * import VueGAPI from 'vue-gapi'
   *
   * // create the 'options' object
   * const apiConfig = {
   *   apiKey: '<YOUR_API_KEY>',
   *   clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
   *   discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
   *   // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
   *   scope: 'https://www.googleapis.com/auth/spreadsheets',
   *
   *   // works only with `ux_mode: "prompt"`
   *   refreshToken: true,
   * }
   *
   * // Use the plugin and pass along the configuration
   * Vue.use(VueGAPI, apiConfig)
   */
  install: function (Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null
    googleAuthService.clientConfig = getObjectCopy(clientConfig)

    const resolveAuth2Client = (resolve, reject) => {
      gapiPromise.then(() => {
        const gapi = window.gapi
        if (!gapi) {
          console.error('Failed to load gapi!')
          return
        }
        if (!gapi.auth) {
          gapi.load('client:auth2', () => {
            Vue.gapiLoadClientPromise = gapi.client
              .init(clientConfig)
              .then(() => {
                console.info('gapi client initialised.')
                googleAuthService.authInstance = gapi.auth2.getAuthInstance()
                Vue.gapiLoadClientPromise.status = 0

                resolve(gapi)
              })
              .catch((err) => {
                if (err.error) {
                  const error = err.error
                  console.error(
                    'Failed to initialize gapi: %s (status=%s, code=%s)',
                    error.message,
                    error.status,
                    error.code,
                    err
                  )
                }
                reject(err)
              })
          })
        } else {
          resolve(gapi)
        }
      })
    }

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
     *         this.$gapi.login().then((gapi) => {
     *           // gapi.sheets.spreadsheet.get(...)
     *           // ...
     *         })
     *       },
     *     },
     *   }
     * </script>
     */
    Vue.prototype.$gapi = {
      /**
       * @todo determine a better place for this docblock?
       * @memberof GoogleAuthService
       * @method GoogleAuthService#getGapiClient
       * @return {Promise<GoogleAuth>}
       */
      getGapiClient: () => {
        return new Promise((resolve, reject) => {
          // A promise cannot be executed twice
          // In our case, once the promise has been resolve
          // we know that the `gapi` client is ready.
          if (
            Vue.gapiLoadClientPromise &&
            Vue.gapiLoadClientPromise.status === 0
          ) {
            return resolve(window.gapi)
          } else {
            resolveAuth2Client(resolve, reject)
          }
        })
      },
      getOfflineAccessCode,
      grantOfflineAccess: () => {
        return Vue.prototype.$gapi
          .getGapiClient()
          .then(grantOfflineAccess)
          .then(() => {
            googleAuthService.authInstance
              .grantOfflineAccess()
              .then((res) => {
                console.log(res)
                const refreshToken = res.code
                localStorage.setItem('gapi.refresh_token', refreshToken)
              })
              .catch(console.error)
          })
      },
      login: (res, rej) => {
        return Vue.prototype.$gapi.getGapiClient().then(() => {
          login().then(
            () => {
              if (typeof res === 'function') {
                res()
              }
            },
            (error) => {
              if (typeof rej === 'function') {
                rej(error)
              }
            }
          )
        })
      },
      refreshToken: () => {
        return Vue.prototype.$gapi.getGapiClient().then(refreshToken)
      },
      logout: (res, rej) => {
        return Vue.prototype.$gapi.getGapiClient().then(() => {
          logout().then(
            () => {
              if (typeof res === 'function') {
                res()
              }
            },
            (error) => {
              if (typeof rej === 'function') {
                rej(error)
              }
            }
          )
        })
      },
      listenUserSignIn: (callback) => {
        return Vue.prototype.$gapi.getGapiClient().then(() => {
          return listenUserSignIn(callback)
        })
      },

      isSignedIn: () => {
        return Vue.prototype.$gapi.getGapiClient().then(isSignedIn)
      },
      isAuthenticated,
      getUserData,
    }

    Vue.prototype.isGapiLoaded = () => {
      return Vue.gapiLoadClientPromise && Vue.gapiLoadClientPromise.status === 0
    }

    const deprectedMsg = (oldInstanceMethod, newInstanceMethod) =>
      `The ${oldInstanceMethod} Vue instance method is deprecated and will be removed in a future release. Please use ${newInstanceMethod} instead.`

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getGapiClient = () => {
      console.warn(deprectedMsg('$getGapiClient', '$gapi.getGapiClient'))
      return Vue.prototype.$gapi.getGapiClient()
    }

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$login = () => {
      console.warn(deprectedMsg('$login', '$gapi.login'))
      return Vue.prototype.$gapi.login()
    }

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$refreshToken = () => {
      console.warn(deprectedMsg('$refreshToken', '$gapi.refreshToken'))
      return Vue.prototype.$gapi.refreshToken()
    }

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$logout = () => {
      console.warn(deprectedMsg('$logout', '$gapi.logout'))
      return Vue.prototype.$gapi.logout()
    }

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isAuthenticated = () => {
      console.warn(deprectedMsg('$isAuthenticated', '$gapi.isAuthenticated'))
      return Vue.prototype.$gapi.isAuthenticated()
    }

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isSignedIn = () => {
      console.warn(deprectedMsg('$isAuthenticated', '$gapi.isAuthenticated'))
      return Vue.prototype.$gapi.isSignedIn()
    }

    /**
     * @memberof Vue
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getUserData = () => {
      console.warn(deprectedMsg('$getUserData', '$gapi.getUserData'))
      return Vue.prototype.$gapi.getUserData()
    }
  },
}
