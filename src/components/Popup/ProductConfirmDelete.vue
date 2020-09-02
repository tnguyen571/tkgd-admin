<template>
  <b-modal ref="modalConfirm" hide-footer :title="$t('productDelete')" :id="idPopup">
    <div class="d-block text-center message-delete">
      <slot/>
    </div>
    <div class="form-group">
      <b-textarea v-model="context" type="text" :placeholder="$t('reason')"></b-textarea>
    </div>
    <div class="flex popup-footer">
      <div class="flex-end">
        <b-button class="mt-3" variant="danger" @click="confirm">{{ $t('delete') }}</b-button>
        <b-button class="mt-3" variant="" @click="hide">{{ $t('cancel') }}</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
  data () {
    return {
      context: ''
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    idPopup: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm () {
      this.$emit('remove', { id: this.id, name: this.name, reason: this.context })
      this.hide()
    },
    hide () {
      this.$bvModal.hide(this.idPopup)
    }
  },
  created () {
    this.context = ''
  }
}
</script>
<style lang="scss">
.message-delete {
  font-size: xx-large;
  margin-bottom: 15px;
}
</style>
