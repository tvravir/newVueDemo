<template>
  <div>
    <!-- single-post Works {{ route.params }} -->

    <template v-if="!fload">

      <div class='flex items-center mb-6'>
        <router-link to="/posts">
          <img class="cusor-pointer  cursor-pointer"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAfElEQVR4nO2VsQmAMBBFX6lNai3iNII7uKCCrc7gCO5hoWVEiGCnEJOI3oPPlQ8+dxwIwt9JgcrOYChgBAzQxZAaoI8hnYBMpJ+qdwZqoHRIcUfcnqRPZQX0lbjxIF7uiH1UrV2WKycQSuS8oPYhlDjaWzxI7HnsUxAEzmxeDGaO43MEaQAAAABJRU5ErkJggg==">
        </router-link>
        <h1 class="text-3xl font-bold ml-3">Product Detail</h1>
      </div>

      <div class="flex">
        <div class="w-2/5">
          <div class="mb-4 w-full">
            <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide">
              <Slide v-for="(slide, index) in singleProduct.images" :key="slide.id" class="h-full">
                <!-- <div class="carousel__item">{{ slide }}</div> -->
                <div class="carousel__item w-full max-h-60 h-60">
                  <img :src="slide.source" @click="showMultiple(index)" alt=""
                    class="object-contain w-full h-full cursor-pointer" srcset="">
                  <!-- {{ slide }} -->
                </div>
              </Slide>
            </Carousel>
          </div>

          <Carousel id="thumbnails" :items-to-show="3" :wrap-around="true" v-model="currentSlide" ref="carousel">
            <Slide v-for="(slide) in singleProduct.images" :key="slide.id">
              <div class="carousel__item" @click="slideTo(slide.id - 1)">
                <!-- {{ slide }} -->
                <img :src="slide.source" alt="" class="h-11 w-11 cursor-pointer" srcset="">
              </div>
            </Slide>
          </Carousel>
        </div>
        <div class="w-3/5 pl-5">
          <h1 class="text-3xl font-bold mb-0.5">{{ singleProduct.title }}</h1>
          <h1 class="text-xl  mb-0.5"> Price: <span class="font-bold"> ${{ singleProduct.price }}</span>
          </h1>
          <div class="mb-6 flex items-center">

            <star-rating read-only :rating="singleProduct.rating" :star-size="20" active-color="#ffc107"
              text-class="text-xs " :round-start-rating="false" />
          </div>

          <h1 class="text-xl font-bold mb-1"> About This Item: </h1>
          <p class="text-sm text-slate-400">{{ singleProduct.description }}</p>
        </div>
      </div>
      <vue-easy-lightbox escDisabled moveDisabled :visible="visible" :imgs="imgs" :index="index" @hide="handleHide"
        @on-prev="changeImage" @on-next="changeImage"></vue-easy-lightbox>
    </template>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import VueEasyLightbox from 'vue-easy-lightbox';
import StarRating from 'vue-star-rating';
export default {
  name: 'single-post',
  data() {
    return {
      route: '',
      singleProduct: {},
      currentSlide: 0,
      visible: false,
      index: 0,
      imgs: '',
      fload: true
    }
  },
  components: {
    Carousel,
    Slide,
    // Navigation,
    VueEasyLightbox,
    StarRating
  },
  methods: {
    async getSingleProduct(id) {
      // let responce = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      let responce = await axios.get(`https://dummyjson.com/products/${id}`)
      if (responce && responce.status == 200) {
        this.fload = false
        this.singleProduct = responce.data
        let gallery = []
        this.singleProduct.images.forEach((element, index) => {
          let obj = {
            id: index + 1,
            source: element
          }
          gallery.push(obj)
        });
        this.imgs = this.singleProduct.images
        this.singleProduct.images = gallery
        console.log(this.singleProduct)
      }
    },
    slideTo(val) {
      // console.log(val);
      this.currentSlide = val
    },
    showMultiple(ind) {
      this.index = ind // index of imgList
      this.show()
    },
    show() {
      this.visible = true
    },
    handleHide() {

      this.visible = false
    },
    changeImage(oldInd, newInd) {

      // console.log("old Index", oldInd);
      // console.log('New index', newInd);
      // changeImage
      this.currentSlide = (newInd)
    }
  },
  mounted() {
    // let param = useRoute().params
    this.route = useRoute()
    // console.log(this.route);
    this.getSingleProduct(this.route.params.id)
  }

}
</script>

<style scoped></style>