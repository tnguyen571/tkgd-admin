<template>
  <b-modal ref="modalConfirm" hide-footer :title="$t('confirm')" :id="idPopup">
    <div class="d-block text-center message-delete">
      <slot/>
    </div>
    <div class="flex popup-footer">
      <div class="flex-end">
        <b-button class="mt-3" variant="success" @click="confirm">{{ $t('confirm') }}</b-button>
        <b-button class="mt-3" variant="" @click="hide">{{ $t('cancel') }}</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
export default {
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
  data () {
    return {
      context: ''
    }
  },
  methods: {
    confirm () {
      this.$emit('undo', { id: this.id, name: this.name })
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
