<template>
  <div class="filter">
    <button class="filter-clear" @click="clearFilters">Очистить фильтр</button>
    <div class="filter-block">
      <div class="filter-range-top">
        <p class="filter-title">Цена</p>
        <button @click="clearPrice">Сбросить</button>
      </div>
      <div class="filter-range-bot">
        <div class="filter-input-wrp">
          <label>от</label>
          <input type="text" v-model="price[0]" class="filter-input" />
        </div>
        <div class="filter-input-wrp">
          <label>до</label>
          <input type="text" v-model="price[1]" class="filter-input" />
        </div>
      </div>
    </div>
    <div v-if="filterByBrands && filter.data.length" id="filterBlockWeb" class="filter-block">
      <p class="filter-title">Бренд</p>
      <label
        class="filter-checkbox"
        v-for="brand in filter.data"
        :key="brand.id">
        <input
          type="checkbox"
          :value="brand.id"
          @change="onFilterChange"
          class="filter-checkbox-input"
        />
        <div class="filter-checkmark"></div>
        <p>{{ brand.name }}</p>
      </label>
      <button
        v-if="filter.current_page != filter.last_page"
        @click="showMore" 
        :disabled="false"
        :class="{ '--disabled': false }"
        class="category-page-toggle-btn"
      >Показать еще</button>
      <!-- {{ filter }} -->
    </div>
    <div class="filter-block">
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    cats: Array,
    filterByBrands: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      minmax: [0, 0],
      price: [0, 0],
      isDropdownOpen: true,
      priceTimeout: null,
      showPrice: true,
      brandsToShow: 10,
    };
  },
  computed: {
    ...mapGetters({
      products: "product/GET_PRODUCTS",
      allProducts: "product/GET_ALL_PRODUCTS",
      brands: "brand/GET_BRANDS",
      filters: "product/GET_FILTERS",
      brandFilter: 'product/GET_BRAND_FILTER',
      filter: 'brand/GET_FILTERS'
    }),
    getBrands() {
      const products = this.allProducts.data || this.allProducts.products
      const brands = products.map(el => el.brand)
      const res = brands.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return res
    }
  },
  mounted() {
    if (this.products) {
      const minPrice = this.$route.query.min_price
        ? this.$route.query.min_price
        : this.products.min_price;
      const maxPrice = this.$route.query.max_price
        ? this.$route.query.max_price
        : this.products.max_price;
      this.price = [minPrice, maxPrice];
      this.minmax = [
        Math.min(minPrice, this.products.min_price),
        Math.max(maxPrice, this.products.max_price)
      ];
    }
  },
  watch: {
    products: function(products) {
      if (products.min_price && products.max_price) {
        this.showPrice = false;
        const minPrice = this.$route.query.min_price
          ? this.$route.query.min_price
          : this.products.min_price;
        const maxPrice = this.$route.query.max_price
          ? this.$route.query.max_price
          : this.products.max_price;
        this.price = [minPrice, maxPrice];
        this.minmax = [
          Math.min(minPrice, this.products.min_price),
          Math.max(maxPrice, this.products.max_price)
        ];
        this.showPrice = true;
      }
    },
    price: function(val) {
      if (this.priceTimeout) {
        clearTimeout(this.priceTimeout);
      }

      this.priceTimeout = setTimeout(() => {
        this.$addQuery(
          {
            // page: 1,
            min_price: val[0] !== this.products.min_price ? val[0] : null,
            max_price: val[1] !== this.products.max_price ? val[1] : null
          },
          false,
          false
        );
      }, 800);
    }
  },
  methods: {
    ...mapActions({
      paginate: 'product/paginate',
    }),
    isChecked(filter, value) {
      if (
        this.$route.query[filter] &&
        typeof this.$route.query[filter] !== "string"
      ) {
        return this.$route.query[filter].indexOf(value) !== -1;
      }

      return this.$route.query[filter] === value;
    },
    onFilterChange(event) {
      this.$emit("brand-filter", event.target)
    },
    salesFilter(event) {
      this.$emit("sales-filter", event.target)
    },
    clearFilters() {
      this.$clearQuery();
      this.checkboxCheckOff("filterBlockWeb", ".filter-checkbox-input");
    },
    clearPrice() {
      this.$addQuery(
        {
          page: 1,
          min_price: this.products.min_price,
          max_price: this.products.max_price
        },
        false,
        false
      )
    },
    checkboxCheckOff(elem, input) {
      const element = document.getElementById(elem);
      let checkboxes = [...element.querySelectorAll(input)];
      checkboxes.forEach(el => (el.checked = false));
    },
    showMore() {
      this.paginate(this.filter)
    }
  }
};
</script>

<style>
</style>
