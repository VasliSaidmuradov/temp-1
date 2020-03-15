<template>
    <div>
        <Header></Header>
        <nuxt />
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
