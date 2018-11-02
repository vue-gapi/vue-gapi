# VueGapi

[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Google API client wrapper for Vue

## Installation

```bash
npm install --save vue-gapi
or
yarn add vue-gapi
```

## Example

Please refer to [this repository](https://github.com/nidkil/vue-gapi-example) for a complete working example. It also contains instructions how to register the application with Google API. 

## Usage

To connect to your app and load the APIs you need

```js
import Vue from "vue";

// import the plugin
import VueGAPI from "vue-gapi";

// create the 'options' object
const apiConfig = {
  apiKey: "<YOUR_API_KEY>",
  clientId: "<YOUR_CLIENT_ID>.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  scope: "https://www.googleapis.com/auth/spreadsheets"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
```

Exposes the `$getGapiClient` on the Vue instance that returns a promise containing the initialised instance of the Google API client.
See full list of options for apiConfig object (here)[https://developers.google.com/identity/sign-in/web/reference] under gapi.auth2.SignInOptions

```html
<script>

export default {
  name: 'my-component',

  methods: {
    login () {
      this.$getGapiClient()
        .then(gapi => {
          // gapi.sheets.spreadsheet.get(...)
          // ...
        })
    }
  },

}
</script>
```

## Login

This will shortcut the login process

```html
<script>
export default {
  name: 'login-shortcut',

  methods: {
    login () {
      this.$login()
    }
  }

}

</script>
```

## Logout

This will shortcut the logout process

```html
<script>
export default {
  name: 'logout-shortcut',

  methods: {
    logout () {
      this.$logout()
    }
  }

}

</script>
```

## isAuthenticated

This will shortcut and check if your user is authenticated will return a boolen

```html
<script>
export default {
  name: 'login-shortcut-check',

  methods: {
    login () {
      if (this.$isAuthenticated() !== true) {
        this.$login()
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
  name: 'App'

  created () {
  try {
    // NOTE: 45min refresh policy is what google recommends
    window.setInterval(this.$refreshToken(), 1000 * 60 * 45)
  } catch (e) {
    console.error(e)
  }

}
</script>
```

## grantOfflineAccess

This will retrieve an offline access token. This offline access token can be used server side to access the users data.

```html
<script>
  name: 'App'

  methods: {
      getOfflineAccessCode () {
        this.$grantOfflineAccess()
          .then(() => {
            const offlineAccessCode = this.$getOfflineAccessCode();
            // Send the offline access token to the backend server
          }
      }

}
</script>
```
