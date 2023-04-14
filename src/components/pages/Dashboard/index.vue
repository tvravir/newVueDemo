<template>
	<div>
		<h2>{{ $t('message.hello') }}</h2>
		dashboard {{ counter }}
		<button class="border py-2 px-4" @click="incrementData(1)">Increment</button>
		<!-- <Pagination :totalPages="10" :perPage="10" :maxVisibleButtons="5" :currentPage="currentPage"
			@pagechanged="onPageChange" /> -->
		<div>
			{{ doneTodos }}
		</div>
		<div>
			<p v-for="todo in allTodos" :key="todo.id" @click="getTodoDetail(todo.id)">
				<span class="mr-2">
					{{ todo.title }}
				</span>
				<span class="mr-2">
					{{ todo.done }}
				</span>
			</p>
		</div>
		<div v-if="todo">
			<h3 class="text-2xl">{{ todo.title }}</h3>
		</div>
	</div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	name: 'dashboard-page',
	components: {

	},
	data() {
		return {
			currentPage: 1,
			selectedTodo: 0,
			todo: ''
		};
	},
	computed: {
		// Get all State
		...mapState({
			counter: (state) => state.counterModule.counter,
			allTodos: (state) => state.todosModule.todos
		}),
		// get Getters 
		...mapGetters({
			doneTodos: 'todosModule/getCompletedTodosCount',
			todoById: 'todosModule/getTodoById'
		}),
		// counter() {
		// 	return this.$store.state.counter
		// },
		// allTodos() {
		// 	return this.$store.state.todos
		// },
		// doneTodos() {
		// 	return this.$store.getters.getCompletedTodosCount
		// },
		// todo() {
		// 	return this.$store.getters.getTodoById(this.selectedTodo)

		// }
	},

	methods: {
		...mapActions({
			incrementData: 'actionOne'
		}),

		onPageChange(page) {
			console.log(page)
			this.currentPage = page;
		},
		// incrementData() {
		// *========>  call mutation and update State Data with Method
		// this.$store.commit('increment') 


		// *========>  call actions and update State Data with Method
		// this.$store.dispatch('increment', 2)

		// this.$store.dispatch('actionOne', 1).then(response => {
		// 	console.log(response);
		// })
		// },
		getTodoDetail(id) {
			console.log(id);
			this.selectedTodo = id
			this.todo = this.todoById(id)
		},
	},
	setup() {
		// Use to setup
	}

}
</script>

<style scoped></style>