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
        <button class="profile-modal-btn --gray" @click="getCode">Получить код</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      phone: null
    };
  },
  watch: {
    phone: function(val) {
      if (val && val.length && val[0] != "7") {
        this.phone = "7" + val.substring(1);
      }
    }
  },
  computed: {
    ...mapGetters({
      isOpen: "GET_PROFILE_PHONE_EDIT"
    })
  },
  methods: {
    close() {
      this.$store.commit("SET_PROFILE_PHONE_EDIT", false);
    },
    getCode() {
      this.$store.commit("SET_PROFILE_PHONE_EDIT", false);
      this.$store.commit("SET_PROFILE_PHONE_CONFIRM", true);
    }
  }
};
</script>