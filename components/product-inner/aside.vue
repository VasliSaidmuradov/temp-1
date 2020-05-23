<template>
	<div class="product-aside">
    <!-- {{ info.quantity }} -->
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
					<span>150 бонусов</span> для <nuxt-link to>зарегистрированного</nuxt-link> покупателя
				</p>
			</div>
			<button @click="addToCart" :disabled="!info.quantity" class="button --main-color">Добавить в корзину</button>
			<button @click="toggleFavorite(info)" :class="{'-added' : isFavorite(info)}" class="button --white">
        <favorites-icon />
        В избранное
      </button>
		</div>
		<!-- <nuxt-link class="product-page-link" :to="info.brand.slug">Перейти к производителю</nuxt-link> -->
		<!-- <img :src="info.brand.image" :alt="`/catalog/${info.brand.name}`" class="product-aside-brand"> -->
	</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import favoritesIcon from '@/static/icons/favorites-icon2.svg'

export default {
  props: {
    info: Object
  },
  components: {
    favoritesIcon
  },
  data() {
    return {
      count: 1,
    }
  },
	computed: {
    ...mapGetters({
      isInCart: 'cart/IS_PRODUCT_IN_CART',
      getCartQuantity: 'cart/GET_CART_QUANTITY',
      isFavorite: "user/IS_FAVORITE"
    }),
		tomorrow() {
			const msInADay = 60 * 60 * 24 * 1000
			const today = Date.now()
			return today + msInADay
		}
  },
  methods: {
    ...mapActions({
      toggleFavorite: 'user/toggleFavorite',
      increase: 'cart/increase',
      decrease: 'cart/decrease'
    }),
    addToCart() {
      this.$alert({
        message: 'Товар добавлен в корзину!',
        type: 'success'
      })
      let d = this.count - this.getCartQuantity(this.info)
      while(typeof d === 'number' && d !== 0) {
        if (d > 0) {
          d--
          this.increase(this.info)
        } else {
          d++
          this.decrease(this.info)
        }
      }
    }
   }
};
</script>
