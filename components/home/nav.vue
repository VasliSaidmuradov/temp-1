<template>
  <nav class="home-nav" @mouseleave="closeSubCategory">
    <nuxt-link
      v-for="category in categories"
      :key="category.id"
      class="home-nav-link"
      :to="`/catalog/${category.slug}`"
      @mouseover.native="onHoverCategory(category)"
    >
      <!-- <img class="home-nav-link-icon" :src="category.icon" :alt="category.name" /> -->
      <span>{{ category.name }}</span>
    </nuxt-link>
    <transition name="fade">
      <div class="home-nav-subcategory-wrp" v-if="hoveredCategory">
        <div v-for="category in categories" :key="category.id">
          <div class="home-nav-subcategory-row" v-if="hoveredCategory.id === category.id">
            <div class="home-nav-subcategory-col" 
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
        </div>
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
