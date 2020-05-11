<template>
  <div class="news-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Новости</nuxt-link>
      </div>
      <div class="news-page-row">
        <item v-for="post in posts.data" :key="post.id" :post="post" />
      </div>
      <pagination :paginator="posts" />
    </div>
  </div>
</template>

<script>
import pagination from "@/components/partials/pagination";
import item from "@/components/news/item";
import { mapGetters } from "vuex";

export default {
  components: {
    item,
    pagination
  },
  middleware: ["news"],
  computed: {
    ...mapGetters({ posts: "content/GET_POSTS" })
  }
};
</script>