<template>
	<div class="cart-list">
		<div v-for="product in products.data" :key="product.id">
			<div class="cart-list-row" v-if="isInCart(product)">
				<div class="cart-list-img">
					<img :src="product.image" :alt="product.name">
				</div>
				<div class="cart-list-name-wrp">
					<p v-if="product.quantity" class="cart-list-available --green">В наличии</p>
					<p class="cart-list-name">{{ product.name }}</p>
				</div>
				<div class="cart-list-btn-wrp">
					<div class="product-counter">
						<button @click="decrease(product)" class="product-counter-decrease"></button>
						<span>{{ getCartQuantity(product) }} {{ product.tag ? product.tag.unit : 'шт' }}</span>
						<button :disabled="product.quantity <= getCartQuantity(product)" @click="increase(product)" class="product-counter-increase"></button>
					</div>
					<div class="cart-list-price-wrp">
						<p class="cart-list-price">{{ $formatMoney(product.price * getCartQuantity(product)) }} ₸</p>
						<p v-if="product.old_price" class="cart-list-old-price">{{ $formatMoney(product.old_price * getCartQuantity(product)) }} ₸</p>
					</div>
					<button class="cart-list-favorites" :class="{'-added' : isFavorite(product)}" @click="toggleFavorite(product)">
						<favorites-icon />
					</button>
					<button class="cart-list-remove" @click="remove(product)"></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import favoritesIcon from "@/static/icons/favorites-icon2.svg";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		favoritesIcon
  },
  data() {
		return {
			bonusesUsed: null,
		}
	},
	computed: {
		...mapGetters({
			isFavorite: "user/IS_FAVORITE",
			products: 'cart/GET_PRODUCTS',
			isInCart: 'cart/IS_PRODUCT_IN_CART',
			getCartQuantity: 'cart/GET_CART_QUANTITY',
			sum: 'cart/GET_TOTAL',
		})
	},
	middleware: ['cart'],
	methods: {
		...mapActions({
			toggleFavorite: "user/toggleFavorite",
			increase: 'cart/increase',
			decrease: 'cart/decrease',
		}),
		remove(product) {
			while(this.getCartQuantity(product) > 0) {
				this.decrease(product)
			}
		}
	}
}
</script>
