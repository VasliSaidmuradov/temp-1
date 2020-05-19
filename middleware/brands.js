export default async function ({ store }) {
  let queue = [
    store.dispatch('brand/fetchBrands'),
    // store.dispatch('brand/fetchBrandProducts', 'pao-len')
  ]

  await Promise.all(queue)
}
