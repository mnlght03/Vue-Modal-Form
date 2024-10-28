import 'vue-final-modal/style.css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import App from './App.vue'

createApp(App)
  .use(createVfm())
  .mount('#app')
