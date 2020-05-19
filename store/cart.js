import Cookies from 'js-cookie'

export const state = () => ({
  product_ids: {},
  products: {data: []},
  bonuses: 0,
  discount: 200
})

export const getters = {
  GET_PRODUCT_IDS: (state) => state.product_ids,
  GET_PRODUCTS: (state) => state.products,
  GET_BONUSES: (state) => state.bonuses,
  GET_QUANTITY: (state) => Object.keys(state.product_ids).length,
  IS_PRODUCT_IN_CART: (state) => (payload) => state.product_ids[`${payload.id}`] > 0,
  GET_CART_QUANTITY: (state) => (payload) => state.product_ids[`${payload.id}`] ? state.product_ids[`${payload.id}`] : 0,
  GET_TOTAL: (state) => Object.keys(state.product_ids).length > 0 ? state.products.data.reduce((sum, product) => {
    return Math.max(0, sum - state.bonuses + product.price * (state.product_ids[`${product.id}`] ? state.product_ids[`${product.id}`] : 0))
  }, 0) : 0,
  GET_DISCOUNT: state => state.discount
}

export const mutations = {
  SET_PRODUCTS: (state, payload) => state.products = payload,
  SET_BONUSES: (state, payload) => state.bonuses = payload,
  SET_PRODUCT_IDS: (state, payload) => state.product_ids = payload,
  INCREASE: (state, payload) => state.product_ids[`${payload.id}`] = (state.product_ids[`${payload.id}`] ? state.product_ids[`${payload.id}`] + 1 : 1),
  DECREASE: (state, payload) => {
    state.product_ids[`${payload.id}`] = (state.product_ids[`${payload.id}`] > 1 ? state.product_ids[`${payload.id}`] - 1 : 0)
    if (state.product_ids[`${payload.id}`] <= 0) {
      delete state.product_ids[`${payload.id}`]
    }
  },
  UPDATE_PRODUCTS_COOKIES: (state, payload) => {
    state.product_ids = {...state.product_ids}
    Cookies.set('cart', state.product_ids)
  },
}

export const actions = {
  async fetchCartProducts(store, payload) {
    console.log('cart prod ids: ', store.state.product_ids)
    store.commit('SET_PRODUCTS', await this.$api.get('/catalog', {
      ids: Object.keys(store.state.product_ids)
    }))

    let ids = {}
    store.state.products.data.forEach(product => {
      ids[`${product.id}`] = store.state.product_ids[`${product.id}`]
    })

    store.commit('SET_PRODUCT_IDS', ids)
    store.commit('UPDATE_PRODUCTS_COOKIES')
  },
  async increase(store, payload) {
    if (payload.limit && store.state.product_ids[`${payload.id}`] && payload.limit <= store.state.product_ids[`${payload.id}`]) {
      this.$alert({
        message: `На данный продукт установлен лимит ${payload.limit * payload.amount} ${payload.tag.unit}`,
        type: 'error'
      })
      return
    }
    store.commit('INCREASE', payload)
    store.commit('UPDATE_PRODUCTS_COOKIES')
  },
  async decrease(store, payload) {
    store.commit('DECREASE', payload)
    store.commit('UPDATE_PRODUCTS_COOKIES')
  },
  async checkout(store, payload) {
    let resp = await this.$api.post('/order', {
      order: Object.assign({}, payload, {bonuses_used: store.state.bonuses}),
      items: store.state.product_ids
    })

    if (resp) {
      store.commit('SET_PRODUCT_IDS', {})
      store.commit('UPDATE_PRODUCTS_COOKIES')
    }
    console.log(resp)
  },
  async useBonuses(store, payload) {
    if (!this.$checkAuth()) {
      return
    }

    if (this.$getUser().bonus >= payload) {
      store.commit('SET_BONUSES', payload)
      this.$alert({
        message: 'Бонусы успешно применены',
        type: 'success'
      })
    } else {
      this.$alert({
        message: 'У вас недостаточно бонусов',
        type: 'error',
      })
    }
  }
}
