<template>
  <transition name="fade">
    <div class="profile-modal --text-center">
      <div class="profile-modal-overlay" @click="close"></div>
      <div class="profile-modal-inner">
        <button class="profile-modal-close" @click="close"></button>
        <h4 class="profile-modal-title">Пароль</h4>
        <input
          v-model="oldPass"
          type="password"
          class="profile-modal-input"
          placeholder="Старый пароль"
        />
        <input
          v-model="pass"
          type="password"
          class="profile-modal-input"
          placeholder="Новый пароль"
        />
        <input
          v-model="passc"
          type="password"
          class="profile-modal-input"
          placeholder="Повторите пароль"
        />
        <button
          class="button"
          :class="{ '--main-color': isPassValidated, '--disabled': !isPassValidated }"
          @click="save"
        >Сохранить</button>
        <!-- :class="{ '--main-color' : isPhoneValidated, '--disabled' : !isPhoneValidated }" -->
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      oldPass: null,
      pass: null,
      passc: null
    };
  },
  methods: {
    ...mapActions({
      updatePassword: "user/updatePassword"
    }),
    async save() {
      try {
        if (this.pass !== this.passc) {
          this.$setError("updatePassword", "Пароли не совпадают!");
          return;
        }
        const res = await this.updatePassword({
          password: this.oldPass,
          new_password: this.pass
        });
        if (res) {
          this.$alert({
            message: res.message,
            type: "success"
          });
        } else {
          this.$alert({
            message: this.$getError("updatePassword"),
            type: "error"
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    close() {
      this.$emit("closePassModal");
    }
  },
  computed: {
    isPassValidated() {
      return (
        this.oldPass && this.pass && this.passc && this.pass === this.passc
      );
    }
  }
};
</script>