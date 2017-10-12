import Vue from 'vue'
import MoOverlay from './overlay'

const Overlay = Vue.extend(MoOverlay)

const $document = document.documentElement
const $body = document.body

//base zIndex
let _zIndex = 19900200

/**
 * 获取zIndex
 * @return {Number}
 */
const ZIndex = () => _zIndex += 1


/**
 * 检测是否是函数
 * @param  {*} obj 
 * @return {Boolean} 
 */
const isFunction = obj => obj && typeof obj === 'function'


const Manager = {

	instances: [],

	overlay: false,

	locked: false,


	/**
	 * 设置或者重设zIndex
	 * @param {Object} instance
	 * @param {Boolean} reset
	 */
	setZIndex(instance, reset) {
		if (reset) {
			instance.overlayZIndex = ZIndex()
			instance.zIndex = ZIndex()
		} else {
			instance.zIndex = instance.zIndex || ZIndex()
		}

	},


	/**
	 * 锁定|取消锁定文档滚动
	 * @param  {Boolean} enabled 是否可用
	 */
	scroll(enabled = false) {
		if (enabled) {
			$body.style.paddingRight = null
			$body.classList.remove('mo-modal__opened')
			this.locked = false
		} else {
			if (this.locked) return
			const scrollBarWidth = window.innerWidth - $body.offsetWidth
			scrollBarWidth && ($body.style.paddingRight = `${scrollBarWidth}px`)
			$body.classList.add('mo-modal__opened')
			this.locked = true
		}
	},


	/**
	 * 创建overlay遮罩层
	 * @param  {Object} instance
	 */
	createOverlay(instance) {
		let overlay = this.overlay = new Overlay({
			el: document.createElement('div')
		})
		if (instance.overlayBackground) {
			overlay.background = instance.overlayBackground
		}
		overlay.show = true
		overlay.zIndex = instance.overlayZindex
		overlay.clickEvent = this.overlayClickEvent.bind(this)
		$body.appendChild(overlay.$el)
	},


	/**
	 * 关闭overlay
	 */
	closeOverlay() {
		if (!this.overlay) return
		let overlay = this.overlay
		overlay.show = false
		this.overlay = null
		setTimeout(() => {
			overlay.$el && overlay.$el.parentNode.removeChild(overlay.$el)
			overlay.$destroy()
		}, 100)
	},


	/**
	 * 重设overlay的样式
	 */
	resetOverlayStyle() {
		if (!this.overlay || this.instances.length === 0) return
		const instance = this.instances[this.instances.length - 1]
		if (instance.overlayBackground) {
			overlay.background = instance.overlayBackground
		}
		this.overlay.zIndex = instance.overlayZIndex
	},


	/**
	 * 触发overlay click 事件
	 */
	overlayClickEvent() {
		if (this.instances.length === 0) return
		const instance = this.instances[this.instances.length - 1]
		isFunction(instance.overlayClick) && instance.overlayClick()
	},


	/**
	 * 打开 modal
	 * @param  {Object} instance 
	 */
	open(instance) {

		if (!instance || this.instances.indexOf(instance) !== -1) return

		//如果没有遮罩层，就创建一个	
		if (instance.overlay && this.instances.length === 0) {
			this.createOverlay(instance)
		}

		//禁用滚动条
		if (!instance.scrollable) {
			this.scroll()
		}

		this.setZIndex(instance, true)
		this.instances.push(instance)

		this.resetOverlayStyle()
	},


	/**
	 * 关闭 modal
	 * @param  {Object} instance 
	 */
	close(instance) {
		let index = this.instances.indexOf(instance)
		if (index === -1) return
		Vue.nextTick(() => {
			this.instances.splice(index, 1)
			if (this.instances.length === 0) {
				this.closeOverlay()
				this.scroll(true)
			}
			this.resetOverlayStyle()
		})
	},

}

export {
	ZIndex,
	Manager
}