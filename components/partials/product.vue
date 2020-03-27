<template>
	<div class="product">
		<div class="product-icon-wrp">
			<img src="/icons/hit-icon.svg" alt="Skiny icon">
			<img src="/icons/new-icon.svg" alt="Skiny icon">
		</div>
		<button class="product-add-favorites">
			<favorites-icon />
		</button>
		<nuxt-link to="">
			<div class="product-img">
				<img src="/images/product.png" alt="Skiny image">
			</div>
			<div class="product-rating-wrp"></div>
			<p class="product-brand">Dr. Jart+</p>
			<p class="product-name">VALMONT deto2x limited edition</p>
			<div class="product-price-wrp">
				<p class="product-price">8 590 ₸</p>
				<p class="product-old-price">9 690 ₸</p>
			</div>
		</nuxt-link>
		<div v-if="isAdded" class="product-counter">
			<button @click="isAdded = false" class="product-counter-decrease"></button>
			<span>1 шт</span>
			<button class="product-counter-increase"></button>
		</div>
		<button v-else @click="isAdded = true" class="button --black">В корзину</button>
	</div>
</template>

<script>
import favoritesIcon from '@/static/icons/favorites-icon.svg'

export default {
	components: {
		favoritesIcon
	},
	data() {
		return {
			isAdded: false
		}
	}
}
</script>