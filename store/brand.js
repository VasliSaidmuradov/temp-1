export const state = () => ({
  brands: null,
  brandProducts: null,
})

export const mutations = {
  SET_BRANDS: (state, payload) => state.brands = payload,
  SET_BRAND_PRODUCTS: (state, payload) => state.brandProducts = payload,
}

export const actions = {
  async fetchBrands(store) {
    const res = await this.$api.get('/brands')
    // console.log('Brands: ', res)
    store.commit('SET_BRANDS', res)
  },
  async fetchBrandProducts(store, payload) {
    const res = await this.$api.get(`/brands/${payload}`)
    // console.log('brand prods: ', res.data)
    store.commit('SET_BRAND_PRODUCTS', res.data)
  }
}

export const getters = {
  GET_BRANDS: state => state.brands,
  GET_BRAND_PRODUCTS: state => state.brandProducts,
}