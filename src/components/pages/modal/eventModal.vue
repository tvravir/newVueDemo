<template>
  <VueFinalModal classes="flex justify-center items-center "
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-50 border dark:border-gray-100 rounded-lg space-y-2 min-w-[300px] w-full "
    @update:model-value="val => $emit('update:modelValue', val)">
    <template v-if="title == 'Delete Event'">
      <h1 class="text-2xl font-bold mb-4 ">
        {{ title }}
      </h1>
      <slot />
      <div class="flex items-center justify-end mt-[25px_!important]">
        <button
          class="mt-1 border mr-2 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 bg-indigo-600 text-white"
          @click="$emit('cancel')">
          close
        </button>
        <button
          class="mt-1 border pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-red-600 border-red-600"
          @click="$emit('confirm')">
          Confirm
        </button>

      </div>
    </template>

    <template v-if="title == 'Create Event'">
      <h1 class="text-2xl font-bold mb-4 ">
        {{ title }}
      </h1>
      <slot />
      <form @submit="$event => { $event.preventDefault(); $emit('confirm', eventTitle); eventTitle = '' }">
        <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="eventTitle">
          Event Title</label>
        <input type="text" v-model.trim="eventTitle" required
          class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="eventTitle"
          placeholder="Event title">
        <div class="flex items-center justify-end mt-[25px_!important]">
          <button type="button"
            class="mt-1 border mr-2 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-gray-500 "
            @click="{ $emit('cancel');eventTitle = '' }">
            close
          </button>
          <button type="submit"
            class="mt-1 border pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 bg-indigo-600 text-white border-indigo-600">
            <!-- @click="$emit('confirm', eventTitle)"> -->
            Confirm
          </button>
        </div>
      </form>
    </template>
    <template v-if="title == 'Update Event'">
      <h1 class="text-2xl font-bold mb-4 ">
        {{ title }}
      </h1>
      <slot />
      <form @submit="submitevent">
        <div>
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="eventTitle">
            Event Title</label>
          <input type="text" v-model.trim="eventTitle" required
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="eventTitle"
            placeholder="Event title">
        </div>
        <div>
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="startdate">
            Start Date</label>
          <input type="date" v-model.trim="start" required
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="startdate"
            placeholder="Event title">
        </div>
        <div>
          <label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="enddate">
            End Date</label>
          <input type="date" v-model.trim="end" required
            class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="enddate"
            placeholder="Event title">
        </div>
        <div class="flex items-center justify-end mt-[25px_!important]">
          <button type="button"
            class="mt-1 border mr-2 pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-gray-500 "
            @click="{ $emit('cancel');eventTitle = '' }">
            close
          </button>
          <button type="submit"
            class="mt-1 border pointer-events-auto rounded-md px-3 py-2 text-[0.8125rem] font-semibold leading-5 bg-indigo-600 text-white border-indigo-600">
            <!-- @click="$emit('confirm', eventTitle)"> -->
            Confirm
          </button>
        </div>
      </form>
    </template>
  </VueFinalModal>
</template>

<script>
// import { formatDate } from '@fullcalendar/core';
import { VueFinalModal } from 'vue-final-modal';

function formatDate(date) {
  var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  if (date) {
    let string = date.toLocaleDateString('ko-KR', options).replace(/\. /g, '-')
    // return string
    return string.substr(0, string.length - 1)
  }
}
export default {
  name: 'deta-page',
  components: {
    VueFinalModal
  },
  // props: ['title', 'selectedEvent'],
  props: {
    title: {
      type: String,
      required: true
    },
    selectedEvent: {
      // type: Object,
      default: null
    }
  },
  emits: ['confirm', 'update:modelValue', 'cancel'],
  mounted() {

  },

  updated() {
    // console.log('Title', this.title);
    if (this.selectedEvent && this.title == 'Update Event') {
      this.eventTitle = this.selectedEvent.title
      this.start = formatDate(this.selectedEvent.start)
      this.end = formatDate(this.selectedEvent.end)
      console.log(this.selectedEvent.end);
    }
    // console.log('sected Event', this.selectedEvent.start);
  },
  unmounted() {
    this.eventTitle = ''
    // if (this.selectedEvent) {
    //   this.selectedEvent = null
    // }
  },
  data() {
    return {
      eventTitle: '',
      end: '',
      start: ''
    }
  },
  methods: {
    submitevent(event) {
      console.log(this.start, this.end);
      // $event => { $event.preventDefault(); $emit('confirm', eventTitle); eventTitle = '' }
      event.preventDefault();
      this.$emit('confirm', { event: this.selectedEvent, title: this.eventTitle, start: this.start, end: this.end })
    }
  }

}
</script>

<style scoped></style>