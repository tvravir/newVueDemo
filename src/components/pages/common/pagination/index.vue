<template>
  <div class="w-full flex justify-between items-center">
    <p> Showing {{ currentPage }} / {{ Math.ceil(totalPages) }} </p>
    <ul class="pagination">
      <li class="pagination-item">
        <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage"
          class="h-10 min-w-[45px] flex items-center text-sm justify-center font-semibold text-indigo-600 border-indigo-600 rounded mx-0.5 border px-2   disabled:border-slate-400 disabled:text-slate-400 disabled:opacity-80 disabled:cursor-not-allowed">
          Previous
        </button>
      </li>
      <li v-for="page in pages" :key="page.name" class="pagination-item">
        <button type="button" @click="onClickPage(page.name)" :class="{ active: isPageActive(page.name) }"
          class="h-10 min-w-[45px] flex items-center text-sm justify-center rounded mx-0.5 border"
          :disabled="page.isDisabled">
          {{ page.name }}
        </button>
      </li>
      <li class="pagination-item">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage"
          class="h-10 min-w-[45px] flex items-center text-sm justify-center font-semibold text-indigo-600 border-indigo-600 rounded mx-0.5 border px-2  disabled:border-slate-400 disabled:text-slate-400 disabled:opacity-80 disabled:cursor-not-allowed">
          Next
        </button>
      </li>

    </ul>
  </div>
</template>

<script>

export default {
  name: 'pagination-component',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }


      // When on the last page
      // if (this.currentPage === this.totalPages) {
      //   return this.totalPages - this.maxVisibleButtons;
      // }

      // When inbetween
      return this.currentPage;

    },
    pages() {
      let startpageLoop

      if ((this.startPage + this.maxVisibleButtons - 1) > this.totalPages) {
        startpageLoop = this.totalPages - (this.maxVisibleButtons - 1)
      } else {
        startpageLoop = this.startPage

      }
      // console.log(this.totalPages);
      // console.log(startpageLoop);
      const range = [];
      for (
        let i = startpageLoop;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {

        if (i > 0) {
          range.push({
            name: Math.ceil(i),
            isDisabled: i === this.currentPage
          });
        }
      }
      // console.log(range);
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },

  },
  watch: {
    // currentPage(newVal) {
    // console.log("new val", newVal);
    // }

  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },

    isPageActive(page) {
      return this.currentPage === page;
    }
  }
}
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4f46e5;
  color: #ffffff;
}
</style>
