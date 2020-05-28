<template>
  <div class="product-page">
    <!-- prod: {{product.tag.subcategory}} -->
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link :to="`/catalog/${product.tag.subcategory.categories[0].slug}/${product.tag.subcategory.slug}`">{{ product.tag.subcategory.name }} /</nuxt-link>
        <nuxt-link :to="product.tag.slug">{{ product.tag.name }}</nuxt-link>
      </div>
      <!-- similars: {{ similars }} -->
      <div class="product-page-name-wrp">
        <p class="product-page-brand">{{ product.brand ? product.brand.name : '' }}</p>
        <p class="product-page-name">{{ product.name }}</p>
      </div>
      <div class="product-page-row">
        <div class="product-page-col">
          <images :product="product" />
          <div class="product-page-mob-name">
            <p class="product-page-brand">{{ product.brand ? product.brand.name : '' }}</p>
            <p class="product-page-name">{{ product.name }}</p>
          </div>
        </div>
        <div class="product-page-col">
          <info :info="product" />
        </div>
        <div class="product-page-col">
          <product-aside :info="product" />
        </div>
      </div>  
      <!-- >>  {{ brandProducts }} -->
      <other :brandProducts="brandProducts" />
      <similar :similars="similars" />
    </div>
    <div class="product-page-mobile-btn">
      <!-- <button class="button --main-color">Добавить в корзину</button> -->
      <div class="product-counter">
        <button class="product-counter-decrease"></button>
        <span>1 шт</span>
        <button class="product-counter-increase"></button>
      </div>
      <button class="product-page-add-favorites"></button>
    </div>
  </div>
</template>

<script>
import images from "@/components/product-inner/images";
import info from "@/components/product-inner/info";
import productAside from "@/components/product-inner/aside";
import similar from "@/components/product-inner/similar";
import other from "@/components/product-inner/other";
import { mapGetters } from "vuex";

export default {
  components: {
    images,
    info,
    productAside,
    similar,
    other
  },
  middleware: ["product"],
  computed: {
    ...mapGetters({
      product: "product/GET_PRODUCT",
      similars: "product/GET_SIMILARS",
      brandProducts: "brand/GET_BRAND_PRODUCTS"
    })
  }
};
</script>
