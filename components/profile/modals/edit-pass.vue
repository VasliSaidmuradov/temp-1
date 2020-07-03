<template>
  <transition name="fade">
    <div class="profile-modal --text-center">
      <div class="profile-modal-overlay" @click="close"></div>
      <div class="profile-modal-inner">
        <button class="profile-modal-close" @click="close"></button>
        <h4 class="profile-modal-title">Пароль</h4>
        <input type="email" class="profile-modal-input" placeholder="Старый пароль">
        <input type="email" class="profile-modal-input" placeholder="Новый пароль">
        <input type="email" class="profile-modal-input" placeholder="Повторите пароль">
        <button class="button --disabled" @click="save">Сохранить</button>
        <!-- :class="{ '--main-color' : isPhoneValidated, '--disabled' : !isPhoneValidated }" -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    methods: {
        save() {
            this.$emit('savePass')
        },
        close() {
            this.$emit('closePassModal')
        }
    }
}
</script>