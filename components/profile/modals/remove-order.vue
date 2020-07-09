<template>
    <transition name="fade">
        <div v-if="isOpen" class="profile-modal">
            <div class="profile-modal-overlay" @click="closeModal"></div>
            <div class="profile-modal-inner">
                <h3 class="profile-modal-title">Вы уверены что хотите отменить заказ</h3>
                <p class="profile-modal-text">Отмена заказа необратима</p>
                <button @click="confirm" class="profile-modal-btn --red">Отменить заказ</button>
                <button @click="closeModal" class="profile-modal-btn">В список заказов</button>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
      ...mapGetters({
        isOpen: 'GET_REMOVE_ORDER'
      })
    },
    methods: {
      ...mapActions({
        cancelOrder: 'user/cancelOrder',
        refresh: 'user/fetchUser'
      }),
        closeModal() {
            this.$store.commit('SET_REMOVE_ORDER', false)
        },
        async confirm() {
          await this.cancelOrder({id: this.isOpen.id})
          await this.refresh()
          this.$getUser();
          this.$store.commit('SET_REMOVE_ORDER', false)
        }
    }
}
</script>
