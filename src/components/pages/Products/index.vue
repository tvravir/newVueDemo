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
          @click="generateReport">
          Download PDF
        </button>
      </div>
      <!-- <Header /> -->
      <!-- <img src="public/assets/wallapper/wal1.jpg" alt=""> -->
      <div class="bg-white">
        <div class="xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 grid bg-white">
          <div class="shadow-md rounded-lg bg-white flex flex-col overflow-hidden border" v-for="post in allPosts"
            :key="post.id">
            <div class="w-full h-44">
              <img :src="post.thumbnail" alt="" class="h-full w-full object-cover">
            </div>
            <div class="px-3 py-4 bg-white">
              <div>
                <h2 class="truncate text-[14px] leading-[20px] font-semibold pb-2" :title="post.title">
                  {{ post.title }}
                </h2>
                <h2 class="text-[20px] leading-[24px] h-[35px] truncate font-bold pb-2" :title="post.price">
                  ${{ post.price }}
                </h2>
              </div>
              <p class=" h-[63px] min-h-[63px] mb-4 overflow-hidden text-ellipsis line-clamp-3 pb-4 product-desc"
                style=" font-size:12px; line-height: 19px;">
                {{ post.description }}
              </p>
              <div class="mt-auto flex flex-wrap">
                <router-link :to='`/products/${post.id}`'
                  class="pointer-events-auto rounded-md px-3  text-[0.8125rem] font-semibold leading-5 text-indigo-600 border m-0.5 items-center h-[40.25px] text-center grid">
                  Details
                </router-link>
                <button @click="openProductModal(post)"
                  class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-indigo-600 border m-0.5 items-center flex justify-center "
                  style="display: flex;align-items: center;justify-content: center;">
                  <span class="m-auto">
                    Edit Product
                  </span>
                </button>
                <button @click="openDeleteModal(post)"
                  class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-red-600 border m-0.5 items-center flex justify-center "
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
      <VueHtml2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="500" :pdf-quality="2" :manual-pagination="true" class="product-pdf"
        pdf-orientation="landscape" pdf-content-width="100%" :html-to-pdf-options="htmlToPdfOptions" ref="html2Pdf">
        <!-- <vueHtml2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" filename="nightprogrammerpdf" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" pdf-orientation="portrait" pdf-content-width="800px" ref="html2Pdf"> -->
        <template v-slot:pdf-content>
          <div class="bg-white">
            <div class="xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 grid bg-white">
              <div class="shadow-md rounded-lg bg-white flex flex-col overflow-hidden border" v-for="post in allPosts"
                :key="post.id">
                <div class="w-full h-44">
                  <img :src="post.thumbnail" alt="" class="h-full w-full object-cover">
                </div>
                <div class="px-3 py-4 bg-white">
                  <div>
                    <h2 class="truncate text-[14px] leading-[20px] font-semibold pb-2" :title="post.title">
                      {{ post.title }}
                    </h2>
                    <h2 class="text-[20px] leading-[24px] h-[35px] truncate font-bold pb-2" :title="post.price">
                      ${{ post.price }}
                    </h2>
                  </div>
                  <p class=" h-[63px] min-h-[63px] mb-4 overflow-hidden text-ellipsis line-clamp-3 pb-4 product-desc"
                    style=" font-size:12px; line-height: 19px;">
                    {{ post.description }}
                  </p>
                  <!-- <div class="border font-semibold"
                    style="font-size: 13px;padding: 8px 12px;border-radius: 6px;display: block;vertical-align: middle; ">
                    detail
                  </div> -->
                  <div class="mt-auto flex flex-wrap">
                    <router-link :to='`/products/${post.id}`' class="m-0.5 text-indigo-600 product-btn border">
                      Details

                    </router-link>
                    <button @click="openProductModal(post)"
                      class="rounded-md font-semibold  text-indigo-600 border m-0.5 product-btn px-2">
                      Edit Product

                    </button>
                    <button @click="openDeleteModal(post)"
                      class="pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold text-red-600 border m-0.5 product-btn">
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
        </template>
      </VueHtml2pdf>

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
// import VueHtml2pdf from 'vue-html2pdf'
import VueHtml2pdf from 'vue3-html2pdf'
// import Dashboard from '@/components/pages/Dashboard/index.vue'
// import { jsPDF } from "jspdf";


