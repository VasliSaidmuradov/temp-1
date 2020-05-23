<template>
    <div class="help-page --payment">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <nuxt-link to="">Помощь / </nuxt-link>
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
                            <p class="help-page-text">- Наличными (курьеру в руки)</p>
                            <p class="help-page-text">- Оплата, через Kaspi RED</p>
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
