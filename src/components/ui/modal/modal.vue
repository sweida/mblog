<template>
	<transition name="modal-fade">
		<div class="mo-modal__wrapper" :style="styles" ref="modal" v-show="visible" @click="overlayClick">
			<div class="mo-modal" :class="classes" :style="{'margin-top' : top}" @click.stop>
				<div class="mo-modal__header" ref="title" v-if="(title || $slots && $slots.title)">
					<h3 class="mo-modal__title">
						<slot name="title">{{ title }}</slot>
					</h3>
				</div>
				<div class="mo-modal__body" ref="body">
					<slot name="body"></slot>
				</div>
				<div class="mo-modal__footer" ref="footer" v-if="$slots && $slots.buttons">
					<slot name="buttons"></slot>
				</div>
			</div>
		</div>
	</transition>
</template>
<style lang="scss">
@import '~@/assets/mo/import';
.mo-modal__opened {
	overflow: hidden!important;
}

.mo-modal__wrapper {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 19900206;
	text-align: center;
	>.mo-modal {
		display: inline-block;
		background-color: #fff;
		box-shadow: $box-shadow;
		margin-bottom: 3rem;
		min-width: 420px;
		max-width: 80%;
		max-height: 80%;
		overflow: hidden;
		margin-top: 15%;
		position: relative;
		text-align: left;
		>.mo-modal__header {
			padding: rem(20 20 0);
			line-height: 1;
			user-select: none;
		}
		>.mo-modal__body {
			padding: rem(30 20);
			overflow: auto;
		}
		>.mo-modal__footer {
			padding: rem(0 20 20);
			text-align: right;
			user-select: none;
		}
		.mo-modal__title {
			font-size: rem(20);
			line-height: 1;
			margin: 0;
			padding: 0;
		}
	}
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	.mo-modal {
		backface-visibility: hidden;
	}
}

.modal-fade-enter-active {
	animation: modalFadeIn .26s;
}

.modal-fade-leave-active {
	animation: modalFadeOut .2s;
}

@keyframes modalFadeIn {
	0% {
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
	100% {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@keyframes modalFadeOut {
	0% {
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
	100% {
		transform: translate3d(0, -10px, 0);
		opacity: 0;
	}
}

@media screen and (max-width: 768px) {
	.mo-modal__wrapper {
		.mo-modal {
			min-width: auto;
			width: 80%;
		}
	}
}
</style>
<script>
import Modal from './modal.js'
export default {
	name: 'MoModal',
	mixins: [Modal],
	props: {

		//打开时是否可滚动页面
		scrollable: Boolean,

		//标题，也可通过具名slot设置
		title: String,

		//距离顶部位置
		top: {
			type: String,
			default: '15%'
		},

		//是否显示遮罩
		overlay: {
			type: Boolean,
			default: true
		},

		//遮罩层背景
		overlayBackground: String,

		//通过遮罩层关闭
		closeByOverlay: Boolean,

		//通过esc键关闭
		closeByEsc: Boolean,

		//额外的样式
		classes: [String, Array]
	},
	computed: {
		styles() {
			return {
				'z-index': this.zIndex
			}
		}
	}
}
</script>