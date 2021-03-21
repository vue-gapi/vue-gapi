[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vuejs3](https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?logo=vue.js)](https://v3.vuejs.org/)

# VueGapi

[Google API Client Library](https://github.com/google/google-api-javascript-client) wrapper for [Vue.js](https://v3.vuejs.org/)

## Vue 3

[Vue.js v3.x](https://v3.vuejs.org/) will be supported in v2.0 and can be installed today via `vue-gapi@next`.

## Installation

```bash
npm install --save vue-gapi@next
```

or

```bash
yarn add vue-gapi@next
```

## Usage

Installing the plugin with [`gapi.client.init`](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--) configuration parameters:

```js
import Vue from 'vue'
import VueGapi from 'vue-gapi'

Vue.use(VueGapi, {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets',
})
```

exposes a `$gapi` member on the Vue instance:

```html
<script>
  export default {
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
