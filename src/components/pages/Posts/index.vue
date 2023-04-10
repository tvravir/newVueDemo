<template>
  <div>
    <!-- <vue-router></vue-router> -->
    <div class="xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 grid">
      <!-- <Header /> -->
      <div class="shadow-md rounded-lg bg-white flex flex-col overflow-hidden " v-for="post in allPosts" :key="post.id">
        <div class="w-full h-44">
          <img :src="post.thumbnail" alt="" class="h-full w-full object-cover">
        </div>
        <!-- <img src="public/assets/wallapper/wal1.jpg" alt=""> -->
        <div class="px-3 py-4">
          <div>
            <h2 class="truncate text-md font-semibold" :title="post.title">{{ post.title }}</h2>
            <h2 class="text-xl truncate font-bold" :title="post.price">${{ post.price }}</h2>
          </div>
          <p class=" h-[3rem] min-h-[3rem] mb-4 overflow-hidden text-ellipsis line-clamp-3 text-xs">
            {{ post.description }}
          </p>
          <div class="mt-auto flex">
            <router-link :to='`/posts/${post.id}`'
              class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-indigo-600">
              Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'posts-page',
  data() {
    return {
      allPosts: []
    }
  },
  mounted() {
    this.getAllPosts()
  },
  methods: {
    async getAllPosts() {
      // console.log(exios);
      if (!localStorage.getItem('all-posts')) {
        // let responce = await axios.get('https://jsonplaceholder.typicode.com/posts')
        let responce = await axios.get('https://dummyjson.com/products')
        if (responce && responce.status == 200) {
          console.log(responce.data);
          this.allPosts = responce.data.products
          localStorage.setItem('all-posts', JSON.stringify(this.allPosts))
        }
      } else {
        this.allPosts = JSON.parse(localStorage.getItem('all-posts'))
        console.log(this.allPosts);
      }
    }
  }
}
</script>

<style scoped></style>