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
          <the-mask :mask="['####']" v-model="code" class="profile-modal-input" required />
        </client-only>
        <button
          class="button"
          :class="{ '--main-color': isValidated, '--disabled': !isValidated }"
          :disabled="!isValidated"
          @click="confirm"
        >Подтвердить</button>
        <button class="profile-modal-btn --no-border" @click="back">Использовать другой номер</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      code: null,
      isValidated: false
    };
  },
  watch: {
    code: function(val) {
      if (val && val.length === 4) this.isValidated = true;
      else this.isValidated = false;
    }
  },
  computed: {
    ...mapGetters({
      isOpen: "GET_PROFILE_PHONE_CONFIRM",
      confirmPhone: "user/GET_CONFIRM_PHONE"
    })
  },
  methods: {
    ...mapActions({
      verify: 'auth/validateCode',
      fetchUser: 'user/fetchUser'
    }),
    close() {
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", false);
    },
    confirm() {
      this.sendVerify();
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", false);
      this.$store.commit("SET_PROFILE_PHONE_SUCCESS", true);
    },
    back() {
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", false);
      this.$store.commit("SET_PROFILE_PHONE_EDIT", true);
    },
    async sendVerify() {
      await this.verify({login: this.confirmPhone, token: this.code});
      await this.fetchUser();
      this.$reloadPage();
    }
  }
};
</script>
