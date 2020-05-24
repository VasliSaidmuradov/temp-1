import Cookies from 'js-cookie'

export const state = () => ({
	isAuthModalOpen: false,
	isSignedIn: false,
	token: null,
	tokenType: null,
	refreshToken: null,
	expires: null,
})

export const getters = {
	GET_MODAL_STATE: (state) => state.isAuthModalOpen,
	GET_IS_SIGNEDIN: (state) => state.isSignedIn,
	GET_TOKEN: (state) => state.token,
}

export const mutations = {
	SET_MODAL_STATE: (state, payload) => state.isAuthModalOpen = payload,
	SET_IS_SIGNEDIN: (state, payload) => state.isSignedIn = payload,
	SET_TOKEN: (state, payload) => {
		state.token = payload
		if (payload) {
			Cookies.set('authToken', payload, { expires: 3 })
		} else {
			Cookies.remove('authToken')
		}
	},

	SET_TOKEN_TYPE: (state, payload) => {
		state.tokenType = payload
		if (payload) {
			Cookies.set('authTokenType', payload, { expires: 3 })
		} else {
			Cookies.remove('authTokenType')
		}
	},

	SET_EXPIRES: (state, payload) => {
		state.expires = payload
		if (payload) {
			Cookies.set('authTokenExpires', payload, { expires: 3 })
		} else {
			Cookies.remove('authTokenExpires')
		}
	},

	SET_REFRESH_TOKEN: (state, payload) => {
		state.refreshToken = payload
	},
}

export const actions = {
	async setAuthFields(store, payload = {}) {
    console.log('auth setAuthFields 1: ', payload)

		// payload = payload ? payload : {}
		store.commit('SET_TOKEN_TYPE', payload.token_type ? payload.token_type : null)
		store.commit('SET_TOKEN', payload.access_token ? payload.access_token : null)
		store.commit('SET_EXPIRES', payload.expires_in ? payload.expires_in : null)
		store.commit('SET_REFRESH_TOKEN', payload.refresh_token ? payload.refresh_token : null)

		if (payload.token_type && payload.access_token) {
			store.commit('SET_IS_SIGNEDIN', true)
			await store.dispatch('user/fetchUser', {}, { root: true })
		} else {
			store.commit('SET_IS_SIGNEDIN', false)
			store.commit('user/SET_USER', null, { root: true })
    }
    // console.log('auth setAuthFields 2: ', payload)
	},
	async signinFromCookies(store, payload = {}) {
		let cookies = {
			token_type: payload.authTokenType,
			access_token: payload.authToken,
			expires_in: payload.authTokenExpires,
			refresh_token: null
		}
		await store.dispatch('setAuthFields', cookies)
	},
	async signin(store, payload) {
    console.log('auth signin: ', payload)
		await store.dispatch('setAuthFields', await this.$api.post('/login', payload, 'signin'))
	},

	async signup(store, payload) {
		await this.$api.post('/register', payload, 'signup')
	},

	async logout(store, payload) {
    console.log('router: ', this.$router)
    store.dispatch('setAuthFields', {})
    await this.$router.push({ path: '/' });
	},

	async reset(store, payload) {
		await this.$api.post('/password', payload, 'resetPassword')
	},

	async validateCode(store, payload) {
		return await this.$api.get('/verify', payload, 'validateCode')
	},

	async resendCode(store, payload) {
		return await this.$api.put('/user', { phone: payload }, 'updateProfile')
	},
}
