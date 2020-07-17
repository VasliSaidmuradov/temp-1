const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  isMobile: false,
  isProfilePhoneSuccessOpen: false,
  isProfileEditPhoneOpen: false,
  isProfileConfirmPhoneOpen: false,
  isMobileFilterOpen: false,
  isCancelOrderOpen: false,
	isSearchActive: false,
	isOverlayActive: false,
	isMobileSearchOpen: false,
	isThanksOpen: false,
	isRestoreOpen: false,
	isVerifyOpen: false,
	isRemoveOrderOpen: false,
	isNotifOpen: false,
	modals: {},
})

export const mutations = {
  SET_MOBILE_FILTER: (state, payload) => state.isMobileFilterOpen = payload,
  SET_PROFILE_PHONE_SUCCESS: (state, payload) => state.isProfilePhoneSuccessOpen = payload,
  SET_PROFILE_PHONE_EDIT: (state, payload) => state.isProfileEditPhoneOpen = payload,
  SET_PROFILE_PHONE_CONFIRM: (state, payload) => state.isProfileConfirmPhoneOpen = payload,
  SET_CANCEL_MODAL: (state, payload) => state.isCancelOrderOpen = payload,
	SET_SEARCH: (state, payload) => state.isSearchActive = payload,
	SET_OVERLAY: (state, payload) => state.isOverlayActive = payload,
	SET_MOB_SEARCH: (state, payload) => state.isMobileSearchOpen = payload,
	SET_THANKS: (state, payload) => state.isThanksOpen = payload,
  SET_IS_MOBILE: (state, payload) => state.isMobile = payload,
  SET_RESTORE_MODAL: (state, payload) => state.isRestoreOpen = payload,
  SET_VERIFY_MODAL: (state, payload) => state.isVerifyOpen = payload,
  SET_REMOVE_ORDER: (state, payload) => state.isRemoveOrderOpen = payload,
  SET_NOTIFICATION: (state, payload) => state.isNotifOpen = payload,
  SHOW_MODAL: (state, payload) => {
		let modal = {}
		if (typeof payload == 'string') {
			modal[payload] = true
			state.modals[payload] = true
		} else {
			modal = payload
		}
		state.modals = Object.assign({}, state.modals, modal)
	},
  CLOSE_MODAL: (state, payload) => state.modals[payload] = null
}

export const actions = {
  async nuxtServerInit({ state, dispatch, commit }, { req, res, app, route }) {
    commit('SET_IS_MOBILE', req.headers['x_is_mobile'] == 'true')

    const queue = [ 
      dispatch('menu/fetchCategories'),
      // dispatch('brand/fetchBrandsToMain'),
      // dispatch('cart/fetchCartProducts')
    ]
    if (req.headers.cookie) {
      const cookies = cookieparser.parse(req.headers.cookie)

      if (cookies.favorites) {
        commit('user/SET_PRODUCT_IDS', JSON.parse(cookies.favorites))
      }
      if (cookies.cart) {
        commit('cart/SET_PRODUCT_IDS', JSON.parse(cookies.cart))
      }

      queue.push(dispatch('auth/signinFromCookies', cookies))
    }
    Promise.all([dispatch('brand/fetchBrandsToMain')])
    await Promise.all(queue)
  }
}

export const getters = {
  GET_IS_MOBILE: state => state.isMobile,
  GET_CANCEL_MODAL: state => state.isCancelOrderOpen,
  GET_PROFILE_PHONE_SUCCESS: state => state.isProfilePhoneSuccessOpen,
  GET_PROFILE_PHONE_EDIT: state => state.isProfileEditPhoneOpen,
  GET_PROFILE_PHONE_CONFIRM: state => state.isProfileConfirmPhoneOpen,
  GET_SEARCH: state => state.isSearchActive,
	GET_MOB_SEARCH: state => state.isMobileSearchOpen,
	GET_OVERLAY: state => state.isOverlayActive,
	GET_THANKS: state => state.isThanksOpen,
	GET_IS_MOBILE: state => state.isMobile,
	GET_RESTORE_MODAL: state => state.isRestoreOpen,
	GET_VERIFY_MODAL: state => state.isVerifyOpen,
	GET_REMOVE_ORDER: state => state.isRemoveOrderOpen,
	GET_NOTIFICATION: state => state.isNotifOpen,
  IS_MODAL_OPEN: (state) => (payload) => state.modals[payload]
}
