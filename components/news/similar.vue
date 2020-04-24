<template>
    <div class="news-similar">
        <div class="container">
            <h4 class="news-similar-title">Другие публикации</h4>
            <div class="news-similar-row">
                <item v-for="(item,index) in 4" :key="index" />
            </div>
        </div>
    </div>
</template>

<script>
import item from '@/components/news/item'
export default {
    components: {
        item
    }
}
</script>