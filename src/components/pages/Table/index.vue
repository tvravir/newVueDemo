<template>
  <div>
    <div class="flex items-center justify-between mb-3">
      <div v-if="showPagination == true">
        <select
          name="dataPerPage"
          id="dataPerPage"
          v-model.trim="dataPerPage"
          class="pt-1 pb-1 pr-[1.7rem] rounded"
        >
          <option :value="page" v-for="page in totalPerPageList" :key="page">
            {{ page }}
          </option>
        </select>
      </div>

      <div class="ml-auto">
        <input
          type="search"
          v-model.trim="search"
          class="focus:outline-none border rounded-md h-10 px-2 text-[0.8125rem]"
          v-if="searchable == true"
          id="search"
          placeholder="Search"
        />
      </div>
    </div>
    <!-- {{ allData }} -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b"
        >
          <tr>
            <th
              scope="col"
              class="px-6 py-3"
              v-for="(cols, index) in fields"
              :key="index"
            >
              {{ cols.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="allData && allData.length > 0 && !$slots.tableBody">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              v-for="list in allData"
              :key="list.id"
            >
              <td
                class="px-6 py-4"
                v-for="(subList, ind) in list.fieldList"
                :key="subList.title + ind"
              >
                <h2
                  :class="[
                    subList.classes,
                    subList.clickable == true && 'cursor-pointer',
                  ]"
                  @click="clickedKey(subList)"
                >
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
          <template v-if="allData && allData.length == 0 && !$slots.tableBody">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-64 relative"
            >
              <p
                class="absolute w-full h-full flex items-center justify-center"
              >
                No Data Available
              </p>
            </tr>
          </template>
          <template v-if="$slots.tableBody">
            <slot name="tableBody" />
          </template>
        </tbody>
      </table>
    </div>
    <div class="mt-4" v-if="showPagination == true">
      <Pagination
        :totalPages="totalPages"
        :perPage="dataPerPage"
        :currentPage="page"
        @pagechanged="onPageChange($event, search)"
      />
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import userDetailModal from '../modal/userDetailModal.vue'
import Pagination from "@/components/pages/common/pagination";

export default {
  name: "table-page",
  components: {
    Pagination,
  },
  setup(props, { slots }) {
    const hasSlot = (name) => !!slots[name];
    return { hasSlot };
  },
  props: {
    // ? Header Fields
    fields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    listData: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    searchable: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showPagination: {
      type: Boolean,
      default() {
        return true;
      },
    },
    HTTPBased: {
      type: Boolean,
      default() {
        return false;
      },
    },
    totalPerPage: {
      type: Number,
      default() {
        return 10;
      },
    },
    totalPerPageList: {
      type: Array,
      default() {
        return [10, 25, 50, 100];
      },
    },
    totalRecords: {
      type: Number,
      default() {
        return 0;
      },
    },
    searchFields: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      fload: true,
      allUsersResp: this.listData,
      search: "",
      allData: this.listData.slice(0, this.totalPerPage),
      startInterVal: "",
      page: 1,
      dataPerPage: this.totalPerPage,
      totalPages: Math.ceil(this.totalRecords / this.totalPerPage),
      // totalPages: 0,
    };
  },

  mounted() {
    // this.getAllUsers()
  },
  computed: {
    getTableTotalRecords() {
      // console.log(this.tableSettings);
      if (this.totalRecords) {
        return this.totalRecords;
      } else {
        return false;
      }
    },
  },
  watch: {
    search(newval) {
      if (this.HTTPBased == true || this.$slots.tableBody) {
        this.$emit("searchValue", newval);
      } else {
        this.searchFilter(newval);
      }
      // this.onPageChange(this.page, newval)
    },
    // eslint-disable-next-line no-unused-vars
    listData(newVal, oldVal) {
      this.allData = newVal;
      this.allUsersResp = newVal;
      this.getPageData(this.allData, this.page);
      // this.onPageChange(this.page)
    },
    dataPerPage(newVal) {
      // console.log(newVal);
      if (this.HTTPBased == true || this.$slots.tableBody) {
        this.$emit("itemsPerPage", newVal);
      }

      this.onPageChange(1, this.search);
    },
  },
  emits: ["clicked", "activePage", "itemsPerPage", "searchValue"],

  methods: {
    clickedKey(data) {
      // console.log(data);
      if (data.clickable == true) {
        this.$emit("clicked", data);
      }
    },

    async searchFilter(newval) {
      clearInterval(this.startInterVal);
      if (newval != "" && this.allUsersResp.length > 0) {
        // this.startInterVal = setInterval(() => {
        newval = newval.toLowerCase();
        this.allData = this.allUsersResp.filter((e) => {
          for (const property in e) {
            // console.log(e[property]);

            if (
              typeof e[property] == "string" &&
              this.searchFields.length == 0 &&
              e[property].toLowerCase().includes(newval)
            ) {
              return e;
            }

            if (
              typeof e[property] == "string" &&
              this.searchFields.length > 0 &&
              this.searchFields.includes(property) &&
              e[property].toLowerCase().includes(newval)
            ) {
              // console.log(this.searchFields);
              return e;
            }
          }

          // if (
          //   e.firstName.toLowerCase().includes(newval) ||
          //   e.lastName.toLowerCase().includes(newval) ||
          //   e.maidenName.toLowerCase().includes(newval) ||
          //   e.email.toLowerCase().includes(newval) ||
          //   e.username.toLowerCase().includes(newval)
          // ) {
          //   return e;
          // }
        });
        this.getPageData(this.allData, this.page);
        clearInterval(this.startInterVal);
        // }, 1000);
      } else {
        this.allData = this.allUsersResp;
        this.getPageData(this.allData, this.page);
        clearInterval(this.startInterVal);
      }
    },

    async onPageChange(event, searchVal = "") {
      this.page = event;
      if (searchVal != "") {
        this.searchFilter(searchVal);
        this.getPageData(this.allData, event);
      } else {
        this.getPageData(this.allUsersResp, event);
      }
      if (this.HTTPBased == true || this.$slots.tableBody) {
        this.$emit("activePage", event);
      }
    },

    getPageData(filterArr, count) {
      if (filterArr.length == 0) {
        if (this.page != 1) {
          if (this.HTTPBased == true) {
            this.$emit("activePage", 1);
          }
        }
        this.page = 1;
      }
      // console.log(this.getTableTotalRecords);

      if (this.HTTPBased == false) {
        this.totalPages = Math.ceil(filterArr.length / this.dataPerPage);
      } else {
        if (this.search == "") {
          this.totalPages = Math.ceil(
            (this.getTableTotalRecords
              ? this.getTableTotalRecords
              : filterArr.length) / this.dataPerPage
          );
        } else {
          this.totalPages = Math.ceil(filterArr.length / this.dataPerPage);
        }
      }

      // console.log("this.TotalPages", this.totalPages);
      // if (this.HTTPBased == false && this.showPagination == true) {
      if (this.showPagination == true) {
        let startInd = (count - 1) * this.dataPerPage;
        let endInd = startInd + this.dataPerPage;
        this.allData = filterArr.slice(startInd, endInd);
      }
      // console.log('All Data', this.allData);
    },
  },
};
</script>

<style scoped></style>