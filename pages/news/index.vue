<template>
    <div class="news-page">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <nuxt-link to="">Новости </nuxt-link>
            </div>
            <div class="news-page-row">
                <item v-for="(item, index) in 8" :key="index" />
            </div>
            <pagination />
        </div>
    </div>
</template>

<script>
import pagination from '@/components/partials/pagination'
import item from '@/components/news/item'
export default {
    components: {
        item,
        pagination
    }
}
</script>