<template>
  <nav class="home-nav" @mouseleave="closeSubCategory">
    <nuxt-link
      v-for="category in categories"
      :key="category.id"
      class="home-nav-link"
      :to="`/catalog/${category.slug}`"
      @mouseover.native="onHoverCategory(category)"
    >
      <img class="home-nav-link-icon" :src="category.icon" :alt="category.name" />
      <span>{{ category.name }}</span>
    </nuxt-link>
    <transition name="fade">
      <div class="home-nav-subcategory-wrp" v-if="hoveredCategory">
        <transition name="fade">
          <div class="home-nav-category" v-for="category in categories" :key="category.id" v-if="hoveredCategory.id === category.id">
            <div class="home-nav-subcategory-row"
              :class="{'--count-1' : Object.entries(category.subcategories).length === 1 && Object.entries(category.subcategories[0].tags).length < 10}">
              <div class="home-nav-subcategory-col" 
                :class="{'--margin' : Object.entries(subcategory.tags).length === 0}"
                v-for="subcategory in category.subcategories"
                :key="subcategory.id">
                <nuxt-link
                  class="home-nav-subcategory"
                  :to="`/catalog/${category.slug}/${subcategory.slug}`">
                  {{subcategory.name}}
                </nuxt-link>
                <nuxt-link
                  class="home-nav-tag"
                  v-for="tag in subcategory.tags"
                  :key="tag.id"
                  :to="`/catalog/${category.slug}/${subcategory.slug}/${tag.slug}`">
                  {{tag.name}}
                </nuxt-link>
              </div>
            </div>
            <div class="home-nav-banner-wrp">
              <nuxt-link to class="home-nav-banner">
                <img src="/images/news.png" alt="">
                <h4 class="home-nav-banner-title">Тональные крема Lumene CC</h4>
                <button class="button --main-color">К товарам</button>
              </nuxt-link>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      hoveredCategory: null,
      hover: false
    };
  },
  methods: {
    onHoverCategory(category) {
      if (category.subcategories && category.subcategories.length > 0) {
        this.hoveredCategory = category;
      } else {
        this.hoveredCategory = null;
      }
    },
    closeSubCategory() {
      this.hoveredCategory = null;
    },
    onHover() {
      this.hover = !this.hover;
    }
  },
  computed: {
    ...mapGetters({
      categories: "menu/GET_CATEGORIES"
    })
  }
};
</script>
