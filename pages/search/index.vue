<template>
  <div class="search-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Результаты поиска</nuxt-link>
      </div>
      <h1 class="search-page-title">
        По запросу «{{ searchQuery }}» найдено
        <b>{{ products ? products.total : 0 }}</b> товара
      </h1>
      <div class="category-page-sort-wrp">
        <p class="category-page-total">
          <b>{{ products ? products.total : 0 }}</b> товара
        </p>
        <div class="category-page-sort">
          <p>Сортировать:</p>
          <div class="category-page-select-wrp">
            <div class="category-page-current-sort">
              <p @click="toggleSelect">{{ currentSort }}</p>
            </div>
            <div class="category-page-select-dropdown" v-if="isSortOpen">
              <p @click.prevent="sorting('default')">По умолчанию</p>
              <p @click.prevent="sorting('asc')">По возрастанию</p>
              <p @click.prevent="sorting('desc')">По убыванию</p>
            </div>
          </div>
          <!-- <select v-model="sort">
            <option value="default">По умолчанию</option>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>-->
        </div>
      </div>
      <div v-if="searchQuery">
        <div
          class="search-page-row"
          v-for="product in $chunk(products ? products.data : [], 4)"
          :key="product.id"
        >
          <product v-for="item in product" :key="item.id" :product="item" />
        </div>
      </div>
      <!-- {{ searchQuery }} -->
      <pagination v-if="searchQuery" :paginator="products" />
    </div>
  </div>
</template>

<script>
import product from "@/components/partials/product";
import pagination from "@/components/partials/pagination";
import { mapGetters } from "vuex";

export default {
  middleware: ["search"],
  components: {
    product,
    pagination
  },
  data() {
    return {
      sort: "default",
      isSortOpen: false
    };
  },
  computed: {
    ...mapGetters({
      products: "product/GET_RESULTS"
    }),
    searchQuery() {
      return this.$route.query.q;
    },
    currentSort() {
      switch (this.sort) {
        case "asc":
          return "По возрастанию";
          break;
        case "desc":
          return "По убыванию";
          break;
        default:
          return "По умолчанию";
          break;
      }
    }
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
    sort(val) {
      let query = { ...this.$route.query };
      if (val === "default") {
        delete query["sort"];
      } else {
        query["sort"] = val.toString();
      }
      this.$router.push({ path: this.$route.path, query: query });
    }
  },
  methods: {
    toggleSelect() {
      this.isSortOpen = !this.isSortOpen;
    },
    sorting(e) {
      this.sort = e;
      this.isSortOpen = false;
    }
  },
  mounted() {
    if (this.$route.query.sort) {
      this.sort = this.$route.query.sort;
    }
  }
};
</script>
