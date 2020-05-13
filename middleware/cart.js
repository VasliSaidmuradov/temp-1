export default async function ({ store }) {
  let queue = [
    store.dispatch('cart/fetchCartProducts'),
    store.dispatch('product/fetchHits', { hit: true, per_page: 9 }),
    store.dispatch('product/fetchHints', { hints: true, per_page: 9 })
  ]

  await Promise.all(queue)
}
