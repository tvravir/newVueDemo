<template>
    <div class="lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 grid">
        <!-- <Header /> -->
        <div class="shadow-sm rounded-lg bg-white px-4 py-5 flex flex-col " v-for="post in allPosts" :key="post.id">
            <h2 class="text-xl">{{ post.title }}</h2>
            <p class="text-sm">{{ post.body }}</p>
            <div class="mt-auto flex">

                <router-link :to='`/posts/${post.id}`'
                    class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 mt-4">
                    goto post
                </router-link>
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
                let responce = await axios.get('https://jsonplaceholder.typicode.com/posts')
                if (responce && responce.status == 200) {
                    console.log(responce.data);
                    this.allPosts = responce.data
                    localStorage.setItem('all-posts', JSON.stringify(this.allPosts))
                }
            } else {
                this.allPosts = JSON.parse(localStorage.getItem('all-posts'))
            }
        }
    }
}
</script>

<style scoped></style>