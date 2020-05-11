<template>
  <div class="product" v-if="product">
    <!-- {{ product.brand }} -->
    <div class="product-icon-wrp">
      <img v-if="product.is_hit" src="/icons/hit-icon.svg" alt="Skiny icon" />
      <img v-if="product.is_new" src="/icons/new-icon.svg" alt="Skiny icon" />
    </div>
    <button class="product-add-favorites" :class="{'-added' : isFavorite(product)}" @click="toggleFavorite(product)">
      <favorites-icon />
    </button>
    <nuxt-link :to="`/product/${product.slug}`">
      <div class="product-img">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-rating-wrp"></div>
      <p class="product-brand">{{ product.brand.name }}</p>
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
import { mapActions, mapGetters } from "vuex";

import favoritesIcon from "@/static/icons/favorites-icon2.svg";

export default {
  props: {
    product: Object
  },
  components: {
    favoritesIcon
  },
  data() {
    return {
      isAdded: false,
      count: 1,
    };
  },
  // mounted() {
  //   this.count = this.isInCart(this.product)
  //     ? this.getCartQuantity(this.product)
  //     : 1;
  // },
  computed: {
    ...mapGetters({
      isFavorite: "user/IS_FAVORITE",
      isInCart: "cart/IS_PRODUCT_IN_CART",
      getCartQuantity: "cart/GET_CART_QUANTITY"
    })
  },
  methods: {
    ...mapActions({
      toggleFavorite: "user/toggleFavorite",
      increase: "cart/increase",
      decrease: "cart/decrease"
    }),
    increaseCount() {
      if (this.product.limit && this.product.limit <= this.count) {
        this.$alert({
          message: `На данный продукт установлен лимит ${this.product.limit *
            this.product.amount} ${this.product.tag.unit}`,
          type: "error"
        });
        return;
      }
      this.count++;
    },
    addToCart() {
      this.$alert({
        message: "Товар добавлен в корзину!",
        type: "success"
      });
      let d = this.count - this.getCartQuantity(this.product);
      while (typeof d === "number" && d !== 0) {
        if (d > 0) {
          d--;
          this.increase(this.product);
        } else {
          d++;
          this.decrease(this.product);
        }
      }
    }
  }
};
</script>