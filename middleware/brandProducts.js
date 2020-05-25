export default async function ({ store, route }) {
  let queue = [
    // store.dispatch('brand/fetchBrands'),
    store.dispatch('brand/fetchBrandProducts', route.params.brand)
  ]

  await Promise.all(queue)
}
