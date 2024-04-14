import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from './router/router'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

createApp(App)
.use(router)
.use(pinia)
.mount('#app')
