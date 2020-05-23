<template>
	<div class="profile-page">
		<phone-success />
		<edit-phone />
		<phone-confirm />
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
					<info />
					<!-- <subscribes /> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import phoneSuccess from '@/components/profile/modals/phone-success'
import editPhone from '@/components/profile/modals/edit-phone'
import phoneConfirm from '@/components/profile/modals/phone-confirm'
import profileNav from '@/components/profile/nav'
import info from '@/components/profile/info'
import subscribes from '@/components/profile/subscribes'
import { mapActions } from 'vuex'

export default {
	components: {
		profileNav,
		info,
		subscribes,
		phoneSuccess,
		editPhone,
		phoneConfirm
  	},
 	middleware: ['auth'],
  	methods: {
		...mapActions({
			logout: 'auth/logout'
		})
  	}
}
</script>
