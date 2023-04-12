<template>
  <div>
    <!-- <div class="">

    </div> -->
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
    <VueAwesomePaginate :total-items="allPostsResp.total" :items-per-page="10" :max-pages-shown="5" v-model="currentPage"
      :on-click="onClickHandler" />
  </div>
</template>

<script>
import axios from 'axios';
import { VueAwesomePaginate } from 'vue-awesome-paginate';
export default {
  name: 'posts-page',
  components: {
    VueAwesomePaginate
  },
  data() {
    return {
      allPostsResp: {
      },
      allPosts: [],
      beforeFilterAllPosts: [],
      allCategories: [],
      currentPage: 1
    }
  },
  mounted() {
    this.getAllPosts()
  },
  methods: {
    getAllPosts(page = 1) {
      console.log(page);
      // console.log(exios);
      // if (!localStorage.getItem('all-posts')) {
      // let responce = await axios.get('https://jsonplaceholder.typicode.com/posts')
      // let apiUrl =
      axios.get('https://dummyjson.com/products?limit=10')
        .then((responce) => {
          if (responce && responce.status == 200) {
            console.log(responce.data);
            this.allPostsResp = responce.data
            this.allPosts = responce.data.products
            localStorage.setItem('all-posts', JSON.stringify(this.allPosts))
            this.getAllCategory();
            this.beforeFilterAllPosts = this.allPosts
          }
        })
        .catch((err) => {
          console.log(err);
        })
      // } else {
      //   this.allPosts = JSON.parse(localStorage.getItem('all-posts'))
      //   this.beforeFilterAllPosts = this.allPosts
      //   console.log(this.allPosts);
      //   this.getAllCategory();
      // }
    },
    getAllCategory() {
      this.allPosts.forEach((e) => {
        if (this.allCategories.indexOf(e.category) == -1) {
          this.allCategories.push(e.category)
        }
      })
      console.log(this.allCategories);
    },
    onClickHandler(page) {
      console.log(page);
    }
  }
}
</script>

<style >
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>