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
  if (1 || !store.getters['product/GET_HITS']) {
    // console.log('HITS')
    queue.push(store.dispatch('product/fetchHits', {
        hit: true,
        per_page: 12
    }))
  }
  if (1 || !store.getters['product/GET_HINTS']) {
    // console.log('RECOMEND')
    queue.push(store.dispatch('product/fetchHints', {
        recommend: true,
        per_page: 12
    }))
  }
  if (1 || !store.getters['product/GET_NEWS']) {
    // console.log('NEW ARRIV')
    queue.push(store.dispatch('product/fetchNews', {
        new: true,
        per_page: 12
    }))
  }
  if (1 || !store.getters['product/GET_SALES']) {
    // console.log('SALES')
    queue.push(store.dispatch('product/fetchSales', {
        sale: true,
        per_page: 12
    }))
  }
  
  queue.push(store.dispatch('content/fetchBanners'))
  queue.push(store.dispatch('product/fetchHomePageCategories'))

  await Promise.all(queue)
}
