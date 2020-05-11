<template>
  <div class="home-products">
    <nav class="tabs-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab)"
        class="tabs-nav-btn"
        :class="{ '--active': tab.isActive }"
      >{{tab.name}}</button>
    </nav>
    <div class="home-products-row">
      <product v-for="product in newArrivals.data" :key="product.id" :product="product" />
      <!-- <product v-for="product in productList.data" :key="product.id" :product="product" /> -->
    </div>
    <!-- ::: {{ newArrivals }} -->
  </div>
</template>

<script>
import product from "@/components/partials/product";
import { mapGetters } from "vuex";

export default {
  components: {
    product
  },
  data() {
    return {
      productList: null,
      tabs: [
        { name: "Новые поступления", isActive: true, type: "newArrivals" },
        { name: "Бестселлеры", isActive: false, type: "hits" },
        { name: "Советуем", isActive: false, type: "hints" },
        { name: "Акции", isActive: false, type: "sales" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      newArrivals: "product/GET_NEWS",
      hits: "product/GET_HITS",
      hints: "product/GET_HINTS",
      sales: "product/GET_SALES"
    })
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
      this.getProducts(selectedTab.type);
    },
    getProducts(type) {
      if (!type) this.productList = this.newArrivals;
      else this.productList = this[type];
    }
  }
};
</script>