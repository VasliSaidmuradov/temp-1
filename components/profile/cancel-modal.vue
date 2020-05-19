<template>
    <transition name="fade">
        <div v-if="isOpen" class="profile-modal">
            <div class="profile-modal-overlay" @click="closeModal"></div>
            <div class="profile-modal-inner">
                <h3 class="proile-modal-title">Вы уверены что хотите отменить заказ</h3>
                <p class="profile-modal-text">Отмена заказа необратима</p>
                <button class="profile-modal-btn --red">Отменить заказ</button>            
                <button class="profile-modal-btn">В список заказов</button>            
            </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            isOpen: 'GET_CANCEL_MODAL'
        })
    },
    methods: {
        closeModal() {
            this.$store.commit('SET_CANCEL_MODAL', false)
        }
    }
}
</script>