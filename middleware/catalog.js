export default async function({ route, store, error, from }) {
  let queue = []
  if (!from || from.path != route.path) {
    queue.push(await store.dispatch('product/fetchProducts', route.fullPath))
  }

  queue.push(store.dispatch('brand/fetchFilters', route))


  await Promise.all(queue)

  if (store.getters['error/GET_ERROR']('products')) {
    error({ statusCode: 404, message: '404 ERROR FOUND!' })
  }

}
