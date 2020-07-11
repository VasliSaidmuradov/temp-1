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
						<button @click="decreaseCount(product)" class="product-counter-decrease"></button>
						<span>{{ getCartQuantity(product) }} {{ product.tag ? product.tag.unit : 'шт' }}</span>
						<button :disabled="product.quantity <= getCartQuantity(product)" @click="increaseCount(product)" class="product-counter-increase"></button>
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
      count: 1,
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
    },
    decreaseCount(prod) {
      this.decrease(prod)
      if (this.count > 1) { 
        this.count--
      } else 1;
      if(this.count === 1) this.isAdded  = false;
    },
    increaseCount(prod) {
      console.log('> ', prod.limit && prod.limit <= this.count)
      this.increase(prod);
      this.count++;
      this.isAdded = true;
      if (prod.limit && prod.limit <= this.count) {
        this.$alert({
          message: `На данный продукт установлен лимит ${prod.limit *
            prod.amount} ${prod.tag ? prod.tag.unit : ''}`,
          type: "error"
        });
        return;
      }
      if (prod.quantity && prod.quantity <= this.count) {
        this.$alert({
          message: `Достигнуто максимальное количество товара`,
          type: "error"
        });
        return;
      }   
    },
	}
}
</script>
