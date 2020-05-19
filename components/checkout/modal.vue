<template>
    <transition name="fade">
        <div v-if="isOpen" class="checkout-modal">
            <div class="checkout-modal-overlay" @click="close"></div>
            <div class="checkout-modal-inner">
                <button class="checkout-modal-close" @click="close">
                    <img src="/icons/close-icon.svg" alt="Skiny icon">
                </button>
                <img src="/icons/success.svg" alt="Skiny icon" class="checkout-modal-icon">
                <h4 class="checkout-modal-title">Благодарим за покупку!</h4>
                <p class="checkout-modal-text">Наш менеджер свяжется с Вами для уточнения деталей</p>
                <button class="button --black" @click="goToOrderHistory">Перейти к истории заказов</button>
                <button class="checkout-modal-btn" @click="back">Продолжить покупки</button>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            isOpen: 'cart/getCheckoutModal'
        })
    },
    methods: {
        close() {
            this.$store.commit('cart/setCheckoutModal', false)
        },
        back() {
            this.$store.commit('cart/setCheckoutModal', false)
            this.$router.push('/')
        },
        goToOrderHistory() {
          this.$store.commit('cart/setCheckoutModal', false)
          this.$router.push('/profile/order-history')
        }
    }
}
</script>
