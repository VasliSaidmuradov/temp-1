<template>
    <div class="newsAside">
        <div class="newsAside__titleWrp">
            <span class="newsAside__title">Новости</span>
            <nuxt-link to="">Все статьи</nuxt-link>
        </div>
        <nuxt-link to="" v-for="article in news" :key="article.id" class="newsAside__link">
            <span class="newsAside__date">{{article.date}}</span>
            <p class="newsAside__heading">{{article.heading}}</p>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: [
                {
                    id: 0,
                    date: '20 февраля 2020',
                    heading: 'При покупке любых двух средств Men Expert в подарок губная помада'
                },
                {
                    id: 1,
                    date: '20 февраля 2021',
                    heading: 'При покупке любых двух средств Men Expert в подарок губная помада'
                },
                {
                    id: 2,
                    date: '20 февраля 2022',
                    heading: 'При покупке любых двух средств Men Expert в подарок губная помада'
                },
            ]
        }
    }
}
</script>
