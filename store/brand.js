export const state = () => ({
  brands: null,
  brandProducts: null,
  filterResult: null,
  filteredProducts: null,
  brandsToMain: null,
  searchBrandResult: null,
})

export const mutations = {
  SET_BRANDS: (state, payload) => state.brands = payload,
  SET_BRAND_PRODUCTS: (state, payload) => state.brandProducts = payload,
  FILTER_RESULT: (state, payload) => state.filterResult = payload,
  FILTER_BRANDS: (state, payload) => state.filteredProducts = payload,
  SET_BRANDS_TO_MAIN: (state, payload) => state.brandsToMain = payload,
  SET_SEARCH_BRANDS: (state, payload) => state.searchBrandResult = payload,
}

export const actions = {
  async fetchBrands(store, payload = {}) {
    const res = await this.$api.get('/brands', payload)
    // console.log('brands: ', res)
    store.commit('SET_BRANDS', res)
  },
  async fetchBrandsToMain(store) {
    store.commit('SET_BRANDS_TO_MAIN', await this.$api.get('/brands', { to_main: 1, per_page: 10 }))
  },
  async fetchBrandProducts(store, payload) {
    const res = await this.$api.get(`/brands/${payload}`)
    store.commit('SET_BRAND_PRODUCTS', res.data)
  },
  async filterByBrands(store, payload) {
    const res = await this.$api.get(`/brands-filter/${payload.slug}?ids=${payload.ids}`)
    store.commit('FILTER_BRANDS', res)
  },
  async searchBrands(store, payload) {
    const res = await this.$api.get(`/search-brand?q=${payload}`);
    store.commit('SET_SEARCH_BRANDS', res);
  }
}

export const getters = {
  GET_BRANDS: state => state.brands,
  GET_BRAND_PRODUCTS: state => {
    const data = state.brandProducts ? state.brandProducts.products.map(el => {
      return { ...el, image: el.image ? el.image : require('@/static/images/product.png') }
    }) : []
    return { ...state.brandProducts, products: data }
  },
  GET_FILTERED_PRODUCTS: state => state.filteredProducts,
  GET_BRANDS_TO_MAIN: state => state.brandsToMain,
  GET_SEARCH_BRANDS: state => state.searchBrandResult,
}
