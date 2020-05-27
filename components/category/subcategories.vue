<template>
  <div class="category-page-subcategories">
    <!-- <h4 class="category-page-subcat-title">{{ tag.name }}</h4> -->
    <nuxt-link
      v-for="link in nav"
      :key="link.id"
      class="category-page-subcat-link"
      :to="link.slug"
    >{{ link.name }}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
		categories: Array,
    category: Object,
    subcat: Object,
    tag: Object,
    brandList: Array,
    isBrandPage: Boolean
	},
	computed: {
		nav() {
      if (this.isBrandPage) return this.brandList
			if (this.tag) return this.subcat.tags
			if (this.subcat) return this.category.subcategories
			return this.categories
		}
	}
};
</script>

<style>
</style>
