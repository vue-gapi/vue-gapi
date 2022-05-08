import { createApp } from 'vue'
import VueGapi from 'vue-gapi'
import createRouter from './router.js'

const app = createApp({
  setup() {},
})

app.use(createRouter(app))

app.use(VueGapi, {
  clientId:
    '831498217804-n5f6uvt30h9q0lsdql4tq6qek8i6cggf.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
})

export default app
