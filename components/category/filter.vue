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
    <div v-if="filterByBrands && getBrands.length" class="filter-block">
      <p class="filter-title">Бренд</p>
      <label class="filter-checkbox" v-for="brand in getBrands" :key="brand.id">
        <input
          type="checkbox"
          :value="brand.id"
          @change="onFilterChange"
        />
        <div class="filter-checkmark"></div>
        <p>{{ brand.name }}</p>
      </label>
      <!-- {{ getBrands }} -->
    </div>
    <div class="filter-block">
      <!-- <p class="filter-title">Эксклюзивные предложения</p> -->
      <!-- <label class="filter-checkbox">
        <input
          type="checkbox"
          value="sales"
          @change="salesFilter"
        />
        <div class="filter-checkmark"></div>
        <p>Скидки</p>
      </label> -->
      <!-- <label class="filter-checkbox">
        <input type="checkbox" />
        <div class="filter-checkmark"></div>
        <p>Товары с подарками</p>
      </label> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    cats: Array,
    allProducts: Object,
    filterByBrands: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      minmax: [0, 0],
      price: [0, 0],
      isDropdownOpen: true,
      priceTimeout: null,
      showPrice: true,
    };
  },
  computed: {
    ...mapGetters({
      products: "product/GET_PRODUCTS",
      // allProducts: "product/GET_ALL_PRODUCTS",
      brands: "brand/GET_BRANDS",
      filters: "product/GET_FILTERS",
      brandFilter: 'product/GET_BRAND_FILTER',

    }),
    getBrands() {
      const products = this.allProducts.data || this.allProducts.products
      const brands = products.map(el => el.brand)
      console.log(this.$route)
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
            min_price: val[0] !== this.products.min_price ? val[0] : null,
            max_price: val[1] !== this.products.max_price ? val[1] : null
          },
          false,
          false
        );
      }, 500);
    }
  },
  methods: {
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
    },
    clearPrice() {
      this.$addQuery(
        {
          min_price: this.products.min_price,
          max_price: this.products.max_price
        },
        false,
        false
      )
    }
  }
};
</script>

<style>
</style>
