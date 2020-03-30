<template>
	<div class="product-slider">
		<h3 class="section-title">Другие товары этого бренда</h3>
		<button class="product-slider-prev other-prev"></button>
		<button class="product-slider-next other-next"></button>
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
					nextEl: '.other-next',
					prevEl: '.other-prev'
				}
			}
		}
	},
	components: {
		product
	}
}
</script>