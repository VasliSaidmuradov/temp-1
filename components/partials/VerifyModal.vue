<template>
  <transition name="fade">
    <form @submit.prevent="sendVerify" v-if="user" class="verify-modal">
      <div class="verify-modal-overlay" @click="closeModal"></div>
      <div class="verify-modal-inner">
        <img src="/icons/success.svg" alt="Skiny icon" class="checkout-modal-icon" />

        <button type="button" class="verify-modal-close" @click="closeModal"></button>
        <h3 class="verify-modal-title">Введите код подверждения</h3>
        <p class="verify-modal-text">На ваш номер телефона отправлен код подтверждения</p>
        <input type="tel" class="auth-modal-input" v-model="code" placeholder="Код" />
        <div class="error-text" v-if="$getError('validateCode')">{{ $getError('validateCode') }}</div>
        <button type="submit" class="verify-modal-btn">Проверить</button>
      </div>
    </form>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      code: null
    };
  },
  computed: {
    ...mapGetters({
      user: "GET_VERIFY_MODAL"
    })
  },
  methods: {
    ...mapActions({
      verify: "auth/validateCode",
      signin: "auth/signin"
    }),
    closeModal() {
      this.$store.commit("SET_VERIFY_MODAL", false);
    },
    async sendVerify() {
      await this.verify({ login: this.user.login, token: this.code });
      if (!this.$getError("validateCode")) {
        await this.signin(this.user);
        this.closeModal();
        await this.$router.push("/profile");
      }
    }
  }
};
</script>
