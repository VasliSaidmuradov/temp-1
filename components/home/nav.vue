<template>
  <nav class="home-nav">
    <nuxt-link
      v-for="category in categories"
      :key="category.id"
      class="home-nav-link"
      :to="category.slug"
      @mouseover.native="onHoverCategory(category)"
    >
      <img src="/icons/city-icon.svg" alt="Skiny icon" />
      <span>{{ category.name }}</span>
    </nuxt-link>
    <!-- cat: {{ categories }} -->
    <div class="home-nav-subcategory-wrp" v-if="hoveredCategory">
      <div class="home-nav-subcategory-item"
        v-for="subcategories in getSubCategoryChunks" 
        :key="subcategories.id">
        <nuxt-link class="home-nav-subcategory" to=""
          v-for="subcategory in subcategories"
          :key="subcategory.id">
          {{subcategory.name}}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      hoveredCategory: null
    }
  },
  methods: {
    onHoverCategory(category) {
      if (category.subcategories && category.subcategories.length > 0) {
        this.hoveredCategory = category
      } else {
        this.hoveredCategory = null
      }
    },
    closeSubCategory() {
      this.hoveredCategory = null
    },
  },
  computed: {
    ...mapGetters({
      categories: "menu/GET_CATEGORIES"
    }),
    getSubCategoryChunks: function() {
      const chunked_arr = []
      let copied = [...this.hoveredCategory.subcategories]
      const size = 4
      const numOfChild = Math.ceil(copied.length / size)
      for (let i = 0; i < numOfChild; i++) {
          chunked_arr.push(copied.splice(0, size))
      }
      return chunked_arr
    }
  }
};
</script>
