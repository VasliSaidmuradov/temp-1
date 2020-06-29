<template>
    <div class="mob-search">
        <div class="mob-search-overlay" @click="closeSearch"></div>
        <div class="mob-search-inner">
            <input type="text" placeholder="Хочу купить">
            <button><search /></button>
        </div>
    </div>
</template>

<script>
import search from '@/static/icons/search-icon.svg'
export default {
    methods: {
        closeSearch() {
            this.$emit('closeSearch')
        }
    },
    components: {
        search
    }
}
</script>