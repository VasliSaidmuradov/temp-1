export default async function ({ store, route }) {
  if (!await store.dispatch('brand/fetchBrand', route.params.brand)) {
    // error({ code: 404, message: '' })
  }
}
