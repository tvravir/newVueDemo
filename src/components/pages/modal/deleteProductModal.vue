<template>
  <VueFinalModal classes="flex justify-center items-center "
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-50 border dark:border-gray-100 rounded-lg space-y-2 min-w-[300px] w-full pb-6"
    @update:model-value="val => $emit('update:modelValue', val)">
    <h1 class="text-2xl font-bold mb-4 ">
      {{ title }}
    </h1>
    <slot />
    <div class="flex items-center justify-end mt-[15px_!important]">
      <button @click="$emit('confirm')"
        class="mt-1 border pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 bg-indigo-600 text-white border-indigo-600">
        <!-- @click="$emit('confirm', eventTitle)"> -->
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
  emits: ['confirm', 'update:modelValue',],
}
</script>

<style scoped></style>