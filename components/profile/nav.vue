<template>
	<nav class="profile-nav">
		<nuxt-link class="profile-nav-link" to="/profile">Профиль</nuxt-link>
		<nuxt-link class="profile-nav-link" to="/profile/bonuses">Бонусы</nuxt-link>
		<!-- <nuxt-link class="profile-nav-link" to="/profile/addresses">Адреса доставки</nuxt-link> -->
		<nuxt-link class="profile-nav-link" to="/profile/order-history">История заказов</nuxt-link>
		<span class="profile-nav-link --red" to="" @click="logout">Выйти</span>
	</nav>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	methods: {
		...mapActions({
			logout: 'auth/logout',
		}),
	},
}
</script>
