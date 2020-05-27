<template>
  <div class="news-aside">
    <div class="news-aside-title-wrp">
      <span class="news-aside-title">Новости</span>
      <nuxt-link to="/news">Все статьи</nuxt-link>
    </div>
    <nuxt-link v-for="article in newsList" :key="article.id" class="news-aside-link" :to="`/news/${article.slug}`">
      <span class="news-aside-date">{{ $formatDate(article.created_at) }}</span>
      <p class="news-aside-heading">{{ article.name }}</p>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      news: "content/GET_POSTS"
    }),
    newsList() {
      return this.news.data.slice(0,4)
    }
  }
};
</script>
