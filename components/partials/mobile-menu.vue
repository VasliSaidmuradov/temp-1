<template>
	<div class="mobile-menu" :class="{'--open' : isOpen}">
		<div class="container">
			<div class="mobile-menu-city-wrp">
				<select>
					<option value="">Алматы</option>
					<option value="">Астана</option>
				</select>
			</div>
			<nuxt-link class="mobile-menu-fav" to="/favorites">Избранное</nuxt-link>
			<nav class="mobile-menu-nav">
				<nuxt-link class="mobile-menu-main-link" to="">Категории</nuxt-link>
				<nuxt-link class="mobile-menu-main-link" to="">Акции</nuxt-link>
				<nuxt-link class="mobile-menu-main-link" to="">Бонусы</nuxt-link>
			</nav>
			<nuxt-link class="mobile-menu-link" to="">Магазины</nuxt-link>
			<nuxt-link class="mobile-menu-link" to="">Бренды</nuxt-link>
			<nuxt-link class="mobile-menu-link" to="">Помощь покупателю</nuxt-link>
			<nuxt-link class="mobile-menu-link" to="">О компании</nuxt-link>
			<nuxt-link class="mobile-menu-link" to="">Контакты</nuxt-link>
			<div class="mobile-menu-phone-wrp">
				<a href="" class="mobile-menu-phone">8 (727) 396-18-34</a>
				<a href="" class="mobile-menu-phone">8 (727) 396-18-34</a>
				<p>Заказать звонок</p>
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
	}
}
</script>