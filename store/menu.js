export const state = () => ({
	isMenuOpen: false
})

export const getters = {
	GET_MENU_STATE: state => state.isMenuOpen
}

export const mutations = {
  	TOGGLE_MENU_STATE: state => {
  		document.body.classList.toggle('--hidden'),
  		state.isMenuOpen = !state.isMenuOpen
  	}
}

export const actions = {

}