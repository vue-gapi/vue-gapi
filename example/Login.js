import { computed, ref } from 'vue'
import { useGapi } from 'vue-gapi'

export default {
  setup() {
    const gapi = useGapi()

    const isSignedIn = ref(null)
    gapi.listenUserSignIn((value) => {
      isSignedIn.value = value
    })

    const userName = computed(() => {
      const user = gapi.getUserData()

      return user ? user.firstName : undefined
    })

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
  template: `
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
    </div>`,
}
