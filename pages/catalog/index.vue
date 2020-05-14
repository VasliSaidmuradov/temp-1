<template>
  <div class="catalog-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to>Главная /</nuxt-link>
        <nuxt-link to>Каталог</nuxt-link>
      </div>
      <nav class="catalog-page-nav">
        <a
          v-for="btn in categories"
          :key="btn.id"
          class="catalog-page-nav-btn"
          :href="`#${btn.id}`"
        >
          <img :src="btn.icon" alt="Skiny icon" class="catalog-page-icon" />
          <p>{{ btn.name }}</p>
        </a>
      </nav>
      <div
        v-for="category in categories"
        :key="category.id"
        :id="category.id"
        class="catalog-page-category-wrp"
      >
        <nuxt-link
          :to="`/catalog/${category.slug}`"
          class="catalog-page-category"
        >{{ category.name }}</nuxt-link>
        <div class="catalog-page-row">
          <div class="catalog-page-col" v-for="subcat in category.subcategories" :key="subcat.id">
            <nuxt-link
              class="catalog-page-subcategory"
              :to="`/catalog/${category.slug}/${subcat.slug}`"
            >{{ subcat.name }}</nuxt-link>
            <nuxt-link
              v-for="tag in subcat.tags"
              :key="tag.id"
              class="catalog-page-link"
              :to="`/catalog/${category.slug}/${subcat.slug}/${tag.slug}`"
            >{{ tag.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      categories: "menu/GET_CATEGORIES"
    })
  }
};
</script>
