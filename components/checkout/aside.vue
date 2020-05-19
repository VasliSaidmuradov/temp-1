<template>
	<div class="order-aside">
		<div class="order-aside-products">
			<div class="order-aside-product" v-for="product in products.data" :key="product.id">
				<div class="order-aside-product-img">
					<img :src="product.image" :alt="product.name">
				</div>  
				<p class="order-aside-product-name">{{ product.name }}</p>
			</div>
		</div>
		<div class="order-aside-list">
			<div class="order-aside-row">
				<p class="order-aside-title">Товары ({{ cartQuantity }})</p>
				<p class="order-aside-list-price">{{ $formatMoney(sum) }} ₸</p>
			</div>
			<div class="order-aside-row">
				<p class="order-aside-title">Скидка</p>
				<p class="order-aside-list-price --red">-{{ $formatMoney(discount) }} ₸</p>
			</div>
		</div>
		<div class="order-aside-total">
			<div class="order-aside-row">
				<p class="order-aside-total-title">Итого</p>
				<p class="order-aside-total-text">{{ $formatMoney(sum - discount) }} ₸</p>
			</div>
		</div>
		<div class="order-aside-link-wrp">
			<nuxt-link class="button --white" to="" @click.native="checkout">Перейти к оплате</nuxt-link>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      products: 'cart/GET_PRODUCTS',
      sum: 'cart/GET_TOTAL',
      bonuses: 'cart/GET_BONUSES',
      discount: 'cart/GET_DISCOUNT',
      cartQuantity: "cart/GET_QUANTITY"
    })
  },
  methods: {
	  checkout() {
		  this.$store.commit('cart/setCheckoutModal', true)
	  }
  }
}
</script>
