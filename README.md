[![npm](https://img.shields.io/npm/v/vue-gapi.svg)](https://www.npmjs.com/package/vue-gapi) [![vuejs3](https://img.shields.io/badge/vue.js-3.x-brightgreen.svg?logo=vue.js)](https://vuejs.org/)

# VueGapi

[Google API Client Library](https://github.com/google/google-api-javascript-client) wrapper for [Vue.js](https://vuejs.org/)

## ⚠️ Deprecation

The Google Sign-In JavaScript Platform Library is [deprecated](https://developers.googleblog.com/2022/03/gis-jsweb-authz-migration.html) and will be fully retired on March 31, 2023. This plugin will not be receiving new features.

We would encourage you to migrate your application to **[Vue3 Google Sign-in](https://github.com/wavezync/vue3-google-signin)** which exposes a number of Vue 3 composables built on the new [Google Identity Services](https://developers.google.com/identity/gsi/web) library.

## Requirements

Version 2 requires [Vue 3](https://vuejs.org/).

If you are looking for a [Vue 2](https://v2.vuejs.org/) compatible version, use [Version 1](https://github.com/vue-gapi/vue-gapi/tree/releases/v1).

## Installation

```bash
npm install vue-gapi
```

## Usage

Install the plugin with [`gapi.client.init`](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--) configuration parameters:

```js
import { createApp } from 'vue'
import VueGapi from 'vue-gapi'

const app = createApp({})

app.use(VueGapi, {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets',
})
```

### Composition API

Inject the [`GoogleAuthService`](https://vue-gapi.github.io/vue-gapi/reference/GoogleAuthService/__index__.html#googleauthservice) instance via `useGapi`:

```js
import { useGapi } from 'vue-gapi'

export default {
  setup() {
    const gapi = useGapi()

    function login() {
      gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
        console.log({ currentUser, gapi, hasGrantedScopes })
      })
    }

    return { login }
  },
}
```

### Options API

Reference the `$gapi` [global property](https://vuejs.org/api/application.html#app-config-globalproperties) accessible inside the application:

```js
export default {
  methods: {
    login() {
      this.$gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
        console.log({ currentUser, gapi, hasGrantedScopes })
      })
    },
  },
}
```
