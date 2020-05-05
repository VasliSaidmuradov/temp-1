<template>
    <div class="search-page">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная /</nuxt-link>
                <nuxt-link to>Результаты поиска</nuxt-link>
            </div>
            <h1 class="search-page-title">По запросу «крем» найдено 563 товара</h1>
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
            <div class="search-page-row">
                <product v-for="product in newsArrivals.data" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import product from '@/components/partials/product'
import {mapGetters} from 'vuex'

export default {
    middleware: ['home'],
    computed: {
        ...mapGetters({
            newsArrivals: "product/GET_NEWS",
            products: 'product/GET_PRODUCTS'
        })
    },
    components: {
        product
    }
}
</script>