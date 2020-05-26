<template>
	<div class="profile-page">
		<remove-order />
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="">Главная / </nuxt-link>
				<nuxt-link to="">Мой кабинет</nuxt-link>
			</div>
			<div class="profile-page-row">
				<div class="profile-page-left">
					<profile-nav />
				</div>
				<div class="profile-page-right">
					<h5 class="profile-page-title" v-if="!$getUser().orders.length">Список заказов пуст</h5>
					<nuxt-link to="/catalog" class="button --black">Перейти к каталогу</nuxt-link>
					<history-table />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileNav from '@/components/profile/nav'
import historyTable from '@/components/profile/history-table'
import removeOrder from '@/components/profile/modals/remove-order'

export default {
	components: {
		profileNav,
		historyTable,
		removeOrder
  },
  middleware: ['auth'],
}
</script>
