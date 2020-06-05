<template>
    <div class="help-page">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <!-- <nuxt-link to="">Помощь / </nuxt-link> -->
                <nuxt-link to="">Как сделать заказ</nuxt-link>
            </div>
            <div class="row">
                <div class="left-col">
                    <help-nav />
                </div>
                <div class="right-col">
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help1.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Выберите товар</h3>
                            <p class="help-page-text">
                                На сайте существует несколько способов поиска и выбора товара. Если Вы уже знаете, какой объект хотите купить — введите его название в окно поиска в верхнем блоке сайта. Если же с конкретной моделью Вы еще не определились, воспользуйтесь нашим каталогом.
                            </p>
                            <div class="help-page-divider"></div>
                        </div>
                    </div>
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help2.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Оформление товара</h3>
                            <p class="help-page-text">
                                Выбрав понравившийся вам товар, нажмите кнопку «Добавить в корзину», и товар автоматически отправится в вашу корзину. Обратите внимание, что товары, не имеющие этой кнопки, купить в интернет-магазине нельзя, они есть только в магазинах сети. Далее Вы можете продолжить выбор товаров в интернет-магазине, добавляя в корзину столько товаров, сколько Вам необходимо. Если Вы закончили выбор товаров, приступайте к оформлению заказа.
                            </p>
                            <div class="help-page-divider"></div>
                        </div>
                    </div>
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help3.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Оплата товара</h3>
                            <p class="help-page-text">
                                Покупки в интернет-магазине вы можете оплатить при помощи наличного или безналичного расчета, в том числе пластиковыми картами: онлайн (прямо на сайте) или при получении товара
                            </p>
                            <div class="help-page-divider"></div>
                        </div>
                    </div>
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help4.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Получение товара</h3>
                            <p class="help-page-text">
                                Товары общей стоимостью свыше <b>12 000 тенге</b>, доставляются бесплатно. Доставка товаров общей стоимостью ниже <b>12 000 тенге</b>, осуществляется на стандартных условиях, стоимость доставки: <b>1000 тенге.</b> Доставка заказов согласованных с оператором до 16:00 текущего дня - осуществляется на следующий день, <b>с 10:00 до 18:00</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helpNav from "@/components/help/nav"

export default {
    components: {
        helpNav
    }
}
</script>
