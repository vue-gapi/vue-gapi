import GapiClientProvider from './GapiClientProvider'
import GoogleAuthService from './GoogleAuthService'
import SessionStorage from './SessionStorage'

export default {
  install: (Vue, clientConfig) => {
    const clientProvider = new GapiClientProvider(clientConfig)
    const sessionStorage = new SessionStorage()

    Vue.prototype.$gapi = new GoogleAuthService(clientProvider, sessionStorage)
  },
}

const version = '__VERSION__'

export { version }
