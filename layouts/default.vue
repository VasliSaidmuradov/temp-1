<template>
  <div class="layout">
    <Header v-if="!$isMobile()"></Header>
    <mobile-header v-if="$isMobile()"/>
    <mobile-menu v-if="$isMobile()"/>
    <auth-modal />
    <verify-modal />
    <div class="layout-content">
      <transition name="page-fade">
        <nuxt />
      </transition>
    </div>
    <div class="notification-wrapper">
      <notification
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"
      />
    </div>
    <Footer />
    <preloader />
    <ToTop />
  </div>
</template>

<script>
import Header from "@/components/partials/header";
import mobileHeader from "@/components/partials/mobile-header";
import Footer from "@/components/partials/footer";
import authModal from "@/components/partials/auth-modal";
import mobileMenu from "@/components/partials/mobile-menu";
import notification from "@/components/partials/notification";
import Preloader from "@/components/partials/Preloader.vue";
import VerifyModal from "@/components/partials/VerifyModal.vue";
import ToTop from "@/components/partials/ToTop.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Footer,
    authModal,
    mobileHeader,
    mobileMenu,
    notification,
    Preloader,
    VerifyModal,
    ToTop,
  },
  middleware: ['cartProducts'],
  watch: {
    "$route.fullPath": function() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapGetters({
      isOverlayActive: "GET_OVERLAY",
      notifications: "notification/GET_NOTIFICATIONS"
    })
  }
};
</script>
