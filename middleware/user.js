export default async function ({ store }) {
  let queue = [
    store.dispatch('user/fetchUser'),
  ]
  await Promise.all(queue)
}
