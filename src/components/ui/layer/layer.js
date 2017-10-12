import Vue from 'vue'

import MoLayer from './layer.vue'

import {
	extend
} from '@/utils'


const LayerConstructor = Vue.extend(MoLayer)

const noop = () => {}


const defaults = {
	visible: false,
	classes: null,
	scrollable: false,
	title: null,
	content: null,
	overlay: true,
	closeByOverlay: false,
	closeByEsc: false,
	ensureButton: true,
	cancelButton: true,
	ensure: null,
	cancel: null,
	autoClose: false,
	autoCloseTime: 0,
	ensureButtonClass: 'mo-btn mo-btn-primary',
	cancelButtonClass: 'mo-btn',
	ensureButtonText: '确定',
	cancelButtonText: '取消'
}


let instance


const createInstance = () => {
	instance = new LayerConstructor({
		el: document.createElement('div')
	})
	instance.onRemove = () => instance = null
	document.body.appendChild(instance.$el)

	instance.show = options => {
		for (let prop in options) {
			if (options.hasOwnProperty(prop)) {
				instance[prop] = options[prop]
			}
		}
		instance.visible = true
		if (instance.autoClose && Number(instance.autoCloseTime) > 0) {
			instance.onAutoClose()
		}
	}

	return instance
}



const Layer = options => {
	if (typeof options === 'string') {
		options = {
			contents: options
		}
	}

	options = extend({}, defaults, Layer.config || {}, options || {})

	instance = instance || createInstance()

	instance.show(options)
}


/**
 * 全局设置
 * @param  {Object}
 */
Layer.settings = options => Layer.config = options



Layer.alert = (message, ensure, options) => {
	if (typeof ensure === 'object') {
		options = ensure
		ensure = null
	}

	return Layer(extend({}, {
		type: 'alert',
		classes: 'mo-modal--alert',
		content: message,
		ensure: ensure,
		ensureButton: true,
		cancelButton: false,
		autoClose: false
	}, options || {}))
}


Layer.confirm = (message, ensure, cancel, options) => {
	if (typeof cancel === 'object') {
		options = cancel
		cancel = null
	}

	return Layer(extend({}, {
		type: 'confirm',
		classes: 'mo-modal--confirm',
		content: message,
		ensure: ensure,
		cancel: cancel,
		ensureButton: true,
		cancelButton: true,
		autoClose: false
	}, options || {}))
}


Layer.toast = (message, time, options) => {
	if (typeof time === 'object') {
		options = time
	}

	let autoCloseTime = (typeof time === 'number' && time > 0) ? time : 2000

	return Layer(extend({}, {
		type: 'toast',
		classes: 'mo-modal--toast',
		content: message,
		ensureButton: false,
		cancelButton: false,
		ensure: null,
		autoClose: true,
		autoCloseTime,
		overlay: false
	}, options || {}))
}


Layer.loading = (message, time, options) => {

}



Layer.close = () => {
	if (!instance) {
		return false
	}
	instance.onRemove()
}

export default Layer