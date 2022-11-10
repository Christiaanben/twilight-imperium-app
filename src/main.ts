import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router'
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(router)
app.use(vuetify)

app.mount('#app')
