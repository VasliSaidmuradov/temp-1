<template>
    <header class="header">
        <div class="header-top">
            <div class="container">
                <div class="row header-top-row">
                    <nav class="header-top-nav">
                        <nuxt-link to="/contacts" class="header-top-link">Контакты</nuxt-link>
                        <nuxt-link to="/help/payment" class="header-top-link">Оплата</nuxt-link>
                        <nuxt-link to="/help/delivery" class="header-top-link">Доставка</nuxt-link>
                        <nuxt-link to="/help/how-to-order" class="header-top-link">Как сделать заказ</nuxt-link>
                    </nav>
                    <div class="header-phone">
                        <a href="">8 (727) 396-18-34</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-mid">
            <div class="container">
                <div class="row header-mid-row">
                    <nuxt-link to="/" class="header-logo">
                        <img src="/images/logo.png" alt="Skiny logo">
                    </nuxt-link>
                    <div class="header-city-wrp">
                        <span>Алматы</span>
                    </div>
                    <div class="header-search-wrp">
                        <input type="text" placeholder="Хочу купить...">
                        <button class="header-search-btn"></button>
                    </div>
                    <button class="header-profile" @click="openAuth"></button>
                    <nuxt-link class="header-favorites" to="/favorites"></nuxt-link>
                    <nuxt-link class="header-cart" to="/cart"></nuxt-link>
                </div>
            </div>
        </div>
        <div class="header-bot">
            <div class="container">
                <div class="row">
                    <nuxt-link class="header-btn" to="/catalog">Все категории</nuxt-link>
                    <nuxt-link class="header-bot-link" to="">Акции</nuxt-link>
                    <nuxt-link class="header-bot-link" to="/help/bonuses">Бонусы</nuxt-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    methods: {
        openAuth() {
            document.body.classList.add('--hidden'),
            this.$store.commit('auth/SET_MODAL_STATE', true)
        }
    }
}
</script>
