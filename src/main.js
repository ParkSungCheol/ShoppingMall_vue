import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios"

Vue.prototype.$http = axios
Vue.config.productionTip = false
createApp(App).mount('#app')
