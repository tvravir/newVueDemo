// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import '../public/index.css'
import routes from './app-routes'
import VueEasyLightbox from 'vue-easy-lightbox'
import { vfmPlugin } from 'vue-final-modal'
// import VueAwesomePaginate from "vue-awesome-paginate";
import helper from './components/helper'
import store from './store'
import i18n from './i18n'
import axios from 'axios'
axios.defaults.baseURL = 'https://dummyjson.com/';
axios.defaults.headers.common['Content-Type'] = 'application/json'
// const store = createAppStore

const app = createApp(App)//.use(routes, store, helper, VueEasyLightbox, vfmPlugin, VueAwesomePaginate).mount('#app')
app.use(routes)
app.use(i18n)
app.use(store)
app.use(helper)
app.use(VueEasyLightbox)
app.use(vfmPlugin)
app.mount('#app')