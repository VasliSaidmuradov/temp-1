<template>
	<div class="profile-page">
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
					<subscribes />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileNav from '@/components/profile/nav'
import info from '@/components/profile/info'
import subscribes from '@/components/profile/subscribes'

export default {
	components: {
		profileNav,
		info,
		subscribes
	}
}
</script>