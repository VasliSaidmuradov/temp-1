<template>
    <div class="news-aside">
        <div class="news-aside-title-wrp">
            <span class="news-aside-title">Новости</span>
            <nuxt-link to="">Все статьи</nuxt-link>
        </div>
        <nuxt-link to="" v-for="article in news" :key="article.id" class="news-aside-link">
            <span class="news-aside-date">{{article.date}}</span>
            <p class="news-aside-heading">{{article.heading}}</p>
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
