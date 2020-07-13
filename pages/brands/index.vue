<template>
<div class="brand-list">
  <div class="container">
    <div class="breadcrumbs">
      <nuxt-link to="/">Главная /</nuxt-link>
      <nuxt-link to>Бренды</nuxt-link>
    </div>
    <!-- :: {{ currentLetter }} -->
    <div class="brand-list-header">
      <h1 class="section-title">Бренды <span v-if="currentLetter">на {{currentLetter === '0-9' ? '' : 'букву'}}: {{ currentLetter }}
          <close-icon @click="reset" /></span></h1>
      <div class="brand-list-letter-wrp">
        <div class="brand-list-letters">
          <button v-if="!!brands[letter.toUpperCase()]" v-for="(letter, index) in letters" :key="index" @click="toggleBrand(letter)" :class="{'--active': currentLetter === letter.toUpperCase()}">
            {{letter}}
          </button>
        </div>
        <div class="brand-list-search">
          <input v-model="brandSearchQuery" type="text" placeholder="Поиск брендов">
          <button>
            <search /></button>
        </div>
      </div>
    </div>
    <div v-if="brandSearchQuery && brandSeachResult" class="brand-list-row">
      <div class="brand-list-col-filter">
        <p v-if="!brandSeachResult.data.length" class="brand-list-notification">Нет результатов. Попробуйте сократить или переписать запрос.</p>
        <nuxt-link :to="`/brands/${brand.slug}`" class="brand-list-brand" v-for="brand in brandSeachResult.data" :key="brand.id">
          <p>{{ brand.name }}</p>
          <img :src="brand.image ? brand.image : require('@/static/images/brand.png')" :alt="brand.name">
        </nuxt-link>
      </div>
    </div>
    <div v-else-if="!brandSearchQuery" class="brand-list-row" v-for="(brands, i) in brandList" :key="i">
      <div class="brand-list-col">
        <span class="brand-list-letter">{{ brands[0] }}</span>
      </div>
      <div class="brand-list-col">
        <nuxt-link :to="`/brands/${brand.slug}`" class="brand-list-brand" v-for="(brand, index) in brands[1]" :key="index">
          <p>{{ brand.name }}</p>
          <img :src="brand.image ? brand.image : require('@/static/images/brand.png')" :alt="brand.name">
        </nuxt-link>
        <!-- <pre> -->
        <!-- {{ brandList }} -->
        <!-- </pre> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import search from '@/static/icons/search-icon.svg'
import closeIcon from '@/static/icons/close-icon.svg'
import {
  mapGetters,
  mapActions
} from "vuex";

export default {
  data() {
    return {
      letters: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'А-Я',
        '0-9'
      ],
      brandList: [],
      currentLetter: null,
      brandSearchQuery: null,
    }
  },
  components: {
    search,
    closeIcon,
  },
  computed: {
    ...mapGetters({
      brands: 'brand/GET_BRANDS',
      brandSeachResult: 'brand/GET_SEARCH_BRANDS',
    })
  },
  methods: {
    ...mapActions({
      searchBrands: 'brand/searchBrands'
    }),
    toggleBrand(value) {
      const letter = value.toUpperCase()
      const allBrands = Object.entries(this.brands);
      this.brandList = allBrands.filter(el => el[0] === letter);
      this.currentLetter = letter;
      this.brandSearchQuery = null;
    },
    reset() {
      this.brandList = Object.entries(this.brands);
      this.currentLetter = null;
    }
  },
  watch: {
    brandSearchQuery: async function (val) {
      if (val && val.length > 0) {
        await this.searchBrands(val);
      }
    }
  },
  mounted() {
    if (!this.brandList.length) {
      this.brandList = Object.entries(this.brands);
    }
  },
  async fetch({
    store
  }) {
    await store.dispatch('brand/fetchBrands')
  }
}
</script>
