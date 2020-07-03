<template>
  <div class="product-modal">
    <div class="product-modal-overlay" @click="closeGallery"></div>
    <div class="product-modal-inner">
      <button class="product-modal-close" @click="closeGallery">
        <close />
      </button>
      <div class="product-modal-slider-wrp">
        <div v-swiper:productGallery="options">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(slide, index) in images" :key="index">
              <img class="product-modal-slide-image" :src="slide" :alt="product.name" />
            </div>
          </div>
          <button class="product-modal-prev">
            <arrow />
          </button>
          <button class="product-modal-next">
            <arrow />
          </button>
        </div>
      </div>

      <nav class="product-modal-thumbs-wrp">
        <div v-swiper:productGalleryThumbs="thumbsOptions">
          <div class="swiper-wrapper">
            <div class="swiper-slide product-modal-thumb" v-for="(slide, index) in images" :key="index">
              <img :src="slide" :alt="product.name" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import close from "@/static/icons/close-icon.svg";
import arrow from "@/static/icons/arrow-right.svg";
export default {
  props: {
    product: Object
  },
  data() {
    return {
      thumbsOptions: {
        centeredSlides: true,
        touchRatio: 0.2,
        slidesPerView: "auto",
        spaceBetween: 24,
        slideToClickedSlide: true
      },
      options: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".product-modal-next",
          prevEl: ".product-modal-prev"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.productGallery;
      const swiperThumbs = this.productGalleryThumbs;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
      this.productGalleryThumbs.el.style.opacity = "1";
    });
  },
  components: {
    close,
    arrow
  },
  computed: {
    images() {
      return !this.product.images
        ? [this.product.image, ...this.product.images]
        : [this.product.image];
    }
  },
  methods: {
    closeGallery() {
      this.$emit("closeGallery");
    }
  }
};
</script>