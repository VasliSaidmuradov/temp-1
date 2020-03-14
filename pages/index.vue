<template>
    <div class="home">
        <div class="container">
            <div class="row">
                <div class="left-col">
                    <Nav></Nav>
                    <NewsAside></NewsAside>
                    <nuxt-link to="" class="banner-aside">
                        <img src="/images/banner-aside.png" alt="Skiny banner">
                    </nuxt-link>
                </div>
                <div class="right-col">
                    <Slider></Slider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Slider from '@/components/home/slider'
import Nav from '@/components/home/nav'
import NewsAside from '@/components/home/news-aside'
export default {
    components: {
        Slider,
        Nav,
        NewsAside
    }
}
</script>
