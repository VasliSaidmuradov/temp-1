<template>
  <div class="product-images">
    <div class="product-images-main">
      <div class="product-images-icon-wrp">
        <img src="/icons/hit-icon.svg" alt="Skiny icon" />
        <img src="/icons/new-icon.svg" alt="Skiny icon" />
      </div>
      <div v-swiper:productImagesMain="options">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image,index) in 4" :key="index">
            <img src="/images/product.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
    <div class="product-images-slider-wrp">
      <div v-swiper:productImagesThumbs="optionsThumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image,index) in 4" :key="index">
            <img src="/images/product.png" alt="" class="product-images-slide-img" />
          </div>
        </div>
      </div>
      <button class="product-images-arrow product-images-prev"></button>
      <button class="product-images-arrow product-images-next"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.productImagesMain
      const swiperThumbs = this.productImagesThumbs
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  data() {
    return {
      optionsThumbs: {
        slidesPerView: 4,
        loop: true,
        loopedSlides: 4,
        slideToClickedSlide: true
      },
      options: {
        loop: true,
        loopedSlides: 4,
        navigation: {
          nextEl: ".product-images-next",
          prevEl: ".product-images-prev"
        }
      }
    };
  }
};
</script>