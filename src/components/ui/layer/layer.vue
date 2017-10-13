<template>
	<mo-modal v-model="open" :scrollable="scrollable" :top="top" :classes="classes" :overlay="overlay" :overlayBackground="overlayBackground" :closeByOverlay="closeByOverlay" :closeByEsc="closeByEsc" @close="onCancel">
		<template slot="title" v-if="title">{{title}}</template>
		<span slot="body" v-html="content"></span>
		<template slot="buttons" v-if="ensureButton || cancelButton">
			<button type="button" :class="cancelButtonClass" v-if="cancelButton" @click="onCancel">{{cancelButtonText}}</button>
			<button type="button" :class="ensureButtonClass" v-if="ensureButton" @click="onEnsure">{{ensureButtonText}}</button>
		</template>
	</mo-modal>
</template>


<style lang="scss">
@import '~@/assets/mo/import';
.mo-modal__wrapper {
	.mo-modal {
		&.mo-modal--alert {
			.mo-modal__body {
				font-size: 1rem;
			}
		}
		&.mo-modal--confirm {
			.mo-modal__body {
				font-size: 1rem;
			}
		}
		&.mo-modal--toast {
			background-color: rgba(#000, .6);
			color: #fff;
			border-radius: 2px;
			min-width: 6rem;
			width: auto;
			text-align: center;
			.mo-modal__body {
				padding: rem(12 20);
			}
		}
	}
}
</style>


<script>
import MoModal from '../modal'
import { isFunction } from '@/assets/utils'
export default {
	components: {
		MoModal
	},
	props: {

		//是否可见
		visible: Boolean,

		//额外的样式
		classes: [String, Array],

		//打开时是否可滚动页面
		scrollable: Boolean,

		//标题
		title: String,

		//内容
		content: String,

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

		//显示确定按钮
		ensureButton: {
			type: Boolean,
			default: true
		},

		//显示取消按钮
		cancelButton: {
			type: Boolean,
			default: true
		},

		//确定按钮样式
		ensureButtonClass: {
			type: [String, Array],
			default() {
				return 'mo-btn mo-btn-primary'
			}
		},

		//取消按钮样式
		cancelButtonClass: {
			type: [String, Array],
			default() {
				return 'mo-btn'
			}
		},

		//确定按钮文本
		ensureButtonText: {
			type: String,
			default: '确定'
		},

		//取消按钮文本
		cancelButtonText: {
			type: String,
			default: '取消'
		},

		//确定事件回调
		ensure: Function,

		//取消事件回调
		cancel: Function,

		//是否自动关闭
		autoClose: Boolean,

		//自动关闭时间
		autoCloseTime: {
			type: Number,
			default: 0
		}
	},

	data() {
		return {
			open: this.visible,
			_closeTimer: null
		}
	},

	methods: {
		onCancel() {
			this.destroy()
			isFunction(this.cancel) && this.cancel(this)
		},
		onEnsure() {
			isFunction(this.ensure) && this.ensure(this)
		},
		destroy() {
			this.$destroy()
			this.onRemove()
			this._closeTimer && clearTimeout(this._closeTimer)
		},
		onAutoClose() {
			let time = Number(this.autoCloseTime)
			this._closeTimer = setTimeout(this.onCancel, time)
		},
		close() {
			this.onCancel()
		},
		onRemove() { }
	},

	beforeDestory() {
		this.destroy()
	},

	watch: {
		visible(val) {
			this.open = val
		}
	}
}
</script>