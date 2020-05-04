<template>
  <nav class="home-nav">
    <nuxt-link
      v-for="category in categories"
      :key="category.id"
      class="home-nav-link"
      :to="category.slug"
    >
      <img src="/icons/city-icon.svg" alt="Skiny icon" />
      <span>{{ category.name }}</span>
    </nuxt-link>
    <!-- cat: {{ categories }} -->
  </nav>
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
