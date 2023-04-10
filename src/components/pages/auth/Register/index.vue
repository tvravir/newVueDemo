<template>
  <div class="h-full w-full flex items-center justify-center bg-slate-50">
    <div class="min-w-[400px] w-24 p-6 rounded-2xl shadow-md bg-white">
      <form @submit="submitForm">
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
            Register
          </h2>
        </div>
        <h2 class="text-[7px] text-slate-400 mb-8">
          Fill The Form to get Register
        </h2>
        <div class="mb-4">
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="name">
            User Name
          </label>
          <input type="text" v-model.trim="registerFormdata.name" required
            class="focus:outline-none border rounded-md w-full h-10 px-2  text-[0.91rem]"
            :class="(errordata && errordata.name) && 'border-red-700'" id="name" placeholder="name">
          <p class="text-red-700 text-[0.8125rem]" v-if="errordata && errordata.name">
            {{ errordata.name }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="email">
            Email</label>
          <input type="email" v-model.trim="registerFormdata.email"
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" required id="email"
            placeholder="Email">
          <p class="text-red-700 text-[0.8125rem]" v-if="errordata && errordata.email">{{ errordata.email }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5" for="password"> Password</label>
          <input type="password" id="password" v-model="registerFormdata.password"
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" required
            placeholder="Password">
          <p class="text-red-700 text-[0.8125rem]" v-if="errordata && errordata.password">{{ errordata.password }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5" for="confirm-password"> Password</label>
          <input type="password" id="confirm-password" v-model="registerFormdata.confirmPassword"
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" required
            placeholder="Confirm password">
          <p class="text-red-700 text-[0.8125rem]" v-if="errordata && errordata.confirmPassword">
            {{ errordata.confirmPassword }}
          </p>
        </div>
        <div class="mb-8">
          <button
            class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 w-full">
            sign up
          </button>
        </div>
        <p class="text-[7px] text-slate-400 mb-8">Already have account?
          <router-link to="/login" class="text-indigo-600">
            Login
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>

import router from '../../../../app-routes';
export default {
  name: 'register-page',
  data() {
    return {
      registerFormdata: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      userList: [],
      errordata: {}

    }
  },
  created() {
    this.getLocalStorageData()
  },

  methods: {
    getLocalStorageData() {
      if (JSON.parse(localStorage.getItem('userList'))) {
        this.userList = JSON.parse(localStorage.getItem('userList'));
      } else {
        this.setLocalStorageData()
      }
    },

    setLocalStorageData() {
      localStorage.setItem('userList', JSON.stringify(this.userList));
    },
    submitForm(event) {
      event.preventDefault();
      if (this.validateForm()) {
        this.userList.push(this.registerFormdata)
        this.setLocalStorageData();
        router.push({ path: '/login' })
      }
    },
    validateForm() {
      // if (this.registerFormdata.name == '') {
      //     this.errordata.name = 'Please enter name.';
      //     return false;
      // } else {
      //     this.errordata = {};
      // }
      // if (this.registerFormdata.email == '') {
      //     this.errordata.email = 'Please enter Email.'
      //     return false;
      // } else {
      //     this.errordata = {};
      // }
      // if (this.registerFormdata.password == '') {
      //     this.errordata.password = 'Please enter password.'
      //     return false;
      // } else {
      //     this.errordata = {};
      // }
      // let reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // console.log(reg.test(this.errordata.email));
      // if (reg.test(this.errordata.email) == false) {
      //     this.errordata.email = 'Please enter correct  Email.'
      //     return;
      // } else {
      //     this.errordata = {};
      // }

      // if (this.registerFormdata.confirmPassword == '') {

      //     this.errordata.confirmPassword = 'Please enter Confirm password.'
      //     return false;
      // } else {
      //     this.errordata = {};
      // }
      if (this.registerFormdata.password != this.registerFormdata.confirmPassword) {
        this.errordata.confirmPassword = 'Confirm password not match to Password.'
        // this.errordata.password = 'Password and confirm password not match'
        return false;
      } else {
        this.errordata = {};
      }
      if (this.userList.length > 0) {
        if (this.userList.filter(data => data.email == this.registerFormdata.email).length != 0) {
          this.errordata.email = 'this email is already exist.'
          return false;
        } else {
          this.errordata = {};
        }
      }
      return true;
    }
  }
}
</script>

<style scoped></style>