// import html2canvas from 'html2canvas'

export default {
  name: 'posts-page',
  components: {
    Pagination,
    productModal,
    DeleteProductModal,
    VueHtml2pdf,
    // Dashboard
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
      downloadPdfLoader: false,
      htmlToPdfOptions: {
        margin: [0.3, 0.3, 0.3, 0.3],
        filename: `${Math.round(+new Date() / 1000)}.pdf`,
        image: {
          type: 'jpeg',
          quality: 2
        },
        enableLinks: false,
        html2canvas: {
          scale: 1,
          useCORS: true,
          // windowWidth: 800,
          allowTaint: true
        },
        jsPDF: {
          unit: 'in',
          format: 'a3',
          // format: 'letter',
          orientation: 'portrait',
          putOnlyUsedFonts: true,
          align: 'center',
          // floatPrecision: 16,
        }
      },
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
    async beforeDownload({ html2pdf, options, pdfContent }) {
      console.log(html2pdf, options, pdfContent);
      // await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
      //   const totalPages = pdf.internal.getNumberOfPages()
      //   for (let i = 1; i <= totalPages; i++) {
      //     pdf.setPage(i)
      //     pdf.setFontSize(10)
      //     pdf.setTextColor(150)
      //     pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
      //   }
      // }).save()
      // console.log('page number Set');
    },
    // async downloadPdf() {
    //   this.downloadPdfLoader = true

    //   window.html2canvas = html2canvas
    //   await html2pdf(document.getElementById("pdf-content"), {
    //     filename: "a4.pdf",
    //     image: {
    //       type: 'jpeg',
    //       quality: 1
    //     },
    //     enableLinks: false,
    //     html2canvas: {
    //       useCORS: true,
    //       // enableLinks: true

    //     },
    //     jsPDF: {
    //       unit: 'in',
    //       format: 'a4',
    //       orientation: 'portrait',
    //       floatPrecision: 16,
    //       // scale: 0.32
    //     }

    //   });
    //   this.downloadPdfLoader = false

    //   // const doc = new jsPDF("p", "px", "a4", true,)

    //   // const html = document.getElementById('pdf-content');
    //   // let that = this
    //   // console.log(html);
    //   // doc.html(html, {
    //   //   callback: function (doc) {
    //   //     that.downloadPdfLoader = false
    //   //     doc.save("a4.pdf");
    //   //   },
    //   //   autoPaging: true,
    //   //   x: 10,
    //   //   y: 10,
    //   //   putOnlyUsedFonts: true,
    //   //   textAlign: 'center',
    //   //   html2canvas: {
    //   //     // removeContainer: true,
    //   //     scale: 0.33,
    //   //     windowWidth: 2480,
    //   //     align: "center"
    //   //   },
    //   //   // width: 2480
    //   // });




    // },
    hasStartedGeneration(event) {

      console.log(event);
    },
    hasGenerated(event) {
      console.log(event);
    },
    onProgress(event) {
      console.log(event);
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
      console.log('pdf Generated');
    },
  }
}
</script>

<style>
/* .vue-html2pdf.product-pdf .product-desc {
  height: 80px !important;
  min-height: 80px !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 19px;
}

.product-btn {
  display: flex;
  align-items: center;
  justify-content: center;
} */
.product-btn {
  display: inline-block;
  /* padding: 0 0.75rem 0.375rem 0.75rem; */
  padding: 20px;
  padding-top: 6px;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1;
  /* color: #fff; */
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  /* border: 1px solid; */
  border-radius: 6px;
  /* background-color: #0d6efd; */
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-ou
}
</style>