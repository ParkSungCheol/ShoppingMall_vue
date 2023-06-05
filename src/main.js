import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { LoadingPlugin } from 'vue-loading-overlay'

Vue.use(LoadingPlugin)
createApp(App).use(router).mount('#app')
