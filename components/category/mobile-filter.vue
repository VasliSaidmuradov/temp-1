<template>
  <div v-if="$isMobile()" class="mobile-filter" :class="{'--open' : isOpen}">
    <div class="mobile-filter__header">
      <span class="mobile-filter__title">Фильтр</span>
      <close-icon @click="close" class="mobile-filter__close-icon" />
    </div>
    <!-- {{ brandIds }} -->
    <div class="filter">
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
      <div v-if="filterByBrands && brands.data.length" id="filterBlock" class="filter-block">
        <p class="filter-title">Бренд</p>
        <label class="filter-checkbox" v-for="brand in brands.data" :key="brand.id">
          <input
            class="filter-checkbox-input"
            type="checkbox"
            :value="brand.id"
            @change="onFilterChange"
          />
          <div class="filter-checkmark"></div>
          <p>{{ brand.name }}</p>
        </label>
        <button
          v-if="brands.current_page != brands.last_page"
          @click="showMore"
          :disabled="false"
          :class="{ '--disabled': false }"
          class="category-page-toggle-btn"
        >Показать еще</button>
      </div>
      <div class="filter-block"></div>
    </div>
    <div class="mobile-filter__footer">
      <button class="filter-clear" @click="clearFilters">Очистить фильтр</button>
      <button class="filter-accept button --main-color" @click="applyFillters">Применить</button>
    </div>
  </div>
</template>

<script>
import closeIcon from "@/static/icons/close-icon.svg";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    cats: Array,
    filterByBrands: {
      type: Boolean,
      default: true
    }
  },
  components: {
    closeIcon
  },
  data() {
    return {
      minmax: [0, 0],
      price: [0, 0],
      brandIds: [],
      isDropdownOpen: true,
      priceTimeout: null,
      showPrice: true
    };
  },
  computed: {
    ...mapGetters({
      products: "product/GET_PRODUCTS",
      brands: "brand/GET_FILTERS",
      filters: "product/GET_FILTERS",
      brandFilter: "product/GET_BRAND_FILTER",
      isOpen: "filter/GET_MOBILE_FILTER"
    }),
  },
  mounted() {
      console.log(this.brands)
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
    }
  },
  methods: {
      ...mapActions({
        paginate: 'product/paginate',
      }),
      showMore() {
        this.paginate(this.brands)
    },
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
      // console.log(event.target.value);
      this.filterBrand(event.target);
      // this.$emit("brand-filter", event.target);
    },
    salesFilter(event) {
      this.$emit("sales-filter", event.target);
    },
    clearFilters() {
      this.$clearQuery();
      this.brandIds = []
      this.price = [this.products.min_price, this.products.max_price];
      this.checkboxCheckOff("filterBlock", ".filter-checkbox-input");
      // this.close();
    },
    clearPrice() {
      this.$addQuery(
        {
          min_price: this.products.min_price,
          max_price: this.products.max_price
        },
        false,
        false
      );
      this.price = [this.products.min_price, this.products.max_price];
    },
    close() {
      document.body.classList.remove('--hidden');
      this.$store.commit("filter/SET_MOBILE_FILTER", false);
    },
    applyFillters() {
      this.$addQuery(
        {
          page: 1,
          min_price:
            this.price[0] !== this.products.min_price ? this.price[0] : null,
          max_price:
            this.price[1] !== this.products.max_price ? this.price[1] : null,
          brand_ids: this.brandIds ? this.brandIds : null
        },
        false,
        false
      );
      this.close();
    },
    checkboxCheckOff(elem, input) {
      const element = document.getElementById(elem);
      let checkboxes = [...element.querySelectorAll(input)];
      checkboxes.forEach(el => (el.checked = false));
    },
    filterBrand(e) {
      if (!this.brandIds.includes(e.value)) this.brandIds.push(e.value);
      else if (this.brandIds.includes(e.value)) {
        this.brandIds.splice(this.brandIds.indexOf(e.value), 1);
      }
      this.brandIds.join(",");
    }
  }
};
</script>
