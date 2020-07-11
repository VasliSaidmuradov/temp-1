export const state = () => ({
    isMobileFilterOpen: false,
})

export const mutations = {
  SET_MOBILE_FILTER: (state, payload) => state.isMobileFilterOpen = payload,
}

export const getters = {
  GET_MOBILE_FILTER: state => state.isMobileFilterOpen
}
