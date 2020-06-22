<template>
  <a :href="banners[0] ? banners[0].link : ''" class="banner-aside">
    <img
      :src="banners[0] ? banners[0].image : '/images/banner-aside.png'"
      :alt="banners[0] ? banners[0].name : ''"
    />
  </a>
</template>

<script>
export default {
  props: ["banners"]
};
</script>

<style>
</style>