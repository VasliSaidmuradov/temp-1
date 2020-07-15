import Cookies from 'js-cookie'

export const state = () => ({
  product_ids: {},
  products: {data: []},
  bonuses: 0,
  discount: 0,
  isCheckoutModalOpen: false,
  deliveryCost: { delivery_cost: 0 },
})

export const getters = {
  getCheckoutModal: state => state.isCheckoutModalOpen,
  GET_PRODUCT_IDS: (state) => state.product_ids,
  GET_PRODUCTS: state => {
    const data = state.products.data.map(el => {
      return {
        ...el,
        image: el.image ? el.image : require('@/static/images/product.png')
      }
    })
    return {...state.products, data: data }
  },
  GET_BONUSES: (state) => state.bonuses,
  GET_QUANTITY: (state) => Object.keys(state.product_ids).length,
  IS_PRODUCT_IN_CART: (state) => (payload) => state.product_ids[`${payload.id}`] > 0,
  GET_CART_QUANTITY: (state) => (payload) => state.product_ids[`${payload.id}`] ? state.product_ids[`${payload.id}`] : 0,
  GET_TOTAL: (state) => Object.keys(state.product_ids).length > 0 ? state.products.data.reduce((sum, product) => {
    return Math.max(0, sum + (product.old_price ? product.old_price : product.price) * (state.product_ids[`${product.id}`] ? state.product_ids[`${product.id}`] : 0));
  }, 0) - state.bonuses : 0,
  GET_DISCOUNT: state => Object.keys(state.product_ids).length > 0 ? state.products.data.reduce((sum, product) => {
    return Math.max(0, sum + (product.old_price ? (product.old_price - product.price) : 0) * (state.product_ids[`${product.id}`] ? state.product_ids[`${product.id}`] : 0))
  }, 0) : 0,
  GET_DELIVERY_COST: state => state.deliveryCost,
  GET_TOTAL_COST: state => Object.keys(state.product_ids).length > 0 ? state.products.data.reduce((sum, product) => {
    return Math.max(0, sum + (product.old_price ? product.old_price : product.price) * (state.product_ids[`${product.id}`] ? state.product_ids[`${product.id}`] : 0))
  }, 0) : 0,
} 

export const mutations = {
  setCheckoutModal: (state, payload) => state.isCheckoutModalOpen = payload,
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
  SET_DELIVERY_COST: (state, payload) => state.deliveryCost = payload,
}

export const actions = {
  async fetchCartProducts(store, payload) {
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
        message: `На данный продукт установлен лимит ${payload.limit  } ${payload.tag.unit}`,
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
    return resp
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
  },
  async deliveryCost(store, payload) {
    const res = await this.$api.get('/delivery-cost', payload);
    store.commit('SET_DELIVERY_COST', res);
  }
}
