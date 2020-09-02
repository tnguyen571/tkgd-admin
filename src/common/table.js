export const table = {
  install (Vue, options) {
    Vue.prototype.$table = {
      fields: {
        product: [
          {
            key: 'identity',
            label: '#',
            class: 'td-width identity-style',
            thClass: 'alert header-table-tile text-left',
            tdClass: 'alert text-left'
          },
          {
            key: 'image',
            label: 'Ảnh hiển thị',
            class: 'image-style',
            thClass: 'alert header-table-tile',
            tdClass: 'alert'
          },
          {
            key: 'name',
            label: 'Tên sản phẩm',
            class: 'product-name-style',
            thClass: 'alert header-table-tile text-left',
            tdClass: 'alert text-left'
          },
          {
            key: 'price',
            label: 'Giá',
            class: 'price-style',
            thClass: 'alert header-table-tile text-left',
            tdClass: 'alert text-left'
          },
          {
            key: 'action',
            label: '',
            class: 'action-style',
            thClass: 'alert header-table-tile',
            tdClass: 'alert'
          }
        ],
        productRemoved: [
          {
            key: 'identity',
            label: '#',
            class: 'td-width identity-style',
            thClass: 'alert header-table-tile text-left',
            tdClass: 'alert text-left'
          },
          {
            key: 'image',
            label: 'Ảnh hiển thị',
            class: 'image-style',
            thClass: 'alert header-table-tile',
            tdClass: 'alert'
          },
          {
            key: 'name',
            label: 'Tên sản phẩm',
            class: 'product-name-style',
            thClass: 'alert header-table-tile text-left',
            tdClass: 'alert text-left'
          },
          {
            key: 'note',
            label: 'Lý do xóa',
            class: 'product-note-style',
            thClass: 'alert header-table-tile text-left',
            tdClass: 'alert text-left'
          },
          // {
          //   key: 'price',
          //   label: 'Giá',
          //   class: 'price-style',
          //   thClass: 'alert header-table-tile text-left',
          //   tdClass: 'alert text-left'
          // },
          {
            key: 'undo',
            label: '',
            class: 'action-style',
            thClass: 'alert header-table-tile',
            tdClass: 'alert'
          }
        ]
      }
    }
  }
}
