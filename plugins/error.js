export default function ({ store }, inject) {
  inject('setError', (key, error) => {
    let err = {}
    err[key] = error
    store.commit('error/SET_ERROR', err, { root: true })
  })
  inject('getError', (key) => store.getters['error/GET_ERROR'](key))
}