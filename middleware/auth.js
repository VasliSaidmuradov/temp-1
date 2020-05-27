export default async function ({ route, store, redirect }) {
  if (!store.state.auth.isSignedIn) {
    if(store.getters['GET_IS_MOBILE']) redirect('/sign-in')
    else {
      // store.commit("auth/SET_MODAL_STATE", true);
      redirect('/profile');
      store.commit("auth/SET_MODAL_STATE", true);
    }
  }
}
