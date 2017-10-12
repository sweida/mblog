<template>
  <li class="mb-dropmenu" :class="{'mb-dropmenu--open' : visible}">
    <div class="mb-dropmenu-toggle" @click="toggle">
      <slot name="toggle"></slot>
    </div>
    <div class="mb-dropmenu-body">
      <slot name="body"></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: 'mb-dropmenu',
  props: {
    value: Boolean,
  },
  data() {
    return {
      visible: this.value
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
      this.$emit('input', this.visible)
    }
  },
  watch: {
    value(val) {
      this.visible = val
    }
  }
}
</script>

<style lang="scss">
.mb-dropmenu {
  position: relative;
  >.mb-dropmenu-toggle {
    display: block;
  }
  >.mb-dropmenu-body {
    display: none;
  }
  &.mb-dropmenu--open {
    >.mb-dropmenu-body {
      display: block;
    }
  }
}
</style>
