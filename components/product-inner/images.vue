<template>
  <div class="product-images">
    <div class="product-images-main">
      <div class="product-images-icon-wrp">
        <img src="/icons/hit-icon.svg" alt="Skiny icon" />
        <img src="/icons/new-icon.svg" alt="Skiny icon" />
      </div>
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-images-slider-wrp">
      <div v-swiper:productImages="options">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image,index) in product.images" :key="index">
            <img :src="image" :alt="product.name" class="product-images-slide-img" />
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
  data() {
    return {
      options: {
        slidesPerView: 4,
        navigation: {
          nextEl: ".product-images-next",
          prevEl: ".product-images-prev"
        }
      }
    };
  }
};
</script>