// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import '../public/index.css'
import routes from './app-routes'
import VueEasyLightbox from 'vue-easy-lightbox'
import { vfmPlugin } from 'vue-final-modal'
import VueAwesomePaginate from "vue-awesome-paginate";

createApp(App).use(routes, VueEasyLightbox, vfmPlugin, VueAwesomePaginate).mount('#app')
