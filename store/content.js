export const state = () => ({
  slides: null,
  posts: null,
  all_posts: null,
  post: null,
  banners: null
})

export const mutations = {
  SET_SLIDES: (state, payload) => state.slides = payload,
  SET_POSTS: (state, payload) => state.posts = payload,
  SET_ALL_POSTS: (state, payload) => state.all_posts = payload,
  SET_POST: (state, payload) => state.post = payload,
  SET_BANNERS: (state, payload) => state.banners = payload
}

export const actions = {
  async fetchSlides(store) {
    const res = await this.$api.get('/banners')
    // console.log('Slides: ', res)
    store.commit('SET_SLIDES', res)
  },
  async fetchPosts(store, payload = {}) {
    const res = await this.$api.get('/posts', payload)
    // console.log('Posts: ', res.data)
    store.commit('SET_POSTS', res)
  },
  async fetchAllPosts(store) {
    const res = await this.$api.get('/posts')
    // console.log('All posts: ', res.data)
    store.commit('SET_ALL_POSTS', res)
  },
  async fetchPost(store, payload) {
    // console.log('Post payload: ', payload)
    const res = await this.$api.get(`/posts/${payload}`)
    // console.log('Post: ', res.data)
    store.commit('SET_POST', res.data)
  },
  async fetchBanners(store) {
    const res = await this.$api.get(`/advertisements`)
    store.commit('SET_BANNERS', res)
  }
}

export const getters = {
  GET_SLIDES: state => state.slides,
  GET_POSTS: state => state.posts,
  GET_ALL_POSTS: state => state.all_posts,
  GET_POST: state => state.post,
  GET_BANNERS: state => state.banners
}
