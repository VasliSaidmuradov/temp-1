export const state = () => ({
  products: null,
  allProducts: null,
  product: null,
  hits: null,
  sales: null,
  news: null,
  similars: null,
  results: null,
  hints: null,
  search_query: null,
  filters: null,
  brandFilter: null
})

export const getters = {
  GET_PRODUCTS: state => {
    const data = state.products.data.map(el => {
      return {
        ...el,
        image: el.image ? el.image : require('@/static/images/product.png')
      }
    })
    return { ...state.products, data: data }
  },
  GET_ALL_PRODUCTS: state => {
    const data = state.allProducts.data.map(el => {
      return {
        ...el,
        image: el.image ? el.image : require('@/static/images/product.png')
      }
    })
    return { ...state.allProducts, data: data }
  },
  GET_HITS: state => {
    const data = state.hits.data.map(el => {
      return {
        ...el, 
        image: el.image ? el.image : require('@/static/images/product.png')
      }
    })
    const result = { ...state.hits, data: data }
    return result
  },
  GET_SALES: state => {
    const data = state.sales.data.map(el => {
      return { ...el, image: el.image ? el.image : require('@/static/images/product.png') }
    })
    const result = { ...state.sales, data: data }
    return result
  },
  GET_NEWS: state => {
    const data = state.news.data.map(el => {
      return { ...el, image: el.image ? el.image : require('@/static/images/product.png') }
    })
    const result = { ...state.news, data: data }
    return result
  },
  GET_HINTS: state => {
    const data = state.hints.data.map(el => {
      return { ...el, image: el.image ? el.image : require('@/static/images/product.png') }
    })
    const result = { ...state.hints, data: data }
    return result
  },
  GET_PRODUCT: state => ({
    ...state.product, 
    image: state.product.image ? state.product.image : require('@/static/images/product.png')
  }),
  GET_SIMILARS: state => {
    const data = state.similars.data.map(el => {
      return { ...el, image: el.image ? el.image : require('@/static/images/product.png') }
    })
    return { ...state.similars, data: data }
  },
  GET_RESULTS: state => state.results,
  GET_SEARCH_QUERY: state => state.search_query,
  GET_FILTERS: state => state.filters,
  GET_BRAND_FILTER: state => id => state.products.data.filter(el => el.brand.id == id)
}

export const mutations = {
  SET_PRODUCTS: (state, payload) => state.products = payload,
  SET_ALL_PRODUCTS: (state, payload) => state.allProducts = payload,
  SET_HITS: (state, payload) => state.hits = payload,
  SET_SALES: (state, payload) => state.sales = payload,
  SET_NEWS: (state, payload) => state.news = payload,
  SET_PRODUCT: (state, payload) => state.product = payload,
  SET_SIMILARS: (state, payload) => state.similars = payload,
  SET_RESULTS: (state, payload) => state.results = payload,
  SET_HINTS: (state, payload) => state.hints = payload,
  SET_SEARCH_QUERY: (state, payload) => state.search_query = payload,
  SET_FILTERS: (state, payload) => state.filters = payload,
  PAGINATE: (state, payload) => {
    payload.resp.data.forEach(product => payload.paginator.data.push(product))
    payload.paginator.next_page_url = payload.resp.next_page_url
    payload.paginator.prev_page_url = payload.resp.prev_page_url
    payload.paginator.first_page_url = payload.resp.first_page_url
    payload.paginator.last_page_url = payload.resp.last_page_url

    payload.paginator.to = payload.resp.to
    payload.paginator.total = payload.resp.total

    payload.paginator.current_page = payload.resp.current_page
    payload.paginator.last_page = payload.resp.last_page
  },
}

export const actions = {
  async fetchFilters(store, payload) {
    store.commit('SET_FILTERS', await this.$api.get(`/filter${payload}`, {}, 'filters'))
  },
  async fetchProducts(store, payload = '') {
    if (payload.indexOf('?') != -1) {
      payload += '&'
    } else {
      payload += '?'
    }
    payload += 'per_page=15'
    store.commit('SET_PRODUCTS', await this.$api.get(payload, {}, 'products'))
  },
  async fetchAllProducts(store, payload = '') {
    if (payload.indexOf('?') != -1) {
      payload += '&'
    } else {
      payload += '?'
    }
    store.commit('SET_ALL_PRODUCTS', await this.$api.get(payload, {}, 'products'))
  },
  // async fetchAllProducts(store, payload = '') {
  //   const reg = /^[^?]+/g
  //   const url = payload.match(reg).join('')
  //   store.commit('SET_ALL_PRODUCTS', await this.$api.get(url, {}, 'allProducts'))
  // },
  async fetchHits(store, payload) {
    store.commit('SET_HITS', await this.$api.get('/catalog', payload))
  },
  async fetchHints(store, payload) {
    store.commit('SET_HINTS', await this.$api.get('/catalog', payload))
  },
  async fetchNews(store, payload) {
    store.commit('SET_NEWS', await this.$api.get('/catalog', payload))
  },
  async fetchSales(store, payload) {
    store.commit('SET_SALES', await this.$api.get('/catalog', payload))
  },
  async fetchProduct(store, payload) {
    const res = await this.$api.get(`/product/${payload}`)
    store.commit('SET_PRODUCT', res.product)
    store.commit('SET_SIMILARS', res.similars)
  },
  async searchProductHint(store, payload) {
    if (!payload.per_page) {
      payload.per_page = 10
    }
    store.commit('SET_SEARCH_QUERY', payload.q)
    store.commit('SET_HINTS', await this.$api.get('/search', payload))
  },
  async searchProduct(store, payload) {
    store.commit('SET_RESULTS', await this.$api.get('/search', payload))
  },
  async paginate(store, payload) {
    let url = payload.next_page_url
    if (!url) {
      return
    }
    if (payload.rand && url.indexOf('rand=') == -1) {
      if (url.indexOf('?') != -1) {
        url += '&'
      } else {
        url += '?'
      }
      url += `rand=${payload.rand}`
    }

    store.commit('PAGINATE', {
      paginator: payload,
      resp: await this.$api.get(payload.next_page_url)
    })
  }
}
