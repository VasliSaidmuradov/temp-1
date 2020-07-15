<template>
	<div class="product-aside">
    <!-- {{ info.quantity }} -->
		<div class="product-aside-inner">
			<div class="product-aside-price-wrp">
				<p class="product-aside-price" :class="{'--sale' : info.old_price}">{{ info.price }} ₸</p>
				<p v-if="info.old_price" class="product-aside-old-price">{{ info.old_price }} ₸</p>
			</div>
			<p v-if="info.quantity" class="product-aside-available">В наличии на складе</p>
			<p v-else class="product-aside-not-available">Нет в наличии</p>
			<h3 class="product-aside-title">Бонусы за покупки</h3>
			<div class="product-aside-row">
				<img src="/icons/bonus-icon.svg" alt="Skiny icon" class="product-aside-icon">
				<p v-if="!$checkAuth()" class="product-aside-text">
					<span>500 бонусов</span> для <nuxt-link to @click.native="openAuth">зарегистрированного</nuxt-link> покупателя
				</p>
        <p v-else class="product-aside-text">
					<span>{{ bonuses }} бонусов</span> будет начислено вам за покупку
				</p>
			</div>
      <div v-if="isInCart(info)" class="product-counter">
        <!-- <button @click="count = count > 1 ? count - 1 : 1" class="product-counter-decrease"></button> -->
        <button class="product-counter-decrease" @click="decreaseCount(info)"></button>
        <span>{{ getCartQuantity(info) }} {{ info.tag ? info.tag.unit : 'шт' }}</span>
        <button class="product-counter-increase" :class="{}" :disabled="info.quantity <= getCartQuantity(info)" @click="increaseCount(info)"></button>
      </div>
			<button v-else @click="addToCart" :disabled="!info.quantity" class="button button-add-to-cart" :class="{'--disabled': !info.quantity, '--main-color': info.quantity}">
        <cart-icon />
        Добавить в корзину</button>
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
import favoritesIcon from '@/static/icons/fav-icon.svg'
import cartIcon from '@/static/icons/cart-icon.svg'

export default {
  props: {
    info: Object
  },
  components: {
    favoritesIcon,
    cartIcon
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
    },
    bonuses() {
      return Math.ceil(this.info.price * 0.05) * (this.getCartQuantity(this.info) ? this.getCartQuantity(this.info) : 1)
    }
  },
  methods: {
    ...mapActions({
      toggleFavorite: 'user/toggleFavorite',
      increase: 'cart/increase',
      decrease: 'cart/decrease',
      fetchCartProducts: 'cart/fetchCartProducts',
    }),
    openAuth() {
      document.body.classList.add("--hidden"),
      this.$store.commit("auth/SET_MODAL_STATE", true);
    },
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
      this.fetchCartProducts()
    },
    decreaseCount(prod) {
      this.decrease(prod)
      if (this.count > 1) { 
        this.count--
      } else 1;
      if(this.count === 1) this.isAdded  = false;
    },
    increaseCount(prod) {
      // console.log(this.product.quantity, this.product.limit)
      this.increase(prod);
      this.count++;
      this.isAdded = true;
      if (this.info.limit && this.info.limit <= this.count) {
        this.$alert({
          message: `На данный продукт установлен лимит ${this.info.limit *
            this.info.amount} ${this.info.tag ? this.info.tag.unit : ''}`,
          type: "error"
        });
        return;
      }
      if (this.info.quantity && this.info.quantity <= this.count) {
        this.$alert({
          message: `Достигнуто максимальное количество товара`,
          type: "error"
        });
        return;
      }   
    },
  }
};
</script>
