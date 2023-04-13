<template>
  <VueFinalModal classes="flex justify-center items-center "
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-50 border dark:border-gray-100 rounded-lg space-y-2 min-w-[300px] w-full pb-6"
    @update:model-value="val => $emit('update:modelValue', val)">
    <h1 class="text-2xl font-bold mb-4 ">
      {{ getProductDetail ? 'Update' : title }}
    </h1>
    <form @submit.prevent="submitevent">
      <div>
        <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="title">
          Product Title</label>
        <input type="text" v-model.trim="productForm.title" required
          class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="title"
          placeholder="Product title">
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
  emits: ['confirm', 'update:modelValue',],
  computed: {
    getProductDetail() {
      if (this.productDetails && this.productDetails != null) {
        console.log('productDetail', this.productDetails);
        console.log("in Compoted true");

        return true
      } else {
        console.log("in Compted false");
        return false
      }
      // this.isUpdate = false
    }
  },
  methods: {
    submitevent() {
      if (this.getProductDetail) {
        console.log("edit api");
        this.editProduct()
      } else {
        console.log("add api");

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
    }
  },
  watch: {
    productDetails(newVal, oldValue) {
      console.log("check Update", this.getProductDetail);
      console.log("check Update", oldValue);
      if (newVal) {
        this.productForm.title = newVal.title
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