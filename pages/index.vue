<template>
  <div class="home">
    <div class="container">
      <Slider></Slider>
      <div class="row">
        <div class="left-col">
          <!-- <Nav></Nav> -->
          <NewsAside></NewsAside>
          <!-- {{banners}} -->
          <a :href="banners[0] ? banners[0].link : ''" class="banner-aside">
            <img :src="banners[0] ? banners[0].image : '/images/banner-aside.png'" :alt="banners[0] ? banners[0].name : ''" />
          </a>
        </div>
        <div class="right-col">
          <tabs />
          <div class="home-mobile-news">
            <NewsAside />
          </div>
        </div>
      </div>
      <Brands />
    </div>
  </div>
</template>

<script>
import Slider from "@/components/home/slider";
import Nav from "@/components/home/nav";
import NewsAside from "@/components/home/news-aside";
import Brands from "@/components/home/brands";
import tabs from "@/components/home/tabs";
import { mapGetters } from 'vuex';

export default {
  components: {
    tabs,
    Slider,
    Nav,
    NewsAside,
    Brands
  },
  middleware: ["home"],
  computed: {
    ...mapGetters({
      banners: 'content/GET_BANNERS',
    })
  }
};
</script>
