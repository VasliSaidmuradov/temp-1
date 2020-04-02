<template>
	<div class="profile-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/">Главная / </nuxt-link>
				<nuxt-link to="/profile">Мой кабинет</nuxt-link>
				<nuxt-link to="">Адреса доставки</nuxt-link>
			</div>
			<div class="profile-page-row">
				<div class="profile-page-left">
					<profile-nav />
				</div>
				<div class="profile-page-right">
					<h5 class="profile-page-title">Вы пока не добавили ни одного адреса.</h5>
					<button class="button --black">Добавить адрес</button>
					<add-address />
					<address-list />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileNav from '@/components/profile/nav'
import addAddress from '@/components/profile/add-address'
import addressList from '@/components/profile/address-list'

export default {
	components: {
		profileNav,
		addAddress,
		addressList
	}
}
</script>