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

    Vue.prototype.$getGapiClient = () => {
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
    }

    Vue.prototype.$getOfflineAccessCode = getOfflineAccessCode

    Vue.prototype.$grantOfflineAccess = () => {
      return Vue.prototype.$getGapiClient().then(grantOfflineAccess)
    }

    Vue.prototype.$login = () => {
      return Vue.prototype.$getGapiClient().then(login)
    }

    Vue.prototype.$refreshToken = () => {
      return Vue.prototype.$getGapiClient().then(refreshToken)
    }

    Vue.prototype.$logout = () => {
      return Vue.prototype.$getGapiClient().then(logout)
    }

    Vue.prototype.$isAuthenticated = isAuthenticated

    Vue.prototype.$getUserData = getUserData
  }
}
