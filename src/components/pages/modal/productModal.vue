<template>
  <VueFinalModal classes="flex justify-center items-center "
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-50 border dark:border-gray-100 rounded-lg space-y-2 min-w-[300px] w-full pb-6"
    @update:model-value="val => $emit('update:modelValue', val)">
    <h1 class="text-2xl font-bold mb-4 ">
      {{ title }}
    </h1>
    <form @submit.prevent="submitevent">
      <div>
        <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="title">
          Product Title</label>
        <input type="text" v-model.trim="productForm.title" required
          class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="title"
          placeholder="Product title">
      </div>
      <div class="flex items-center justify-end mt-[15px_!important]">
        <button @click="$emit('cancle')" type="button"
          class="mt-1 border mr-2 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-gray-500">
          Cancel
        </button>
        <button @click="$emit('confirm')" type="submit"
          class="mt-1 border pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 bg-indigo-600 text-white border-indigo-600">
          submit
        </button>
      </div>
    </form>
  </VueFinalModal>
</template>

<script>
import axios from 'axios';
import { VueFinalModal } from 'vue-final-modal';
export default {
  name: 'product-modal',
  data() {
    return {
      isUpdate: false,
      productForm: {
        title: ''
      }
    }
  },
  components: {
    VueFinalModal
  },
  props: {
    title: {
      type: String
    },
    productDetails: {
      type: Object,
      required: false
    }
  },
  emits: ['confirm', 'update:modelValue', 'cancle'],
  computed: {
    getProductDetail() {
      if (this.productDetails && this.productDetails != null) {
        // console.log('productDetail', this.productDetails);
        // console.log("in Compoted true");

        return true
      } else {
        // console.log("in Compted false");
        return false
      }
      // this.isUpdate = false
    }
  },
  methods: {
    submitevent() {
      if (this.getProductDetail) {
        // console.log("edit api");
        this.editProduct()
      } else {
        // console.log("add api");
        this.addProduct()
      }

      // this.$emit('confirm')
      // console.log(this.productForm);
    },
    editProduct() {
      let data = {
        title: this.productForm.title
      }
      axios.put(`/products/${this.productDetails.id}`, data).then((resp) => {
        if (resp && resp.status == 200) {
          this.$emit('confirm', resp.data)
        }
      })
    },
    addProduct() {
      let data = {
        title: this.productForm.title
      }
      axios.post(`/products/add`, data).then((resp) => {
        if (resp && resp.status == 200) {
          // console.log(resp);
          this.$emit('confirm', resp.data)
        }
      })
    }
  },
  watch: {
    productDetails(newVal) {
      // console.log("check Update", this.getProductDetail);
      // console.log("check Update", oldValue);
      // console.log(newVal);
      if (newVal) {
        this.productForm.title = newVal.title
      }
      if (!this.getProductDetail) {
        this.productForm.title = ''
      }
    },
    title(newVal) {
      console.log('New Val title ---------------->', newVal);
      // console.log('Old Val', oldVal);
      if (newVal == 'Add product') {
        this.productForm.title = ''
      }
    }
  },
  updated() {
    // if (this.getProductDetail) {
    //   console.log('updateCall');
    // }
    // console.log('unmount Data');
    // this.productForm.title = ''
  }
}
</script>

<style scoped></style>