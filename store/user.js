import Cookies from 'js-cookie'

export const state = () => ({
  products: { data: [] },
  product_ids: [],
  user: null,
})

export const mutations = {
  SET_PRODUCTS: (state, payload) => state.products = payload,
  SET_PRODUCT_IDS: (state, payload) => state.product_ids = payload,
  UPDATE_PRODUCTS_COOKIES: (state, payload) => Cookies.set('favorites', state.product_ids),
  ADD_PRODUCT_TO_PRODUCTS: (state, payload) => {
    let ids = state.product_ids, products = state.products
    products.data.push(payload)
    ids.push(payload.id)
    state.product_ids = ids
    state.products = products
  },
  REMOVE_PRODUCT_FROM_PRODUCTS: (state, payload) => {
    let ids = state.product_ids, products = state.products
    ids = state.product_ids.filter(id => id !== payload.id)
    products.data = state.products.data.filter(product => product.id !== payload.id)
    state.product_ids = ids
    state.products = products
  },
  SET_USER: (state, payload) => state.user = payload
}

export const actions = {
  async fetchFavorites(store, payload) {
    store.commit('SET_PRODUCTS', await this.$api.get('/catalog', {
      ids: store.state.product_ids
    }))
    store.commit('SET_PRODUCT_IDS', store.state.products.data.map(product => product.id))
    store.commit('UPDATE_PRODUCTS_COOKIES')
  },
  toggleFavorite(store, payload) {
    console.log('favorite toggle', payload)
    if (store.getters['IS_FAVORITE'](payload)) {
      store.commit('REMOVE_PRODUCT_FROM_PRODUCTS', payload)
    } else {
      store.commit('ADD_PRODUCT_TO_PRODUCTS', payload)
    }

    store.commit('UPDATE_PRODUCTS_COOKIES')
  },

  async fetchUser(store, payload) {
    console.log('fetch user payload: ', payload)

    let user = await this.$api.get('/user', {})
    console.log('fetch user USER: ', user)

    if (user) {
      store.commit('SET_USER', user)
    } else {
      store.commit('auth/SET_IS_SIGNEDIN', false, { root: true })
    }
  },

  async updateProfile(store, payload) {
    let resp = await this.$api.put('/user', payload, 'updateProfile')
    if (resp) {
      store.commit('SET_USER', resp)
    }
  },
  async updatePassword(store, payload) {
    let resp = await this.$api.put('/auth/password', payload, 'updatePassword')
  },
  async cancelOrder(store, payload) {
    let resp = await this.$api.put('/user/order', payload, 'cancelOrder')
  }
}


export const getters = {
  GET_PRODUCTS: (state) => state.products,
  GET_PRODUCT_IDS: (state) => state.products,
  IS_FAVORITE: (state) => (payload) => state.product_ids.includes(payload.id),
  GET_QUANTITY: (state) => state.product_ids.length,
  GET_USER: (state) => state.user
}
