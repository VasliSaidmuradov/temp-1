export default async function({ route, store }) {
  // console.log('route params: ', route)
  let queue = [
    store.dispatch('product/fetchProduct', route.params.id),
    store.dispatch('brand/fetchBrandProducts', 'oao-vostokremmyas')
  ]
  await Promise.all(queue)
}
