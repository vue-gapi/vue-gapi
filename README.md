# VueGapi

[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> [Google API Client Library wrapper](https://developers.google.com/identity/sign-in/web/reference) for [Vue.js](https://vuejs.org/)

## Installation

```bash
npm install --save vue-gapi
```

or

```
yarn add vue-gapi
```

## Usage

Installing the plugin:

```js
import Vue from 'vue'

// import the plugin
import VueGapi from 'vue-gapi'

// create the 'options' object
const clientConfig = {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
  scope: 'https://www.googleapis.com/auth/spreadsheets',

  // works only with `ux_mode: "prompt"`
  refreshToken: true,
}

// Use the plugin and pass along the configuration
Vue.use(VueGapi, clientConfig)
```

exposes a `$gapi` member on the Vue instance:

```html
<script>
  export default {
    name: 'my-component',

    methods: {
      login() {
        this.$gapi.getGapiClient().then((gapi) => {
          // gapi.sheets.spreadsheet.get(...)
          // ...
        })
      },
    },
  }
</script>
```

## Reference

See the [generated `GoogleAuthService` documentation](https://vue-gapi.github.io/vue-gapi/GoogleAuthService.html) for a complete reference of the `Vue.$gapi` methods.
