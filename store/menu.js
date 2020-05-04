export const state = () => ({
	isMenuOpen: false,
	categories: [],
})

export const getters = {
	GET_MENU_STATE: state => state.isMenuOpen,
	GET_CATEGORIES: (state) => state.categories,
}

export const mutations = {
	TOGGLE_MENU_STATE: state => {
		document.body.classList.toggle('--hidden'),
			state.isMenuOpen = !state.isMenuOpen
	},
	SET_CATEGORIES: (state, payload) => state.categories = payload,
}

export const actions = {
	async fetchCategories(store) {
		store.commit('SET_CATEGORIES', await this.$api.get('/categories'))
	}
}