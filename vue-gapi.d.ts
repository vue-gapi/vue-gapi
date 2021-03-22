declare module 'vue-gapi' {
  import { App } from 'vue'

  export interface LoginResponse {
    hasGrantedScopes: boolean // True if the requested scopes were granted.
    currentUser: gapi.auth2.GoogleUser // Current user
  }

  export interface UserData {
    id: string // user's unique ID string
    firstName: string // given name
    lastName: string // family name
    fullName: string // full name
    email: string
    imageUrl: string
    expiresAt: number
    accessToken: string // granted access token
    idToken: string // granted ID token
    offlineAccessCode?: string
  }

  export interface VueGapi {
    /** Returns an initialized gapi client. */
    getGapiClient: () => Promise<typeof gapi>

    /** Returns the GoogleAuth object. */
    getAuthInstance: () => Promise<gapi.auth2.GoogleAuth>

    /** Returns a GoogleUser object that represents the current user. */
    getCurrentUser: () => Promise<gapi.auth2.GoogleUser>

    /** Returns the authorization code set via grantOfflineAccess. */
    getOfflineAccessCode: () => string | null

    /**
     * Get permission from the user to access the specified scopes offline.
     *
     * @return {Promise<string>} authorization code
     */
    grantOfflineAccess: () => Promise<string>

    /** Signs in the user and initializes session. */
    login: () => Promise<LoginResponse>

    /** Forces a refresh of the access token. */
    refreshToken: () => Promise<gapi.auth2.AuthResponse>

    /** Ask to grant scopes from user. */
    grant: () => Promise<gapi.auth2.GoogleUser>

    /** Signs out the current account from the application and clear session storage. */
    logout: () => Promise<void>

    /** Determines if the user is signed in via local storage. */
    isAuthenticated: () => boolean

    /** Determines if the user is signed in via Google. */
    isSignedIn: () => Promise<boolean>

    /** Accept the callback to be notified when the authentication status changes. */
    listenUserSignIn: (callback: (isSignedIn: boolean) => void) => Promise<void>

    /** Gets the user data from local storage */
    getUserData: () => UserData | null
  }

  export interface PluginOptions {
    /** The API Key to use */
    apiKey?: string
    /** An array of discovery doc URLs or discovery doc JSON objects */
    discoveryDocs?: string[]
    /** The app's client ID, found and created in the Google Developers Console */
    clientId?: string
    /** The scopes to request, as a space-delimited string */
    scope?: string
  }

  export class VueGapiPlugin {
    static install(app: App, clientConfig: PluginOptions): void
  }

  export default VueGapiPlugin
  export const version: string

  module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $gapi: VueGapi
    }
  }
}
