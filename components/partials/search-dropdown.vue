<template>
  <div v-if="isSearchActive" class="search-dropdown">
    <div v-if="!products || !products.total" class="search-dropdown-counter-wrp">
      <p class="search-dropdown-counter">Ничего не найдено</p>
    </div>
    <div v-else>
      <div class="search-dropdown-counter-wrp">
        <p class="search-dropdown-counter">{{ products.total }} товаров</p>
        <p
          @click.prevent="redirectToSearch"
          class="search-dropdown-all"
        >Смотреть все</p>
      </div>
      <nuxt-link
        :to="`/product/${product.slug}`"
        class="search-dropdown-item"
        v-for="product in products.data"
        :key="product.id"
      >
        <div class="search-dropdown-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="search-dropdown-name-wrp">
          <p class="search-dropdown-brand">{{ product.brand ? product.brand.name : 'НЕТ БРЕНДА' }}</p>
          <p class="search-dropdown-name">{{ product.name }}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isSearchActive: "GET_SEARCH",
      products: "product/GET_HINTS",
      search_query: "product/GET_SEARCH_QUERY"
    })
  },
  methods: {
    hideSearch() {
      this.$store.commit("SET_SEARCH", false);
      this.$emit("closeSearch")
    },
    redirectToSearch() {
      this.hideSearch();
      this.$router.push({ path: "/search", query: { q: this.search_query } });
    }
  },
  watch: {
    "$route.fullPath": function(fullPath) {
      // this.hideSearch()
      this.$emit("closeSearch")
    } 
  },
};
</script>

<style>
</style>
