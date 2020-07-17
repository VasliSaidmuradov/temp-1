<template>
  <div class="category-page">
    <div class="container">
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link to>Акции</nuxt-link>
      </div>
      <h1 class="category-page-title">Акции</h1>
      <div class="row">
        <div class="left-col">
          <nuxt-link class="category-page-back" to="/catalog">Все категории</nuxt-link>
          <subcategories
            :categories="categories"
            :category="category"
            :subcat="subcategory"
            :tag="tag"
            :isBrandPage="false"
          />
          <!-- <category-filter
            :allProducts="allProducts"
            :filterByBrands="true"
            @brand-filter="filterBrand"
            @sales-filter="filterSales"
            :cats="tag ? null : subcategory ? subcategory.tags : category ? category.subcategories : categories"
          /> -->
        </div>
        <div class="right-col">
          <div class="category-page-mob">
            <p class="category-page-total">{{ sales.total }} товара</p>
            <nuxt-link class="category-page-back" to>Все категории</nuxt-link>
            <div class="category-page-row">
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
              </div>
              <button class="category-page-filter" @click.prevent="openFilter">Фильтр</button>
            </div>
          </div>
          <div class="category-page-sort-wrp">
            <p class="category-page-total">{{ sales.total }} товара</p>
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
            </div>
          </div>
          <div class="category-page-product-wrp" v-for="(items, index) in $chunk(sales.data, 4)" :key="index">
            <product v-for="product in items" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
      <pagination :paginator="sales" />
      <!-- :: {{ sales }} -->
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
  components: {
    subcategories,
    categoryFilter,
    product,
    brand,
    pagination
  },
  middleware: ["brands", "sales"],
  data: () => ({
    isBrand: false,
    sort: "default",
    delay: null,
    productList: { data: null },
    isSortOpen: false,
  }),
  computed: {
    ...mapGetters({
      // products: "product/GET_PRODUCTS",
      allProducts: "product/GET_ALL_PRODUCTS",
      categories: "menu/GET_CATEGORIES",
      brandFilterResult: "brand/GET_FILTER_RESULT",
      sales: "product/GET_SALES"
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
        console.log('tag', this.$route.name)
        if (this.$route.name == 'sales') {
          this.$store.dispatch(
            "product/fetchSales",
            {
              sale: 1,
              sort: this.$route.query.sort,
              per_page: 16,
            }
          )
        }
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
    sorting(e) {
      this.sort = e;
      this.isSortOpen = false;
    },
    toggleSelect() {
      this.isSortOpen = !this.isSortOpen;
    },
    filterBrand(e) {
      const all = this.allProducts;
      if (e.checked) {
        const data = [
          ...this.allProducts.data.filter(el => el.brand.id == e.value)
        ];
        this.productList = { ...all, data: data };
      } else {
        const data = [
          ...this.allProducts.data.filter(el => el.brand.id != e.value)
        ];
        this.productList = { ...all, data: data };
      }
    },
    openFilter() {
      this.$store.commit("filter/SET_MOBILE_FILTER", true);
    }
  }
};
</script>
