<template>
  <div class="home-products">
    <div>
      <div class="tabs-nav">
        <a
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectTab(tab)"
          class="tabs-nav-btn"
          :class="{ '--active': tab.isActive }"
          :v-model="activeTab"
        >{{tab.name}}</a>
      </div>
      <div class="tabs-details">
        <transition name="fade">
          <tab v-if="hits" name="Бестселлеры" :selected="hits">
            <product v-for="product in hits.data" :key="product.id" :product="product" />
            <!-- {{ hits }} -->
          </tab>
        </transition>
        <transition name="fade">
          <tab v-if="hints" name="Рекомендуем" :selected="!hits && hints">
            <product v-for="product in hints.data" :key="product.id" :product="product" />
            <!-- {{ hints }} -->
          </tab>
        </transition>
        <transition name="fade">
          <tab v-if="newArrivals" name="Новые поступления" :selected="!hits && !hints && newArrivals">
            <product v-for="product in newArrivals.data" :key="product.id" :product="product" />
            <!-- {{ newArrivals }} -->
          </tab>
        </transition>
        <transition name="fade">
          <tab v-if="sales" name="Акции" :selected="!hits && !hints && !newArrivals && sales">
            <product v-for="product in sales.data" :key="product.id" :product="product" />
            <!-- {{ sales }} -->
          </tab>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import product from "@/components/partials/product";
import tab from "@/components/home/tab";
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
    async selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  }
};
</script>
