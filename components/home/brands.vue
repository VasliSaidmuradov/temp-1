<template>
  <div class="brands-slider" v-if="brands.length > 0">
    <h3 class="brands-slider-title">Бренды</h3>
    <div class="brands-slider-btn-wrp">
      <button class="brands-slider-prev"></button>
      <button class="brands-slider-next"></button>
    </div>
    <div v-swiper:brandsSlider="options">
      <div class="swiper-wrapper">
        <!-- {{ brands }} -->
        <nuxt-link v-for="brand in brands.data" :key="brand.id" class="swiper-slide" :to="`/brands/${brand.slug}`">
          <img class="brands-slider-image" :src="brand.image ? brand.image : '/images/brand.png'" :alt="brand.name" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      options: {
        slidesPerView: 5,
        navigation: {
          nextEl: ".brands-slider-next",
          prevEl: ".brands-slider-prev"
        },
        breakpoints: {
          426: {
            slidesPerView: 3
          },
          321: {
            slidesPerView: 2
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters({ brands: "brand/GET_BRANDS" })
  }
};
</script>
