<template>
	<div class="product-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="">Главная / </nuxt-link>
				<nuxt-link to="">Красота и здоровье / </nuxt-link>
				<nuxt-link to="">Макияж</nuxt-link>
			</div>
			<div class="product-page-name-wrp">
				<p class="product-page-brand">JM Solution</p>
				<p class="product-page-name">Derma care centella repair capsule mask</p>
			</div>
			<div class="product-page-row">
				<div class="product-page-col">
					<images />
				</div>
				<div class="product-page-col">
					<info />
				</div>
				<div class="product-page-col">
					<product-aside />
				</div>
			</div>
			<other />
			<similar />
		</div>
		<div class="product-page-mobile-btn">
			<!-- <button class="button --main-color">Добавить в корзину</button> -->
			<div class="product-counter">
				<button class="product-counter-decrease"></button>
				<span>1 шт</span>
				<button class="product-counter-increase"></button>
			</div>
			<button class="product-page-add-favorites"></button>
		</div>
	</div>
</template>

<script>
import images from '@/components/product-inner/images'
import info from '@/components/product-inner/info'
import productAside from '@/components/product-inner/aside'
import similar from '@/components/product-inner/similar'
import other from '@/components/product-inner/other'

export default {
	components: {
		images,
		info,
		productAside,
		similar,
		other
	}
}
</script>