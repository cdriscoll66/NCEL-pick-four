import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Particles from "particles.vue3";


import './assets/main.css'
import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia()).use(Particles)

app.use(router)

app.mount('#app')
