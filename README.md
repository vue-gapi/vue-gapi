
# VueGapi (vue-gapi)
  
[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)  ![license](https://img.shields.io/badge/license-MIT-green.svg) 
  
> Google provides a Google API Client Library for JavaScript to interact with Google APIs like Calendar, Analytics, and People. The vue-gapi plugin provides an easy way to integrate and use the Google API Client for JavaScript in Vue. 
  
## Installation
The vue-gapi plugin is avaidable as NPM package, which means you can easily install it using NPM or Yarn.
  
```bash  
npm install --save vue-gapi  
```
or
```
yarn add vue-gapi  
```  
  
## Example application 
  
Please refer to [this repository](https://github.com/nidkil/vue-gapi-example) for a complete working example application. It also contains instructions how to register the application with Google API. You can find a demo of the example application [here](https://vue-gapi-example.nidkil.com).
  
## Usage  
  
Setting up and using the vue-gapi plugin to use in your Vue application is straight forward.

##### Initialize plugin
Initialize the plugin in `main.js` or create a separate plugin file that you import in `main.js`.
```js
import Vue from "vue";  
import VueGAPI from "vue-gapi";  
  
// For all available scopes see: https://developers.google.com/identity/protocols/googlescopes
const apiConfig = {
  apiKey: "<YOUR_API_KEY>",
  clientId: "<YOUR_CLIENT_ID>.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets"
};

// Initialize the plugin passing the configuration  
Vue.use(VueGAPI, apiConfig);  
```  

You can specify multiple Dicovery Documents (`dicoveryDocs`) and scopes (`scope`) by separating them with a comma. For a complete list of the gapi configurations options see the `gapi.auth2.SignInOptions` section of the [Google documentation](https://developers.google.com/identity/sign-in/web/reference).

##### Access plugin
The plugin exposes `$gapi` on the Vue instance as entry point to the plugin methods and variables.

## getGapiClient
Use the `$gapi.getGapiClient()` method to make requests to the Google APIs specified in configuration Scope. It returns a promise that your code needs to handle.

There are two ways you can make requets to the Google APIs.

##### Using Dicovery Documents
The Discovery Document describes the surface for a particular version of an API. The information provided by the discovery document includes API-level properties such as an API description, resource schemas, authentication scopes, and methods.

```html
<script>
export default {  
  name: 'my-spreadsheet-component',
  methods: {
    loadSheet () {
      this.$gapi.getGapiClient()
        .then(gapi => {
          gapi.sheets.spreadsheet.get(...)
        }
        .catch(err => {
	      // Handle errors
        }
    }
  }
}
</script>
```  

##### Using the $gapi.getGapiClient.request

A more general way to make requests is to use `$gapi.getGApiCLient.request`. Your application does not have to load the Discovery Document as in the first option, but it must still set the API Key, Client ID and scope for the required APIs. While you need to manually fill in REST parameters with this option, it saves one network request and reduces application size.

```html
<script>
export default {  
  name: 'my-spreadsheet-component',
  methods: {
    loadSheet () {
      this.$gapi.getGapiClient()
        .then(gapi => {
          gapi.request({
            'path': 'https://sheets.googleapis.com/v4/spreadsheets/spreadsheetId',
          })
        }
        .catch(err => {
	      // Handle errors
        }
    }
  }
}
</script>
```  

## Login
Use the `$gapi.login()` method to initiate the login process.

The user's browser is redirected to the Google AOuth server. After the user has been authenticated the user's browser is redirected back to the application.
  
```html  
<script>  
export default {  
  name: 'login',
  methods: {  
    login (!this.$gapi.isAuthenticated()) { 
       this.$gapi.login()
         .then(() => {
           // Any actions needed after login
         }
         .catch(err => {
	       // Handle errors
         }
    }
  }
}
</script>
```  
  
## Logout  
Use the `$gapi.logout()` initiate the logout process.

The OAuth token is rendered unusable, the cookies are removed and the local storage is cleared.
  
```html  
<script>  
export default {  
  name: 'logout',
  methods: {
    logout () { 
      if (this.$gapi.isAuthenticated()) {  
        this.$gapi.$logout()
          .then(() => {
            // Any actions needed after logout
          }
          .catch(err => {
            // Handle errors
          }
      }
    }
  }
}
</script>  
```  
  
## isAuthenticated  
Use the `$gapi.isAuthenticated()` method to check if the user is authenticated.

It returns true if the user is authenticated, otherwise false.

```html  
<script>  
export default {
  name: 'auhtenticated-check',
  methods: {
    login () {
      if (!this.$gapi.isAuthenticated()) {  
        this.$gapi.$login() 
          .then(() => {
            // Any actions needed after login
          }
          .catch(err => {
 	        // Handle errors
          }
      }
    }
  }
}
</script>  
```
## refreshToken  
Use the `$gapi.refreshToken()` method to refresh the OAuth token.

The OAuth token expires after a specified expiry period (60 minutes). To ensure the user stays logged in you need to refresh the token by calling Google's OAuth server to refresh it before it expires. The `$gapi.refreshToken()` handles the refreshing of the token for you.

The following code snippet demonstrates how the refresh can be handled automatically in App.vue using a timer that executes every 45 minutes.
  
```html  
<script>  
export default {
  name: 'App',
  created () {
    try {
      // NOTE: 45 min refresh policy is what Google recommends
      window.setInterval(this.$gapi.refreshToken(), 1000 * 60 * 45)  
    } catch (e) {
      console.error(e)
    }
  }
}
</script>  
```  
## grantOfflineAccess
Use the `$gapi.grantOfflineAccess()` and `$gapi.getOfflineAccess()` methods to get an offline access code.

To use Google services on behalf of a user when the user is offline, a hybrid server-side flow must be used where a user authorizes the application on the client side to retrieve a special one-time authorization code that is sent and stored on a back-end server. The back-end server exchanges this one-time-use code to acquire its own access and refresh tokens from Google for the server to be able to make its own API calls, which can be done while the user is offline. This one-time code flow has security advantages over both a pure server-side flow and over sending access tokens to the back-end server.  
  
One-time codes have several security advantages. Google provides tokens directly to your server without any intermediaries. This one-time code can only be used together with the Client Secret. **Keep your Client Secret secret!**

The following code snippet demonstrates how to retrieve an offline access token. This offline access token should be used server side to access the users data.
  
```html  
<script>  
  name: 'offline-access-code',
  methods: {
    getOfflineAccessCode () {
      this.$gapi.$grantOfflineAccess()
        .then(() => {  
          const offlineAccessCode = this.$gapi.$getOfflineAccessCode();  
          // Send the offline access token to the back-end server
        }
    }
  }
}
</script>  
```
