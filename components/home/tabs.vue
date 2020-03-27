<template>
	<div class="home-products">
		<nav class="tabs-nav">
			<button class="tabs-nav-btn --active">Новые поступления</button>
			<button class="tabs-nav-btn">Бестселлеры</button>
			<button class="tabs-nav-btn">Советуем</button>
			<button class="tabs-nav-btn">Акции</button>
		</nav>
		<div class="home-products-row">
			<product v-for="(product,index) in 9" :key="index"/>
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