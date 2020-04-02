<template>
	<div class="category-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="">Главная / </nuxt-link>
				<nuxt-link to="">Красота и здоровье / </nuxt-link>
				<nuxt-link to="">Макияж</nuxt-link>
			</div>
			<h1 class="category-page-title">Макияж</h1>
			<div class="row">
				<div class="left-col">
					<nuxt-link class="category-page-back" to="">Все категории</nuxt-link>
					<subcategories />
					<category-filter />
				</div>
				<div class="category-page-mob">
					<p class="category-page-total">23 товара</p>
					<nuxt-link class="category-page-back" to="">Все категории</nuxt-link>
					<div class="category-page-row">
						<div class="category-page-sort">
							<p>Сортировать:</p>
							<select>
								<option value="">По умолчанию</option>
								<option value="">По возрастанию</option>
								<option value="">По убыванию</option>
							</select>
						</div>
						<button class="category-page-filter">Фильтр</button>
					</div>
				</div>
				<div class="right-col">
					<div class="category-page-sort-wrp">
						<p class="category-page-total">23 товара</p>
						<div class="category-page-sort">
							<p>Сортировать:</p>
							<select>
								<option value="">По умолчанию</option>
								<option value="">По возрастанию</option>
								<option value="">По убыванию</option>
							</select>
						</div>
					</div>
					<div class="category-page-product-wrp">
						<product v-for="(product, index) in 9" :key="index" />
					</div>
				</div>
			</div>
			<pagination />
		</div>
	</div>
</template>

<script>
import subcategories from '@/components/category/subcategories'
import categoryFilter from '@/components/category/filter'
import product from '@/components/partials/product'
import pagination from '@/components/category/pagination'

export default {
	components: {
		subcategories,
		categoryFilter,
		product,
		pagination
	}
}
</script>