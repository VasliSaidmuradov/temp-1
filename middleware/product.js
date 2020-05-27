export default async function({ route, store }) {
  let queue = [
    store.dispatch('product/fetchProduct', route.params.id),
    store.dispatch('brand/fetchBrandProducts', 'oao-vostokremmyas')
  ]
  await Promise.all(queue)
}
