<template>
	<div>

		<div id="dashboard">
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
		<button
			class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5  text-white bg-indigo-600 ml-2 hover:opacity-90 disabled:bg-slate-400 disabled:border-slate-400 "
			@click="downloadPdf">
			download
		</button>
	</div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
export default {
	name: 'dashboard-page',
	components: {

	},
	data() {
		return {
			currentPage: 1,
			selectedTodo: 0,
			todo: '',
			downloadPdfLoader: false,
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
		// test(){
		// 	return this.$i18n.t('message.hello');
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
		downloadPdf() {
			console.log('pfd');
			this.downloadPdfLoader = true
			window.html2canvas = html2canvas
			const doc = new jsPDF("p", "px", "a4")

			const html = document.getElementById('app');
			let that = this
			console.log(html);
			doc.html(html, {
				callback: function (doc) {
					that.downloadPdfLoader = false
					doc.save("a4.pdf");
				},
				// autoPaging: true,
				x: 10,
				y: 10,
				// html2canvas: {
				// 	removeContainer: true,
				// 	scale: 0.30,
				// 	windowWidth: 1920,
				// }
			});

		},
		// incrementData() {
		// ?========>  call mutation and update State Data with Method
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