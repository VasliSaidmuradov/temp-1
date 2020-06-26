<template>
    <div class="help-page --payment">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <!-- <nuxt-link to="">Помощь / </nuxt-link> -->
                <nuxt-link to="">Бонусы</nuxt-link>
            </div>
            <div class="row">
                <div class="left-col">
                    <help-nav />
                </div>
                <div class="right-col">
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help5.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">Бонусы</h3>
                            <p class="help-page-text --margin">
                                Друзья, на нашем сайте действует бонусная система для всех <button>авторизованых</button> пользователей. Бонусы начисляются после получения и оплаты заказа. На ваш номер телефона, указанный в личном кабинете, будет приходить SMS сообщение о начисление или списании бонусов.
                            </p>
                            <p class="help-page-text --margin">
                                <b>Важно!</b> Для того, чтобы мы начислили вам бонусы, вам необходимо зарегистрироваться и авторизироваться при заказе.
                            </p>
                            <p class="help-page-text">
                                <b> Сколько бонусов начисляются?</b>
                            </p>
                            <p class="help-page-text --margin">
                                Мы начисляем 3% от итоговой стоимости заказа. Количество бонусов может незначительно измениться в случае, если итоговая стоимость изменилась в случае замены.
                            </p>
                            <p class="help-page-text --margin">
                                1 бонус = 1 тенге. 
                            </p>
                            <p class="help-page-text">
                                <b>Как тратить бонусы?</b>
                            </p>
                            <p class="help-page-text --margin">
                                Вы можете частично или полностью оплатить заказ бонусами. Для этого, во время оформления заказа, вам необходимо Авторизироваться на сайте и ввести нужно количество бонусов в корзине, а затем кликнуть по ссылке «Потратить» и завершить оформление заказа.
                            </p>
                            <p class="help-page-text --margin">
                                Минимальной суммы для траты бонусов нет.
                            </p>
                            <p class="help-page-text">
                                <b>Могут ли бонусы сгореть?</b>
                            </p>
                            <p class="help-page-text --margin">
                                Нет. Они сохраняются в вашем личном кабинете навсегда.
                            </p>
                            <p class="help-page-text">
                                <b>
                                    Где можно посмотреть бонусы?
                                </b>
                            </p>
                            <p class="help-page-text --margin">
                                В личном кабинете, в разделе «Профиль -> Бонусы». В этом же разделе, вы можете детально посмотреть, за какой заказ и в каком количестве вам начислили бонусы. 
                            </p>
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
