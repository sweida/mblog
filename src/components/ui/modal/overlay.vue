<template>
	<transition name="overlay-fade">
		<div class="mo-overlay" v-show="show" :style="styles" @click.stop="click"  @touchmove="prevent"></div>
	</transition>	
</template>

<style lang="scss">
	.mo-overlay {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(#000, .6);
		user-select: none;
	}
	.overlay-fade-enter-active, .overlay-fade-leave-active {
		transition: opacity .26s cubic-bezier(0.23, 1, 0.32, 1);
	}
	.overlay-fade-enter,
	.overlay-fade-leave-active {
		opacity: 0 !important;
	}
</style>

<script>
	export default {
		name : 'MoOverlay',
		props : {
			show : Boolean,
			background : {
				type : String,
				default : 'rgba(0, 0, 0, .6)'
			},
			zIndex : {
				type : Number,
				default : 19900206
			},
			clickEvent : Function
		},
		methods : {
			click () {
				this.clickEvent && this.clickEvent()
			},
			prevent (event) {
				event.preventDefault()
				event.stopPropagation()
			},
		},
		computed : {
			styles () {
				return {
					'background-color' : this.background,
					'z-index' : this.zIndex
				}
			}
		}
	}
</script>