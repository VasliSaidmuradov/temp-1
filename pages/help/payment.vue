<template>
    <div class="help-page --payment">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <!-- <nuxt-link to="">Помощь / </nuxt-link> -->
                <nuxt-link to="">Оплата</nuxt-link>
            </div>
            <div class="row">
                <div class="left-col">
                    <help-nav />
                </div>
                <div class="right-col">
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help3.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Способ оплаты</h3>
                            <p class="help-page-text"><b>При доставке заказа по городу Алматы возможно два способа оплаты:</b></p>
                            <p class="help-page-heading">- Наличный расчет</p>
                            <p class="help-page-text">Оплата производится только в тенге. При получении заказа курьером или в магазине, в случае самовывоза. В подтверждение оплаты мы выдаем фискальный чек</p>
                            <p class="help-page-heading">- Оплата платежной картой при получении</p>
                            <p class="help-page-text">Оплата платежной картой курьеру интернет-магазина при доставке производится посредством мобильного банковского терминала или в кассе магазина при самовывозе. В подтверждении оплаты мы выдаем фискальный чек.</p>
                            <p class="help-page-heading">-	Оплата платежной картой на сайте</p>
                            <p class="help-page-text">При проведении оплаты платёжными картами используется система Paybox. Для оплаты требуется ввести данные карты (номер, CVC/СVV код, срок действия) в защищенном виджете платежной системы. Для дополнительной безопасности используется технология 3-D Secure. Если Ваш Банк-эмитент поддерживает данную технологию, Вы будете перенаправлены на его сервер для прохождения дополнительной идентификации.</p>
                            <p class="help-page-heading">-	Безналичный расчет для юридических лиц</p>
                            <p class="help-page-text">После оформления заказа, специалист магазина вышлет Вам электронной почтой счет на оплату, который Вы сможете оплатить с расчетного счета организации. Счет на оплату, выставленный Продавцом, действителен в течение трех банковских дней. Оплата данного счета означает согласие с условиями поставки товара.</p>
                            <div class="help-page-note">
                                <p class="help-page-text --base-color">Обратите внимание:</p>
                                <p class="help-page-text">*Отправка заказов в другие города Казахстана, осуществляется только по 100% оплате заказа.</p>
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
