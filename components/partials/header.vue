<template>
  <header class="header">
    <div class="header-top">
      <div class="container">
        <div class="row header-top-row">
          <nav class="header-top-nav">
            <nuxt-link to="/help/payment" class="header-top-link">Оплата</nuxt-link>
            <nuxt-link to="/help/delivery" class="header-top-link">Доставка</nuxt-link>
            <nuxt-link to="/help/how-to-order" class="header-top-link">Как сделать заказ</nuxt-link>
            <nuxt-link to="/help/bonuses" class="header-top-link">Бонусы</nuxt-link>
            <nuxt-link to="/contacts" class="header-top-link">Контакты</nuxt-link>
          </nav>
          <div class="header-phone">
            <a href="tel:87772623060">8 (777) 262-30-60</a>
          </div>
        </div>
      </div>
    </div>
    <div class="header-mid">
      <div class="container">
        <div class="row header-mid-row">
          <nuxt-link to="/" class="header-logo">
            <img src="/images/logo.png" alt="Skiny logo" />
          </nuxt-link>
          <!-- <div class="header-city-wrp">
            <span>Алматы</span>
          </div>-->
          <form class="header-search-wrp" @submit.prevent="redirectToSearch">
            <input v-model="searchQuery" type="text" placeholder="Хочу купить..." required />
            <button class="header-search-btn"></button>
            <!-- @focus="isSearchOpen = true" 
              @blur="isSearchOpen = false"  -->
            <transition name="fade">
              <search-dropdown />
            </transition>
          </form>
          <button
            class="header-profile"
            :class="{'--not-signed' : !$checkAuth()}"
            @click="openAuth"
          ></button>
          <nuxt-link class="header-favorites" to="/favorites">
            <span class="header-icon-badge" v-if="favoritesQuantity > 0">{{ favoritesQuantity }}</span>
          </nuxt-link>
          <nuxt-link class="header-cart" to="/cart">
            <span class="header-icon-badge" v-if="cartQuantity > 0">{{ cartQuantity }}</span>
          </nuxt-link>
          <p class="header-price">{{ $formatMoney(sum) }} тг</p>
        </div>
      </div>
    </div>
    <div class="header-bot">
      <div class="container">
        <div class="row">
          <nuxt-link class="header-btn" to="/catalog">Все категории</nuxt-link>
          <nuxt-link class="header-bot-link" to="/sales">Акции</nuxt-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import searchDropdown from "@/components/partials/search-dropdown";
export default {
  data() {
    return {
      searchQuery: null,
      isSearchOpen: false
    };
  },
  middleware: ["cart"],
  computed: {
    ...mapGetters({
      products: "product/GET_HINTS",
      favoritesQuantity: "user/GET_QUANTITY",
      cartQuantity: "cart/GET_QUANTITY",
      sum: "cart/GET_TOTAL",
      discount: "cart/GET_DISCOUNT",
      cartProductIds: "cart/GET_PRODUCT_IDS"
    })
  },
  components: {
    searchDropdown
  },
  watch: {
    searchQuery: async function(val) {
      if (val && val.length > 1) {
        await this.searchProduct({ q: val });
        this.showSearch();
      } else {
        this.$store.commit("SET_SEARCH", false);
      }
    },
    "$route.path": function(path) {
      this.$store.commit("SET_SEARCH", false);
    }
  },
  methods: {
    ...mapActions({
      searchProduct: "product/searchProductHint"
    }),
    openAuth() {
      if (this.$checkAuth()) {
        this.redirectToProfile();
      } else {
        document.body.classList.add("--hidden"),
          this.$store.commit("auth/SET_MODAL_STATE", true);
      }
    },
    showSearch() {
      this.$store.commit("SET_SEARCH", true);
    },
    redirectToSearch() {
      this.$store.commit("SET_SEARCH", false);
      this.$router.push({ path: "/search", query: { q: this.searchQuery } });
    },
    redirectToProfile() {
      this.$router.push({ path: "/profile" });
    }
  }
};
</script>
