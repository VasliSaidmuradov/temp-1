<template>
	<div class="favorites-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="/">Главная / </nuxt-link>
				<nuxt-link to="">Избранное</nuxt-link>
			</div>
			<h1 class="section-title">Избранное</h1>
			<div class="favorites-page-row">
				<product v-for="(item, index) in 5" :key="index" />
			</div>
		</div>
	</div>
</template>

<script>
import product from '@/components/partials/product'

export default {
	components: {
		product
	}
}
</script>