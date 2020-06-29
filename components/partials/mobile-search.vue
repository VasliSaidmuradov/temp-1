<template>
  <div class="mob-search">
    <div class="mob-search-overlay" @click="closeSearch"></div>
    <form @submit.prevent="redirectToSearch" class="mob-search-inner">
      <input v-model="searchQuery" type="text" placeholder="Хочу купить..." required />
      <button>
        <search />
      </button>
    </form>
  </div>
</template>

<script>
import search from "@/static/icons/search-icon.svg";
import { mapActions } from "vuex";

export default {
  components: {
    search
  },
  data() {
    return {
      searchQuery: null
    };
  },
  methods: {
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