<template>
  <layout />
</template>

<script>
// import router from './app-routes';

import layout from './components/Layout'

export default {
  name: 'App',
  components: {
    layout
  },
  data() {
    return {
      userList: [],
    }
  },
  created() {
    console.log("created");
    this.getUserList();
    // this.isLoggedIn();
  },
  methods: {
    getUserList() {
      console.log('get userList call')
      if (localStorage.getItem('userList')) {
        this.userList = JSON.parse(localStorage.getItem('userList'))
      } else {
        this.setuserList()
      }

    },
    setuserList() {
      localStorage.setItem('userList', JSON.stringify(this.userList))
    },

    // isLoggedIn() {
    // if (localStorage.getItem('currentuser')) {
    //   router.push({ path: '/', ComponentProps: JSON.parse(localStorage.getItem('currentuser')) })
    // } else {
    //   console.log(router.currentRoute.value.path);
    //   if (router.currentRoute.value.path == '/register') {
    //     router.push({ path: '/register' })
    //   } else {
    //     router.push({ path: '/login' })

    //   }
    // }

    // }
  }

}
</script>

<style>
.fade-in {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
