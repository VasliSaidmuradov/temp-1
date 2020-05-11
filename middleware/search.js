export default async function({ route, store }) {
  let params = {...route.query}
  params.per_page = 16
  await store.dispatch('product/searchProduct', params)
}