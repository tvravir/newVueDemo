<template>
  <div>
    <!-- single-post Works {{ route.params }} -->

    <template v-if="!fload">

      <div class='flex items-center mb-6'>
        <router-link to="/products">
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
      <div class="mt-8 pb-8 w-full">
        <h1 class="text-3xl font-bold mb-4">Related Products</h1>

        <Carousel id="related-product" class="pb-2" v-bind="settings" :breakpoints="breakpoints">
          <Slide v-for="(slide) in relatedProducts" :key="slide.id">
            <!-- <div class="carousel__item">
                {{ slide }}
  
              </div> -->
            <div class="carousel__item w-full mb-2">
              <div class="shadow-md rounded-lg bg-white flex flex-col overflow-hidden mx-4 ">
                <div class="w-full h-44">
                  <img :src="slide.thumbnail" alt="" class="h-full w-full object-cover">
                </div>
                <div class="px-3 py-4">
                  <div>
                    <h2 class="truncate text-md font-semibold text-left" :title="slide.title">{{ slide.title }}</h2>
                    <h2 class="text-xl truncate font-bold text-left" :title="slide.price">${{ slide.price }}</h2>
                  </div>
                  <p class=" h-[3rem] min-h-[3rem] mb-4 overflow-hidden text-ellipsis line-clamp-3 text-xs text-left">
                    {{ slide.description }}
                  </p>
                  <div class="mt-auto flex">
                    <router-link :to='`/products/${slide.id}`'
                      class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-indigo-600">
                      Details
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </Carousel>

      </div>
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
  name: 'single-product',
  data() {
    return {
      route: '',
      singleProduct: {},
      currentSlide: 0,
      visible: false,
      index: 0,
      imgs: '',
      fload: true,
      allProducts: [],
      relatedProducts: [],
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: 'center',
        },
        // 1024 and up
        1024: {
          itemsToShow: 4,
          snapAlign: 'start',
        },
      },

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
    getSingleProduct(id) {
      if (!id) return
      // let responce = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      axios.get(`products/${id}`)
        .then(responce => {
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
            // this.getAllProducts();
            this.getRelatedProducts(this.singleProduct.category);
            this.imgs = this.singleProduct.images
            this.singleProduct.images = gallery
            // console.log(this.singleProduct)
          }
        })
        .catch((err) => {
          console.log(err);
        })
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
    },
    getAllProducts() {
      axios.get('products').then((res) => {
        if (res && res.status == 200) {
          this.allProducts = res.data
          // this.getRelatedProducts(this.allProducts, this.singleProduct.category)
        }
      })
      // this.allProducts = []
    },
    getRelatedProducts(cat) {
      if (!cat) return;
      axios.get(`https://dummyjson.com/products/category/${cat}`)
        .then((res) => {
          if (res && res.status == 200) {
            this.relatedProducts = res.data.products
            this.relatedProducts.splice(this.relatedProducts.findIndex(e => e.id === this.singleProduct.id), 1)

            console.log(this.relatedProducts);
            // console.log(this.relatedProducts.findIndex(e => e.id === this.singleProduct.id))
          }
        })
        .catch((err) => {
          console.log(err);
        })

      // console.log(cat);
      // console.log('all products', data.products);
      // this.relatedProducts = data.products.filter(f => f.category == cat)

      // console.log('related Products', this.relatedProducts);

    }
  },
  mat: {
    route(newVal) {
      console.log("new Val", newVal);

    }
  },
  mounted() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
        console.log(toParams, previousParams);
        this.fload = true
        this.getSingleProduct(toParams.id)
      }
    )
    // let param = useRoute().params
    this.route = useRoute()
    // console.log(this.toute);
    // console.log(this.toute);
    // console.log(this.route);
    this.getSingleProduct(this.route.params.id)
  },
  unmounted() {

  }

}
</script>

<style scoped></style>