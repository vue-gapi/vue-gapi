# Authentication

Once you have [installed](/#usage) the plugin, here is a conventional Vue.js v3.x [component](https://v3.vuejs.org/guide/component-basics.html) that displays a login or logout button based on a detected authenticated state.

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

### Component

```js
app.component('login', {
  template: '#login-template',
  data() {
    return {
      isSignedIn: null, // (1) Track authenticated state
    }
  },
  created() {
    // (2) Subscribe to authentication status changes
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.isSignedIn = isSignedIn
    })
  },
  methods: {
    // (3) Expose $gapi methods
    login() {
      this.$gapi.login()
    },
    logout() {
      this.$gapi.logout()
    },
  },
  computed: {
    userName() {
      // (4) Display authenticated user name
      const user = this.$gapi.getUserData()

      if (user) {
        return user.firstName
      }
    },
  },
})
```

1. Track authenticated state via an `isSignedIn` [data option](https://v3.vuejs.org/guide/data-methods.html#data-properties) property.

1. Subscribe to authentication status changes via [`listenUserSignIn`](/reference/GoogleAuthService/__index__.html#listenusersignin-callback-⇒-promise-void).

1. Expose [`login`](/reference/GoogleAuthService/__index__.html#login-options-⇒-promise-loginresponse) and [`logout`](/reference/GoogleAuthService/__index__.html#logout-⇒-promise) methods.

   _Most `$gapi` methods return a promise. See the [`GoogleAuthService` reference documentation](/reference/GoogleAuthService/__index__.html#googleauthservice) for more details._

1. Display the authenticated user's name via [`getUserData`](/reference/GoogleAuthService/__index__.html#getuserdata-%E2%87%92-userdata-null).

   _See the [`UserData` reference documentation](/reference/GoogleAuthService/__index__.html#userdata-object) for a full list of user object properties which are persisted in local storage in practice._
