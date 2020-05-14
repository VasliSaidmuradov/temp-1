export default async function({ route, store }) {
  let params = { ...route.query }
  console.log(params)
  params.per_page = 16
  await store.dispatch('product/searchProduct', params)
}
