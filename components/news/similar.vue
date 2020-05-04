<template>
  <div class="news-similar">
    <div class="container">
      <h4 class="news-similar-title">Другие публикации</h4>
      <div class="news-similar-row">
        <item v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import item from "@/components/news/item";
import { mapGetters } from "vuex";

export default {
  components: {
    item
  },
  props: {
    posts: Array
  }
};
</script>