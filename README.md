
# VueGapi  
  
[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)  
  
> A Google API client wrapper for Vue  
  
## Installation  
  
```bash  
npm install --save vue-gapi  
or  
yarn add vue-gapi  
```  
  
## Example application 
  
Please refer to [this repository](https://github.com/nidkil/vue-gapi-example) for a complete working example. It also contains instructions how to register the application with Google API.   
  
## Usage  
  
To connect to your app and load the APIs you need  
  
```js  
import Vue from "vue";  
  
// import the plugin  
import VueGAPI from "vue-gapi";  
  
// For all available scopes see here: https://developers.google.com/identity/protocols/googlescopes
const apiConfig = {
  apiKey: "<YOUR_API_KEY>",  
  clientId: "<YOUR_CLIENT_ID>.apps.googleusercontent.com",  
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],  
  scope: "https://www.googleapis.com/auth/spreadsheets"  
};

// Use the plugin and pass along the configuration  
Vue.use(VueGAPI, apiConfig);  
```  

For a complete list of the [apiConfig options](https://developers.google.com/identity/sign-in/web/reference) see the gapi.auth2.SignInOptions section.

The plugin exposes `$gapi` on the Vue instance as entry point to the plugin functions and variables. The variable `$gapi.getGapiClient()` returns a promise containing the initialised instance of the Google API client.
  
```html  
<script>
export default {  
  name: 'my-component',  
  methods: {  
    login () {
      this.$gapi.getGapiClient()  
        .then(gapi => {  
          // gapi.sheets.spreadsheet.get(...
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
Initiate the login process.
  
```html  
<script>  
export default {  
  name: 'login',
  methods: {  
    login () { 
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
Initiate the logout process.
  
```html  
<script>  
export default {  
  name: 'logout',
  methods: {
    logout () { 
      this.$logout()
        .then(() => {
          // Any actions needed after logout
        }
        .catch(err => {
          // Handle errors
        }
    }
  }
}
</script>  
```  
  
## isAuthenticated  
Use isAuthenticated to check if a user is authenticated. It returns true if the user is authenticated, otherwise false.

```html  
<script>  
export default {
  name: 'auhtenticated-check',
  methods: {
    login () {
      if (this.$gapi.isAuthenticated()) {  
        this.$login() 
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
This will shortcut getting a refresh token from Google, this should be placed in your App.vue on the created page and run on a timer of 45min  
  
```html  
<script>  
export default {
  name: 'App',
  created () {
    try {
      // NOTE: 45 min refresh policy is what Google recommends
      window.setInterval(this.$refreshToken(), 1000 * 60 * 45)  
    } catch (e) {
      console.error(e)
    }
  }
}
</script>  
```  
## grantOfflineAccess  
To use Google services on behalf of a user when the user is offline, a hybrid server-side flow must be used where a user authorizes the application on the client side to retrieve a special one-time authorization code that is sent and stored on a back-end server. The back-end server exchanges this one-time-use code to acquire its own access and refresh tokens from Google for the server to be able to make its own API calls, which can be done while the user is offline. This one-time code flow has security advantages over both a pure server-side flow and over sending access tokens to the back-end server.  
  
One-time codes have several security advantages. Google provides tokens directly to your server without any intermediaries. This one-time code can only be used together with the Client Secret. **Keep your Client Secret secret!**

This will retrieve an offline access token. This offline access token can be used server side to access the users data.
  
```html  
<script>  
  name: 'offline-access-code',
  methods: {
    getOfflineAccessCode () {
      this.$grantOfflineAccess()
        .then(() => {  
          const offlineAccessCode = this.$getOfflineAccessCode();  
          // Send the offline access token to the back-end server
        }
    }
  }
}
</script>  
```
