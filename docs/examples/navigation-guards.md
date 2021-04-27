# Navigation Guards

If you are building a larger application you will need to check whether user is autheticated before allowing a navigation to some pages, such as user profile, administration console etc. For this you can elevate standard Vue.js v2.x router [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) with usage of [$gapi](https://vue-gapi.github.io/vue-gapi/reference/GoogleAuthService/_index.html) object.

### router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Authentication required page
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authRequired: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// Navigation guard with check whether user is signed in
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    router.app.$gapi.isSignedIn().then((isSignedIn) => {
      if (isSignedIn) {
        next()
      } else {
        alert('You must be logged in to see this page')
        next({
          path: '/login',
        })
      }
    })
  } else {
    next()
  }
})

export default router
```

1. Check authenticated state via an `isSignedIn` [data object](https://vuejs.org/v2/guide/instance.html#Data-and-Methods) property. If user is signed, follow with navigation to desired page, otherwise redirect to login page.
