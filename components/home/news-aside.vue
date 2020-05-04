<template>
  <div class="news-aside">
    <div class="news-aside-title-wrp">
      <span class="news-aside-title">Новости</span>
      <nuxt-link to="/news">Все статьи</nuxt-link>
    </div>
    <nuxt-link to v-for="(article, index) in news" :key="index" class="news-aside-link">
      <span class="news-aside-date">{{ $formatDate(article.created_at) }}</span>
      <p class="news-aside-heading">{{ article.name }}</p>
      <!-- {{ article }} -->
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
    })
  }
};
</script>
