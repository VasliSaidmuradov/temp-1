<template>
    <div>
        <Header></Header>
       	<div class="layout-content">
        	<nuxt />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/partials/header'
import Footer from '@/components/partials/footer'
export default {
    components: {
        Header,
        Footer
    }
}
</script>
