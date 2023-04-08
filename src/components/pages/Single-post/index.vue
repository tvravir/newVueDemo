<template>
    <div>
        <!-- single-post Works {{ route.params }} -->
        <router-link to="/posts">
            <img class="cusor-pointer mb-4 cursor-pointer"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3WS28SURgGYJImdGUXrRVITB2GmaFcinbRn6Ybo+7ZNcEE0JUUhp5yOzBgvfyIoqQmlDLYMLfDcHTh0uQzVAPDtCYu5qiLvsm7mc2T+ebLOePz3eSfBcEKXyHiX7GETn9VRGZLQAZEkP6YKRZHPb9YMbBYMUE8MmGG8kh/yuzNonVTidYskKomONFwWd/zHIthS9luEIjWLXCiAjK6QsFe8wyLI/DHmgTHmwRimIATFatGVypqtz3FkoqNE60JxGd1ojWrKzW9xto2TrZtSCo2LKEN4i22vt9fE8qqlno9hZ2ODW40hsm37YZFo3WLSjWTSlWTipVfPTKpgAwaOTRopKxTXtZpuKRTrqhRrqDRrcKYbL3SHs2xjZefbknlkXn/zRRSx1P4HXrdN3Vvb+TQgEhZB17WIVzSgStqwB1ocK8w/jgHpeLwbPcdhQdvKTBDC+PeAiwNz3bffwGm6IEDnI00ij6bLFGuqC1GOkdldZzqTCDVIbDTJpBULEi0Lvs92SZfE+0JTSgTGm8SGpsVW/RPFomXNcLLxsOrq/qs519Pn+CNdBeu9uR0M90L+lgc1oHMAAeeD8DdO5nB6WZGZYMGs+c4mB2Cu4HsORtU2O+vhnJDJZRT4Zp+mB0UbNC8qoTyI3A3mLvw9npaGm9excvY6ImPZYTL8aqtn5jK9hdjHgQrd19cCIsHN/lP8gNNh6M1joVbEAAAAABJRU5ErkJggg==">
        </router-link>
        <h1 class="text-3xl font-bold mb-3">{{ singlePost.title }}</h1>
        <p class="text-xl">{{ singlePost.body }}</p>

    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
export default {
    name: 'single-post',
    data() {
        return {
            route: '',
            singlePost: {}
        }
    },
    methods: {
        async getSinglePost(id) {
            let responce = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            if (responce && responce.status == 200) {
                this.singlePost = responce.data
                console.log(responce)
            }
        }
    },
    mounted() {
        // let param = useRoute().params
        this.route = useRoute()
        // console.log(this.route);
        this.getSinglePost(this.route.params.id)
    }

}
</script>

<style scoped></style>