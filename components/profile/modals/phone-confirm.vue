<template>
  <transition name="fade">
    <div v-if="isOpen" class="profile-modal --text-center">
      <div class="profile-modal-overlay" @click="close"></div>
      <div class="profile-modal-inner">
        <button class="profile-modal-close" @click="close"></button>
        <img src="/icons/sms.svg" alt="Skiny icon" class="profile-modal-icon" />
        <h4 class="profile-modal-title">Подтверждение</h4>
        <p class="profile-modal-text">
          Код с подтверждением был отправлен на номер
          <b>+{{ confirmPhone }}</b>
        </p>
        <client-only>
          <the-mask :mask="['####']" class="profile-modal-input" required />
        </client-only>
        <button class="button --main-color" @click="confirm">Подтвердить</button>
        <button class="profile-modal-btn --no-border" @click="back">Использовать другой номер</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isOpen: "GET_PROFILE_PHONE_CONFIRM",
      confirmPhone: "user/GET_CONFIRM_PHONE"
    })
  },
  methods: {
    close() {
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", false);
    },
    confirm() {
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", false);
      this.$store.commit("SET_PROFILE_PHONE_SUCCESS", true);
    },
    back() {
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", false);
      this.$store.commit("SET_PROFILE_PHONE_EDIT", true);
    }
  }
};
</script>