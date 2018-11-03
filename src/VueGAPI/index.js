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
        return Vue.prototype.$getGapiClient().then(grantOfflineAccess)
      },
      login: () => {
        return Vue.prototype.$getGapiClient().then(login)
      },
      refreshToken: () => {
        return Vue.prototype.$getGapiClient().then(refreshToken)
      },
      logout: () => {
        return Vue.prototype.$getGapiClient().then(logout)
      },
      isAuthenticated,
      getUserData
    }

    Vue.prototype.$getGapiClient = Vue.prototype.$gapi.getGapiClient

    Vue.prototype.$getOfflineAccessCode = Vue.prototype.$gapi.getOfflineAccessCode

    Vue.prototype.$grantOfflineAccess = Vue.prototype.$gapi.grantOfflineAccess

    Vue.prototype.$login = Vue.prototype.$gapi.login

    Vue.prototype.$refreshToken = Vue.prototype.$gapi.refreshToken

    Vue.prototype.$logout = Vue.prototype.$gapi.logout

    Vue.prototype.$isAuthenticated = Vue.prototype.$gapi.isAuthenticated

    Vue.prototype.$getUserData = Vue.prototype.$gapi.getUserData
  }
}
