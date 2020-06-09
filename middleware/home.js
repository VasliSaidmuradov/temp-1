export default async function ({ route, store }) {
  const queue = []

  if (!store.getters['content/GET_SLIDES']) {
    queue.push(store.dispatch('content/fetchSlides'))
  }
  if (!store.getters['content/GET_POSTS']) {
    queue.push(store.dispatch('content/fetchPosts', { per_page: 4 }))
  }
  if (!store.getters['menu/GET_CATEGORIES']) {
    queue.push(store.dispatch('menu/fetchCategories'))
  }
  // if (!store.getters['brand/GET_BRANDS']) {
    queue.push(store.dispatch('brand/fetchBrands', { to_main: 1 }))
  // }
  // if (!store.getters['content/GET_NEWS']) {
  queue.push(store.dispatch('product/fetchHits', {
    hit: true,
    per_page: 9
  }))
  queue.push(store.dispatch('product/fetchHints', {
    recommend: true,
    per_page: 9
  }))
  queue.push(store.dispatch('product/fetchSales', {
    sale: true,
    per_page: 9
  }))
  queue.push(store.dispatch('product/fetchNews', {
    new: true,
    per_page: 9
  }))
  // }
  queue.push(store.dispatch('content/fetchBanners'))

  await Promise.all(queue)
}
