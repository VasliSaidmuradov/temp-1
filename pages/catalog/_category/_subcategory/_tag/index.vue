<template>
  <div class="category-page">
    <mobile-filter @brand-filter="filterBrand" v-if="$isMobile()"/>
    <div class="container">
      {{ changeCurrentRoute() }}
      <div class="breadcrumbs">
        <nuxt-link to="/">Главная /</nuxt-link>
        <nuxt-link v-if="category" :to="`/catalog/${category.slug}`">
          {{ category.name }}
          <span v-if="subcategory">/</span>
        </nuxt-link>
        <nuxt-link v-if="subcategory" :to="`/catalog/${category.slug}/${subcategory.slug}`">
          {{ subcategory.name }}
          <span v-if="tag">/</span>
        </nuxt-link>
        <nuxt-link
          v-if="tag"
          :to="`/catalog/${category.slug}/${subcategory.slug}/${tag.slug}`"
        >{{ tag.name }}</nuxt-link>
      </div>
      <h1
        class="category-page-title"
      >{{ `${tag ? tag.name : subcategory ? subcategory.name : category.name}` }}</h1>
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
          <!-- {{categories ? 'ccc' : 'no ccc'}}
          <br />
          {{category ? category  : 'no cats'}}
          <br />
          {{subcategory ? 'subcats' : 'no subcat'}}
          <br />
          {{tag ? 'tags' : 'no tags'}}-->
          <category-filter
            :filterByBrands="true"
            @brand-filter="filterBrand"
            :cats="tag ? null : subcategory ? subcategory.tags : category ? category.subcategories : categories"
          />
        </div>
        <div class="right-col">
          <!-- {{ filteredProducts }} -->
          <div class="category-page-mob" v-if="$isMobile()">
            <p
              class="category-page-total"
            >{{ products.total }} товар{{!products.total || products.total >= 5 ? 'ов' : products.total === 1 ? '' : 'а'}}</p>
            <nuxt-link class="category-page-back" to="/catalog">Все категории</nuxt-link>
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
            <p
              class="category-page-total"
            >{{ products.total }} товар{{!products.total || products.total >= 5 ? 'ов' : products.total === 1 ? '' : 'а'}}</p>
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
          <div
            class="category-page-product-wrp"
            v-for="(items, index) in $chunk(products.data, 4)"
            :key="index"
          >
            <product v-for="product in items" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
      <pagination
        :paginator="products"
      />
    </div>
  </div>
</template>

<script>
import subcategories from "@/components/category/subcategories";
import categoryFilter from "@/components/category/filter";
import brand from "@/components/category/brand";
import product from "@/components/partials/product";
import pagination from "@/components/partials/pagination";
import mobileFilter from "@/components/category/mobile-filter.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    subcategories,
    categoryFilter,
    product,
    brand,
    pagination,
    mobileFilter
  },
  middleware: ["catalog", "brands", "sales"],
  data: () => ({
    isBrand: false,
    sort: "default",
    delay: null,
    productList: { data: null },
    isSortOpen: false,
    ids: [],
    currentRoute: null
  }),
  computed: {
    ...mapGetters({
      products: "product/GET_PRODUCTS",
      categories: "menu/GET_CATEGORIES"
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
    "$route.fullPath": function(fullPath) {
      // this.changeCurrentRoute()
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
    },
    sort: function(val) {
      let query = { ...this.$route.query };

      if (val == "default") {
        delete query["sort"];
      } else {
        query["sort"] = val.toString();
      }
      this.$router.push({ path: this.$route.path, query: query });
    },
  },
  mounted() {
    if (this.$route.query.sort) {
      this.sort = this.$route.query.sort;
    }
    // console.log(this.products)
  },
  methods: {
    ...mapActions({
      filterByBrands: "brand/filterByBrands"
    }),
    showFilter() {
      this.$store.commit("SET_MOBILE_FILTER", true);
    },
    toggleSelect() {
      this.isSortOpen = !this.isSortOpen;
    },
    filterBrand(e) {
      if (!this.ids.includes(e.value)) this.ids.push(e.value);
      else if (this.ids.includes(e.value)) {
        this.ids.splice(this.ids.indexOf(e.value), 1);
      }
      this.$addQuery(
        {
          page: 1,
          brand_ids: this.ids ? this.ids : null
        },
        false,
        false
      );
    },
    sorting(e) {
      this.sort = e;
      this.isSortOpen = false;
    },
    changeCurrentRoute() {
      this.currentRoute = this.$route.fullPath;
    },
    openFilter() {
      document.body.classList.add('--hidden');
      this.$store.commit("filter/SET_MOBILE_FILTER", true);
    }
  }
};
</script>
