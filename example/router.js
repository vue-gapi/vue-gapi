import * as VueRouter from 'vue-router'

export default function createRouter(app) {
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
        meta: { authRequired: true },
      },
    ],
  })

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

  return router
}
