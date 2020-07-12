<template>
    <div class="help-page">
        <div class="container">
            <div class="breadcrumbs">
                <nuxt-link to="/">Главная / </nuxt-link>
                <!-- <nuxt-link to="">Помощь / </nuxt-link> -->
                <nuxt-link to="">О нас</nuxt-link>
            </div>
            <div class="row">
                <div class="left-col">
                    <help-nav />
                </div>
                <div class="row-col">
                    <div class="help-page-row">
                        <div class="help-page-icon-wrp">
                            <img src="/icons/help6.svg" alt="Skiny image" class="help-page-icon">
                        </div>
                        <div class="help-page-content">
                            <h3 class="help-page-title">О компании</h3>
                            <iframe width="100%" height="315" src="https://www.youtube.com/embed/9WkNE8tYRQg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <p class="help-page-text --margin">
                                SKINY - это широкая гамма продукции от ведущих брендов индустрии красоты. В наш каталог входят средства по уходу за лицом, телом, волосами, а также большой выбор декоративной косметики.
                            </p>
                            <p class="help-page-text --margin">
                                Вот уже на протяжении нескольких лет SKINY является Вашим верным путеводителем в мире красоты и ухода.
                            </p>
                            <p class="help-page-text">
                                Мы верим в то, что красота может быть доступна каждому. Тщательно подбирая ассортимент продукции, представленной в наших магазинах, мы руководствуемся тремя простыми правилами:
                            </p>
                            <p class="help-page-text">- эффективность продукта</p>
                            <p class="help-page-text">- высокое качество</p>
                            <p class="help-page-text --margin">- доступная цена</p>
                            <p class="help-page-text">Откройте для себя увлекательный мир косметических средств вместе со SKINY!</p>
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
