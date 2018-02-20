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

```js
import Vue from 'vue'
import VueGAPI from 'vue-gapi'


const clientConfig = {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'OTHER_DISCOVERY_DOCS'],
  scope: 'https://www.googleapis.com/auth/drive' // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
}

Vue.use(VueGAPI, clientConfig)
```




----------------------------------------------------------------------------------
## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)


