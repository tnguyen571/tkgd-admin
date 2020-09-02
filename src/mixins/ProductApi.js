import urlApi from './url'
export default {
  methods: {
    fetchProducts () {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.product.getAll).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    fetchProductById (id) {
      var deferred = this.$Jquery.Deferred()
      if (!id) deferred.resolve('Value not valid')
      this.$api.get(urlApi.product.getById(id)).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    fetchProductByCategoryId (id) {
      var deferred = this.$Jquery.Deferred()
      if (!id) deferred.resolve('Value not valid')
      this.$api.get(urlApi.product.getByCategoryId(id)).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
        console.log(error)
      })
      return deferred
    },
    addProduct (data) {
      var deferred = this.$Jquery.Deferred()
      let header = {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
      }
      this.$api.postWithConfigure(urlApi.product.add, data, header).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    removeProduct (data) {
      var deferred = this.$Jquery.Deferred()
      this.$api.post(urlApi.product.removeById, data).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    editProduct (data) {
      var deferred = this.$Jquery.Deferred()
      let header = {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }
      }
      this.$api.postWithConfigure(urlApi.product.edit, data, header).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    fetchProductsByName (name, isActive) {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.product.getByName(name, isActive)).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    fetchProductsRemoved (id) {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.product.getRemoved(id)).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    },
    undoRemovedProduct (id) {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.product.undoRemoved(id)).then(response => {
        deferred.resolve(response)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
