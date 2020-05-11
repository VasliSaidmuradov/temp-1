export default async function ({ store }) {
  let queue = [
    store.dispatch('cart/fetchCartProducts')
  ]

  await Promise.all(queue)
}
