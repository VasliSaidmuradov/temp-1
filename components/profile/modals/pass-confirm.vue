<template>
    <div class="profile-modal --text-center">
        <div class="profile-modal-overlay" @click="close"></div>
        <div class="profile-modal-inner">
            <button class="profile-modal-close" @click="close"></button>
            <h4 class="profile-modal-title">Пароль</h4>
            <img src="/icons/success.svg" alt="Skiny icon" class="profile-modal-icon" />
            <p class="profile-modal-text">
                Пароль успешно изменен
            </p>
            <button class="button --main-color" @click="close">Продолжить</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('closePassConfirm')
        }
    }
}
</script>