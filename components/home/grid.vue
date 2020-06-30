<template>
  <div class="category-grid">
    <nuxt-link
      class="category-grid-item"
      :to="item.id === 'brands' ? item.slug : `/catalog/${item.slug}`"
      :class="{'--large' : (index + 1) % 4 === 1}"
      v-for="(item, index) in categories"
      :key="index"
    >
      <img :src="item.image ? item.image : require('@/static/images/news.png')" :alt="item.name" />
      <p class="category-grid-name">{{item.name}}</p>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      homePageCategories: "product/GET_HOME_PAGE_CATEGORIES"
    }),
    categories() {
      const data = [
        ...this.homePageCategories,
        { id: "brands", name: "Бренды", slug: "brands", image: '/images/bg-brands.png' }
      ];
      return data;
    }
  }
};
</script>