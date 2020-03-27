<template>
	<div class="brands-slider">
		<h3 class="brands-slider-title">Бренды</h3>
		<div class="brands-slider-btn-wrp">
			<button class="brands-slider-prev"></button>
			<button class="brands-slider-next"></button>
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
					nextEl: '.brands-slider-next',
					prevEl: '.brands-slider-prev'
				}
			}
		}
	}
}
</script>