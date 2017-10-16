<template>
	<div class="mo-dropdown" :class="className">
		<div class="mo-dropdown-toggle" @click="toggle">
			<slot name="toggle"></slot>
		</div>
		<div class="mo-dropdown-body" :class="bodyClass">
			<slot name="body"></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: 'mo-dropdown',
	props: {
		value: Boolean,
		isMenu: Boolean,
		className: String,
		arrow: Boolean
	},
	data() {
		return {
			open: this.value,
			handler: null
		}
	},
	computed: {
		bodyClass() {
			const classes = []
			if (this.isMenu) {
				classes.push('mo-dropdown-menu')
			}
			if (this.arrow) {
				classes.push('mo-dropdown-arrow')
			}

			if (this.open) {
				classes.push('mo-dropdown-open')
			}
			return classes.join(' ')
		}
	},
	methods: {
		toggle() {
			this.open = !this.open
			this.$emit('input', this.open)
		}
	},

	mounted() {
		const self = this
		this.handler = function(e) {
			const target = e.target
			if (target === self.$el || self.$el.contains(target)) {
			} else {
				self.open = false
				self.$emit('input', false)
			}
		}
		this.$nextTick(() => document.addEventListener('click', this.handler))
	},

	destroyed() {
		document.removeEventListener('click', this.handler)
	},

	watch: {
		value(val) {
			this.open = val
		}
	}
}
</script>
<style lang="scss">
@import '~@/assets/mo/import';
.mo-dropdown {
	position: relative;
	.mo-dropdown-body {
		position: absolute;
		top: 100%;
		left: 0;
		margin: .125rem 0 0;
		background-color: #fff;
		box-shadow: $box-shadow;
		display: none;
		text-align: left;
		z-index: 1000;
		&.mo-dropdown-menu {
			padding: .5rem 0;
			min-width: 10rem;
			list-style: none;
			.dropdown-menu-item {
				display: block;
				width: 100%;
				padding: .25rem 1.5rem;
				clear: both;
				font-weight: 400;
				color: #292b2c;
				text-align: inherit;
				white-space: nowrap;
				background: 0 0;
				border: 0;
				&:hover {
					color: #1d1e1f;
					text-decoration: none;
					background-color: #f7f7f9;
				}
			}
		}
		&.mo-dropdown-open {
			display: block;
		}
	}
}
</style>
