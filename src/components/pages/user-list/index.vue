<template>
  <div>
    <!-- <img :src="logoimage ? logoimage : ''"
      :class="[inventoryType === 'SAQ' ? 'inventory__saq' : 'inventory__ip', 'inventory pl-3 pr-3']" alt="" srcset=""> -->
    <!-- user-list -->
    <!-- <div class="flex items-center justify-end mb-3">
      <input type="search" v-model.trim="search" class="focus:outline-none border rounded-md  h-10 px-2 text-[0.8125rem]"
        id="search" placeholder="Search">
    </div> -->
    <!-- <Table :fields="fieldsList" :listData="allData" @clicked="testClick" :tableSettings="tblSetting" -->
    <Table
      :fields="fieldsList"
      :listData="allData"
      :searchFields="['email', 'firstName']"
      :searchable="true"
      :HTTPBased="false"
      @clicked="testClick"
      @activePage="getActivePage"
      @itemsPerPage="getItemsPerPage"
      @searchValue="searchval"
      :showPagination="true"
      :totalPerPageList="[10, 15, 100]"
      :totalPerPage="itemsPerPage"
      :totalRecords="totalRecords"
    >
      <!-- ? if you pass the slot name with tableBody it show table body content -->
      <!-- <template v-slot:tableBody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="list in allData"
          :key="list.id"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <h2 class="font-bold text-sm leading-none text-black">
              
              {{ list.id }}
            </h2>
          </th>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                class="h-10 w-10 rounded-full overflow-hidden mr-3 shadow-md"
              >
                <img :src="list.image" class="h-full object-cover w-full" />
              </div>
              <div>
                <h2 class="font-bold text-base leading-none mb-0.5 text-black">
                  {{
                    list.firstName + " " + list.maidenName + " " + list.lastName
                  }}
                </h2>
                <p class="text-xs text-slate-400 leading-none">
                  {{ list.email }}
                </p>
              </div>
            </div>
          </td>

          <td class="px-6 py-4">
            <h2 class="text-sm leading-none text-black">
              {{ list.username }}
            </h2>
          </td>
          <td class="px-6 py-4">
            <h2 class="text-sm leading-none text-black">
              {{ list.gender }}
            </h2>
          </td>
          <td class="px-6 py-4">
            <h2 class="text-sm leading-tight text-black">
              {{ list.userAgent }}
            </h2>
          </td>
          <td class="px-6 py-4 text-right">
            <a
              href="javascript:void(0)"
              @click="openEdit(listData)"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </template> -->
    </Table>
  </div>
</template>

<script>
import test from "@/assets/logo.png";
import Table from "@/components/pages/Table/index.vue";
import axios from "axios";
export default {
  name: "user-list",
  components: {
    Table,
  },
  data() {
    return {
      logoimage: test,
      fieldsList: [
        { title: "No" },
        { title: "User Details" },
        { title: "User Name" },
        { title: "Gender" },
        { title: "User Agent" },
        { title: "Action" },
      ],
      allData: [],
      allUsersResp: {},
      fload: true,
      search: "",
      startInterVal: "",
      itemsPerPage: 10,
      totalRecords: 0,
      // activepPage: 1
    };
  },

  watch: {
    search(newval) {
      clearInterval(this.startInterVal);
      if (newval != "") {
        this.startInterVal = setInterval(() => {
          axios
            .get(`users/search?q=${newval}`)
            .then((res) => {
              if (res && res.status == 200) {
                this.allUsersResp = res.data;
                this.allData = res.data.users;
                this.getuserList(res.data.users);
              }
            })
            .catch((err) => {
              console.log(err);
            });

          clearInterval(this.startInterVal);
        }, 2000);
      } else {
        this.allData = this.allUsersResp.users;
        this.getAllUsers(1);
        clearInterval(this.startInterVal);
      }
    },
  },
  mounted() {
    this.getAllUsers(1);
  },
  methods: {
    getAllUsers(page) {
      if (!localStorage.getItem("alluserResp")) {
        // console.log(localStorage.getItem('alluserResp'));
        let apiUrl =
          page > 1
            ? `users?limit=${this.itemsPerPage}&skip=${
                (page - 1) * this.itemsPerPage
              }`
            : `users?limit=${this.itemsPerPage}`;
        axios
          .get(apiUrl)
          .then((res) => {
            if (res && res.status == 200) {
              this.fload = false;

              this.allUsersResp = res.data;
              localStorage.setItem("alluserResp", JSON.stringify(res.data));
              // this.allData = res.data.users
              this.totalRecords = res.data.total;

              this.getuserList(res.data.users);
              console.log(this.allUsersResp);
            }
          })
          .catch((err) => {
            this.fload = false;
            console.log(err);
          });
      } else {
        let ress = JSON.parse(localStorage.getItem("alluserResp"));
        this.fload = false;
        this.totalRecords = ress.total;

        this.allUsersResp = ress;
        this.getuserList(ress.users);
        // this.getActivePage(1)
      }
    },
    getuserList(data) {
      this.allData = data;
      // console.log(data);
      // this.fieldsList.forEach(e => {
      //   console.log(e);
      // })
      data.forEach((element) => {
        element.fieldList = [];
        this.fieldsList.forEach((el) => {
          let obj = {
            // title: el,
            ...this.getFilter(el.title, element),
          };
          element.fieldList.push(obj);
        });
      });
      // console.log(data);
    },
    getFilter(key, data) {
      if (key == "No") {
        return {
          title: key,
          data: data.id,
          classes: "font-bold text-sm leading-none text-black",
          clickable: false,
        };
      } else if (key == "User Details") {
        return {
          title: key,
          data: `<div><p class='mb-1'>
            <a href='/test' >${
              data.firstName + " " + data.maidenName + " " + data.lastName
            }</a>
            </p> 
          <p class='text-xs text-slate-400 font- leading-none'>${data.email}</p>
          </div>`,
          classes: "font-bold text-sm leading-none text-black",
          clickable: false,
        };
      } else if (key == "User Name") {
        return {
          title: key,
          data: data.username,
          classes: "font-bold text-sm leading-none text-black",
          clickable: false,
        };
      } else if (key == "Gender") {
        return {
          title: key,
          data: data.gender,
          classes: "text-sm leading-none text-black",
          clickable: false,
        };
      } else if (key == "User Agent") {
        return {
          title: key,
          data: data.userAgent,
          classes: "text-sm leading-tight text-black",
          clickable: false,
        };
      } else if (key == "Action") {
        return {
          title: key,
          data: "Edit",
          classes:
            "font-medium text-blue-600 dark:text-blue-500 hover:underline",
          clickable: true,
        };
      }
    },
    testClick(event) {
      console.log(event);
    },
    getActivePage(event) {
      console.log(event);
      this.activepPage = event;
      this.getAllUsers(event);
      // let startInd = ((event - 1) * this.itemsPerPage)
      // let endInd = startInd + this.itemsPerPage
      // this.allData = this.allUsersResp.users.slice(startInd, endInd)
    },
    getItemsPerPage(event) {
      this.itemsPerPage = event;
      console.log("items Per Page", this.itemsPerPage);
    },
    searchval(event) {
      console.log("searchValue", event);
      this.search = event;
    },
  },
};
</script>

<style scoped></style>