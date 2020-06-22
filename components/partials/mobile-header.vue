<template>
	<header class="mobile-header">
		<div class="mobile-header-row">
			<button @click="toggleMenu" class="mobile-header-burger"></button>
			<button class="mobile-header-search"></button>
			<nuxt-link class="mobile-header-logo" to="/"><img src="/images/logo.png" alt="Skiny logo"></nuxt-link>
			<button @click="openAuth" class="mobile-header-profile"></button>
			<!-- <nuxt-link class="mobile-header-profile" to="/profile"></nuxt-link> -->
			<nuxt-link class="mobile-header-favorites" to="/favorites">
				<span class="header-icon-badge" v-if="favoritesQuantity > 0">{{ favoritesQuantity }}</span>
			</nuxt-link>
			<nuxt-link class="mobile-header-cart" to="/cart">
				<span class="header-icon-badge" v-if="cartQuantity > 0">{{ cartQuantity }}</span>
			</nuxt-link>
		</div>
	</header>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
		cartQuantity: 'cart/GET_QUANTITY',
		favoritesQuantity: "user/GET_QUANTITY",
    })
  },
	methods: {
		...mapMutations({
			toggleMenu: 'menu/TOGGLE_MENU_STATE'
		}),
		openAuth() {
			document.body.classList.add('--hidden'),
            this.$store.commit('auth/SET_MODAL_STATE', true)
		}
	}
}
</script>
