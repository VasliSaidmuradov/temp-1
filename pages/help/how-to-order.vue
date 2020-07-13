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
                            <!-- <p class="help-page-text">
                                Товары общей стоимостью свыше <b>10 000 тенге</b>, доставляются бесплатно. Доставка товаров общей стоимостью ниже этой суммы, <b>10 000 тенге</b>, осуществляется по тарифам:
                            </p> -->
                            <p class="help-page-heading">Тарифы на доставку по городу Алматы:</p>
                            <p class="help-page-text">Стоимость доставки до 3000тг – доставка 500тг</p>
                            <p class="help-page-text">От 3000тг до 7000тг – доставка 200тг</p>
                            <p class="help-page-text">Свыше 7000тг – доставка осуществляется бесплатно</p>
                            <p class="help-page-heading">Тарифы на доставку по Казахстану:</p>
                            <p class="help-page-text">До 3000тг – доставка 1500тг</p>
                            <p class="help-page-text">От 3000тг до 7000тг – доставка 1000тг</p>
                            <p class="help-page-text">От 7000тг до 10000тг – доставка 700тг</p>
                            <p class="help-page-text --margin">От 10 000тг – доставка осуществляется бесплатно</p>
                            <p class="help-page-text --margin">Доставка заказов в пределах города Алматы, которые были оформлены до 18:00 производятся день в день, оформленные после 18:00 доставляются на следующий день</p>
                            <p class="help-page-text">Доставка заказов по Казахстану производится в течение 3-4 дней с момента оформления</p>
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
