var callUrl = 'https://thecoffee-backend.df.r.appspot.com'
export default {
  basicUrl: callUrl,
  socketUrl: 'socket/',
  refeshToken: callUrl + 'refresh',
  login: callUrl + 'authenticate',
  product: {
    getAll: callUrl + '/products',
    getById (id) { return `${callUrl}/products/${id}` },
    getByName (name, isActive) { return `${callUrl}/products/searchbyname/${name}/${isActive}` },
    getByCategoryId (id) { return `${callUrl}/products/category/${id}` },
    getRemoved (id) { return `${callUrl}/products/removed/${id}` },
    undoRemoved (id) { return `${callUrl}/products/undo/${id}` },
    removeById: `${callUrl}/products/delete`,
    add: `${callUrl}/products/add`,
    edit: `${callUrl}/products/edit`
  },
  topping: {
    getAll: callUrl + '/topping',
    add: `${callUrl}/topping/add`,
    edit: `${callUrl}/topping/edit`
  },
  category: {
    getAll: `${callUrl}/category`,
    add: `${callUrl}/category/add`,
    edit: `${callUrl}/category/edit`
  }
}
