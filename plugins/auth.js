export default function ({ $axios, store }, inject) {
  $axios.onRequest(config => {
    if (store.state.auth.isSignedIn) {
      config.headers.common['Authorization'] =
        store.state.auth.tokenType + ' ' + store.state.auth.token
    }
  })

  inject('getUser', () => store.state.user.user)
  inject('checkAuth', () => store.state.auth.isSignedIn)
}
