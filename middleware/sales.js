export default async function({ store }) {
  let queue = [
    store.dispatch('product/fetchSales', { sales: true, per_page: 9 }),
  ]
  await Promise.all(queue)
} 
