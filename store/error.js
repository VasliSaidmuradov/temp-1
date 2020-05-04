export const state = () => ({
  data: {}
})

export const mutations = {
  SET_ERROR: (state, payload) => {
    state.data = Object.assign({}, state.data, payload)
  }
}

export const actions = {
  setError(store, payload) {
    store.commit('SET_ERROR', payload)
  }
}

export const getters = {
  GET_ERROR: (state) => (payload) => {
    if (!state.data[payload]) {
      return null
    }
    if (typeof state.data[payload] == 'string') {
      return state.data[payload]
    }
    if (typeof state.data[payload] == 'object') {
      if (state.data[payload].errors) {
        let error = []
        Object.keys(state.data[payload].errors).forEach((key) => {
          error.push(state.data[payload].errors[key].join(' '))
        })
        return error.join(' ')
      }
      if (state.data[payload].message) {
        return state.data[payload].message
      }
    }
    return state.data[payload]
  }
}
