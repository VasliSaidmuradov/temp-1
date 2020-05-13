<template>
	<div class="product-slider">
		<h3 class="section-title">Рекомендуем также</h3>
		<button class="product-slider-prev cart-slider-prev"></button>
		<button class="product-slider-next cart-slider-next"></button>
		<div v-swiper:cartSlider="options" >
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="product in products.data" :key="product.id">
					<product :product="product" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import product from '@/components/partials/product'

export default {
  props: {
    products: Object
  },
  middleware: ['cart'],
	data() {
		return {
			options: {
				slidesPerView: 4,
				navigation: {
					nextEl: '.cart-slider-next',
					prevEl: '.cart-slider-prev'
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
