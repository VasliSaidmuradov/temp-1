<template>
  <div class="pagination">
		<!-- {{ paginator }} -->
    <nuxt-link
      v-show="paginator.current_page > 1"
      class="pagination-prev"
      :to="{path: $route.path, query: Object.assign({}, $route.query, {page: `${paginator.current_page - 1}`})}"
      @click.native="scrollToTop"
    ></nuxt-link>
    <span
      v-if="Math.abs(paginator.current_page - index) <= 2 || index == paginator.last_page || index == 1"
      v-for="index in Math.ceil(paginator.total/paginator.per_page)"
      :key="index.id"
    >
      <nuxt-link
        v-if="Math.abs(paginator.current_page - index) <= 1 || index == paginator.last_page || index == 1"
        :to="{path: $route.path, query: Object.assign({}, $route.query, {page: `${index}`})}"
        @click.native="scrollToTop"
        class="pagination-link"
        :class="[{'--active': paginator.current_page == index}]"
      >{{ index }}</nuxt-link>
      <span v-else-if="Math.abs(paginator.current_page - index) ==2">...</span>
    </span>
    <nuxt-link
      v-show="paginator.current_page < paginator.last_page"
      class="pagination-next"
      :to="{path: $route.path, query: Object.assign({}, $route.query, {page: `${paginator.current_page + 1}`})}"
      @click.native="scrollToTop"
    ></nuxt-link>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    paginator: Object
  },
  data() {
    return {
      isBusy: false
    };
  },
  methods: {
    ...mapActions({ paginate: "product/PAGINATE" }),
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    if (process.client) {
      document.addEventListener("scroll", async () => {
        if (this.isBusy) {
          return;
        }

        if (
          this.$refs.pagination &&
          this.$refs.pagination.getBoundingClientRect().bottom - 300 <
            window.innerHeight
        ) {
          this.isBusy = true;
          await this.paginate(this.paginator);
          this.isBusy = false;
        }
      });
    }
  }
};
</script>

<style>
</style>
