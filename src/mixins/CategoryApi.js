import urlApi from './url'
export default {
  methods: {
    fetchCategories () {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.category.getAll).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
