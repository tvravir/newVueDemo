<template>
  <div>
    <!-- <div v-if="fload" class="h-full w-full">

    </div> -->
    <div class="" v-if="!fload">
      <div class="flex mt-2 mb-6">
        <button
          class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5  text-white bg-indigo-600 ml-auto hover:opacity-90 items-center flex justify-center"
          @click="openProductModal(null)">
          Add Product
        </button>
        <button :disabled="downloadPdfLoader"
          class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5  text-white bg-indigo-600 ml-2 hover:opacity-90 disabled:bg-slate-400 disabled:border-slate-400 items-center flex justify-center"
          @click="downloadPdf">
          download
        </button>
      </div>
      <!-- <Header /> -->
      <!-- <img src="public/assets/wallapper/wal1.jpg" alt=""> -->
      <!-- <VueHtml2pdf> -->
      <div id="pdf-content" class="bg-white">
        <div class="xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 grid bg-white">
          <div class="shadow-md rounded-lg bg-white flex flex-col overflow-hidden border" v-for="post in allPosts"
            :key="post.id">
            <div class="w-full h-44">
              <img :src="post.thumbnail" alt="" class="h-full w-full object-cover">
            </div>
            <div class="px-3 py-4 bg-white">
              <div>
                <h2 class="truncate text-[14px] leading-[20px] font-semibold pb-2" :title="post.title">{{ post.title }}
                </h2>
                <h2 class="text-[20px] leading-[24px] h-[35px] truncate font-bold pb-2" :title="post.price">
                  ${{ post.price }}
                </h2>
              </div>
              <p class=" h-[58px] min-h-[58px] mb-4 overflow-hidden text-ellipsis line-clamp-3 pb-4"
                style=" font-size:12px; line-height: 19px;">
                {{ post.description }}
              </p>
              <div class="mt-auto flex flex-wrap">
                <router-link :to='`/products/${post.id}`'
                  class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-indigo-600 border m-0.5 items-center flex justify-center"
                  style="display: flex;align-items: center;justify-content: center;">
                  Details
                </router-link>
                <button @click="openProductModal(post)"
                  class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-indigo-600 border m-0.5 items-center flex justify-center"
                  style="display: flex;align-items: center;justify-content: center;">
                  Edit Product
                </button>
                <button @click="openDeleteModal(post)"
                  class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-red-600 border m-0.5 items-center flex justify-center"
                  style="display: flex;align-items: center;justify-content: center;">
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 mb-4 flex justify-center" :class="postLoader && 'opacity-70 pointer-events-none'">
          <Pagination :totalPages="allPostsResp.total / 10" :perPage="10" :maxVisibleButtons="5"
            :currentPage="currentPage" @pagechanged="onPageChange" />
        </div>
      </div>
      <!-- </VueHtml2pdf> -->
      <productModal v-model="addProductModal" :title="modalTitle" :productDetails="editModalDetail"
        @cancle="addProductModal = false" @confirm="submitModal" />
      <DeleteProductModal v-model="deleteModal" title="Delte Product" @confirm="submitDelteModal"
        @cancle="deleteModal = false">
        Are You really Want to delete this product?
      </DeleteProductModal>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import productModal from '../modal/productModal.vue';
import Pagination from '../common/pagination'
import DeleteProductModal from '../modal/deleteProductModal.vue'
// import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";


import html2canvas from 'html2canvas'

