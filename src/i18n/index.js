import { createI18n } from 'vue-i18n'
// import store from '../store'

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}
const i18n = createI18n({
  // locale: store.state.lang, // set locale
  locale: 'ja', // set locale
  fallbackLocale: 'en', // set fallback locale
  legacy: false,
  messages, // set locale messages
})
export default i18n