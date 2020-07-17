export default function ({ $axios, store, app }, inject) {
  inject('api', {
    cache: {},
    baseUrl: process.env.NODE_ENV == 'development' ? 'https://admin.skiny.kz/api' : 'https://admin.skiny.kz/api',

      async get(url, data = {}, error = 'default', cache = true) {
      app.$setError(error, null)

        let key = this.getCacheKey(url, data)
        // console.log('key: ', key)
      if (cache && this.getFromCache(key)) {
        return this.getFromCache(key)
      }

      data['_method'] = 'GET'
      try {
        // let debug_key = this.getCacheKey(url, data)
        // console.time(debug_key)
        const resp = await $axios.$post(url.includes('://') ? url : (this.baseUrl + url), data)
        // console.timeEnd(debug_key)
        if (process.client) {
          this.setCache(key, resp)
        }
        return resp
      } catch (err) {
        app.$setError(error, err)
        return null
      }
    },

    async post(url, data = {}, error) {
      data['_method'] = 'POST'
      return await this.sendRequest(url, data, error)
    },

    async put(url, data = {}, error = 'default') {
      data['_method'] = 'PUT'
      return await this.sendRequest(url, data, error)
    },

    async sendRequest(url, data, error) {
      app.$setError(error, null)

      try {
        const resp = await $axios.$post(url.includes('://') ? url : (this.baseUrl + url), data)
        return resp
      } catch (err) {
        app.$setError(error, err.response.data)
        return null
      }
    },

    getCacheKey(url, data) {
      let key = url
      for (let k in data) {
        key += (JSON.stringify(data[k]).split('\"').join(''))
      }
      return key
    },

    getFromCache(key) {
      return this.cache[key]
    },

    setCache(key, data) {
      this.cache[key] = data
    }
  })
}
