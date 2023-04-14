import { createStore } from "vuex";
import counterModule from './modules/counter'
import todoModule from './modules/todos'

const store = createStore({
  modules: {
    counterModule: counterModule,
    todosModule: todoModule
  },
  state() {
    // ?=====> Declare Variable
    return {
      lang: 'en'
    }
  },
  mutations: {
    // ?=====> Declare Function to Update State
    changelang(state, val) {
      state.lang = val
    }
  },
  getters: {
    // ?=====>  get the operation 


  },
  actions: {
    // *=====>  apis and call mutations in this Function
    changeLanguage(context, data) {
      context.commit('changelang', 'ja')
      // console.log(state);
      console.log(data);
    }
  },


})
export default store