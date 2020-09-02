<template>
  <div>
    <b-modal ref="modal-otp" hide-footer :title="title" :id="idPopup" size="medium">
      <loading :active.sync="isLoading" :is-full-page="true" />
      <div class="flex recipient-popup">
        <div class="col-sm-5">
          <image-select :image="selectImage" @loadImage="loadImage"/>
        </div>
        <div class="col-sm-7">
          <form>
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">{{$t('name')}}</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="name" v-model="productName" />
              </div>
            </div>
            <form-field-error :validation-errors="errors" :field="'name'" />
            <div class="form-group row">
              <label for="topping" class="col-sm-2 col-form-label">{{$t('topping')}}</label>
              <div class="col-sm-10">
                <multiselect
                  v-model="selectedTopping"
                  :options="toppingOptions"
                  :multiple="true"
                  label="name"
                  track-by="id"
                  :selectLabel="$t('pressEnterOrClick')"
                  :deselectLabel="$t('pressEnterToRemove')"
                  :placeholder="$t('placeholderSelectTopping')"
                  :selectedLabel="$t('selected')"
                  @select="changeSelect"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="price" class="col-sm-2 col-form-label">{{$t('price')}}</label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control text-left"
                  id="amount"
                  name="amount"
                  v-model="price"
                  v-validate="'required'"
                  v-mask="{
                      alias: 'numeric',
                      groupSeparator: currency.groupSeparator,
                      autoGroup: true,
                      digits: 2,
                      digitsOptional: false,
                      suffix: currency.suffix,
                      placeholder: '0'
                    }"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="categoryType" class="col-sm-2 col-form-label">{{ $t('categoryType')}}</label>
              <div class="col-sm-10">
                <multiselect
                  v-model="selectedCategory"
                  :options="categoryOptions"
                  label="value"
                  track-by="id"
                  :selectLabel="$t('pressEnterOrClick')"
                  :deselectLabel="$t('pressEnterToRemove')"
                  :placeholder="$t('placeholderSelectCategory')"
                  :selectedLabel="$t('selected')"
                  @select="changeSelect"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="flex popup-footer">
        <div class="flex-end">
          <b-button class="mt-3" variant=""  @click="hide">{{ $t('cancel') }}</b-button>
          <b-button class="mt-3" variant="success"  @click="confirm">{{ action }}</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import ImageSelect from '../Form/ImageSelect'
import ToppingApi from '../.././mixins/ToppingApi'
import ProductApi from '../../mixins/ProductApi'
import CategoryApi from '../../mixins/CategoryApi'
import { define } from '../../common/define'
import Multiselect from 'vue-multiselect'
import url from '../../mixins/url'
import FormData from 'form-data'
export default {
  mixins: [ToppingApi, ProductApi, CategoryApi],
  components: { ImageSelect, Multiselect },
  props: {
    idPopup: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    productId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isOutside: false,
      isLoading: false,
      isSearch: true,
      selectImage: '',
      imageData: '',
      currency: define.currency,
      selectedTopping: null,
      selectedCategory: null,
      productName: '',
      price: null,
      toppingOptions: [],
      //   { name: 'Trân châu đường đen + 5k', id: 1 },
      //   { name: 'Sương sáo hoàng kim + 10k', id: 2 },
      //   { name: 'Sữa thêm + 10k', id: 3 }
      // ],
      categoryOptions: [],
      productInfo: {
        id: '',
        price: '',
        topping: [],
        name: '',
        category: {},
        image: ''
      },
      productBlankInfo: {
        id: '',
        price: '',
        topping: [],
        name: '',
        category: {},
        image: ''
      }
    }
  },
  created () {
    this.getCategory()
    this.getTopping()
  },
  methods: {
    clearForm () {
      this.price = 0
      this.selectedTopping = []
      this.selectedCategory = {}
      this.productName = ''
      this.selectImage = ''
      this.$store.commit('updateImageData', '')
    },
    loadImage (val) {
      console.log(val)
      this.$set(this, 'imageData', val)
    },
    changeSelect (value) {
      console.log(value)
      console.log(this.productInfo)
    },
    confirm () {
      this.hide()
      if (this.isEdit) { this.updateProduct() } else { this.createProduct() }
    },
    hide () {
      this.$bvModal.hide(this.idPopup)
    },
    parseData () {
      let toppings = this.selectedTopping.map(x => x.id)
      let data = new FormData()
      data.append('id', this.productId)
      data.append('file', this.imageData)
      data.append('category', this.selectedCategory.id)
      data.append('topping', toppings)
      data.append('name', this.productName)
      data.append('price', this.$helper.parseCurrency(this.price))
      return data
    },
    updateProduct () {
      this.isLoading = true
      this.editProduct(this.parseData()).then(res => {
        this.isLoading = false
        this.clearForm()
        this.$emit('doneUpdate')
      },
      (err) => {
        this.$helper.notification.error(this, err)
      })
    },
    createProduct () {
      this.isLoading = true
      this.addProduct(this.parseData()).then(res => {
        this.isLoading = false
        this.clearForm()
        this.$emit('doneUpdate')
      },
      (err) => {
        this.$helper.notification.error(this, err)
      })
    },
    getCategory () {
      this.fetchCategories().then(
        (res) => {
          this.$set(this, 'categoryOptions', res.data)
          // eslint-disable-next-line handle-callback-err
        }, (err) => {
          this.$set(this, 'categoryOptions', [])
        }
      )
    },
    getTopping () {
      console.log('get toppng')
      this.fetchToppings().then(
        (res) => {
          let data = Object.assign([], res.data)
          data = data.map(item => {
            let obj = {}
            obj.name = `${item.value} + ${item.price.toString().replace('000', 'k')}`
            obj.id = item.id
            return obj
          })
          console.log(data)
          this.$set(this, 'toppingOptions', data)
          // eslint-disable-next-line handle-callback-err
        }, (err) => {
          this.$set(this, 'toppingOptions', [])
        }
      )
    },
    getProduct (id) {
      if (!id) {
        this.clearForm()
        return
      }
      console.log(id)
      this.fetchProductById(id).then(res => {
        console.log(res.data)
        let data = res.data
        let toppingsAdded = []
        let toppings = data.toppings
        console.log(toppings)
        if (toppings.length > 0) {
          toppings.forEach(item => {
            toppingsAdded.push(this.toppingOptions.find((x) => { return x.id === item }))
          })
        }
        this.price = data.price
        this.selectedTopping = toppingsAdded
        this.selectedCategory = this.categoryOptions.find((x) => { return x.id === data.category })
        this.productName = data.name
        this.selectImage = `${url.basicUrl}/${data.image}`
        this.$set(this, 'selectImage', `${url.basicUrl}/${data.image}`)
        this.$store.commit('updateImageData', `${url.basicUrl}/${data.image}`)
      })
      // this.fetchBankAssociated().then((res) => {
      //   console.log(res)
      // })
    }
  },
  computed: {
    title () {
      return this.isEdit ? this.$t('productUpdate') : this.$t('productCreate')
    },
    action () {
      return this.isEdit ? this.$t('update') : this.$t('create')
    }
  },
  watch: {
    productId (val, old) {
      console.log(val)
      this.getProduct(val)
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.recipient-popup {
  .status-bank-value {
    margin-left: 5px;
  }
}

@media (min-width: 992px) {
  .modal-medium {
    max-width: 700px !important;
  }
}
</style>
