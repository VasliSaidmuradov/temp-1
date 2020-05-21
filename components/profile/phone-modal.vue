<template>
    <transition name="fade">
        <div v-if="isOpen" class="profile-modal --phone">
            <div class="profile-modal-overlay" @click="closeModal"></div>
            <div class="profile-modal-inner">
                <button class="profile-modal-close" @click="closeModal"></button>
                <img src="/icons/success.svg" alt="Skiny icon" class="profile-modal-icon">
                <h3 class="profile-modal-title">Телефон успешно изменен</h3>
                <p class="profile-modal-text">Наш менеджер свяжется с Вами для уточнения деталей</p>
                <button @click="closeModal" class="profile-modal-btn">Вернуться</button>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            isOpen: 'GET_PROFILE_PHONE_MODAL'
        })
    },
    methods: {
        closeModal() {
            this.$store.commit('SET_PROFILE_PHONE_MODAL', false)
        }
    }
}
</script>
