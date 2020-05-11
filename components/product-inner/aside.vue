<template>
	<div class="product-aside">
		<div class="product-aside-inner">
			<div class="product-aside-price-wrp">
				<p class="product-aside-price">{{ info.price }} ₸</p>
				<p class="product-aside-old-price">{{ info.old_price }} ₸</p>
			</div>
			<p v-if="info.quantity" class="product-aside-available">В наличии на складе</p>
			<h3 class="product-aside-title">Бонусы за покупки</h3>
			<div class="product-aside-row">
				<img src="/icons/bonus-icon.svg" alt="Skiny icon" class="product-aside-icon">
				<p class="product-aside-text">
					<span>150 бонусов</span> для зарегестрированного покупателя
				</p>
			</div>
			<button class="button --main-color">Добавить в корзину</button>
			<button class="button --white">В избранное</button>
		</div>
		<nuxt-link class="product-page-link" :to="info.brand.slug">Перейти к производителю</nuxt-link>
		<img :src="info.brand.image" :alt="`/catalog/${info.brand.name}`" class="product-aside-brand">
	</div>
</template>
<script>
export default {
  props: {
    info: Object
	},
	computed: {
		tomorrow() {
			const msInDay = 60 * 60 * 24 * 1000
			const today = Date.now()
			return today + msInDay
		}
	}
};
</script>