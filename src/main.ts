import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import pinia from './plugins/pinia'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
