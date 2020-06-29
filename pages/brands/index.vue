<template>
  <div class="brand-list">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Бренды</nuxt-link>
      </div>
      <h1 class="section-title">Бренды</h1>
      <div class="brand-list-letter-wrp">
        <div class="brand-list-letters">
          <button v-for="(letter, index) in letters" :key="index">{{letter}}</button>
        </div>
        <div class="brand-list-search">
          <input type="text" placeholder="Поиск брендов">
          <button><search /></button>
        </div>
      </div>
      <div class="brand-list-row">
        <div class="brand-list-col">
          <span class="brand-list-letter">A</span>
        </div>
        <div class="brand-list-col">
          <nuxt-link to class="brand-list-brand">
            <p>A-Derma</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>ABSOLUTE NEW YORK</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>Avene</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>A-Derma</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>ABSOLUTE NEW YORK</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>Avene</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
        </div>
        <div class="brand-list-col">
          <nuxt-link to class="brand-list-brand">
            <p>A-Derma</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>ABSOLUTE NEW YORK</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>Avene</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>A-Derma</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>ABSOLUTE NEW YORK</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>Avene</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
        </div>
      </div>
      <div class="brand-list-row">
        <div class="brand-list-col">
          <span class="brand-list-letter">B</span>
        </div>
        <div class="brand-list-col">
          <nuxt-link to class="brand-list-brand">
            <p>A-Derma</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>ABSOLUTE NEW YORK</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>Avene</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>A-Derma</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>ABSOLUTE NEW YORK</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
          <nuxt-link to class="brand-list-brand">
            <p>Avene</p>
            <img src="/images/brand.png" alt="Skiny image">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/static/icons/search-icon.svg'
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
        'А—Я',
        '0—9'
      ]
    }
  },
  components: {
    search
  }
}
</script>