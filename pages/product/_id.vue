<template>
  <div class="product-page">
    <transition name="fade">
      <modal :product="product" v-if="isModalOpen"  @closeGallery="closeGallery"/>
    </transition>
    <!-- prod: {{product}} -->
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link
          v-if="product.tag.subcategory && product.tag.subcategory.categories[0]"
          :to="`/catalog/${product.tag.subcategory.categories[0].slug}/${product.tag.subcategory.slug}`"
        >{{ product.tag.subcategory.name }} /</nuxt-link>
        <nuxt-link
          v-if="product.tag && product.tag.subcategory.categories[0]"
          :to="`/catalog/${product.tag.subcategory.categories[0].slug}/${product.tag.subcategory.slug}/${product.tag.slug}`"
        >{{ product.tag.name }} /</nuxt-link>
        <nuxt-link v-if="product" :to="product.slug">{{ product.name }}</nuxt-link>
      </div>
      <!-- similars: {{ similars }} -->
      <div class="product-page-row">
        <div class="product-page-col">
          <images :product="product" @showGallery="showGallery" />
          <div class="product-page-mob-name">
            <nuxt-link :to="`/brands/${product.brand.slug}`" class="product-page-brand">{{ product.brand ? product.brand.name : '' }}</nuxt-link>
            <p class="product-page-name">{{ product.name }}</p>
          </div>
        </div>
        <div class="product-page-right">
          <div class="product-page-name-wrp">
            <nuxt-link :to="`/brands/${product.brand.slug}`" class="product-page-brand">{{ product.brand ? product.brand.name : '' }}</nuxt-link>
            <p class="product-page-name">{{ product.name }}</p>
          </div>
          <div class="product-page-right-inner">
            <div class="product-page-col">
              <client-only>
                <info :info="product" />
              </client-only>
            </div>
            <div class="product-page-col --padding">
              <product-aside :info="product" />
            </div>
          </div>
        </div>
      </div>
      <!-- >>  {{ brandProducts }} -->
      <!-- <other v-if="brandProducts" :brandProducts="brandProducts" /> -->
      <similar v-if="similars" :similars="similars" />
    </div>
    <div class="product-page-mobile-btn">
      <button
        v-show="!isInCart(product) && product.quantity"
        @click="addToCart"
        class="button --main-color">
        Добавить в корзину
        <cart-icon />
      </button>
      <div v-show="isInCart(product) && product.quantity" class="product-counter">
        <button @click="decreaseCount(product)" class="product-counter-decrease"></button>
        <span>{{ getCartQuantity(product) }} {{ product.tag ? product.tag.unit : 'шт' }}</span>
        <button
          :disabled="product.quantity <= getCartQuantity(product)"
          @click="increaseCount(product)"
          class="product-counter-increase"
        ></button>
      </div>
      <button
        :class="{'-added' : isFavorite(product)}"
        @click="toggleFavorite(product)"
        class="product-page-add-favorites"
      >
        <favorites-icon />
      </button>
    </div>
  </div>
</template>

<script>
import images from "@/components/product-inner/images";
import info from "@/components/product-inner/info";
import productAside from "@/components/product-inner/aside";
import similar from "@/components/product-inner/similar";
import other from "@/components/product-inner/other";
import favoritesIcon from "@/static/icons/fav-icon.svg";
import cartIcon from "@/static/icons/cart-icon.svg";
import modal from '@/components/product-inner/modal'
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    images,
    info,
    productAside,
    similar,
    other,
    favoritesIcon,
    modal,
    cartIcon
  },
  middleware: ["product"],
  data() {
    return {
      isModalOpen: false,
      isAdded: false,
      count: 1,
      isAvailable: false
    };
  },
  computed: {
    ...mapGetters({
      product: "product/GET_PRODUCT",
      similars: "product/GET_SIMILARS",
      getCartQuantity: "cart/GET_CART_QUANTITY",
      isFavorite: "user/IS_FAVORITE",
      isInCart: "cart/IS_PRODUCT_IN_CART"
      // brandProducts: "brand/GET_BRAND_PRODUCTS"
    })
  },
  methods: {
    ...mapActions({
      toggleFavorite: "user/toggleFavorite",
      increase: "cart/increase",
      decrease: "cart/decrease",
      fetchCartProducts: "cart/fetchCartProducts"
    }),
    showGallery() {
      this.isModalOpen = true
    },
    closeGallery() {
      this.isModalOpen = false
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
      this.fetchCartProducts();
      this.isAdded = true;
    },
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
  }
};
</script>
