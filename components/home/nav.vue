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
      <transition name="fade" v-if="hoveredCategory">
        <div class="home-nav-subcategory-wrp" v-if="hoveredCategory.id === category.id">
          <div class="home-nav-subcategory-item">
            <nuxt-link
              class="home-nav-subcategory"
              :to="`/catalog/${category.slug}/${subcategory.slug}`"
              v-for="subcategory in category.subcategories"
              :key="subcategory.id"
            >
              {{subcategory.name}}
              <nuxt-link
                class="home-nav-tag"
                v-for="tag in subcategory.tags"
                :key="tag.id"
                :to="`/catalog/${category.slug}/${subcategory.slug}/${tag.slug}`"
              >{{tag.name}}</nuxt-link>
            </nuxt-link>
          </div>
        </div>
      </transition>
    </nuxt-link>
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
    }),
    getSubCategoryChunks: function() {
      const chunked_arr = [];
      let copied = [...this.hoveredCategory.subcategories];
      const size = 4;
      const numOfChild = Math.ceil(copied.length / size);
      for (let i = 0; i < numOfChild; i++) {
        chunked_arr.push(copied.splice(0, size));
      }
      return chunked_arr;
    }
  }
};
</script>
