<template>
	<div>
		<div class="flex items-center justify-between mb-3">
			<div>
				<select name="cars" id="cars" v-model.trim="dataPerPage">
					<option :value="page" v-for="page in pagesOption" :key="page">{{ page }}</option>
				</select>
			</div>
			<div class="ml-auto">
				<input type="search" v-model.trim="search"
					class="focus:outline-none border rounded-md  h-10 px-2 text-[0.8125rem]" v-if="tableSettings.searchable == true"
					id="search" placeholder="Search">
			</div>
		</div>
		<!-- {{ allData }} -->
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
					<tr>
						<th scope="col" class="px-6 py-3" v-for="(cols, index) in fields" :key="index">
							{{ cols.title }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="allData && allData.length > 0">
						<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(list) in allData" :key="list.id">
							<td class="px-6 py-4" v-for="(subList, ind) in list.fieldList" :key="subList.title + ind">
								<h2 :class="[subList.classes, subList.clickable == true && 'cursor-pointer']"
									@click="clickedKey(subList)">
									<label v-html="subList.data"> </label>
								</h2>
							</td>
							<!-- <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									<h2 class="font-bold text-sm leading-none  text-black">
										{{ index + 1 }}
									</h2>
								</th>
								<td class="px-6 py-4">
									<div class="flex items-center">
										<div class="h-10 w-10 rounded-full overflow-hidden mr-3	 shadow-md">
											<img :src="list.image" class="h-full object-cover w-full">
										</div>
										<div>
											<h2 class="font-bold text-base leading-none mb-0.5 text-black">
												{{ list.firstName + " " + list.maidenName + " " + list.lastName }}
											</h2>
											<p class="text-xs text-slate-400 leading-none">{{ list.email }}</p>
										</div>
									</div>

								</td> -->

							<!-- <td class="px-6 py-4">
									<h2 class=" text-sm leading-none text-black">
										{{ list.gender }}
									</h2>

								</td>
								<td class="px-6 py-4">

									<h2 class="text-sm leading-tight text-black">
										{{ list.userAgent }}
									</h2>
								</td>
								<td class="px-6 py-4 text-right">
									<a href="javascript:void(0)" @click="openEdit(listData)"
										class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
								</td> -->
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
		<div class="mt-4">
			<Pagination :totalPages="Math.ceil(totalPages)" :perPage="dataPerPage" :currentPage="page"
				@pagechanged="onPageChange($event, search)" />
		</div>
	</div>
	<!-- {{ test }} -->
</template>

<script>
// import axios from 'axios'
// import userDetailModal from '../modal/userDetailModal.vue'
import Pagination from '@/components/pages/common/pagination'


export default {
	name: 'table-page',
	components: {
		Pagination
	},
	props: {
		fields: {
			type: Array,
			required: true,
			default() { return [] },
		},
		listData: {
			type: Array,
			required: true,
			default() { return [] },
		},
		tableSettings: {
			default() {
				return {
					searchable: true
				}
			}
		}
	},
	data() {
		return {
			fload: true,
			allUsersResp: '',
			search: '',
			allData: [],
			startInterVal: '',
			test: '1234',
			page: 1,
			dataPerPage: 10,
			totalPages: 1,
			pagesOption: [10, 25, 50, 100]

		}
	},

	mounted() {
		// this.getAllUsers()

	},
	computed: {
	},
	watch: {
		search(newval) {
			// this.searchFilter(newval)
			this.onPageChange(this.page, newval)
		},
		listData(newVal, oldVal) {
			console.log('list data old Value', oldVal);
			console.log('list data new Value', newVal);
			this.allData = newVal
			this.allUsersResp = newVal
			this.onPageChange(this.page)
		},
		test() {
			console.log(this.test);
		},
		dataPerPage(newVal) {
			console.log(newVal);
			// this.totalPages
			this.onPageChange(1, this.search)
		}
	},
	emits: ['clicked', 'activePage'],
	methods: {
		clickedKey(data) {
			// console.log(data);
			if (data.clickable == true) {
				this.$emit('clicked', data)
			}
		},
		testClick() {
			this.test = Math.round(+new Date() / 1000);
		},
		async searchFilter(newval) {
			clearInterval(this.startInterVal)
			if (newval != '') {
				// this.startInterVal = setInterval(() => {
				// console.log('inside Search Filter -------------');
				newval = newval.toLowerCase()
				this.allData = this.allUsersResp.filter((e) => {
					if (e.firstName.toLowerCase().includes(newval) || e.lastName.toLowerCase().includes(newval) || e.maidenName.toLowerCase().includes(newval) || e.email.toLowerCase().includes(newval) || e.username.toLowerCase().includes(newval)) {
						return e
					}
				})
				// console.log('all Data Lenth', this.allData.length);
				clearInterval(this.startInterVal)
				// }, 10);
			} else {
				this.allData = this.allUsersResp
				clearInterval(this.startInterVal)
			}
		},
		async onPageChange(event, searchVal = '') {
			this.page = event
			if (searchVal != '') {
				// console.log("currentPage", event);
				// console.log("inside search Val", searchVal);
				await this.searchFilter(searchVal)


				this.getPageData(this.allData, event)
			} else {
				this.getPageData(this.allUsersResp, event)
			}
			this.$emit('activePage', event)
		},
		getPageData(filterArr, count) {
			this.totalPages = Math.ceil(filterArr.length / this.dataPerPage)
			let startInd = ((count - 1) * this.dataPerPage)
			let endInd = startInd + this.dataPerPage
			// console.log('total Page', this.totalPages);
			// console.log('Start Index', startInd);
			// console.log('Ending index', endInd);

			this.allData = filterArr.slice(startInd, endInd)
			// console.log('All Data', this.allData);
		}
	},

}
</script>

<style scoped></style>