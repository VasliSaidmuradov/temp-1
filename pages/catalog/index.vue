<template>
  <div class="catalog-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to>Главная /</nuxt-link>
        <nuxt-link to>Каталог</nuxt-link>
      </div>
      <div class="catalog-page-wrapper">
        <nav class="catalog-page-nav">
          <button v-for="btn in categories"
            :key="btn.id"
            @click="setActiveTab(btn.id)"
            :class="{'--active' : btn.id === currentTabIndex}"
            class="catalog-page-nav-btn">
            <img :src="btn.icon" alt="Skiny icon" class="catalog-page-icon" />
            <p>{{ btn.name }}</p>
          </button>
        </nav>
        <div class="catalog-page-right">
          <div class="catalog-page-category-wrp"
            v-for="category in filteredCategory" :key="category.id">
            <nuxt-link :to="`/catalog/${category.slug}`" class="catalog-page-category">
              {{ category.name }}
            </nuxt-link>
            <div class="catalog-page-row" :class="{'--count-1' : Object.entries(category.subcategories).length === 1 && Object.entries(category.subcategories[0].tags).length < 10}">
              <div class="catalog-page-col" v-for="subcat in category.subcategories" :key="subcat.id">
                <nuxt-link class="catalog-page-subcategory"
                  :to="`/catalog/${category.slug}/${subcat.slug}`">
                  {{ subcat.name }}
                </nuxt-link>
                <nuxt-link v-for="tag in subcat.tags"
                  :key="tag.id"
                  class="catalog-page-link"
                  :to="`/catalog/${category.slug}/${subcat.slug}/${tag.slug}`">
                  {{ tag.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentTabIndex: 1
    }
  },
  computed: {
    ...mapGetters({
      categories: "menu/GET_CATEGORIES"
    }),
    filteredCategory() {
      return this.categories.filter((cat) => {
        return cat.id === this.currentTabIndex
      })
    }
  },
  methods: {
    setActiveTab(i) {
      this.currentTabIndex = i
    }
  }
};
</script>
