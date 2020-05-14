export default async function ({ store }) {
  let queue = [
    store.dispatch('brand/fetchBrands'),
    // store.dispatch('brand/filterByBrands', { ids: [5, 6] })
  ]

  await Promise.all(queue)
}
