import { createI18n } from 'vue-i18n'
import en from './laguage/en.json'
import ja from './laguage/ja.json'
// import store from '../store'

const messages = {
  en,
  ja,

}
function getLaguage() {
  if (localStorage.getItem('language')) {
    return localStorage.getItem('language')
  } else {
    localStorage.setItem('language', 'en')
    return 'en'
  }
}
const i18n = createI18n({

  locale: getLaguage(), // set locale
  fallbackLocale: 'en', // set fallback locale
  legacy: false,
  messages, // set locale messages
})
export default i18n