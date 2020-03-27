<template>
	<div class="catalog-page">
		<div class="container">
			<div class="breadcrumbs">
				<nuxt-link to="">Главная / </nuxt-link>
				<nuxt-link to="">Каталог</nuxt-link>
			</div>
			<nav class="catalog-page-nav">
				<nuxt-link v-for="(btn,index) in 10" :key="index" class="catalog-page-nav-btn" to="">
					<img src="/icons/Makeup.png" alt="Skiny icon" class="catalog-page-icon">
					<p>Детские товары</p>
				</nuxt-link>
			</nav>
			<div class="catalog-page-category-wrp">
				<nuxt-link to="" class="catalog-page-category">Товары для дома</nuxt-link>
				<div class="catalog-page-row">
					<div class="catalog-page-col" v-for="(subcat, index) in 6" :key="index">
						<nuxt-link class="catalog-page-subcategory" to="">Хранение продуктов</nuxt-link>
						<nuxt-link class="catalog-page-link" to="">Холодильники</nuxt-link>
						<nuxt-link class="catalog-page-link" to="">Холодильники для вина</nuxt-link>
						<nuxt-link class="catalog-page-link" to="">Холодильники для ферментации мяса</nuxt-link>
						<nuxt-link class="catalog-page-link" to="">Морозильные камеры</nuxt-link>
						<nuxt-link class="catalog-page-link" to="">Аксессуары для холодильника</nuxt-link>
						<nuxt-link class="catalog-page-link" to="">Медицинские холодильники</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>