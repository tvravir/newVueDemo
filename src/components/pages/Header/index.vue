<template>
	<div>
		<nav class="bg-gray-800">
			<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div class="relative flex h-16 items-center justify-between">
					<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<!-- Mobile menu button-->
						<button type="button"
							class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu" aria-expanded="false">
							<span class="sr-only">Open main menu</span>
							<svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
								aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
							<svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
								aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div class="flex flex-shrink-0 items-center">
							<img class="block h-8 w-auto lg:hidden"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
							<img class="hidden h-8 w-auto lg:block"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
						</div>
						<div class="hidden sm:ml-6 sm:block">
							<div class="flex space-x-4">
								<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
								<router-link to="/dashboard"
									class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Dashboard</router-link>

								<router-link to="/products"
									class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Products</router-link>

								<!-- <router-link to="/users"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Users</router-link> -->

								<router-link to="/calendar"
									class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</router-link>

								<router-link to="/user-list"
									class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">User
									List</router-link>
							</div>
						</div>
					</div>
					<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

						<!-- Profile dropdown -->
						<router-link to="/login" v-if="!userData.username"
							class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ml-3">
							Login
						</router-link>
						<router-link to="/register" v-if="!userData.username"
							class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 ml-3">
							sign up
						</router-link>
						<div class="flex items-center" v-if="userData && userData.username">
							<h4 class="text-white text-xl">
								Hi, {{ userData.username }}
							</h4>
							<!-- <select v-model="language" :on-select="changelanguages()">
								<option value="en">English</option>
								<option value="ja">japan</option>
							</select> -->
							<div class="locale-changer">
								<select v-model="$i18n.locale" @change="onChange($event)">
									<option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}
									</option>
								</select>
							</div>
							<!-- <button class="px-2 mx-2 text-white" @click="changelanguages('ja')">{{ language }}</button> -->
							<button @click="logoutUser"
								class="pointer-events-auto rounded-md bg-red-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-red-500 ml-3">
								logout
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile menu, show/hide based on menu state. -->
			<div class="sm:hidden" id="mobile-menu" v-if="false">
				<div class="space-y-1 px-2 pb-3 pt-2">
					<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
					<router-link to="/" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
						aria-current="page">Dashboard</router-link>

					<router-link to="/"
						class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</router-link>

					<router-link to="/"
						class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</router-link>

					<router-link to="/"
						class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</router-link>
				</div>
			</div>
		</nav>

	</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
// import { I18n } from '../../../i18n';
export default {
	name: 'header-section',
	computed: {
		// ...mapState({
		// 	language: (state) => { console.log(state); return state.lang }
		// }),
	},
	data() {
		return {
			userData: {},
			language: 'en'
		}
	},
	created() {
		this.getCurrentuser()
	},
	methods: {
		// ...mapActions({
		// 	changelang: 'changeLanguage'
		// }),
		getCurrentuser() {
			// currentUser
			if (localStorage.getItem('currentuser')) {
				this.userData = JSON.parse(localStorage.getItem('currentuser'));
				// console.log(this.userData);
			}
		},
		logoutUser() {
			this.userData = {};
			localStorage.removeItem('currentuser');
			this.$router.push({ path: '/login' });
		},
		onChange(event) {
			console.log(event.target.value);
			localStorage.setItem('language', event.target.value)
			// this.changelang('ja')
			// console.log(event.target.value);
			// I18n.global.local = 'ja'
		}

	},

}
</script>

<style scoped>
.router-link-active {
	background-color: rgb(17 24 39);
	color: #fff;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	font-weight: 500;
	border-radius: 0.375rem;
	font-size: 0.875rem;
	line-height: 1.25rem;

}
</style>