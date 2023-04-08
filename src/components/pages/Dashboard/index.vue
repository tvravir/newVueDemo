<template>
    <div>
        dashboard
    </div>
</template>

<script>
// import exios from 'exios';
// import axios from 'axios';
export default {
    name: 'dashboard-page',
    data() {
        return {
            // allPosts: []
        }
    },
    mounted() {
        // this.getAllPosts()
    },
    methods: {
        // async getAllPosts() {
        //     // console.log(exios);
        //     if (!localStorage.getItem('all-posts')) {
        //         let responce = await axios.get('https://jsonplaceholder.typicode.com/posts')
        //         if (responce && responce.status == 200) {
        //             console.log(responce.data);
        //             this.allPosts = responce.data
        //             localStorage.setItem('all-posts', JSON.stringify(this.allPosts))
        //         }
        //     } else {
        //         this.allPosts = JSON.parse(localStorage.getItem('all-posts'))
        //     }
        // }
    }

}
</script>

<style scoped></style>