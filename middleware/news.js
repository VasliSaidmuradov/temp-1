export default async function ({ route, store }) {
  await store.dispatch('content/fetchPosts', { per_page: 8 })
}