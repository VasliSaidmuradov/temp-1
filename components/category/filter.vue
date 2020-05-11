<template>
  <div class="filter">
    <button class="filter-clear" @click="clearFilters">Очистить фильтр</button>
    <div class="filter-block">
      <div class="filter-range-top">
        <p class="filter-title">Цена</p>
        <button>Сбросить</button>
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
    <div class="filter-block">
      <p class="filter-title">Бренд</p>
      <label class="filter-checkbox" v-for="brand in brands" :key="brand.id">
        <input
          type="checkbox"
          :value="brand.slug"
          @change="onFilterChange(brand, $event.target.value)"
					
        />
        <div class="filter-checkmark"></div>
        <p>{{ brand.name }}</p>
      </label>
    </div>
    <div class="filter-block">
      <p class="filter-title">Эксклюзивные предложения</p>
      <label class="filter-checkbox">
        <input type="checkbox" />
        <div class="filter-checkmark"></div>
        <p>Скидки</p>
      </label>
      <label class="filter-checkbox">
        <input type="checkbox" />
        <div class="filter-checkmark"></div>
        <p>Товары с подарками</p>
      </label>
    </div>
    <!-- brands: {{ brands }} -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    cats: Array
  },
  data() {
    return {
      minmax: [0, 0],
      price: [0, 0],
      isDropdownOpen: true,
      priceTimeout: null,
      showPrice: true
    };
  },
  computed: {
    ...mapGetters({
      products: "product/GET_PRODUCTS",
      brands: "brand/GET_BRANDS",
      filters: "product/GET_FILTERS"
    })
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
      }, 1000);
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
    onFilterChange(filter, value) {
			console.log('filter', filter)
			console.log('value', value)

      this.$toggleQuery({
        [filter]: value
      });
    },
    clearFilters() {
      this.$clearQuery();
    }
  }
};
</script>

<style>
</style>