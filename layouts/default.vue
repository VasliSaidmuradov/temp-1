<template>
    <div>
        <Header></Header>
        <mobile-header />
        <mobile-menu />
        <auth-modal />
       	<div class="layout-content">
        	<nuxt />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/partials/header'
import mobileHeader from '@/components/partials/mobile-header'
import Footer from '@/components/partials/footer'
import authModal from '@/components/partials/auth-modal'
import mobileMenu from '@/components/partials/mobile-menu'

export default {
    components: {
        Header,
        Footer,
        authModal,
        mobileHeader,
        mobileMenu
    }
}
</script>
