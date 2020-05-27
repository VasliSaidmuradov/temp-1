<template>
    <div>
        <Header></Header>
        <mobile-header />
        <mobile-menu />
        <auth-modal />
       	<div class="layout-content">
          <transition name="page-fade">
        	  <nuxt />
          </transition>
        </div>
        <div class="notification-wrapper">
          <notification v-for="(notification, index) in notifications" :key="index" :notification="notification" />
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
import notification from '@/components/partials/notification'

import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Footer,
    authModal,
    mobileHeader,
    mobileMenu,
    notification
  },
  watch: {
    '$route.fullPath': function () {
      window.scrollTo(0, 0)
    }
  },
  computed: {
    ...mapGetters({
      isOverlayActive: 'GET_OVERLAY',
      notifications: 'notification/GET_NOTIFICATIONS',
    })
  },
}
</script>
