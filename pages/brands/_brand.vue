<template>
  <div class="category-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link v-if="true" to>
          {{ products.name }}
        </nuxt-link>
      </div>
      <!-- <h1 class="category-page-title">{{ `${products.name}` }}</h1> -->
      <div class="row">
        <div class="left-col">
          <!-- <nuxt-link class="category-page-back" to="/catalog">Все категории</nuxt-link> -->
					<!-- <subcategories /> -->
          <!-- <category-filter
          :allProducts="allProducts"
          :filterByBrands="false"
          /> -->
          <!-- <nuxt-link v-for="brand in brands" :key="brand.id" :to="brand.slug">{{ brand.name }}</nuxt-link> -->
        </div>
        <div class="right-col">
          <brand :brand="products" />
          <div class="category-page-mob">
            <p class="category-page-total">{{ products.products.length }} товара</p>
            <nuxt-link class="category-page-back" to>Все категории</nuxt-link>
            <div class="category-page-row">
              <div class="category-page-sort">
                <p>Сортировать:</p>
                <select v-model="sort">
                  <option value="default">По умолчанию</option>
                  <option value="asc">По возрастанию</option>
                  <option value="desc">По убыванию</option>
                </select>
              </div>
              <button class="category-page-filter">Фильтр</button>
            </div>
          </div>
          <div class="category-page-sort-wrp">
            <p class="category-page-total">{{ products.products.length }} товара</p>
            <div class="category-page-sort">
              <p>Сортировать:</p>
              <select v-model="sort">
                <option value="default">По умолчанию</option>
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
              </select>
            </div>
          </div>
          <div class="category-page-product-wrp">
            <product v-for="product in products.products " :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subcategories from "@/components/category/subcategories";
import categoryFilter from "@/components/category/filter";
import brand from "@/components/category/brand";
import product from "@/components/partials/product";
import pagination from "@/components/partials/pagination";
import { mapGetters } from "vuex";

export default {
  middleware: ["catalog", "brandProducts"],
  data: () => ({
    isBrand: false,
    sort: "default",
    delay: null,
    productList: []
  }),
  components: {
    subcategories,
    categoryFilter,
    product,
    brand,
    pagination
  },
  computed: {
    ...mapGetters({
      brands: 'brand/GET_BRANDS',
      products: "brand/GET_BRAND_PRODUCTS",
      // allProducts: 'products/GET_ALL_PRODUCTS'
      // categories: "menu/GET_CATEGORIES",
    }),
    category() {
      for (let i = 0; i < this.categories.length; ++i) {
        if (this.categories[i].slug === this.$route.params.category) {
          return this.categories[i];
        }
      }
      return null;
    },
    subcategory() {
      if (!this.category) {
        return null;
      }
      for (let i = 0; i < this.category.subcategories.length; ++i) {
        if (
          this.category.subcategories[i].slug == this.$route.params.subcategory
        ) {
          return this.category.subcategories[i];
        }
      }
      return null;
    },
    tag() {
      if (!this.subcategory) {
        return null;
      }
      for (let i = 0; i < this.subcategory.tags.length; ++i) {
        if (this.subcategory.tags[i].slug == this.$route.params.tag) {
          return this.subcategory.tags[i];
        }
      }
      return null;
    },
    allProducts() {
      const prods = { ...this.products, data: this.products.products }
      return prods
    }
  },

  watch: {
    sort: function(val) {
      let query = { ...this.$route.query };
      if (val == "default") {
        delete query["sort"];
      } else {
        query["sort"] = val.toString();
      }
      this.$router.push({ path: this.$route.path, query: query });
    },
    "$route.fullPath": function(fullPath) {
      if (this.delay) {
        clearTimeout(this.delay);
      }
      this.delay = setTimeout(() => {
        let query = this.$serialize(this.$route.query);
        query = query ? `?${query}` : "";
        this.$store.dispatch(
          "product/fetchProducts",
          `${this.$route.path}${query}`
        );
      }, 500);
    }
  },
  mounted() {
    if (this.$route.query.sort) {
      this.sort = this.$route.query.sort;
    }
  },
  methods: {
    showFilter() {
      this.$store.commit("SET_MOBILE_FILTER", true);
    },
    filterBrand(e) {
      if (e.checked) {
        const res = this.allProducts.data.filter(el => el.brand.id == e.value)
        this.productList.push(...res)
      }
      else {
        this.productList = this.productList.filter(el => el.brand.id != e.value)
      }
    }
  }
};
</script>
