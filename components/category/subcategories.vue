<template>
  <div class="category-page-subcategories">
    <!-- <h4 class="category-page-subcat-title">{{ tag.name }}</h4> -->
    <nuxt-link
      v-for="link in nav"
      :key="link.id"
      class="category-page-subcat-link"
      :to="isBrandPage ? link.slug : `${tag ? link.slug : subcat ? subcat.slug + '/' + link.slug : (category ? category.slug + '/' + link.slug : 'catalog/' + link.slug)}`"
    >
      {{ link.name }}
      <br />
    </nuxt-link>
    <!-- >> {{ nav }} -->
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    category: Object,
    subcat: Object,
    tag: Object,
    brandList: Object,
    isBrandPage: Boolean
  },
  computed: {
    nav() {
      if (this.isBrandPage) return this.brandList.data;
      if (this.tag) return this.subcat.tags;
      if (this.subcat) return this.subcat.tags;
      if (this.category) {
        const arr = this.category.subcategories.map(el => el.tags)
        console.log(arr)
        return this.category.subcategories
      }
      return this.categories;
    }
  }
};
</script>

<style>
</style>
