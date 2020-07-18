export default async function ({ store, route }) {
    let queue = []

    if (!store.getters['brand/GET_BRANDS_TO_MAIN']) {
        queue.push(store.dispatch('brand/fetchBrandsToMain'))
    }

    Promise.all(queue)
}
