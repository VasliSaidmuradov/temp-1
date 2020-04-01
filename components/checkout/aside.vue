<template>
	<div class="order-aside">
		<div class="order-aside-products">
			<div class="order-aside-product" v-for="(item,index) in 3" :key="index">
				<div class="order-aside-product-img">
					<img src="/images/product.png" alt="Skiny image">
				</div>
				<p class="order-aside-product-name">Сыворотка Timeless Matrixyl</p>
			</div>
		</div>
		<div class="order-aside-list">
			<div class="order-aside-row">
				<p class="order-aside-title">Товары (3)</p>
				<p class="order-aside-list-price">4 590 ₸</p>
			</div>
			<div class="order-aside-row">
				<p class="order-aside-title">Скидка</p>
				<p class="order-aside-list-price --red">-590 ₸</p>
			</div>
		</div>
		<div class="order-aside-total">
			<div class="order-aside-row">
				<p class="order-aside-total-title">Итого</p>
				<p class="order-aside-total-text">4 590 ₸</p>
			</div>
		</div>
		<div class="order-aside-link-wrp">
			<nuxt-link class="button --white" to="">Перейти к оплате</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {

}
</script>