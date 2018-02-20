## About me
I'm a freelance developer working with front-end technologies. I use Vue.js and Angular both for writing apps and for coaching people.

## Scratching my own itch
As a fresh freelance developer I was building (still am) a small app to improve my portfolio. There I faced a challenge using the the Google API (gapi) client.

## Problem #1: Instantiation, Deep Linking and Asynchronousity
### Instantiation
The client requires a network call for it to load the actual code for the requested API.
First the browser loads and parses the initial script for the client. Then your app makes a request to the end point. Finally the response comes back and the API is available on the client.

### Deep Linking
**myapp.com/customers/online/1**

It's common practice to go to a specific screen of a web app without going through the home page. It's also frequent that the data for a screen gets loaded right before or after rendering the screen.

### Ansynchronousity
Each time we open a deep link the browser will instantiate the whole Single Page Application (SPA). If that screen loads resources before or right after it's rendering the **gapi** client is not ready yet.

### Solution: Loading the APIs
Here's an example of how to load the Auth2 client for the gapi. After we receive the response, we can allow the user to sign in/up via Google.
Notice that we get a callback instead of a promise.
```js
gapi.load('client:auth2', () => {
	// API now loaded
})
```

Now let's request the code for the spreadsheet API.
```javascript
// Configuration object for loading the API
const spreadsheetApiRequest = {
  apiKey: '<YOUR_API_KEY>',
  clientId: '<YOUR_CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets'
}

gapi.load('client:auth2', () => {
  gapi.client.init(spreadsheetApiRequest)
    .then(function spreadsheetReady() => {
      // we now have access the users' spreadsheet account
    })
})
```
At this point the user can sign in to the app via a Google account. The app is then able to work on the user's spreadsheet data.
On the software aspect we have a first request that returns a callback. Inside that callback there is another request that returns a promise. After resolving the promise our gapi client is ready.

Working inside the `spreadsheetReady` method would lead to more nested code. Yet we still want to know when the gapi client is ready before we try using the spreadsheet API or the Auth2 one.

**Wrapping the instantiation logic around a promise**
The solution is simple: wrap the code above in a promise and `resolve` it by passing **gapi** instance itself.

```javascript
let gapiLoadClientPromise = null

// spreadsheetApiRequest omitted...

gapi.load('client:auth2', () => {
  gapiLoadClientPromise = gapi.client.init(spreadsheetApiRequest)
    .then(() => {
      resolve(gapi) // Auth2 and Spreadsheet are available, and returned
    })
})
```
We now have a promise that will return a gapi client with API code for Auth2 and Spreadsheets. We can now call `.then` on that variable inside of methods for our component.
Below is an example where we resolve the promise in two different methods for a given component.
```javascript
...
data () {
  return {
    gapiLoadClientPromise: null
  }
},
mounted () {
  gapi.load('client:auth2', () => {
    this.gapiLoadClientPromise = gapi.client.init(spreadsheetApiRequest)
      .then(() => {
        resolve(gapi) // Auth2 and Spreadsheet are available, and returned
      })
  })
},
methods: {
  getCustomers () {
    gapiLoadClientPromise.then((gapi) => {
      gapi.client.sheets.spreadsheets
        .get(params) // `params` def omitted ...
        .then(handleGetResponse)
    })
  },
  createCustomer () {
    gapiLoadClientPromise.then((gapi) => {
      gapi.client.sheets.spreadsheets
        .create(params) // `params` def omitted ...
        .then(handleCreateResponse)
    })
  }
},
...
```

We have solve the issue with deep linking but created another one.
Most, if not all, of our links can be access via deep linking. Current, we would need to repeat the same logic found in the `mounted` hook in all components using the API. The risk is *loading the APIs each time* we enter a screen even when navigating within the app.

 
## Problem #2: Instantiated More Than Once
Deep linking occurred, the client is ready  and the app consumed the APIs. Now the user navigates to a different screen where the component needs the APIs as well. We have copied the code there and the app instantiates the APIs again. To execute this code only once we will create a plugin.

