<template>
	<!-- <div class="profile-page"> -->
		<div class="container">
			<div class="profile-confirm">
				<img class="profile-success-image" src="/icons/success.svg" alt="Success icon">
				<p class="profile-success-title">Email успешно подтвержден!</p>
				<!-- <nuxt-link class="profile-page-btn" to="/profile">Перейти в личный кабинет</nuxt-link> -->
				<nuxt-link class="profile-modal-btn --gray" to="/">Продолжить покупки</nuxt-link>
			</div>
		</div>
	<!-- </div> -->
</template>
<script>
import successIcon from '@/static/icons/success-icon.svg'

export default {
  components: {
    successIcon
  }
}
</script>

<style>

</style>
