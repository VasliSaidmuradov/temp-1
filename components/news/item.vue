<template>
  <nuxt-link class="news-item" :to="`/news/${post.slug}`">
    <div class="news-item-image">
      <img :src="post.image" alt="Skiny post image" />
    </div>
    <div>
      <p class="news-item-date">{{ $formatDate(post.created_at, 'D MMMM')}}</p>
      <h4 class="news-item-heading">{{ post.name }}</h4>
      <p class="news-item-text">{{ post.description }}</p>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    post: Object
  }
};
</script>