<template>
  <div class="product-images">
    <div class="product-images-main">
      <div class="product-images-icon-wrp">
        <img src="/icons/hit-icon.svg" alt="Hit icon" />
        <img src="/icons/new-icon.svg" alt="New icon" />
      </div>
      <div v-swiper:productImagesMain="options">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image,index) in images" :key="index">
            <img :src="image" :alt="product.name" />
          </div>
        </div>
      </div>
    </div>
    <div class="product-images-slider-wrp">
      <div v-swiper:productImagesThumbs="optionsThumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image,index) in images" :key="index">
            <img :src="image" :alt="product.name" class="product-images-slide-img" />
          </div>
        </div>
      </div>
      <button class="product-images-arrow product-images-prev"></button>
      <button class="product-images-arrow product-images-next"></button>
    </div>
    <!-- --- {{ product.image }} -->
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.productImagesMain;
      const swiperThumbs = this.productImagesThumbs;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  data() {
    return {
      optionsThumbs: {
        slidesPerView: 4,
        loop: false,
        loopedSlides: 4,
        slideToClickedSlide: true
      },
      options: {
        loop: false,
        loopedSlides: 4,
        navigation: {
          nextEl: ".product-images-next",
          prevEl: ".product-images-prev"
        }
      },
      fakeImages: ["/images/product.png", "/images/product.png"]
    };
  },
  computed: {
    images() {
      return !this.product.images
        ? [this.product.image, ...this.product.images]
        : [this.product.image];
    }
  }
};
</script>
