<template>
  <div class="brand-list">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Бренды</nuxt-link>
      </div>
      <!-- :: {{ brands }} -->
      <h1 class="section-title">Бренды</h1>
      <div class="brand-list-letter-wrp">
        <div class="brand-list-letters">
          <button 
            v-if="!!brands[letter.toUpperCase()]"
            v-for="(letter, index) in letters"
            :key="index"
            @click="toggleBrand(letter)"
            >
              {{letter}}
            </button>
        </div>
        <div class="brand-list-search">
          <input v-model="brandSearchQuery" type="text" placeholder="Поиск брендов">
          <button><search /></button>
        </div>
      </div>
      <div class="brand-list-row">
        <div class="brand-list-col">
          <span class="brand-list-letter">{{ currentLetter }}</span>
        </div>
        <div class="brand-list-col">
          <nuxt-link :to="`/brands/${brand.slug}`" class="brand-list-brand" v-for="(brand, index) in brandList" :key="index">
            <p>{{ brand.name }}</p>
            <img :src="brand.image ? brand.image : require('@/static/images/brand.png')" :alt="brand.name">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/static/icons/search-icon.svg'
import { mapGetters, mapActions } from "vuex";

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
      currentLetter: 'A',
      brandSearchQuery: null,
    }
  },
  components: {
    search
  },
  computed: {
    ...mapGetters({
      brands: 'brand/GET_BRANDS',
      brandSeachResult: 'brand/GET_SEARCH_BRANDS',
    }),
  },
  methods: {
    ...mapActions({
      searchBrands: 'brand/searchBrands'
    }),
    toggleBrand(value) {
      const letter = value.toUpperCase()
      const allBrands = Object.assign({}, this.brands);
      this.brandList = allBrands[letter];
      this.currentLetter = letter;
    },
  },
  watch: {
    brandSearchQuery: async function(val) {
      if (val && val.length > 1) {
        console.log(val);
        await this.searchBrands(val);
      }
    }
  },
  mounted() {
    if (!this.brandList.length) {
      this.brandList = this.brands['A']
    }
  },
  async fetch({ store }) {
    await store.dispatch('brand/fetchBrands')
  }
}
</script>
