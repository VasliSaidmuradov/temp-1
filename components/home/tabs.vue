<template>
  <div class="home-products">
    <nav class="tabs-nav">
      <button class="tabs-nav-btn --active">Новые поступления</button>
      <button class="tabs-nav-btn">Бестселлеры</button>
      <button class="tabs-nav-btn">Советуем</button>
      <button class="tabs-nav-btn">Акции</button>
    </nav>
    <div class="home-products-row">
      <product v-for="product in newsArrivals.data" :key="product.id" :product="product" />
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
  computed: {
    ...mapGetters({
      newsArrivals: "product/GET_NEWS"
    })
  }
};
</script>