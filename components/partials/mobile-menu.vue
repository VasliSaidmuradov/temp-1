<template>
	<div class="mobile-menu" :class="{'--open' : isOpen}">
		<nav class="mobile-menu-nav">
			<div class="mobile-menu-dropdown" v-for="category in categories" :key="category.id">
				<div class="mobile-menu-category" 
					:class="{'--open' : categoryIndex === category.id}"
					@click="toggleDropdown(category.id)">
					<img :src="category.icon" alt="Skiny icon" class="mobile-menu-icon">
					<p class="mobile-menu-category-name">{{category.name}}</p>
				</div>
				<div v-if="categoryIndex === category.id">
					<nuxt-link class="mobile-menu-all" :to="`/catalog/${category.slug}`" @click.native="close">Перейти к категории</nuxt-link>
					<div v-for="subcategory in category.subcategories" :key="subcategory.id">
						<div class="mobile-menu-subcategory" 
							:class="{'--open': subcategoryIndex === subcategory.id}"
							@click="toggleSubcat(subcategory.id)">{{subcategory.name}}</div>
						<div v-if="subcategoryIndex === subcategory.id">
							<nuxt-link class="mobile-menu-link" 
								@click.native="close"
								:to="`/catalog/${category.slug}/${subcategory.slug}`">Все</nuxt-link>
							<nuxt-link class="mobile-menu-link"
								@click.native="close" 
								v-for="tag in subcategory.tags" :key="tag.id"
								:to="`/catalog/${category.slug}/${subcategory.slug}/${tag.slug}`">{{tag.name}}</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<div class="container">
			<!-- <nuxt-link class="mobile-menu-fav" @click.native="close" to="/favorites">Избранное</nuxt-link> -->
			<nuxt-link to="/help/payment" @click.native="close" class="mobile-menu-bot-link">Оплата</nuxt-link>
            <nuxt-link to="/help/delivery" @click.native="close" class="mobile-menu-bot-link">Доставка</nuxt-link>
            <nuxt-link to="/help/how-to-order" @click.native="close" class="mobile-menu-bot-link">Как сделать заказ</nuxt-link>
            <nuxt-link to="/help/bonuses" @click.native="close" class="mobile-menu-bot-link">Бонусы</nuxt-link>
            <nuxt-link to="/contacts" @click.native="close" class="mobile-menu-bot-link">Контакты</nuxt-link>
			<div class="mobile-menu-phone-wrp">
				<a href="tel:87772623060" @click="close" class="mobile-menu-phone">8 (777) 262-30-60</a>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters({
			isOpen: 'menu/GET_MENU_STATE',
			categories: 'menu/GET_CATEGORIES'
		})
	},
	data() {
		return {
			categoryIndex: null,
			subcategoryIndex: null
		}
	},
	methods: {
		toggleDropdown(i) {
			if (this.categoryIndex === i) {
				this.categoryIndex = null
			} else {
				this.categoryIndex = i
			}
		},
		toggleSubcat(i) {
			if (this.subcategoryIndex === i) {
				this.subcategoryIndex = null
			} else {
				this.subcategoryIndex = i
			}
		},
		close() {
			this.categoryIndex = null
			this.subcategoryIndex = null
			this.$store.commit('menu/TOGGLE_MENU_STATE', false)
		}
	}
}
</script>
