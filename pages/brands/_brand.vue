<template>
<div class="category-page">
  <div class="container">
    <div class="breadcrumbs">
      <nuxt-link to="/">Главная /</nuxt-link>
      <nuxt-link v-if="true" to>{{ brand.name }}</nuxt-link>
    </div>
    <div class="row">
      <div class="left-col">
        <nuxt-link class="category-page-back" to="/brands">Список брендов</nuxt-link>
        <nuxt-link
          v-for="item in brandsToMain.data"
          :key="item.id"
          :to="item.slug"
          class="category-page-subcat-link"
        >
          {{ item.name }}
        </nuxt-link>
        <button 
          @click="showMore"
          :disabled="isBusy || !brandsToMain.next_page_url"
          :class="{ '--disabled': isBusy || !brandsToMain.next_page_url }"
          class="category-page-toggle-btn"
        >
          Показать еще
        </button>
        <!-- {{ brandsToMain }} -->
      </div>
      <div class="right-col">
        <brand :brand="brand" />
        <div class="category-page-mob">
          <p class="category-page-total">{{ products.total }} товар{{!products.total || products.total >= 5 ? 'ов' : products.total === 1 ? '' : 'а'}}</p>
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
            <button class="category-page-filter">Фильтр</button>
          </div>
        </div>
        <div class="category-page-sort-wrp">
          <p class="category-page-total">{{ products.total }} товар{{!products.total || products.total >= 5 ? 'ов' : products.total === 1 ? '' : 'а'}}</p>
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
        <div class="category-page-product-wrp" v-for="(items, index) in $chunk(products.data, 4)" :key="index">
          <product v-for="product in items" :key="product.id" :product="product" />
        </div>
        <pagination
            :paginator="products"
          />
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
import {
  mapGetters, mapActions
} from "vuex";

export default {
  middleware: ["catalog", "brandProducts"],
  data: () => ({
    isBrand: false,
    sort: "default",
    delay: null,
    isSortOpen: false,
    productList: [],
    isBusy: false,
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
      brands: "brand/GET_BRANDS",
      brandsToMain: 'brand/GET_BRANDS_TO_MAIN',
      brand: 'brand/GET_BRAND',
      products: "brand/GET_BRAND_PRODUCTS",

      // allProducts: 'products/GET_ALL_PRODUCTS'
      // categories: "menu/GET_CATEGORIES",
    }),
    brandList() {
      let chunkedArr = this.$chunk(this.brandsToMain.data, 20);
      return chunkedArr;
    },
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
      const prods = {
        ...this.products,
        data: this.products.products
      };
      return prods;
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
    sort: function (val) {
      let query = {
        ...this.$route.query
      };
      if (val == "default") {
        delete query["sort"];
      } else {
        query["sort"] = val.toString();
      }
      this.$router.push({
        path: this.$route.path,
        query: query
      });
    },
    "$route.fullPath": function (fullPath) {
      if (this.delay) {
        clearTimeout(this.delay);
      }
      this.delay = setTimeout(() => {
        let params = {
          brand_ids: this.brand.id
        }
        if (this.$route.query.sort) {
          params.sort = this.$route.query.sort
        }
        this.$store.dispatch(
          "brand/fetchBrandProducts",
          params
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
    ...mapActions({
      paginate: 'product/paginate',
    }),
    showFilter() {
      this.$store.commit("SET_MOBILE_FILTER", true);
    },
    toggleSelect() {
      this.isSortOpen = !this.isSortOpen;
    },
    filterBrand(e) {
      if (e.checked) {
        const res = this.allProducts.data.filter(el => el.brand.id == e.value);
        this.productList.push(...res);
      } else {
        this.productList = this.productList.filter(
          el => el.brand.id != e.value
        );
      }
    },
    sorting(e) {
      this.sort = e;
      this.isSortOpen = false;
    },
    async showMore() {
      try {
        this.isBusy = true;
        await this.paginate(this.brandsToMain);
        await this.paginate(this.brandsToMain);
      } catch (error) {
        cinsole.log(error);
      } finally {
        this.isBusy = false;
      }
    }
  }
};
</script>
