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
        if (!this.phone || (this.phone && this.phone.length !== 11)) {
          this.$alert({
            message: "Введите корректный номер телофона.",
            type: "error"
          });
          return;
        }
        if (this.phone === this.$getUser().phone) {
          this.$alert({
            message: "Введите другой номер телофона.",
            type: "error"
          });
          return
        }
        if (this.phone != this.$getUser().phone) {
          const res = await this.updateProfile({ login: this.phone });
          // console.log("res: ", res);
          if (this.$getError("updateProfile")) {
            
            this.$alert({
              message: this.$getError("updateProfile") === "validation.unique" ? "Такой номер уже существует" : "Возникла ошибка при регистрации номера телефона",
              type: "error"
            })
            return;
          }
          if (!this.$getError("updatePhone")) {
            await this.$store.commit("SET_PROFILE_PHONE_EDIT", false);
            await this.$store.commit("user/SET_CONFIRM_PHONE", this.phone);
            this.$store.commit("SET_PROFILE_PHONE_CONFIRM", true);
          } else {
            this.$alert({
              message: "Возникла ошибка при регистрации номера телефона",
              type: "error"
            });
          }
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  }
};
</script>
