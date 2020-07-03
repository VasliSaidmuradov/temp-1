<template>
	<nav class="profile-nav">
		<div class="profile-nav-inner">
			<nuxt-link class="profile-nav-link" to="/profile">
				<profile />
				Профиль
			</nuxt-link>
			<nuxt-link class="profile-nav-link" to="/profile/bonuses">
				<bonus />
				Бонусы
			</nuxt-link>
			<!-- <nuxt-link class="profile-nav-link" to="/profile/addresses">Адреса доставки</nuxt-link> -->
			<nuxt-link class="profile-nav-link" to="/profile/order-history">
				<time-icon />
				История заказов
			</nuxt-link>
		</div>
		<span class="profile-nav-link --red" to="" @click="logout">Выйти</span>
	</nav>
</template>
<script>
import { mapActions } from 'vuex'
import profile from '@/static/icons/profile-icon.svg'
import bonus from '@/static/icons/bonus-icon.svg'
import timeIcon from '@/static/icons/time.svg'
export default {
	components: {
		profile,
		bonus,
		timeIcon
	},
	methods: {
		...mapActions({
			logout: 'auth/logout',
		}),
	},
}
</script>
