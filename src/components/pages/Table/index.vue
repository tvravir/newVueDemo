<template>
	<div>
		<div v-if="!fload">
			<div class="flex items-center justify-end mb-3">
				<input type="search" v-model.trim="search"
					class="focus:outline-none border rounded-md  h-10 px-2 text-[0.8125rem]" id="search" placeholder="Search">
			</div>
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
						<tr>
							<th scope="col" class="px-6 py-3">
								No
							</th>
							<th scope="col" class="px-6 py-3">
								User Details
							</th>
							<th scope="col" class="px-6 py-3">
								user name
							</th>
							<th scope="col" class="px-6 py-3">
								gender
							</th>
							<th scope="col" class="px-6 py-3">
								user Agent
							</th>
							<th scope="col" class="px-6 py-3">
								Action
								<!-- <span class="sr-only">Edit</span> -->
							</th>
						</tr>
					</thead>
					<tbody>
						<template v-if="allUsersResp && allUsersResp.users">
							<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(user, index) in allData"
								:key="user.id">
								<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									<h2 class="font-bold text-sm leading-none  text-black">
										{{ index + 1 }}
									</h2>
								</th>
								<td class="px-6 py-4">
									<div class="flex items-center">
										<div class="h-10 w-10 rounded-full overflow-hidden mr-3	 shadow-md">
											<img :src="user.image" class="h-full object-cover w-full">
										</div>
										<div>
											<h2 class="font-bold text-base leading-none mb-0.5 text-black">
												{{ user.firstName + " " + user.maidenName + " " + user.lastName }}
											</h2>
											<p class="text-xs text-slate-400 leading-none">{{ user.email }}</p>
										</div>
									</div>

								</td>
								<td class="px-6 py-4">
									<h2 class="font-bold text-sm leading-none text-black">
										{{ user.username }}
									</h2>
								</td>
								<td class="px-6 py-4">
									<h2 class=" text-sm leading-none text-black">
										{{ user.gender }}
									</h2>

								</td>
								<td class="px-6 py-4">

									<h2 class="text-sm leading-tight text-black">
										{{ user.userAgent }}
									</h2>
								</td>
								<td class="px-6 py-4 text-right">
									<a href="javascript:void(0)"
										class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td>
							</tr>
						</template>
						<template v-if="allData && allData.length == 0">
							<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-64 relative">
								<p class="absolute w-full h-full flex items-center justify-center">
									No Data Available
								</p>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>


	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'table-page',
	data() {
		return {
			fload: true,
			allUsersResp: '',
			search: '',
			allData: [],
			startInterVal: ''
		}
	},
	methods: {
		getAllUsers() {
			axios.get('users')
				.then((res) => {
					if (res && res.status == 200) {
						this.fload = false
						this.allUsersResp = res.data
						this.allData = res.data.users
						console.log(this.allUsersResp);
					}
				})
				.catch((err) => {
					this.fload = false
					console.log(err);
				})
		},
		searchFilter(event) {
			console.log(event);
		}
	},
	mounted() {
		this.getAllUsers()
	},
	computed: {
	},
	watch: {
		search(newval) {
			clearInterval(this.startInterVal)
			if (newval != '') {
				this.startInterVal = setInterval(() => {
					// console.log("in interVal", this.startInterVal);
					newval = newval.toLowerCase()
					this.allData = this.allUsersResp.users.filter((e) => {
						if (e.firstName.toLowerCase().includes(newval) || e.lastName.toLowerCase().includes(newval) || e.maidenName.toLowerCase().includes(newval) || e.email.toLowerCase().includes(newval) || e.username.toLowerCase().includes(newval)) {
							return e
						}
					})
					clearInterval(this.startInterVal)
				}, 1000);
			} else {
				this.allData = this.allUsersResp.users
				clearInterval(this.startInterVal)
			}
		}
	}
}
</script>

<style scoped></style>