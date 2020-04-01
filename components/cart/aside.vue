<template>
	<div class="order-aside">
		<div class="order-aside-bonus-wrp">
			<img src="/icons/bonus-icon.svg" alt="Skiny icon" class="order-aside-icon">
			<p class="order-aside-text" v-if="isAuth">
				У вас есть <span>150 бонусов</span>
			</p>
			<p class="order-aside-text" v-else>
				<span>150 бонусов</span> для зарегестрированного покупателя
			</p>
		</div>
		<div class="order-aside-input-wrp" v-if="isAuth">
			<input type="number" class="order-aside-input">
			<button class="order-aside-apply">Применить</button>
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
			<nuxt-link class="button --white" to="/checkout">Перейти к оформлению</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isAuth: false
		}
	}
}
</script>