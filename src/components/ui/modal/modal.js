import {
	ZIndex,
	Manager
} from './manager'


const $body = document.body


export default {
	props: {
		value: Boolean,

	},
	data() {
		return {
			visible: this.value,
			overlayZindex: ZIndex(),
			zIndex: ZIndex()
		}
	},
	methods: {

		//open modal
		open() {
			this.visible = true
			this.$emit('input', true)
			this.$emit('open') //发送 'open' 事件给父组件
			Manager.open(this)
		},

		//close modal
		close(from) {
			this.visible = false
			this.$emit('input', false)
			this.$emit('close', from) //发送 'close' 事件给父组件
			Manager.close(this)
		},

		overlayClick() {
			this.closeByOverlay && this.close('overlay')
		},

		escPress() {
			this.closeByEsc && this.close('esc')
		},

		bindEsc() {
			if (!this._escEvent) {
				this._escEvent = event => event.keyCode === 27 && this.escPress(event)
			}
			window.addEventListener('keydown', this._escEvent, false)
		},

		unbindEsc() {
			window.removeEventListener('keydown', this._escEvent, false)
		},

		remove() {
			this.unbindEsc()
			Manager.close(this)
			this.$refs.modal && this.$refs.modal.parentNode.removeChild(this.$refs.modal)
		}

	},

	mounted() {
		this.bindEsc()
		if (this.overlay && this.visible) {
			this.open()
		}

		this.$refs.modal && $body.appendChild(this.$refs.modal)
	},

	updated() {
		!this.overlay && Manager.setZIndex(this)
	},

	beforeDestroy() {
		this.remove()
	},

	watch: {
		value(val, old) {
			if (val === old) {
				return
			}
			val ? this.open() : this.close()
		}
	}
}
