<template>
  <div>
    <div class="has-search">
      <span class="fa fa-search form-control-feedback"></span>
      <input
        type="text"
        class="form-control"
        :placeholder="placeholder"
        v-model="search"
        :name="!name ? '' : name"
        v-validate="validate ? 'required' : ''"
      />
      <form-field-error v-if="validate" :validation-errors="errors" :field="name" />
      <!-- <div>
      <template v-for="product in data">
        <div class="saving-users-content" @click="comfirm(product)" :key="product.id">
         <div class="saving-users-content__right">
            <label class="saving-user-name">
              <strong>{{product.name}}</strong>
            </label>
          </div>
        </div>
      </template>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      users: []
    }
  },
  props: {
    name: {
      type: String
    },
    validate: {
      type: Boolean
    },
    data: {
      type: Array
    },
    updateSearch: {
      type: String
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  created () {
    if (this.updateSearch && this.updateSearch !== '') {
      this.$set(this, 'search', this.updateSearch)
    }
  },
  methods: {
    confirm (item) {
      console.log(item)
    }
  },
  watch: {
    search (val, oldVal) {
      if (val === oldVal) return
      this.$emit('searchValue', val)
    },
    updateSearch (val, oldVal) {
      this.$set(this, 'search', val)
    }
  }
}
</script>
<style lang="scss">
.has-search {
  border: solid 2px black;
  border-radius: 5px;
  .form-control {
    padding-left: 2.375rem;
  }
  .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
  }
}
.saving-users {
  .saving-users-content {
    display: flex;
    border: 1px solid #cacac9;
    padding: 0.5em 0.5em 0.5em 1em;
    border-radius: 25px;
    margin-bottom: 0.5em;
    cursor: pointer;

    .saving-users-content__left_icon {
      margin-top: 12px;
    }

    .saving-users-content__right {
      display: table;
      padding-left: 20px;

      .saving-user-name {
        font-size: 16pt;
        margin-bottom: 0px;
        cursor: pointer;
        display: flex;
      }
    }
  }
}
</style>
