<template>
  <div>
    <!-- <img :src="logoimage ? logoimage : ''"
      :class="[inventoryType === 'SAQ' ? 'inventory__saq' : 'inventory__ip', 'inventory pl-3 pr-3']" alt="" srcset=""> -->
    <!-- user-list -->
    <!-- <div class="flex items-center justify-end mb-3">
      <input type="search" v-model.trim="search" class="focus:outline-none border rounded-md  h-10 px-2 text-[0.8125rem]"
        id="search" placeholder="Search">
    </div> -->
    <Table :fields="fieldsList" :listData="allData" @clicked="testClick" :tableSettings="{ searchable: true }"
      @activePage="getActivePage" />
  </div>
</template>

<script>
import test from '@/assets/logo.png'
import Table from '@/components/pages/Table/index.vue'
import axios from 'axios'
export default {
  name: 'user-list',
  components: {
    Table
  },
  data() {
    return {
      logoimage: test,
      fieldsList: [{ title: 'No' }, { title: 'User Details' }, { title: 'User Name' }, { title: 'Gender' }, { title: "User Agent" }, { title: "Action" }],// "sdsd"],
      allData: [],
      allUsersResp: {},
      fload: true,
      search: '',
      startInterVal: ''
    }
  },
  methods: {
    getAllUsers() {
      if (!localStorage.getItem('alluserResp')) {
        axios.get('users')
          .then((res) => {
            if (res && res.status == 200) {
              this.fload = false

              this.allUsersResp = res.data
              localStorage.setItem('alluserResp', JSON.stringify(res.data))
              // this.allData = res.data.users
              this.getuserList(res.data.users)
              console.log(this.allUsersResp);
            }
          })
          .catch((err) => {
            this.fload = false
            console.log(err);
          })
      } else {
        let ress = JSON.parse(localStorage.getItem('alluserResp'))
        this.fload = false
        this.allUsersResp = ress
        this.getuserList(ress.users)
      }
    },
    getuserList(data) {
      this.allData = data;
      // console.log(data);
      // this.fieldsList.forEach(e => {
      //   console.log(e);
      // })
      data.forEach((element) => {
        element.fieldList = []
        // element.fieldList = [(ind + 1), (element.firstName + " " + element.maidenName + " " + element.lastName), element.username, element.gender, element.userAgent, 'edit']
        this.fieldsList.forEach(el => {
          let obj = {
            // title: el,
            ...this.getFilter(el.title, element)
          }
          element.fieldList.push(obj)
        });

      });
      // console.log(data);
    },
    getFilter(key, data) {
      if (key == 'No') {
        return {
          title: key,
          data: data.id,
          classes: 'font-bold text-sm leading-none text-black',
          clickable: false,
        }
      }
      else if (key == 'User Details') {
        return {
          title: key,
          data: `<a href='/test'>${(data.firstName + " " + data.maidenName + " " + data.lastName)}</a>`,
          classes: 'font-bold text-sm leading-none text-black',
          clickable: false,
        }
      }
      else if (key == 'User Name') {
        return {
          title: key,
          data: (data.username),
          classes: 'font-bold text-sm leading-none text-black',
          clickable: false,
        }
      }
      else if (key == 'Gender') {
        return {
          title: key,
          data: (data.gender),
          classes: 'text-sm leading-none text-black',
          clickable: false,
        }
      }
      else if (key == 'User Agent') {
        return {
          title: key,
          data: (data.userAgent),
          classes: 'text-sm leading-tight text-black',
          clickable: false,
        }
      }
      else if (key == 'Action') {
        return {
          title: key,
          data: ("Edit"),
          classes: 'font-medium text-blue-600 dark:text-blue-500 hover:underline',
          clickable: true,
        }
      }
      // else if (key == "sdsd") {
      //   return {
      //     title: key,
      //     data: ("test"),
      //     classes: 'font-medium text-blue-600 dark:text-blue-500 hover:underline',
      //     clickable: true,
      //   }
      // }

    },
    testClick(event) {
      console.log(event);
    },
    getActivePage(event) {
      console.log(event);
    }
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
        }, 2000);
      } else {
        this.allData = this.allUsersResp.users
        clearInterval(this.startInterVal)
      }
    }
  },
  mounted() {
    this.getAllUsers()
  },
}
</script>

<style scoped></style>