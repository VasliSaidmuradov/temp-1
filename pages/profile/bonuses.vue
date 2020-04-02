<template>
	<div class="profile-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/">Главная / </nuxt-link>
				<nuxt-link to="/profile">Мой кабинет / </nuxt-link>
				<nuxt-link to="">Бонусы</nuxt-link>
			</div>
			<div class="profile-page-row">
				<div class="profile-page-left">
					<profile-nav />
				</div>
				<div class="profile-page-right">
					<h5 class="profile-page-title">Мой баланс</h5>
					<p class="profile-page-text">У вас 250 баллов</p>
					<p class="profile-page-text">У вас нет баллов с покупок.</p>
					<nuxt-link class="profile-page-link" to="">Подробнее о баллах</nuxt-link>
					<bonuses-table />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileNav from '@/components/profile/nav'
import bonusesTable from '@/components/profile/bonuses-table'

export default {
	components: {
		profileNav,
		bonusesTable
	}
}
</script>