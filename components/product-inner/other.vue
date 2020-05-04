<template>
  <div class="product-slider">
    <h3 class="section-title">Другие товары этого бренда</h3>
    <button class="product-slider-prev other-prev"></button>
    <button class="product-slider-next other-next"></button>
    <div v-swiper:similarSlider="options">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="product in brandProducts.products" :key="product.id">
          <product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import product from "@/components/partials/product";

export default {
  props: {
    brandProducts: Object
  },
  components: {
    product
  },
  data() {
    return {
      options: {
        slidesPerView: 4,
        navigation: {
          nextEl: ".other-next",
          prevEl: ".other-prev"
        },
        breakpoints: {
          769: {
            slidesPerView: 3
          },
          426: {
            slidesPerView: 2
          },
          321: {
            slidesPerView: 1
          }
        }
      }
    };
  }
};
</script>