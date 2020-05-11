export default async function ({ store }) {
  let queue = [
    store.dispatch('user/fetchFavorites')
  ]

  await Promise.all(queue)
}
