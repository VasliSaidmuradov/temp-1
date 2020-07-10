export default async function ({ store, route }) {
  let queue = [
    store.dispatch('brand/fetchBrands', { to_main: 1 }),
  ]

  Promise.all(queue)
}
