<template>
  <transition name="fade">
    <div v-if="loading" class="preloader">
      <div class="preloader-inner">
        <img src="/images/logo.png" alt="logo" />
        <P>Загрузка...</P>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>