<template>
  <Header />
  <div class="h-[calc(100%_-_68px)] overflow-y-auto">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <router-view class="fade-in py-4 px-3"></router-view>
    </div>
  </div>
</template>

<script>
import router from '@/app-routes';
import Header from '../Header';
export default {
  name: 'Home-page',
  components: {
    Header
  },
  data() {
    return {
      userData: {}
    }
  },
  created() {
    this.getCurrentuser()
  },
  props: ['currentUser'],
  methods: {
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
      router.push({ path: '/login' });
    }

  }
}
</script>

<style scoped></style>