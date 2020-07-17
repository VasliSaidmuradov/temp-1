<template>
    <div class="category-brand">
        <div class="category-brand-logo">
            <img :src="brand.image ? brand.image : require('@/static/images/brand.png')" alt="Skiny image">
        </div>
        <div class="category-brand-text-wrp">
            <div class="category-brand-name-wrp">
                <img src="/images/brand.png" alt="Skiny image">
                <p class="category-brand-name">{{ brand.name }}</p>
            </div>
            <div class="category-brand-text" v-html="brand.description"></div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    brand: Object
  }
}
</script>

<style>

</style>
