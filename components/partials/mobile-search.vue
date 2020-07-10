<template>
  <div class="mob-search">
    <div class="mob-search-overlay" @click="closeSearch"></div>
    <form @submit.prevent="redirectToSearch" class="mob-search-inner">
      <input v-model="searchQuery" type="text" placeholder="Хочу купить..." required />
      <button>
        <search />
      </button>
      <transition name="fade">
        <search-dropdown @closeSearch="closeSearch"/>
      </transition>
    </form>
  </div>
</template>

<script>
import search from "@/static/icons/search-icon.svg";
import searchDropdown from "@/components/partials/search-dropdown/"
import { mapActions } from "vuex";

export default {
  components: {
    search,
    searchDropdown,
  },
  data() {
    return {
      searchQuery: null
    };
  },
  watch: {
    searchQuery: async function(val) {
      if (val && val.length > 1) {
        await this.searchProduct({ q: val })
        this.showSearch()
      } else {
        this.$store.commit('SET_SEARCH', false)
      }
    }
  },
  methods: {
    ...mapActions({
      searchProduct: 'product/searchProductHint'
    }),
    showSearch() {
      this.$store.commit('SET_SEARCH', true)
    },
    closeSearch() {
      this.$emit("closeSearch");
    },
    redirectToSearch() {
      this.closeSearch();
      this.$router.push({ path: "/search", query: { q: this.searchQuery } });
    }
  }
};
</script>
