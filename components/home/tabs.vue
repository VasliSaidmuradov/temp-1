<template>
  <div class="home-products">
    <!-- Tabs {{ tabs }} -->
		<div>
      <div class="tabs-nav">
				<button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab)"
        class="tabs-nav-btn"
        :class="{ '--active': tab.isActive }"
        :v-model='activeTab'
      >{{tab.name}}</button>
      </div>
      <div class="tabs-details">
        <tab v-if="newArrivals" name="Новые поступления" :selected="true">
          <product v-for="product in newArrivals.data" :key="product.id" :product="product" />
        </tab>
        <tab v-if="hits" name="Бестселлеры">
          <product v-for="product in hits.data" :key="product.id" :product="product" />
        </tab>
				<tab v-if="hints" name="Советуем">
          <product v-for="product in hints.data" :key="product.id" :product="product" />
        </tab>
        <tab v-if="sales" name="Акции">
          <product v-for="product in sales.data" :key="product.id" :product="product" />
        </tab>
      </div>
    </div>
  </div>
</template>

<script>
import product from "@/components/partials/product";
import tab from "@/components/home/tab"
import { mapGetters } from "vuex";

export default {
  components: {
		product,
		tab
  },
  data() {
    return {
      productList: null,
      activeTab: null,
      tabs: [
        // { name: "Новые поступления", isActive: true, type: "newArrivals" },
        // { name: "Бестселлеры", isActive: false, type: "hits" },
        // { name: "Советуем", isActive: false, type: "hints" },
        // { name: "Акции", isActive: false, type: "sales" }
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
	created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });
    },
  }
};
</script>
