export default async function({ store }) {
  const queue = [
    store.dispatch('cart/fetchCartProducts')
  ]

  await Promise.all(queue)
}
