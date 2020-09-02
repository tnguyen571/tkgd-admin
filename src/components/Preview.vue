<template>
  <div class="product-management">
    <loading :active.sync="isLoading" :is-full-page="false" />
    <div class="row">
      <div class="nav-product row col-sm-12 flex">
        <div class="col-sm-6 title-management">
          <h2 class="flex">{{$t('previewProduct')}}</h2>
        </div>
        <div class="col-sm-3 flex-end remove-padding">
            <multiselect
                  v-model="selected"
                  :options="options"
                  label="value"
                  track-by="id"
                  :selectLabel="$t('pressEnterOrClick')"
                  :deselectLabel="$t('pressEnterToRemove')"
                  :placeholder="$t('allProduct')"
                  :selectedLabel="$t('selected')"
                  @select="changeSelect"
                  @remove="removeSelect"
                />
        </div>
        <div class="lst-product">
          <template v-for="item in displayData">
            <product
              :name="item.name"
              :price="item.price"
              :id="item.id"
              :key="item.id"
              :image="item.image"
              @updateProduct="editProduct(item.id)"
              @deleteProduct="showDeletePopup(item)"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="row pagination-custom">
      <div class="mt-3">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          :per-page="perPage"
          size="lg"
        />
      </div>
    </div>
    <product-popup
      :idPopup="idProductPopup"
      :isEdit="isEdit"
      :productId="productId"
      @doneUpdate="reloadData"
    />
    <product-delete :id="productId" :idPopup="idProductPopupDelete" :name="productName" @remove="deleteProduct">
      <label style="color: #ef3a3a">{{ $t('doYouWanToDeleteProductSelected') }} <br> {{`"${this.productName}"?`}}</label>
    </product-delete>
  </div>
</template>
<script>
import Product from './Form/Product'
import CategoryApi from './../mixins/CategoryApi'
import ProductApi from '../mixins/ProductApi'
import ProductPopup from './Popup/ProductAddEdit'
import ProductDelete from './Popup/ProductConfirmDelete'
import url from '../mixins/url'
import Multiselect from 'vue-multiselect'
export default {
  components: { Product, ProductPopup, ProductDelete, Multiselect },
  mixins: [ProductApi, CategoryApi],
  data () {
    return {
      currentPage: 1,
      isLoading: false,
      rows: 100,
      productName: '',
      perPage: 8,
      selected: null,
      idProductPopup: 'product-popup-add-edit',
      idProductPopupDelete: 'product-popup-delete',
      users: [],
      originalUsers: [],
      isEdit: false,
      productId: -1,
      data: [],
      options: []
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.getAllCategory()
    this.getAllProduct()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    displayData () {
      let lstProduct = Object.assign([], this.data)
      let from = this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.perPage
      let to = (this.currentPage * this.perPage) > this.data ? this.data : (this.currentPage * this.perPage)
      let obj = {
        from, to, currentt: this.currentPage, perPage: this.perPage
      }
      console.log(obj)
      return lstProduct.slice(from, to)
    },
    search () {
      return this.$store.state.search.search
    }
  },
  methods: {
    searchByName (val) {
      this.isLoading = true
      this.fetchProductsByName(val).then(res => {
        this.isLoading = false
        this.updateValueWhenFetchData(res.data)
      // eslint-disable-next-line handle-callback-err
      }, err => { this.isLoading = false })
    },
    changeSelect (event) {
      this.fetchProductByCategoryId(event.id).then(res => {
        this.updateValueWhenFetchData(res.data)
      })
    },
    removeSelect () {
      this.getAllProduct()
    },
    getAllCategory () {
      this.fetchCategories().then((res) => {
        let data = res.data
        this.$set(this, 'options', data)
      })
    },
    getAllProduct () {
      // this.isLoading = true
      this.fetchProducts().then((res) => {
        // this.isLoading = false
        this.updateValueWhenFetchData(res.data)
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.isLoading = false
      })
    },
    updateValueWhenFetchData (data) {
      let convertData = this.convertData(data)
      this.$set(this, 'data', convertData)
      this.$set(this, 'rows', convertData.length)
    },
    convertData (data) {
      let result = data.map(item => {
        var obj = Object.assign({}, item)

        obj.id = parseInt(obj.id)
        obj.price = parseInt(obj.price)
        obj.image = `${url.basicUrl}/${obj.image}`
        return obj
      })
      return result
    },
    loadDataWithPage () {
      let lstProduct = Object.assign([], this.data)
      let from = this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.perPage
      let to = (this.currentPage * this.perPage) > this.data ? this.data : (this.currentPage * this.perPage)
      let obj = {
        from, to, currentt: this.currentPage, perPage: this.perPage
      }
      console.log(obj)
      this.displayData = lstProduct.slice(4, 6)
    },
    showDeletePopup (value) {
      console.log('delete')
      console.log(value)
      this.$set(this, 'productId', parseInt(value.id))
      this.$set(this, 'productName', value.name)
      this.$bvModal.show(this.idProductPopupDelete)
    },
    deleteProduct (value) {
      console.log(value.id)
      this.removeProduct(value.id).then(res => {
        this.$helper.toast.success(this, this.$t('deleteSuccess'))
        this.$bvModal.hide(this.idProductPopupDelete)
        this.reloadData()
      // eslint-disable-next-line handle-callback-err
      }, err => {
        this.$helper.toast.error(this, this.$t('deleteUnSuccess'))
      })
    },
    editProduct (value) {
      this.$set(this, 'isEdit', true)
      console.log(value)
      this.$set(this, 'productId', parseInt(value))
      this.$bvModal.show(this.idProductPopup)
    },
    handleScroll () {},
    reloadData () {
      this.getAllProduct()
      this.currentPage = 1
      this.productId = 0
    },
    addProduct () {
      this.$set(this, 'productId', 0)
      this.$set(this, 'isEdit', false)
      this.$bvModal.show(this.idProductPopup)
    }
  },
  watch: {
    search (val, old) {
      if (val === '') {
        this.$helper.callOneTimes(this.reloadData, 1000)
      } else {
        this.$helper.callOneTimes(this.searchByName, 1000, val)
      }
    }
  }
}
</script>
<style lang="scss">
.lst-product {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 2rem;
  width: 100%;
  min-height: 700px;
}

.product-management {
  position: relative;
}

.pagination-custom {
  padding: 0;
  margin: 0;
  position: absolute;
  transform: translateY(-50%);
  transform: -webkit-translateY(-50%);
  top: 50%;
  right: -52px;
  width: 25px;

  ul {
    width: 65px;
    flex-direction: column;
    align-items: center;
  }

  a {
    margin-bottom: 0.25rem;
    transition: all 0.2s ease-in-out;
  }

  a:hover {
    transform: scale(1.2);
    transition: all .35s ease-in-out;
  }
}
</style>
