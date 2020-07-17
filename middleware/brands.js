export default async function ({ store, route }) {
  let queue = [
    store.dispatch('brand/fetchBrandsToMain')
  ]

  Promise.all(queue)
}
