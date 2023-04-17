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

    }
  },
  mutations: {
    // ?=====> Declare Function to Update State
  },
  getters: {
    // ?=====>  get the operation 


  },
  actions: {
    // *=====>  apis and call mutations in this Function

  },


})
export default store