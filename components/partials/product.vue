<template>
  <div class="product">
    <!-- {{ product }} -->
    <div class="product-icon-wrp">
      <img v-if="product.is_hit" src="/icons/hit-icon.svg" alt="Skiny icon" />
      <img v-if="product.is_new" src="/icons/new-icon.svg" alt="Skiny icon" />
    </div>
    <button class="product-add-favorites">
      <favorites-icon />
    </button>
    <nuxt-link :to="`/product/${product.id}`">
      <div class="product-img">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-rating-wrp"></div>
      <p class="product-brand">Dr. Jart+</p>
      <p class="product-name">{{ product.name }}</p>
      <div class="product-price-wrp">
        <p class="product-price">{{ product.price }} ₸</p>
        <p class="product-old-price">{{ product.old_price }} ₸</p>
      </div>
    </nuxt-link>
    <div v-if="isAdded" class="product-counter">
      <button @click="isAdded = false" class="product-counter-decrease"></button>
      <span>1 {{product.tag.unit}}</span>
      <button class="product-counter-increase"></button>
    </div>
    <button v-else @click="isAdded = true" class="button --black">В корзину</button>
  </div>
</template>

<script>
import favoritesIcon from "@/static/icons/favorites-icon.svg";

export default {
  props: {
    product: Object
  },
  components: {
    favoritesIcon
  },
  data() {
    return {
      isAdded: false
    };
  }
};
</script>