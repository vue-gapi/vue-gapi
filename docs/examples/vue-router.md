# Vue Router

If you are building a larger application, you will need to check whether the user is authenticated before allowing navigation to some pages such as a user profile or administration console.

For this, you can elevate standard Vue Router [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) with the usage of the [$gapi](/reference/GoogleAuthService/_index.html#googleauthservice) instance.

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
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      // (1) Denote authenticated page
      authRequired: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// (2) Navigation guard to check whether user is signed in
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

1. Denote an authenticated page via a [route meta field](https://router.vuejs.org/guide/advanced/meta.html).

1. Check authenticated state via an [`isSignedIn`](/reference/GoogleAuthService/_index.html#issignedin-⇒-promise-boolean) [data object](https://vuejs.org/v2/guide/instance.html#Data-and-Methods) property. If user is signed, follow with navigation to desired page, otherwise redirect to login page.
