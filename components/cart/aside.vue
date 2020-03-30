<template>
	<div class="cart-aside">
		<div class="cart-aside-bonus-wrp">
			<img src="/icons/bonus-icon.svg" alt="Skiny icon" class="cart-aside-icon">
			<p class="cart-aside-text" v-if="isAuth">
				У вас есть <span>150 бонусов</span>
			</p>
			<p class="cart-aside-text" v-else>
				<span>150 бонусов</span> для зарегестрированного покупателя
			</p>
		</div>
		<div class="cart-aside-input-wrp" v-if="isAuth">
			<input type="number" class="cart-aside-input">
			<button class="cart-aside-apply">Применить</button>
		</div>
		<div class="cart-aside-list">
			<div class="cart-aside-row">
				<p class="cart-aside-title">Товары (3)</p>
				<p class="cart-aside-list-price">4 590 ₸</p>
			</div>
			<div class="cart-aside-row">
				<p class="cart-aside-title">Скидка</p>
				<p class="cart-aside-list-price --red">-590 ₸</p>
			</div>
		</div>
		<div class="cart-aside-total">
			<div class="cart-aside-row">
				<p class="cart-aside-total-title">Итого</p>
				<p class="cart-aside-total-text">4 590 ₸</p>
			</div>
		</div>
		<div class="cart-aside-link-wrp">
			<nuxt-link class="button --white" to="">Перейти к оформлению</nuxt-link>
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