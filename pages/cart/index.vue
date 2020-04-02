<template>
	<div class="cart-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="">Главная / </nuxt-link>
				<nuxt-link to="">Корзина</nuxt-link>
			</div>
			<h1 class="section-title">В корзине 3 товара</h1>
			<div class="cart-page-row">
				<list />
				<cart-aside />
			</div>
			<slider />
		</div>
	</div>
</template>

<script>
import list from '@/components/cart/list'
import cartAside from '@/components/cart/aside'
import slider from '@/components/cart/slider'

export default {
	components: {
		list,
		slider,
		cartAside
	}
}
</script>