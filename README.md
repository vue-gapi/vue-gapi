[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vuejs3](https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?logo=vue.js)](https://v3.vuejs.org/)

# VueGapi

[Google API Client Library](https://github.com/google/google-api-javascript-client) wrapper for [Vue.js](https://v3.vuejs.org/)

## Requirements

Version 2 requires [Vue.js v3.x](https://v3.vuejs.org/).

If you are looking for a Vue.js v2.x compatible version, use [Version 1](https://github.com/vue-gapi/vue-gapi/tree/releases/v1).

## Installation

```bash
npm install --save vue-gapi
```

or

```bash
yarn add vue-gapi
```

## Usage

Installing the plugin with [`gapi.client.init`](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--) configuration parameters:

```js
import Vue from 'vue'
import VueGapi from 'vue-gapi'

const app = Vue.createApp({})

app.use(VueGapi, {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets',
})
```

exposes a `$gapi` [global property](https://v3.vuejs.org/api/application-config.html#globalproperties) accessible inside the application:

```html
<script>
  export default {
    methods: {
      login() {
        this.$gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
          console.log({ currentUser, gapi, hasGrantedScopes })
        })
      },
    },
  }
</script>
```

See [Examples](https://vue-gapi.github.io/vue-gapi/examples/authentication.html) for a comprehensive example.
