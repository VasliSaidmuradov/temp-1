<template>
  <div class="favorites-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Избранное</nuxt-link>
      </div>
      <div v-if="favoriteProducts.data.length > 0">
        <h1 class="section-title">Избранное</h1>
        <div class="favorites-page-row">
          <product v-for="product in favoriteProducts.data" :key="product.id" :product="product" />
        </div>
      </div>
      <div v-else>
        <h1 class="section-title">В избранных 0 товаров</h1>
      </div>
    </div>
  </div>
</template>

<script>
import product from "@/components/partials/product";
import { mapGetters } from "vuex";

export default {
  components: {
    product
  },
  middleware: ['favorites'],
  computed: {
    ...mapGetters({ 
      favoriteProducts: "user/GET_PRODUCTS"
    })
  }
};
</script>
