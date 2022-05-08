# Vue Router

If you are building a larger application, you will need to check whether the user is authenticated before allowing navigation to some pages such as a user profile or administration console.

For this, you can elevate standard Vue Router [navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) with the usage of the [$gapi](/vue-gapi/reference/GoogleAuthService/__index__.html#googleauthservice) instance.

### router/index.js

```js
import VueRouter from 'vue-router'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: { template: '<div>Login</div>' },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: { template: '<div>Profile</div>' },
      meta: {
        // (1) Denote authenticated page
        authRequired: true,
      },
    },
  ],
})

// (2) Navigation guard to check whether user is signed in
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    app.config.globalProperties.$gapi.isSignedIn().then((isSignedIn) => {
      if (isSignedIn) {
        next()
      } else {
        alert('You must be logged in to see this page')
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})

export default router
```

1. Denote an authenticated page via a [route meta field](https://router.vuejs.org/guide/advanced/meta.html).

1. Check authenticated state via [`isSignedIn`](/vue-gapi/reference/GoogleAuthService/__index__.html#issignedin-⇒-promise-boolean). If user is signed, follow with navigation to desired page, otherwise redirect to login page.
