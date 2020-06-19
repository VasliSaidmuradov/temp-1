<template>
	<div class="order-aside">
    <!-- {{  }} -->
		<div class="order-aside-bonus-wrp">
			<img src="/icons/bonus-icon.svg" alt="Skiny icon" class="order-aside-icon">
			<p class="order-aside-text" v-if="$checkAuth()">
				У вас есть <span>{{ $formatMoney($getUser().bonus ? $getUser().bonus : 0) }} бонусов</span>
			</p>
			<p class="order-aside-text" v-else>
				<span>150 бонусов</span> для зарегестрированного покупателя
			</p>
		</div>
		<div class="order-aside-input-wrp" v-if="$checkAuth() && $getUser().bonus">
			<input type="number" class="order-aside-input" v-model="bonusesUsed" step="1" :max="$getUser().bonus">
			<button @click="useBonuses(bonusesused)" class="order-aside-apply">Применить</button>
		</div>
		<div class="order-aside-list">
			<div class="order-aside-row">
				<p class="order-aside-title">Товары ({{ cartQuantity }})</p>
				<p class="order-aside-list-price">{{ $formatMoney(sum) }} ₸</p>
			</div>
			<!-- <div class="order-aside-row">
				<p class="order-aside-title">Доставка</p>
				<p class="order-aside-list-price">{{ delivery }} ₸</p>
			</div> -->
			<div class="order-aside-row">
				<p class="order-aside-title">Скидка</p>
				<p class="order-aside-list-price --red">-{{ cartQuantity ? discount: 0 }} ₸</p>
			</div>
		</div>
		<div class="order-aside-total">
			<div class="order-aside-row">
				<p class="order-aside-total-title">Итого</p>
				<p class="order-aside-total-text">{{ $formatMoney(total) }} ₸</p>
			</div>
		</div>
		<div class="order-aside-link-wrp">
			<button class="button --white" @click="$router.push('/checkout')" :disabled="!cartQuantity">Перейти к оформлению</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
		return {
      isAuth: false,
      bonusesUsed: null
    }
  },
  computed: {
    ...mapGetters({
      sum: 'cart/GET_TOTAL',
      bonuses: 'cart/GET_BONUSES',
      products: 'cart/GET_PRODUCTS',
      discount: 'cart/GET_DISCOUNT',
      cartQuantity: "cart/GET_QUANTITY"
    }),
    // delivery() {
		// 	return this.sum >= 7000 ? 0 : 500
		// },
		total() {
			return this.sum - this.discount
		}
  },
  	mounted() {
		this.bonusesUsed = this.bonuses ? this.bonuses : null
	},
	watch: {
		bonusesUsed: function(val) {
			if (val < 0) {
				this.bonusesUsed = Math.abs(val)
			}
			if (!this.$checkAuth()) {
				this.$alert({
					message: 'Зарегистрируйтесь, чтобы использовать бонусы.',
					type: 'error',
				})
				return
			}

			if (val > this.$getUser().bonus) {
				this.$alert({
					message: 'У вас недостаточно бонусов',
					type: 'error',
				})
				this.bonusesUsed = this.$getUser().bonus
			}
		}
  },
  methods: {
    ...mapActions({
      useBonuses: 'cart/useBonuses'
    })
  }
}
</script>
