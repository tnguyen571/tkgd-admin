<template>
  <div class="product-management">
    <loading :active.sync="isLoading" :is-full-page="false" />
    <div class="row">
      <div class="add-product-custom flex-end">
          <i class="fas fa-plus fa-2x add-product" @click="addProduct">&nbsp;{{$t('productCreate')}}</i>
        </div>
    </div>
    <div class="row table-function-style">
      <search-input
        :placeholder="'Tìm kiếm'"
        @searchValue="searchByName"
        class="col-sm-4 remove-padding"
      />
      <div class="col-sm-4 category-filter flex-end remove-padding">
         <b-dropdown variant="outline-secondary" class="" :right="true">
             <template slot="button-content">
               <span>{{status}}</span>
            </template>
            <b-dropdown-item @click="changeTable(true)" :active="isActive">{{$t('active')}}</b-dropdown-item>
            <b-dropdown-item @click="changeTable(false)" :active="!isActive">{{$t('unActive')}}</b-dropdown-item>
        </b-dropdown>
        <b-dropdown variant="outline-secondary" class="" :right="true" style="margin-left:1rem;">
             <template slot="button-content">
                <!-- <i class="fas fa-cocktail py-1"></i> -->
                <span>{{categoryFilter}}</span>
            </template>
            <template v-for="item in options">
              <b-dropdown-item @click="changeSelect(item)" :key="item.id" :active="categoryFilterId === item.id">{{item.value}}</b-dropdown-item>
            </template>
        </b-dropdown>
      </div>
    </div>
    <div class="row">
      <div class="product-manage-table">
        <b-table
          small
          :fields="fields"
          :items="data"
          :fixed="true"
          responsive="sm"
          :perPage="perPage"
          :current-page="currentPage"
          :bordered="true"
        >
          <template v-slot:cell(image)="data">
            <figure>
              <img class="card-img-top img-product" :src="data.value" alt="Card image cap" />
            </figure>
          </template>
          <template v-slot:cell(name)="data">
            <a href="#" @click="editProduct(data.item.id)" v-show="isActive">{{data.value}}</a>
            <a href="#" @click="viewProduct(data.item.id)" v-show="!isActive">{{data.value}}</a>
          </template>
          <template v-slot:cell(identity)="data">
            <span>{{data.value}}</span>
          </template>
          <template v-slot:cell(price)="data">
            <span>{{ $helper.formatCurrency(data.value) }}</span>
          </template>
          <template v-slot:cell(note)="data">
            <span>{{ data.value }}</span>
          </template>
          <template v-slot:cell(action)="data">
            <i class="far fa-edit fa-2x edit-icon animation-hover" @click="editProduct(data.item.id)"></i>
            <i class="far fa-trash-alt delete-icon fa-2x animation-hover" @click="showDeletePopup(data.item)"></i>
          </template>
          <template v-slot:cell(undo)="data">
            <i class="fas fa-undo fa-2x undo-icon animation-hover" @click="showUndoPopup(data.item)"></i>
          </template>
        </b-table>
      </div>
    </div>
    <div class="row pagination-custom">
      <div class="mt-3">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          align="fill"
          :per-page="perPage"
          size="md"
        />
      </div>
    </div>
    <product-popup
      :idPopup="idProductPopup"
      :isEdit="isEdit"
      :productId="productId"
      @doneUpdate="reloadData"
    />
    <product-view-popup
      :idPopup="idProductViewPopup"
      :productId="productId"
    />
    <product-delete
      :id="productId"
      :idPopup="idProductPopupDelete"
      :name="productName"
      @remove="deleteProduct"
    >
      <label style="color: #ef3a3a">
        {{ $t('doYouWanToDeleteProductSelected') }}
        <br />
        {{`"${this.productName}"?`}}
      </label>
    </product-delete>
    <undo-confirm
      :id="productId"
      :idPopup="idProductPopupUndo"
      :name="productName"
      @undo="undoProduct"
    >
      <label>
        Bạn có muốn đưa sản phẩm <br>{{`"${this.productName}"`}}<br>
        về danh sách hiển thị?
      </label>
    </undo-confirm>
  </div>
