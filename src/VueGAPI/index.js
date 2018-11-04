import { gapiPromise } from './gapi'
import GoogleAuthService from './GoogleAuthService'

const googleAuthService = new GoogleAuthService()
const {
  grantOfflineAccess, getOfflineAccessCode, login, logout, isAuthenticated, getUserData, refreshToken
} = googleAuthService

export default {
  install: function (Vue, clientConfig) {
    Vue.gapiLoadClientPromise = null

    const resolveAuth2Client = (resolve, reject) => {
      gapiPromise.then(_ => {
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
                resolve(gapi)
              })
              .catch(err => {
                if (err.error) {
                  const error = err.error
                  console.error(
                    'Failed to initialize gapi: %s (status=%s, code=%s)', error.message, error.status, error.code, err)
                }
              })
          })
        } else {
          resolve(gapi)
        }
      })
    }

    Vue.prototype.$gapi = {
      getGapiClient: () => {
        return new Promise((resolve, reject) => {
          if (
            Vue.gapiLoadClientPromise &&
            Vue.gapiLoadClientPromise.status === 0
          ) {
            // promise is being executed
            resolve(Vue.gapiLoadClientPromise)
          } else {
            resolveAuth2Client(resolve, reject)
          }
        })
      },
      getOfflineAccessCode,
      grantOfflineAccess: () => {
        return this.$getGapiClient().then(grantOfflineAccess)
      },
      login: () => {
        return this.$getGapiClient().then(login)
      },
      refreshToken: () => {
        return this.$getGapiClient().then(refreshToken)
      },
      logout: () => {
        return this.$getGapiClient().then(logout)
      },
      isAuthenticated,
      getUserData
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getGapiClient = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.getGapiClient instead.')
      return Vue.prototype.$gapi.getGapiClient
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getOfflineAccessCode = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.getOfflineAccessCode instead.')
      return Vue.prototype.$gapi.getOfflineAccessCode
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$grantOfflineAccess = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.grantOfflineAccess instead.')
      return Vue.prototype.$gapi.grantOfflineAccess
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$login = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.login instead.')
      return Vue.prototype.$gapi.login
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$refreshToken = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.refreshToken instead.')
      return Vue.prototype.$gapi.refreshToken
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$logout = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.logout instead.')
      return Vue.prototype.$gapi.logout
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$isAuthenticated = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.isAuthenticated instead.')
      return Vue.prototype.$gapi.isAuthenticated
    }

    /**
     * @deprecated since version 0.0.10.
     * Will be removed in version 1.0.
     */
    Vue.prototype.$getUserData = () => {
      console.warn('This Vue instance method is deprecated and will be removed in a future release. Please use $gapi.getUserData instead.')
      return Vue.prototype.$gapi.getUserData
    }
  }
}