export default {
  name: 'posts-page',
  components: {
    Pagination,
    productModal,
    DeleteProductModal,
  },
  data() {
    return {
      allPostsResp: {
      },
      allPosts: [],
      beforeFilterAllPosts: [],
      allCategories: [],
      currentPage: 1,
      postLoader: false,
      fload: true,
      addProductModal: false,
      deleteModal: false,
      modalTitle: '',
      editModalDetail: null,
      downloadPdfLoader: false
    }
  },
  mounted() {
    this.getAllProducts()
  },
  methods: {
    getAllProducts(page = 1) {
      // console.log(page);
      this.postLoader = true

      // let responce = await axios.get('https://jsonplaceholder.typicode.com/posts')
      let apiUrl = page > 1 ? `products?limit=10&skip=${(page - 1) * 10}` : `products?limit=10`;
      axios.get(apiUrl)
        .then((responce) => {
          this.fload = false
          this.postLoader = false
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
          this.postLoader = false
          console.log(err);
        })

    },
    getAllCategory() {
      this.allPosts.forEach((e) => {
        if (this.allCategories.indexOf(e.category) == -1) {
          this.allCategories.push(e.category)
        }
      })
      console.log(this.allCategories);
      let filterdData = []
      this.allCategories.forEach((e) => {
        let obj = {
          title: e,
          data: this.allPosts.filter(f => f.category == e)
        }
        filterdData.push(obj)
      })
      console.log('Filterd array of product', filterdData);
    },
    onPageChange(page) {
      // console.log(page)
      this.currentPage = page;
      this.getAllProducts(this.currentPage)
    },
    openProductModal(editDetail = null) {
      // console.log(editDetail);
      this.editModalDetail = editDetail
      this.addProductModal = true
      this.modalTitle = editDetail ? 'Update product' : "Add product"
      // this.$modal.show(
      //   productModal
      // )
      // useModal({
      //   component: productModal
      // })


    },
    submitModal(event) {
      if (event) {
        this.fload = true;
        this.$nextTick(() => {
          this.fload = false;
        });
        console.log(event);
        this.addProductModal = false
        let ind = this.allPosts.findIndex(e => e.id == event.id)
        this.allPosts[ind] = event

        // this.allPosts.spli ce(ind, 1, event)
        console.log(this.allPosts);
      }

      // if (event.type == 'add') {
      //   this.addProduct(event.formData)
      // } else if (event.type == 'update') {
      //   this.updateProduct(event.formData)
      // }


    },
    addProduct(formData) {
      console.log('add', formData);
    },
    updateProduct(formdata) {
      console.log('update', formdata);
    },
    submitDelteModal() {
      axios.delete(`products/${this.selecteddeleteModal.id}`)
        .then((response) => {
          if (response && response.status == 200) {
            this.deleteModal = false
            this.allPosts.splice(this.allPosts.findIndex(e => e.id == this.selecteddeleteModal.id), 1)
          }
        })
    }, openDeleteModal(product) {
      this.selecteddeleteModal = product
      this.deleteModal = true
    },
    async downloadPdf() {
      this.downloadPdfLoader = true

      window.html2canvas = html2canvas
      // await html2pdf(document.getElementById("pdf-content"), {
      //   filename: "a4.pdf",
      //   image: {
      //     type: 'jpeg',
      //     quality: 1
      //   },
      //   enableLinks: false,
      //   html2canvas: {
      //     useCORS: true,
      //     // enableLinks: true

      //   },
      //   jsPDF: {
      //     unit: 'in',
      //     format: 'a4',
      //     orientation: 'portrait',
      //     floatPrecision: 16,
      //     // scale: 0.32
      //   }

      // });
      // this.downloadPdfLoader = false

      const doc = new jsPDF("p", "px", "a4", true,)

      const html = document.getElementById('pdf-content');
      let that = this
      console.log(html);
      doc.html(html, {
        callback: function (doc) {
          that.downloadPdfLoader = false
          doc.save("a4.pdf");
        },
        autoPaging: true,
        x: 10,
        y: 10,
        putOnlyUsedFonts: true,
        textAlign: 'center',
        html2canvas: {
          // removeContainer: true,
          scale: 0.33,
          windowWidth: 2480,
          align: "center"
        },
        width: 2480
      });

    },
    hasStartedGeneration(event) {

      console.log(event);
    },
    hasGenerated(event) {
      console.log(event);
    },
    onProgress(event) {
      console.log(event);
    }
  }
}
</script>

<style  scoped></style>