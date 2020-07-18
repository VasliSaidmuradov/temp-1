export default async function ({ route, store }) {
    if (!store.getters['content/GET_ALL_POSTS']) {
        await store.dispatch('content/fetchAllPosts')        
    }
}
