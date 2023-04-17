export default {
  state() {
    return {
      counter: 0,
    }
  },
  mutations: {
    increment(state, payload) {
      // ?=====> Declare Function to Update State
      state.counter += payload
    }
  },
  getters: {},
  actions: {
    increment(context, payload) {
      context.commit('increment', payload)
    },
    actionOne(context, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('increment', payload)
          resolve({ success: true })
        }, 1000);
      })
    }
  }
}