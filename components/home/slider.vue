<template>
  <div class="home-slider">
    <div v-swiper:homeSlider="options">
      <div class="swiper-wrapper">
        <div v-for="slide in slides" :key="slide.id" class="swiper-slide">
          <nuxt-link to>
            <img :src="slide.image" alt="Skiny image" class="home-slider-img" />
            <div v-if="slide.name" class="home-slider-inner">
              <div>
                <h3 class="home-slider-title">{{ slide.name }}</h3>
                <h4 class="home-slider-text" v-html="slide.description"></h4>
                <nuxt-link class="button --black --arrow" to="/catalog">Перейти к покупкам</nuxt-link>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      options: {
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 1000,
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      slides: "content/GET_SLIDES"
    })
  }
};
</script>
