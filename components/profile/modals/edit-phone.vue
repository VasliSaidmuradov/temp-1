<template>
  <transition name="fade">
    <div v-if="isOpen" class="profile-modal --text-center">
      <div class="profile-modal-overlay" @click="close"></div>
      <div class="profile-modal-inner">
        <button class="profile-modal-close" @click="close"></button>
        <h4 class="profile-modal-title">Укажите новый номер</h4>
        <p class="profile-modal-text">На него мы отправим код подтверждения</p>
        <client-only>
          <the-mask
            :mask="['+# (###) ###-##-##']"
            v-model="phone"
            class="profile-modal-input"
            type="tel"
            required
          />
        </client-only>
        <button
          class="button"
          :class="{ '--main-color' : isPhoneValidated, '--disabled' : !isPhoneValidated }"
          @click="getCode"
        >Получить код</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      phone: null,
      isPhoneValidated: false
    };
  },
  watch: {
    phone: function(val) {
      if (val && val.length && val[0] != "7") {
        this.phone = "7" + val.substring(1);
      }
      if (val && val.length === 11) this.isPhoneValidated = true;
      else this.isPhoneValidated = false;
    }
  },
  computed: {
    ...mapGetters({
      isOpen: "GET_PROFILE_PHONE_EDIT"
    })
  },
  methods: {
    ...mapActions({
      updateProfile: "user/updateProfile"
    }),
    close() {
      this.$store.commit("SET_PROFILE_PHONE_EDIT", false);
    },
    async getCode() {
      try {
        console.log("111");
        if (!this.phone || (this.phone && this.phone.length !== 11)) {
          this.$alert({
            message: "Введите корректный номер телофона.",
            type: "error"
          });
          return;
        }
        console.log("222");
        if (this.phone != this.$getUser().phone) {
          console.log("333");
          const res = await this.updateProfile({ phone: this.phone });
          console.log("444", res);
          if (!this.$getError("updatePhone")) {
            console.log("555");
            await this.$store.commit("SET_PROFILE_PHONE_EDIT", false);
            await this.$store.commit("user/SET_CONFIRM_PHONE", this.phone);
            this.$store.commit("SET_PROFILE_PHONE_CONFIRM", true);
          } else {
            this.$alert({
              message: "Возникла ошибка при регистрации номера телефона",
              type: "error"
            });
          }
          console.log("666");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>