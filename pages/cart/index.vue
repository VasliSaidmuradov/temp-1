<template>
  <div class="cart-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to>Главная /</nuxt-link>
        <nuxt-link to>Корзина</nuxt-link>
      </div>
      <h1
        class="section-title"
      >В корзине {{ cartQuantity }} товар{{!cartQuantity || cartQuantity >= 5 ? 'ов' : cartQuantity === 1 ? '' : 'а'}}</h1>
      <div class="cart-page-row">
        <list />
        <cart-aside />
      </div>
      <slider v-if="hints" :products="hints" />
      <slider v-else :products="hits" />
    </div>
  </div>
</template>

<script>
import list from "@/components/cart/list";
import cartAside from "@/components/cart/aside";
import slider from "@/components/cart/slider";
import { mapGetters } from "vuex";

export default {
  components: {
    list,
    slider,
    cartAside
  },
  middleware: ["cart"],
  computed: {
    ...mapGetters({
      hits: "product/GET_HITS",
      hints: "product/GET_HINTS",
      cartQuantity: "cart/GET_QUANTITY"
    })
  }
};
</script>