### Solution: Separation Of Concerns and Abstraction
**Create abstraction for loading and initialising**

Mixins are simple way to apply the same logic to all components that need it. The issue in our case is that the code will still run on creation of each components.
In a Vue plugin we can either apply a mixin or tackle the Vue instance properties and methods.
For our gapi plugin we will create a Vue instance method: `$getGapiClient`.

_plugin/index.js_
```javascript
...
// Defining the instance method
Vue.prototype.$getGapiClient = () => {
  // code here ...
}
```

_components/ClientList.vue_
```javascript
// Consuming it with a Vue component
...
methods: {
  getClients () {
    this.$getGapiClient().then((gapi) => {
      gapi.client.sheets.spreadsheets
        .get(params) // `params` def omitted ...
        .then(handleGetResponse)
    })
  }
},
...
```
Notice that the method is available on `this` which here refers to the component's instance. To use an instance method or property outside of a Vue component, import Vue and access it via the prototype. This is useful if you for example if you are extending the plugin.
```javascript
import Vue from 'vue'

export const createSpreadsheet = (queryObject) => {
  return Vue.prototype.$getGapiClient()
    .then(useSpreadsheetAPI)
  ...
}
```

## Simple Version
We start by loading `gapi.js` which is the downloaded script file for the client.
When the plugin receives the request for a client instance, three cases are possible.
1. It's the first request -> we initialise the client and return it.
2. The client is already initialised -> we return it.
3. The client is waiting for the response -> we return the client once we get the response back.

```javascript
import { gapi } from './gapi'

export default {
  install: function (Vue, apiConfig) {
    Vue.gapiLoadClientPromise = null

    const resolveClient = (resolve, reject) => {
      if (gapi.auth) {
        // 2. The client is already initialised -> we return it.
        resolve(gapi)
      }
      // 1. It's the first request -> we initialise the client and return it.
      gapi.load('client:auth2', () => {
        Vue.gapiLoadClientPromise = gapi.client.init(apiConfig)
        Vue.gapiLoadClientPromise.then(() => resolve(gapi))
      })
    }

    Vue.prototype.$getGapiClient = () => {
      return new Promise((resolve, reject) => {
        if (Vue.gapiLoadClientPromise &&
            Vue.gapiLoadClientPromise.status === 0) {
          // 3. The client is waiting for the response:
          // we return the global promise itself
          // which returns the client
          resolve(Vue.gapiLoadClientPromise)
        } else {
          resolveClient(resolve, reject)
        }
      })
    }
  }
}

```

## Development process
While developing the plugin I placed the code in the project itself. The project structure is as below.

    src
    ├── components
    ├── plugins
    │   ├── EventHub
    │   ├── ORM
    │   └── VueGAPI
    │       ├── gapi.js
    │       └── index.js
    └── ...

The ORM folder contains the code for consuming the APIs when the gapi client is ready. This business logic is also a plugin but separated from the utility. When VueGAPI was stable I decided to make it available on NPM. This way I can reuse it in future projects and so can you.

## Publishing the plugin
To make the publishing simple I looked for a vue-cli template. Most of them were about packaging components into a plugin. Also, they were all using Webpack but I wanted to use Rollup instead as it outputs less boiler code.

I managed to find one from [psova](https://github.com/posva), the [Vue Plugin Template](https://github.com/posva/vue-plugin-template). After some cleanup I pushed my code to NPM within minutes!
Thanks to psova.

## Next steps
As from there, here are the next steps:
 - responding to feedback & enhancing the code and this post
 - working on the authentication features
 - write another post on extending from VueGAPI


## Feedback & Contribution
Feedback is most appreciated!

To contribute feel free to create a PR on the repo: [VueGAPI](https://github.com/CedricPoilly/vue-gapi).

Happy coding!

