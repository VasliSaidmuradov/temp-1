<template>
  <transition name="fade">
    <div class="profile-modal --text-center">
      <div class="profile-modal-overlay" @click="close"></div>
      <div class="profile-modal-inner">
        <button class="profile-modal-close" @click="close"></button>
        <h4 class="profile-modal-title">Укажите новый e-mail</h4>
        <p class="profile-modal-text">На него мы отправим письмо с подтверждением</p>
        <input type="email" class="profile-modal-input" placeholder="E-mail">
        <button class="button --disabled" @click="send">Отправить</button>
        <!-- :class="{ '--main-color' : isPhoneValidated, '--disabled' : !isPhoneValidated }" -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    methods: {
        send() {
            this.$emit('sendEmail')
        },
        close() {
            this.$emit('closeEmailModal')
        }
    }
}
</script>