export default {
  namespaced: true,
  state() {
    return {
      todos: [
        { id: 1, title: 'test 1', done: true },
        { id: 2, title: 'test 2', done: true },
        { id: 3, title: 'test 3', done: false },
        { id: 4, title: 'test 4', done: false },
      ]
    };
  },
  mutations: {},
  getters: {
    // *=====>  get the operation 
    getCompletedTodosCount(state, gatters) {
      // ?======> use anothet gatters function
      console.log(state);
      return gatters.getCompletedTodos.length;
    },
    getCompletedTodos(state) {
      console.log(state);
      return state.todos.filter(f => f.done)
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(f => f.id === id)
    }
  },
  actions: {}
}