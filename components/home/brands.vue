<template>
	<div class="brandsSlider">
		<h3 class="brandsSlider__title">Бренды</h3>
		<div class="brandsSlider__btnWrp">
			<button class="brandsSlider__prev"></button>
			<button class="brandsSlider__next"></button>
		</div>
		<div v-swiper:brandsSlider="options">
			<div class="swiper-wrapper">
				<div class="swiper-slide"><img src="/images/brand.png" alt="Skiny image"></div>
				<div class="swiper-slide"><img src="/images/brand.png" alt="Skiny image"></div>
				<div class="swiper-slide"><img src="/images/brand.png" alt="Skiny image"></div>
				<div class="swiper-slide"><img src="/images/brand.png" alt="Skiny image"></div>
				<div class="swiper-slide"><img src="/images/brand.png" alt="Skiny image"></div>
				<div class="swiper-slide"><img src="/images/brand.png" alt="Skiny image"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			options: {
				slidesPerView: 5,
				navigation: {
					nextEl: '.brandsSlider__next',
					prevEl: '.brandsSlider__prev'
				}
			}
		}
	}
}
</script>