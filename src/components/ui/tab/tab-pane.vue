<template>
	<div class="mo-tab-pane" :class="{'mo-tab-active' : active}">
		<slot></slot>
	</div>
</template>
<script>
	export default{
		name : 'tab-pane',
		props : {
			label : String,
			name : String,
			disabled : Boolean
		},
		data () {
			return {
				index : null
			}
		},
		computed : {
			active() {
        return this.$parent.currentName === (this.name || this.index)
      }
		},
		mounted() {
      this.$parent.addPanes(this)
    },
    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
	}
</script>
