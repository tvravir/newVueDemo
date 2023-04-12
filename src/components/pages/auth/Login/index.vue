<template>
  <div class="h-full w-full flex items-center justify-center bg-slate-50">
    <div class="min-w-[400px] w-24 p-6 rounded-2xl shadow-md bg-white">
      <form @submit.prevent="submitForm">
        <div class="flex items-center mb-2">
          <div class="h-8 w-8 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48"
              class=" h-full w-full">
              <path fill="#42a5f5"
                d="M2.141 34l3.771 6.519.001.001C6.656 41.991 8.18 43 9.94 43l.003 0 0 0h25.03l-5.194-9H2.141zM45.859 34.341c0-.872-.257-1.683-.697-2.364L30.977 7.319C30.245 5.94 28.794 5 27.124 5h-7.496l21.91 37.962 3.454-5.982C45.673 35.835 45.859 35.328 45.859 34.341zM25.838 28L16.045 11.038 6.252 28z">
              </path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-900">
            LogIn
          </h2>
        </div>
        <h2 class="text-[7px] text-slate-400 mb-8">
          Welcome, Login to your accout
        </h2>
        <div class="text-red-800 bg-red-200 border border-red-800 py-2 px-3 mb-4 animate-pulse duration-100"
          v-if="errordata && errordata.message">
          {{ errordata.message }}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="userName">
            User Name</label>
          <input type="text" v-model.trim="loginFormdata.email"
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="userName"
            @keypress="errordata = {}" placeholder="User name" required>
          <p class="text-red-700 text-[0.8125rem]" v-if="errordata && errordata.email">
            {{ errordata.email }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="password">
            Password</label>
          <input type="password" v-model="loginFormdata.password" required @keypress="errordata = {}"
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="password"
            placeholder="Password">
          <p class="text-red-700 text-[0.8125rem]" v-if="errordata && errordata.password">
            {{ errordata.password }}
          </p>
        </div>
        <div class="mb-8">
          <button :disabled="loader"
            class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 w-full disabled:bg-slate-400 ">
            login
          </button>
        </div>
        <p class="text-[7px] text-slate-400 mb-8">Don't have account?
          <router-link to="/register" class="text-indigo-600">
            Signup
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../../../../app-routes';
import axios from 'axios';
export default {
  name: 'login-page',
  data() {
    return {
      loginFormdata: {
        email: '',
        password: '',
      },
      // userList: [],
      errordata: {},
      loader: false

    }
  },
  created() {
    // this.getLocalStorageData()
  },
  methods: {
    // getLocalStorageData() {
    //   if (JSON.parse(localStorage.getItem('userList'))) {
    //     this.userList = JSON.parse(localStorage.getItem('userList'));
    //   } else {
    //     this.setLocalStorageData()
    //   }
    // },

    // setLocalStorageData() {
    //   localStorage.setItem('userList', JSON.stringify(this.userList));
    // },
    submitForm() {
      // event.preventDefault();
      // if (this.loginFormdata.email == '') {
      //     this.errordata.email = 'Please enter Email.'
      //     return;
      // } else {
      //     this.errordata = {};
      // }
      // if (this.loginFormdata.password == '') {
      //     this.errordata.password = 'Please enter password.'
      //     return;
      // } else {
      //     this.errordata = {};
      // }


      // if (this.userList.length > 0) {
      //   // if (this.userList.filter(data => data.email == this.loginFormdata.email).length != 0) {
      //   //     this.errordata.email = 'this email is already exist.'
      //   //     return;
      //   // } else {
      //   //     this.errordata = {};
      //   // }
      //   // this.userList.forEach((element) => {

      //   //     if (element.email == this.loginFormdata.email && element.password == this.loginFormdata.password) {
      //   //         localStorage.setItem('currentuser', JSON.stringify(element))
      //   //     }
      //   // })
      //   let obj = this.userList.find(o =>
      //     (o.email === this.loginFormdata.email) && (o.password === this.loginFormdata.password)
      //   );
      //   // console.log(obj);
      //   if (obj) {
      //     localStorage.setItem('currentuser', JSON.stringify(obj))
      //     this.errordata = {};
      //     router.push({ path: '/' })

      //   } else {
      //     this.errordata.somwthingWrong = 'Wrong email or password.';
      //   }
      // } else {
      //   this.errordata.somwthingWrong = 'Wrong email or password.';
      // }
      // this.userList.push(this.loginFormdata)
      // this.setLocalStorageData();
      let data = {
        // method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username: this.loginFormdata.email,//'kminchelle',
          password: this.loginFormdata.password//'0lelplR',
          // expiresInMins: 60, // optional
        }
      }
      this.loader = true
      axios.post('https://dummyjson.com/auth/login', data.body, data.headers)
        .then((responce) => {
          console.log(responce);
          if (responce && responce.status == 200) {
            localStorage.setItem('currentuser', JSON.stringify(responce.data))
            this.errordata = {};
            router.push({ path: '/' })
            this.loader = false
          }
        })
        .catch(error => {
          this.errordata = error.response.data
          this.loader = false
          // console.error(error)
        })
    }

  }
}
</script>

<style scoped></style>