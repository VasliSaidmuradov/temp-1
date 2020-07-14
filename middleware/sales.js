export default async function({ store }) {
  let queue = [
    store.dispatch('product/fetchSales', { sale: true, per_page: 16 }),
  ]
  await Promise.all(queue)
} 
