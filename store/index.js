const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  isMobile: false,
})

export const mutations = {
  SET_IS_MOBILE: (state, payload) => state.isMobile = payload,
}

export const actions = {
  async nuxtServerInit({ state, dispatch, commit }, { req, res, app, route }) {
    // commit('SET_IS_MOBILE', req.headers['x_is_mobile'] == 'true')

    const queue = [dispatch('menu/fetchCategories')]
    // console.log('queue1: ', queue)
    // console.log('Cookie parser: ', cookieparser)

    // if (req.headers.cookie) {
    //   let cookies = cookieparser.parse(req.headers.cookie)
    //   if (cookies.favorites) {
    //     commit('user/SET_PRODUCT_IDS', JSON.parse(cookies.favorites))
    //   }
    //   if (cookies.cart) {
    //     commit('cart/SET_PRODUCT_IDS', JSON.parse(cookies.cart))
    //   }
    //   queue.push(dispatch('auth/signinFromCookies', cookies))

    // }

    const prom = await Promise.all(queue)
    // console.log('Prom: ', prom)
  }
}

export const getters = {
  GET_IS_MOBILE: state => state.isMobile,
}