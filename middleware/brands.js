export default async function ({ store, route }) {
  let queue = [
    store.dispatch('brand/fetchBrands'),
  ]

  Promise.all(queue)
}
