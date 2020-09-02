<template>
  <div class="card">
    <div class="card-header">
      <figure>
        <img class="card-img-top img-product" :src="image" alt="Card image cap" />
      </figure>
      <i class="fas fa-minus-circle fa-2x delete-icon animation-hover" @click="showDeletePopup"></i>
    </div>
    <div class="card-body">
      <h5 class="card-name text-left" style="height:48px;">{{name}}</h5>
      <div class="mt-2 flex">
        <p class="card-text product-info flex-start">{{$helper.formatCurrency(price)}}</p>
        <i class="far fa-edit fa-2x edit-icon animation-hover" @click="editProduct"></i>
          <!-- style="float: left;margin-top:5px;"
          style="float: right" -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      product: null
    }
  },
  props: {
    price: {
      requied: false,
      type: Number
    },
    name: {
      requied: false,
      type: String
    },
    id: {
      requied: true,
      type: Number
    },
    image: {
      requied: true,
      type: String
    }
  },
  methods: {
    editProduct () {
      this.$set(this, 'product', { id: this.id })
      this.$emit('updateProduct', this.product)
    },
    showDeletePopup () {
      this.$set(this, 'product', { id: this.id })
      this.$emit('deleteProduct', this.product)
    }
  },
  computed: {
    cardType () {
      console.log(this.type)
      return this.$store.state.account.type[this.type]
    }
  }
}
</script>

<style lang="scss">
@import "src/scss/color.scss";
.product-item {
  position: relative;
  text-align: center;
  transition: margin 0.3s;
  border-radius: 5px;
  padding: 30px 15px;
  min-height: 380px;
  max-height: 380px;
}
.grid-item .product-item > .item-wrapper .img-responsive {
  width: 180px;
  margin-bottom: 15px;
}

.card-header {
  position: relative;
  .delete-icon {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    color: $red;
  }

  // figure {
  //   position: relative;
  //   padding-top: 100%;

  //   img {
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 100%;
  //     height: auto;
  //   }
  // }
}

.card-body {
  padding: 10px;
  .edit-icon {
    display: inline;
    cursor: pointer;
    color: $aqua;
  }
  .card-name {
    font-size: 16px;
    font-family: "Muli", sans-serif;
    font-weight: bold;
    line-height: 28px;
    color: #010101;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    min-height: 28px;
    text-transform: capitalize;
  }
}

.card {
  border-radius: 20px;
  width: 22%;
  margin-right: calc(12% / 3);
  height: 330px;
  margin-bottom: 20px;
}

.card:nth-child(4n) {
  margin-right: 0;
}

.img-product {
  max-width: 180px;
  max-height: 180px;
}

.product-info {
  display: inline;
  font-weight: bold;
  font-size: 1.25rem;
  color: #0C713D !important;
}

.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
</style>
