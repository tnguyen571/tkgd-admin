import urlApi from './url'
export default {
  methods: {
    fetchToppings () {
      var deferred = this.$Jquery.Deferred()
      this.$api.get(urlApi.topping.getAll).then(reponse => {
        deferred.resolve(reponse)
      }, error => {
        deferred.reject(error)
      })
      return deferred
    }
  }
}
