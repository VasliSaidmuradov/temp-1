export const state = () => ({
	isAuthModalOpen: false
})

export const getters = {
	GET_MODAL_STATE: (state) => state.isAuthModalOpen
}

export const mutations = {
  	SET_MODAL_STATE: (state, payload) => state.isAuthModalOpen = payload
}

export const actions = {

}
