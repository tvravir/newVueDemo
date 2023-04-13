// import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import '../public/index.css'
import routes from './app-routes'
import VueEasyLightbox from 'vue-easy-lightbox'
import { vfmPlugin } from 'vue-final-modal'
import VueAwesomePaginate from "vue-awesome-paginate";
import helper from './components/helper'
import axios from 'axios'
axios.defaults.baseURL = 'https://dummyjson.com/';
axios.defaults.headers.common['Content-Type'] = 'application/json'

createApp(App).use(routes, helper, VueEasyLightbox, vfmPlugin, VueAwesomePaginate).mount('#app')