</template>
<script>
import CategoryApi from './../mixins/CategoryApi'
import ProductApi from '../mixins/ProductApi'
import ProductPopup from './Popup/ProductAddEdit'
import ProductViewPopup from './Popup/ProductView'
import ProductDelete from './Popup/ProductConfirmDelete'
import UndoConfirm from './Popup/UndoConfirm'
import url from '../mixins/url'
export default {
  components: { ProductPopup, ProductDelete, ProductViewPopup, UndoConfirm },
  mixins: [ProductApi, CategoryApi],
  data () {
    return {
      currentPage: 1,
      isLoading: false,
      categoryFilterId: 0,
      productName: '',
      categoryFilter: this.$t('all'),
      isActive: true,
      status: this.$t('active'),
      categor: this.$t('active'),
      fields: this.$table.fields.product,
      perPage: 5,
      selected: null,
      idProductPopup: 'product-popup-add-edit',
      idProductPopupDelete: 'product-popup-delete',
      idProductPopupUndo: 'product-popup-undo',
      idProductViewPopup: 'product--view-popup',
      users: [],
      originalUsers: [],
      isEdit: false,
      productId: -1,
      data: [],
      options: [],
      rows: 0
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
    this.getAllCategory()
    this.getAllProduct()
    this.$store.commit('updateHeaderTitle', 'productManagement')
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    // rows () {
    //   let value = !this.data ? 0 : this.data.length
    //   return value
    // },
    // displayData () {
    //   let lstProduct = Object.assign([], this.data)
    //   let from =
    //     this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.perPage
    //   let to =
    //     this.currentPage * this.perPage > this.data
    //       ? this.data
    //       : this.currentPage * this.perPage
    //   let obj = {
    //     from,
    //     to,
    //     currentt: this.currentPage,
    //     perPage: this.perPage
    //   }
    //   console.log(obj)
    //   return lstProduct.slice(from, to)
    // },
  },
  methods: {
    fetchByName (name) {
      this.fetchProductsByName(name, this.isActive).then(
        (res) => {
          this.updateValueWhenFetchData(res.data)
        },
        // eslint-disable-next-line handle-callback-err
        (err) => {
          this.isLoading = false
        }
      )
    },
    searchByName (val) {
      this.$helper.callOneTimes(this.fetchByName, 500, val)
    },
    changeTable (value) {
      if (value) {
        this.fields = this.$table.fields.product
        this.status = this.$t('active')
      } else {
        this.fields = this.$table.fields.productRemoved
        this.status = this.$t('unActive')
      }
      this.isActive = value
      this.fetchDataWithStatus()
    },
    changeSelect (item) {
      this.categoryFilterId = item.id
      this.categoryFilter = item.value
      // if (id === 0) { this.getAllProduct() } else { this.getProductByCategory(id) }
      this.fetchDataWithStatus()
    },
    fetchDataWithStatus () {
      if (this.isActive) {
        if (this.categoryFilterId === 0) { this.getAllProduct() } else { this.getProductByCategory(this.categoryFilterId) }
      } else {
        this.fetchProductsRemoved(this.categoryFilterId).then(res => {
          this.updateValueWhenFetchData(res.data)
        })
      }
    },
    removeSelect () {
      this.getAllProduct()
    },
    getAllCategory () {
      this.fetchCategories().then((res) => {
        console.log(res)
        let data = [{ id: 0, value: 'Tất cả' }]
        data = data.concat(res.data)
        this.$set(this, 'options', data)
      })
    },
    getAllProduct () {
      // this.isLoading = true
      this.fetchProducts().then(
        (res) => {
          this.categoryFilterId = 0
          this.updateValueWhenFetchData(res.data)
        },
        // eslint-disable-next-line handle-callback-err
        (err) => {
          this.isLoading = false
        }
      )
    },
    getProductByCategory (id) {
      this.fetchProductByCategoryId(id).then((res) => {
        this.updateValueWhenFetchData(res.data)
      })
    },
    updateValueWhenFetchData (data) {
      let convertData = this.convertData(data)
      this.$set(this, 'data', convertData)
      this.$set(this, 'rows', convertData.length)
    },
    convertData (data) {
      let i = 0
      let result = data.map((item) => {
        var obj = Object.assign({}, item)

        ++i
        obj.identity = i
        obj.id = parseInt(obj.id)
        obj.price = parseInt(obj.price)
        obj.image = `${url.basicUrl}/${obj.image}`

        return obj
      })
      return result
    },
    loadDataWithPage () {
      let lstProduct = Object.assign([], this.data)
      let from =
        this.currentPage === 1 ? 0 : (this.currentPage - 1) * this.perPage
      let to =
        this.currentPage * this.perPage > this.data
          ? this.data
          : this.currentPage * this.perPage
      let obj = {
        from,
        to,
        currentt: this.currentPage,
        perPage: this.perPage
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
    showUndoPopup (value) {
      this.$set(this, 'productId', parseInt(value.id))
      this.$set(this, 'productName', value.name)
      this.$bvModal.show(this.idProductPopupUndo)
    },
    deleteProduct (value) {
      console.log(value.id)
      this.removeProduct(value).then(
        (res) => {
          this.$helper.toast.success(this, this.$t('deleteSuccess'))
          this.$bvModal.hide(this.idProductPopupDelete)
          this.reloadData()
        },
        // eslint-disable-next-line handle-callback-err
        (err) => {
          this.$helper.toast.error(this, this.$t('deleteUnSuccess'))
        }
      )
    },
    editProduct (value) {
      this.$set(this, 'isEdit', true)
      console.log(value)
      this.$set(this, 'productId', parseInt(value))
      this.$bvModal.show(this.idProductPopup)
    },
    undoProduct (value) {
      console.log(value.id)
      this.undoRemovedProduct(value.id).then(
        (res) => {
          this.$helper.toast.success(this, this.$t('deleteSuccess'))
          this.$bvModal.hide(this.idProductPopupDelete)
          this.fetchDataWithStatus()
        },
        // eslint-disable-next-line handle-callback-err
        (err) => {
          this.$helper.toast.error(this, this.$t('deleteUnSuccess'))
        }
      )
    },
    viewProduct (value) {
      console.log(value)
      this.$set(this, 'productId', parseInt(value))
      this.$bvModal.show(this.idProductViewPopup)
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
  }
}
</script>
<style lang="scss">
@import "../scss/color.scss";

.category-filter {
  height: 1rem;
  text-align: right;

  // .dropdown-item {
  //   color: black;
  // }
}

.dropdown-item.active {
    background-color: #4ddba7 !important;
}
.table-function-style{
  margin-top: 2.5rem;
}

.product-manage-table {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 1rem;
  width: 100%;
  height: 682px;

  .img-product {
    max-width: 100px !important;
    max-height: 100px;
  }

  span {
    font-size: x-large;
  }

  a {
    font-size: x-large;
    color: $aqua;
  }

  figure {
   margin: 0.5rem 0 0.5rem 0;
   // margin: 0;
  }

  .identity-style {
    width: 5%;
  }

  .iamge-style {
    width: 20%;
  }

  .product-name-style {
    width: 40%;
  }

  .product-note-style {
    width: 30%;
  }

  td {
    vertical-align: middle;
  }

  .price-style {
    width: 15%;
  }

  .action-style {
    width: 10%;
  }
}

.product-management {
  position: relative;
}

.add-product-custom {

  .add-product {
    color: $greyDefault;
    cursor: pointer;
    font-size: 1.5rem;
    // transition: all 0.2s ease-in-out;
  }

  .add-product:hover {
    color: #e77a9a;
    // transform: scale(1.2);
    // transition: all 0.35s ease-in-out;
  }
}

// .add-product-custom {
//   padding: 0;
//   margin: 0;
//   position: absolute;
//   transform: translateY(6%);
//   transform: -webkit-translateY(6%);
//   top: 6%;
//   right: -52px;
//   width: 25px;
// }

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
    transition: all 0.35s ease-in-out;
  }
}
</style>
