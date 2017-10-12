<template>
  <button class="mo-btn mo-btn-primary" :disabled="committing" @click="submit">
    <template v-if="!committing">保存</template>
    <template v-else>保存中...</template>
  </button>
</template>

<script>
export default {
  name: 'mb-submit',
  props: {
    value: Boolean,
    click: Function
  },
  data() {
    return {
      committing: this.value
    }
  },
  methods: {
    submit() {
      this.committing = true
      this.$emit('input', this.committing)
      this.click()
    }
  },
  watch: {
    value(val) {
      this.committing = val
    }
  }
}
</script>
