import moment from 'moment'
import Vue from 'vue'

export default function ({ app, store, req, route }, inject) {

  moment.locale('ru')

  inject('formatMoney', function (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  })

  inject('formatDate', function (value, format = 'D MMMM YYYY') {
    return moment(value).format(format)
  })

  inject('chunk', function (array, chunkSize) {
    let arr = [], i = 0
    for (; i < array.length; i += chunkSize) {
      arr.push(array.slice(i, i + chunkSize))
    }
    return arr
  })

  // inject('isMobile', () => store.getters['GET_IS_MOBILE'])
  inject('isMobile', () => true)

  inject('alert', (payload) => store.dispatch('notification/show', payload))


  inject('serialize', (obj) => {
    var str = [];

    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }

    return str.join("&");
  })


  inject('addQuery', (data, multiple = true) => {
    let query = { ...app.router.currentRoute.query }//JSON.parse(JSON.stringify(route.query))
    for (let key in data) {
      query = app.$addParam(query, key, data[key], multiple, false)
    }

    app.router.push({ query: query })
  })

  inject('toggleQuery', (data, multiple = true) => {
    let query = { ...app.router.currentRoute.query }//JSON.parse(JSON.stringify(route.query))
    for (let key in data) {
      query = app.$addParam(query, key, data[key], multiple, true)
    }

    app.router.push({ query: query })
  })

  inject('clearQuery', () => {
    app.router.push({ path: app.router.currentRoute.path, query: {} })
  })

  inject('addParam', (query, filter, value, multiple, toggle) => {
    filter = filter.toString()
    if (value) {
      value = value.toString()
      if (query[filter]) {
        if (typeof query[filter] == 'string') {
          if (query[filter] == value) {
            if (toggle) {
              delete query[filter]
            }
          } else if (multiple) {
            let arr = []
            arr.push(query[filter])
            arr.push(value)
            query[filter] = arr
            // query[filter] = [query[filter], value]
          } else {
            query[filter] = value
          }
        } else {
          let index = query[filter].indexOf(value)
          if (index != -1) {
            if (toggle) {
              query[filter].splice(index, 1)
              if (query[filter].length == 0) {
                delete query[filter]
              }
            }
          } else {
            query[filter].push(value)
          }
        }
      } else {
        query[filter] = value
      }
    } else {
      delete query[filter]
    }
    return JSON.parse(JSON.stringify(query))
  })

  inject('reloadPage', () => location.reload())
}
