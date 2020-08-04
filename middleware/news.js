export default async function ({ route, store }) {
    if (!store.getters['content/GET_POSTS']) {
        await store.dispatch('content/fetchPosts', { per_page: 8 })
    }
}
