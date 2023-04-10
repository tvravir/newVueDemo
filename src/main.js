// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import '../public/index.css'
import routes from './app-routes'
import VueEasyLightbox from 'vue-easy-lightbox'
// Vue.config.productionTip = false

createApp(App).use(routes, VueEasyLightbox).mount('#app')
