<template>
  <div class="news-inner">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to="/news">Новости /</nuxt-link>
        <nuxt-link to>{{ post.name }}</nuxt-link>
      </div>
      <div class="news-inner-container">
        <p class="news-inner-date">{{ $formatDate(post.created_at) }}</p>
        <h1 class="news-inner-heading">{{ post.name }}</h1>
        <img :src="post.image" alt="Skiny post image" class="news-inner-image" />
        <div class="news-inner-content" v-html="post.content"></div>
      </div>
    </div>
    <similar :posts="posts" />
  </div>
</template>

<script>
import similar from "@/components/news/similar";
import { mapGetters } from "vuex";

export default {
  components: {
    similar
  },
  middleware: ["post"],
  computed: {
    ...mapGetters({
      post: "content/GET_POST",
      posts: "content/GET_POSTS"
    })
  },
  async fetch({ store, route }) {
    await store.dispatch("content/fetchPosts", { per_page: 4 });
  }
};
</script>