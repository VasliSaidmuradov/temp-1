<template>
  <div class="product" v-if="product">
    <!-- {{ product.quantity }} : {{ count }} -->
    <div class="product-icon-wrp">
      <img v-if="product.is_hit" src="/icons/hit-icon.svg" alt="Hit icon" />
      <img v-if="product.is_new" src="/icons/new-icon.svg" alt="New icon" />
    </div>
    <button class="product-add-favorites" :class="{'-added' : isFavorite(product)}" @click="toggleFavorite(product)">
      <favorites-icon />
    </button>
    <nuxt-link :to="`/product/${product.slug}`">
      <div class="product-img">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-rating-wrp"></div>
      <p class="product-brand">{{ product.brand ? product.brand.name : 'Нет бренда' }}</p>
      <p v-if="product.name" class="product-name">
        {{ product.name.length > 70 ? product.name.slice(0, 75) + '...' : product.name }}</p>
      <div class="product-price-wrp">
        <p class="product-price">{{ $formatMoney(product.price) }} ₸</p>
        <p v-if="product.old_price" class="product-old-price">{{ $formatMoney(product.old_price) }} ₸</p>
      </div>
    </nuxt-link>
    <div v-if="isInCart(product) && product.quantity" class="product-counter">
      <!-- <button @click="count = count > 1 ? count - 1 : 1" class="product-counter-decrease"></button> -->
      <button @click="decreaseCount(product)" class="product-counter-decrease"></button>
      <span>{{ getCartQuantity(product) }} {{ product.tag ? product.tag.unit : 'шт' }}</span>
      <button :disabled="product.quantity <= getCartQuantity(product)" @click="increaseCount(product)" class="product-counter-increase"></button>
    </div>
    <button v-if="!isInCart(product) && product.quantity" @click="addToCart" class="button --black">В корзину</button>
    <button v-if="!product.quantity" class="button --not-available">Нет в наличии</button>
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
  middleware: ['cart'],
  data() {
    return {
      isAdded: false,
      count: 1,
      isAvailable: false
    };
  },
  mounted() {
    this.count = this.isInCart(this.product)
      ? this.getCartQuantity(this.product)
      : 1;
  },
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
      decrease: "cart/decrease",
      fetchCartProducts: 'cart/fetchCartProducts',
    }),
    decreaseCount(prod) {
      this.decrease(prod)
      if (this.count > 1) { 
        this.count--
      } else 1;
      if(this.count === 1) this.isAdded  = false;
    },
    increaseCount(prod) {
      // console.log(this.product.quantity, this.product.limit)
      this.increase(prod);
      this.count++;
      this.isAdded = true;
      if (this.product.limit && this.product.limit <= this.count) {
        this.$alert({
          message: `На данный продукт установлен лимит ${this.product.limit *
            this.product.amount} ${this.product.tag ? this.product.tag.unit : ''}`,
          type: "error"
        });
        return;
      }
      if (this.product.quantity && this.product.quantity <= this.count) {
        this.$alert({
          message: `Достигнуто максимальное количество товара`,
          type: "error"
        });
        return;
      }
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
      this.fetchCartProducts()
      this.isAdded = true;
    }
  }
};
</script>
