<template>
  <div class="product-page">
    <!-- prod: {{product}} -->
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link
          v-if="product.tag.subcategory && product.tag.subcategory.categories[0]"
          :to="`/catalog/${product.tag.subcategory.categories[0].slug}/${product.tag.subcategory.slug}`"
        >
          {{ product.tag.subcategory.name }} /
        </nuxt-link>
        <nuxt-link
          v-if="product.tag && product.tag.subcategory.categories[0]"
          :to="`/catalog/${product.tag.subcategory.categories[0].slug}/${product.tag.subcategory.slug}/${product.tag.slug}`"
        >
          {{ product.tag.name }} /
        </nuxt-link>
        <nuxt-link v-if="product" :to="product.slug">{{ product.name }}</nuxt-link>
      </div>
      <!-- similars: {{ similars }} -->
      <div class="product-page-row">
        <div class="product-page-col">
          <images :product="product" />
          <div class="product-page-mob-name">
            <p class="product-page-brand">{{ product.brand ? product.brand.name : '' }}</p>
            <p class="product-page-name">{{ product.name }}</p>
          </div>
        </div>
        <div class="product-page-right">
          <div class="product-page-name-wrp">
            <p class="product-page-brand">{{ product.brand ? product.brand.name : '' }}</p>
            <p class="product-page-name">{{ product.name }}</p>
          </div>
          <div class="product-page-right-inner">
            <div class="product-page-col">
              <info :info="product" />
            </div>
            <div class="product-page-col --padding">
              <product-aside :info="product" />
              <h3 class="product-info-title">Доставка</h3>
              <div class="product-info-row">
                <img src="/icons/delivery-icon.svg" class="product-info-delivery-icon" alt="delivery icon" />
                <p class="product-info-delivery-text">
                  Доставка курьером,
                  <b v-if="tomorrow === now">завтра, {{ $formatDate(now) }},</b>
                  <b v-else>сегодня, {{ $formatDate(now) }},</b>
                  <span>Бесплатно</span>
                </p>
              </div>
              <div class="product-info-row">
                <img src="/icons/house-icon.svg" class="product-info-delivery-icon" alt="Skiny icon" />
                <p class="product-info-delivery-text">
                  Самовывоз,
                  <b v-if="tomorrow === now">завтра, {{ $formatDate(now) }},</b>
                  <b v-else>сегодня, {{ $formatDate(now) }},</b>
                </p>
              </div>
              <nuxt-link class="product-page-link" to="/help/delivery">Подробнее про условия доставки</nuxt-link>
            </div>
          </div>
        </div>
      </div>  
      <!-- >>  {{ brandProducts }} -->
      <!-- <other v-if="brandProducts" :brandProducts="brandProducts" /> -->
      <similar v-if="similars" :similars="similars" />
    </div>
    <div class="product-page-mobile-btn">
      <!-- <button class="button --main-color">Добавить в корзину</button> -->
      <div class="product-counter">
        <button @click="decrease(product)" class="product-counter-decrease"></button>
        <span>{{ getCartQuantity(product) }} {{ product.tag ? product.tag.unit : 'шт' }}</span>
        <button :disabled="product.quantity <= getCartQuantity(product)" @click="increase(product)" class="product-counter-increase"></button>
      </div>
      <button :class="{'-added' : isFavorite(product)}" @click="toggleFavorite(product)" class="product-page-add-favorites">
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
import favoritesIcon from "@/static/icons/favorites-icon2.svg";
import moment from 'moment'
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    images,
    info,
    productAside,
    similar,
    other,
    favoritesIcon
  },
  middleware: ["product"],
  computed: {
    ...mapGetters({
      product: "product/GET_PRODUCT",
      similars: "product/GET_SIMILARS",
      getCartQuantity: "cart/GET_CART_QUANTITY",
      isFavorite: "user/IS_FAVORITE",
      isInCart: "cart/IS_PRODUCT_IN_CART",
      // brandProducts: "brand/GET_BRAND_PRODUCTS"
    }),
		tomorrow() {
			const msInADay = 60 * 60 * 24 * 1000
			const today = Date.now()
			return today + msInADay
    },
    today() {
      return Date.now()
    },
    now() {
      let hour = moment().hour()
      const fn = () => hour = moment().hour()
      setInterval(fn, 1000)
      if (hour >= 19 && hour <= 23) {
        return this.tomorrow
      }
      return this.today
    }
  },
  methods: {
    ...mapActions({
      toggleFavorite: "user/toggleFavorite",
      increase: "cart/increase",
      decrease: "cart/decrease",
      fetchCartProducts: 'cart/fetchCartProducts',
    }),
  }
};
</script>
