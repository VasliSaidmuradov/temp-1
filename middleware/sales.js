export default async function({ store }) {
    let queue = []
    if (!store.getters['product/GET_SALES']) {
        queue.push(store.dispatch('product/fetchSales', { sale: true, per_page: 16 }))
    }
    await Promise.all(queue)
}
