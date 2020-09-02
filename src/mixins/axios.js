let axios = require('axios')
let querystring = require('querystring')
export const restFullAPi = {
  install (Vue, options) {
    Vue.prototype.$api = {
      config: {
        headers: {
          // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        crossDomain: true,
        cache: false
      },
      get (url) {
        return axios.get(url, this.config)
      },
      getNoneHeader (url) {
        return axios.get(url)
      },
      post (url, data) {
        return axios.post(url, data, this.config)
      },
      postWithConfigure (url, data, configure) {
        return axios.post(url, data, configure)
      },
      postWithFromData (url, data) {
        console.log(data)
        console.log(querystring.stringify({ user: 'username', pass: '123' }))
        return axios.post(url, querystring.stringify(data))
      },
      delete (url) {
        return axios.delete(url, this.config)
      },
      deleteWithModel (url, obj) {
        let config = Object.assign({}, this.config)
        config.data = obj
        return axios.delete(url, config)
      },
      put (url, data) {
        return axios.put(url, data, this.config)
      }
    }
  }
}
