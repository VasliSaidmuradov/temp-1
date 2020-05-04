export default async function ({ route, store }) {
  await store.dispatch('content/fetchPost', route.params.id)
}
