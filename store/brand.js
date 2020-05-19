export const state = () => ({
  brands: null,
  brandProducts: null,
  filterResult: null
})

export const mutations = {
  SET_BRANDS: (state, payload) => state.brands = payload,
  SET_BRAND_PRODUCTS: (state, payload) => state.brandProducts = payload,
  FILTER_RESULT: (state, payload) => state.filterResult = payload
}

export const actions = {
  async fetchBrands(store) {
    const res = await this.$api.get('/brands')
    console.log('Brands: ', res)
    store.commit('SET_BRANDS', res)
  },
  async fetchBrandProducts(store, payload) {
    const res = await this.$api.get(`/brands/${payload}`)
    store.commit('SET_BRAND_PRODUCTS', res.data)
  },
  async filterByBrands(store, payload) {
    const res = await this.$api.get('/brands', payload, 'filterBrands')
    store.commit('FILTER_RESULT', res)
  }
}

export const getters = {
  GET_BRANDS: state => state.brands,
  GET_BRAND_PRODUCTS: state => state.brandProducts,
  GET_FILTER_RESULT: state => state.filterResult
}
