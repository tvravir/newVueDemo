<template>
  <VueFinalModal classes="flex justify-center items-center "
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-50 border dark:border-gray-100 rounded-lg space-y-2 min-w-[300px] w-full pb-6"
    @update:model-value="val => { $emit('update:modelValue', val); loader = false }">
    <h1 class="text-2xl font-bold mb-4 ">
      {{ title }}
    </h1>
    <slot />
    <div class="flex items-center justify-end mt-[15px_!important]">
      <button @click="$emit('cancle')"
        class="mt-1 border mr-2 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-gray-500">
        Cancel
      </button>
      <button @click="$emit('confirm'); loader = true;" :disabled="loader"
        class="mt-1 border pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 bg-red-600 text-white border-red-600 disabled:bg-slate-400 disabled:border-slate-400">
        Confirm
      </button>
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';
export default {
  name: "delete-product",
  components: {
    VueFinalModal
  },
  props: {
    title: {
      type: String
    },
  },
  updated() {
    this.loader = false
    // console.log(this.loader);
  },
  data() {
    return {
      loader: false
    }
  },
  emits: ['confirm', 'update:modelValue', 'cancle'],
}
</script>

<style scoped></style>