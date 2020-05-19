export const state = () => ({
  notifications: [],
})

export const getters = {
  GET_NOTIFICATIONS: (state) => state.notifications,
}

export const mutations = {
  ADD_NOTIFICATION: (state, payload) => state.notifications.push(payload),
}

export const actions = {
  show(store, payload) {
    let notification = {
      message: payload.message,
      class: '--success',
    }
    if (payload.type !== 'success') {
      notification.class = '--error'
    }
    store.commit('ADD_NOTIFICATION', notification)
  }
}
