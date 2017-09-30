<template>
  <header class="mb-head">
    <a class="mb-head-toggle" @click="toggle">
      <mb-icon name="reorder"></mb-icon>
    </a>
  </header>
</template>
<style lang="scss">

</style>
<script>
import MbIcon from '../../ui/icon'
export default {
  name: 'mb-header',
  components: {
    MbIcon,
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      min: this.value
    }
  },
  methods: {
    toggle() {
      this.min = !this.min
      this.$emit('input', this.min)
    }
  }
}
</script>
