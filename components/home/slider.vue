<template>
    <div class="home-slider">
        <div v-swiper:homeSlider="options">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="/images/home-slider.png" alt="Skiny image" class="home-slider-img">
                    <div class="home-slider-inner">
                        <div>
                            <h3 class="home-slider-title">Erborian до –25%</h3>
                            <h4 class="home-slider-text">подарки при покупке 17 и 18 февраля в интернет-магазине</h4>
                            <nuxt-link class="button --black --arrow" to="">Перейти к покупкам</nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <img src="/images/home-slider.png" alt="Skiny image" class="home-slider-img">
                    <div class="home-slider-inner">
                        <div>
                            <h3 class="home-slider-title">Erborian до –25%</h3>
                            <h4 class="home-slider-text">подарки при покупке 17 и 18 февраля в интернет-магазине</h4>
                            <nuxt-link class="link -arrow" to="">Перейти к покупкам</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: {
                slidesPerView: 1,
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
            }
        }
    }
}
</script>
