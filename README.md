# VueGapi

[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Google API client wrapper for Vue

## Installation

```bash
npm install --save vue-gapi
or
yarn add vue-gapi
```

## Usage
To connect to your app and load the APIs you need
```js
import Vue from 'vue'

// import the plugin
import VueGAPI from 'vue-gapi'

// create the 'options' object
const apiConfig = {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets'
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
}

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig)
```

Exposes the `$getGapiClient` on the Vue instance that returns a promise containing the initialised instance of the Google API client.
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


