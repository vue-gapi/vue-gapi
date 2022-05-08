# Authentication

Once you have [installed](/vue-gapi/#usage) the plugin, here is a conventional Vue.js v3.x [component](https://vuejs.org/guide/essentials/component-basics.html) that displays a login or logout button based on a detected authenticated state.

### Component

```js
import { computed, ref } from 'vue'
import { useGapi } from 'vue-gapi'

export default {
  setup() {
    const gapi = useGapi()

    // (1) Subscribe to authentication status changes
    const isSignedIn = ref(null)
    gapi.listenUserSignIn((value) => {
      isSignedIn.value = value
    })

    // (2) Display authenticated user name
    const userName = computed(() => {
      const user = gapi.getUserData()

      return user ? user.firstName : undefined
    })

    // (3) Expose $gapi methods
    function login() {
      gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
        console.log({ currentUser, gapi, hasGrantedScopes })
      })
    }

    function logout() {
      gapi.logout()
    }

    return {
      isSignedIn,
      userName,
      login,
      logout,
    }
  },
  template: '#login-template',
}
```

### Template

```html
<script type="text/x-template" id="login-template">
  <div>
    <div v-if="isSignedIn">
      <button @click="logout()" type="button">Logout</button>
      {{ userName }}
    </div>
    <button
      :disabled="isSignedIn === null"
      @click="login()"
      type="button"
      v-if="!isSignedIn"
    >
      Login
    </button>
  </div>
</script>
```

1. Subscribe to authentication status changes via [`listenUserSignIn`](/vue-gapi/reference/GoogleAuthService/__index__.html#listenusersignin-callback-⇒-promise-void).

1. Expose [`login`](/vue-gapi/reference/GoogleAuthService/__index__.html#login-options-⇒-promise-loginresponse) and [`logout`](/vue-gapi/reference/GoogleAuthService/__index__.html#logout-⇒-promise) methods.

   _Most `$gapi` methods return a promise. See the [`GoogleAuthService` reference documentation](/vue-gapi/reference/GoogleAuthService/__index__.html#googleauthservice) for more details._

1. Display the authenticated user's name via [`getUserData`](/vue-gapi/reference/GoogleAuthService/__index__.html#getuserdata-⇒-userdata-null).

   _See the [`UserData` reference documentation](/vue-gapi/reference/GoogleAuthService/__index__.html#userdata-object) for a full list of user object properties which are persisted in local storage in practice._
