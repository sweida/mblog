<template>
  <i :class="`mo-icon-${name}`" :style="style"></i>
</template>
<script>
export default
  {
    name: 'mb-icon',
    props: {
      name : String,
      color : String,
      size : Number
    },
    computed : {
      style () {
        let style = ''
        if (this.color) {
          style += `color:${this.color};`
        }
        if (this.size) {
          style += `font-size:${this.size}px`
        }

        return style
      }
    }
  }
</script>