export default async function ({ route, store, redirect }) {
  if (!store.state.auth.isSignedIn) {
    redirect(store.getters['GET_IS_MOBILE'] ? '/sign-in' : '/auth')
  }
}
