<template>
	<div class="product-slider">
		<h3 class="section-title">Рекомендуем также</h3>
		<button class="product-slider-prev similar-prev"></button>
		<button class="product-slider-next similar-next"></button>
		<div v-swiper:similarSlider="options" >
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in 6">
					<product />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import product from '@/components/partials/product'

export default {
	data() {
		return {
			options: {
				slidesPerView: 4,
				navigation: {
					nextEl: '.similar-next',
					prevEl: '.similar-prev'
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
		}
	},
	components: {
		product
	}
}
</script>