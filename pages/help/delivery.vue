<template>
    <div class="help-page">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <nuxt-link to="">Помощь / </nuxt-link>
                <nuxt-link to="">Доставка</nuxt-link>
            </div>
            <div class="row">
                <div class="left-col">
                    <help-nav />
                </div>
                <div class="right-col">
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help4.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Доставка по Алматы:</h3>
                            <p class="help-page-text --margin">Бесплатная курьерская доставка по г.Алматы, при заказе на любую сумму.</p>
                            <p class="help-page-text"><b>Курьерская доставка:</b></p>
                            <p class="help-page-text">Стоимость доставки в другие города Казахстана составляет 1 500 тг, сроки курьерской доставки <b>от 1 до 4 рабочих дней</b></p>
                            <div class="help-page-divider"></div>
                            <h3 class="help-page-title">Доставка Казпочтой:</h3>
                            <p class="help-page-text --margin">Стоимость доставки Казпочтой в другие города и населенные пункты Казахстана составляет 800 тг</p>
                            <p class="help-page-text">При заказе на сумму свыше 10 000 тг - <span>доставка бесплатная по Казахстану</span></p>
                            <div class="help-page-note">
                                <p class="help-page-text --base-color">Обратите внимание:</p>
                                <p class="help-page-text"><b>Будьте внимательны!</b> При указании Вашего почтового индекса и адреса. По нему будет рассчитываться стоимость почтовой пересылки заказа.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helpNav from '@/components/help/nav'

export default {
    components: {
        helpNav
    }
}
</script>
