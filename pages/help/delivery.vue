<template>
    <div class="help-page">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <!-- <nuxt-link to="">Помощь / </nuxt-link> -->
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
                            <p class="help-page-text --margin">Доставка заказов в пределах города Алматы, которые были оформлены до 18:00 производятся день в день, оформленные после 18:00 доставляются на следующий день</p>
                            <p class="help-page-heading">Тарифы на доставку по городу Алматы:</p>
                            <p class="help-page-text">Заказы на сумму до 3000тг – доставка 500тг</p>
                            <p class="help-page-text">От 3000тг до 7000тг – доставка 200тг</p>
                            <p class="help-page-text">Свыше 7000тг – доставка осуществляется бесплатно</p>
                            <div class="help-page-divider"></div>
                            <h3 class="help-page-title">Доставка Казпочтой:</h3>
                            <p class="help-page-text --margin">Доставка заказов по Казахстану производится в течение 3-4 дней с момента оформления</p>
                            <p class="help-page-heading">Тарифы на доставку по Казахстану:</p>
                            <p class="help-page-text">Заказы на сумму до 3000тг – доставка 1500тг</p>
                            <p class="help-page-text">От 3000тг до 7000тг – доставка 1000тг</p>
                            <p class="help-page-text">От 7000тг до 10000тг – доставка 700тг</p>
                            <p class="help-page-text">От 10 000тг – доставка осуществляется бесплатно</p>
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
