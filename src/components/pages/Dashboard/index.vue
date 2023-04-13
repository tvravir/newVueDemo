<template>
	<div>

		dashboard
		<!-- <Pagination :totalPages="10" :perPage="10" :maxVisibleButtons="5" :currentPage="currentPage"
			@pagechanged="onPageChange" /> -->
	</div>
</template>

<script>



export default {
	name: 'dashboard-page',
	components: {

	},
	data() {
		return {
			currentPage: 1,
		};
	},
	methods: {
		onPageChange(page) {
			console.log(page)
			this.currentPage = page;
		}
	}

}
</script>

<style scoped></style>