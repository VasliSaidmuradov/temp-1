<template>
	<div class="mobile-menu" :class="{'--open' : isOpen}">
		<div class="container">
			<nuxt-link class="mobile-menu-fav" @click.native="close" to="/favorites">Избранное</nuxt-link>
			<nav class="mobile-menu-nav">
				<nuxt-link class="mobile-menu-main-link" @click.native="close" to="/catalog">Категории</nuxt-link>
				<nuxt-link class="mobile-menu-main-link --red-text" @click.native="close" to="">Акции</nuxt-link>
			</nav>
			<nuxt-link class="mobile-menu-link" @click.native="close" to="/help/bonuses">Бонусы</nuxt-link>
			<nuxt-link class="mobile-menu-link" @click.native="close" to="/brand">Бренды</nuxt-link>
			<nuxt-link class="mobile-menu-link" @click.native="close" to="/help/about">О компании</nuxt-link>
			<nuxt-link class="mobile-menu-link" @click.native="close" to="/contacts">Контакты</nuxt-link>
			<div class="mobile-menu-phone-wrp">
				<a href="tel:87772623060" @click="close" class="mobile-menu-phone">8 (777) 262-30-60</a>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters({
			isOpen: 'menu/GET_MENU_STATE'
		})
	},
	methods: {
		close() {
			this.$store.commit('menu/TOGGLE_MENU_STATE', false)
		}
	}
}
</script>
