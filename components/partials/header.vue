<template>
    <header class="header">
        <div class="header__top">
            <div class="container">
                <div class="row header__topRow">
                    <nav class="header__topNav">
                        <nuxt-link to="" class="header__topLink">Контакты</nuxt-link>
                        <nuxt-link to="" class="header__topLink">Доставка</nuxt-link>
                        <nuxt-link to="" class="header__topLink">Оплата</nuxt-link>
                        <nuxt-link to="" class="header__topLink">Помощь</nuxt-link>
                        <nuxt-link to="" class="header__topLink">Магазины</nuxt-link>
                    </nav>
                    <div class="header__phone">
                        <a href="">8 (727) 396-18-34</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="header__mid">
            <div class="container">
                <div class="row header__midRow">
                    <nuxt-link to="/" class="header__logo">
                        <img src="/images/logo.png" alt="Skiny logo">
                    </nuxt-link>
                    <div class="header__cityWrp">
                        <span>Алматы</span>
                    </div>
                    <div class="header__searchWrp">
                        <input type="text" placeholder="Хочу купить...">
                        <button class="header__searchBtn"></button>
                    </div>
                    <nuxt-link class="header__profile" to=""></nuxt-link>
                    <nuxt-link class="header__favorites" to=""></nuxt-link>
                    <nuxt-link class="header__cart" to=""></nuxt-link>
                </div>
            </div>
        </div>
        <div class="header__bot">
            <div class="container">
                <div class="row">
                    <nuxt-link class="header__btn" to="">Все категории</nuxt-link>
                    <nuxt-link class="header__botLink" to="">Акции</nuxt-link>
                    <nuxt-link class="header__botLink" to="">Бонусы</nuxt-link>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {

}
</script>
