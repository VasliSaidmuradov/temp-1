<template>
  <div class="search-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Результаты поиска</nuxt-link>
      </div>
      <h1 class="search-page-title">
        По запросу «крем» найдено
        <b>{{ products }}</b> товара
      </h1>
      <div class="category-page-sort-wrp">
        <p class="category-page-total">23 товара</p>
        <div class="category-page-sort">
          <p>Сортировать:</p>
          <select v-model="sort">
            <option value>По умолчанию</option>
            <option value>По возрастанию</option>
            <option value>По убыванию</option>
          </select>
        </div>
      </div>
      <div class="search-page-row" v-if="searchQuery">
        <div v-for="product in $chunk(products ? products.data : [], 4)" :key="product.id">
          <product v-for="item in items" :key="item.id" :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import product from "@/components/partials/product";
import { mapGetters } from "vuex";

export default {
  middleware: ["search"],
  components: {
    product
  },
  data() {
    return {
      sort: "default",
      searchQuery: this.$route.query.q
    };
  },
  computed: {
    ...mapGetters({
      products: "product/GET_RESULTS"
    })
  },
  watch: {
    searchQuery(val) {
      if (val) {
        let query = { ...this.$route.query };
        query["q"] = val.toString();
        delete query["page"];
        this.$router.push({ path: this.$route.path, query: query });
      }
    },
    sort() {
      let query = { ...this.$route.query };
      if (val === "default") {
        delete query["sort"];
      } else {
        query["sort"] = val.toString();
      }
      this.$router.push({ path: this.$route.path, query: query });
    }
  },
  mounted() {
    if (this.$route.query.sort) {
      this.sort = this.$route.query.sort;
    }
  }
};
</script>