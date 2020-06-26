<template>
    <div class="category-grid">
        <nuxt-link class="category-grid-item" to 
            :class="{'--large' : (index + 1) % 4 === 1}"
            v-for="(item, index) in items" :key="index">
            <img src="/images/news.png" alt="Skiny image">
            <p class="category-grid-name">{{item}}</p>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                'Макияж',
                'Уход за лицом',
                'Уход за телом',
                'Уход за волосами',
                'Гигиена',
                'Бренды',
            ]
        }
    }
}
</script>