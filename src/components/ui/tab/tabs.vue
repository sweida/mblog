<script>
import MoTabNav from './tab-nav'
export default {
	name: 'mo-tabs',
	components: {
		MoTabNav
	},
	props: {
		value: [String, Number],
		type: String,
	},
	data() {
		return {
			panes: [],
			currentName: this.value || null
		}
	},
	methods: {
		addPanes(pane) {
			const index = this.$slots.default.indexOf(pane.$vnode);
			this.panes.splice(index, 0, pane);
		},
		setCurrentName(value) {
			this.currentName = value
			this.$emit('input', value)
		},
		handleTabClick(tab, tabName, event) {
			if (tab.disabled) return
			this.setCurrentName(tabName)
			this.$emit('tab-click', tab, event)
		},
	},
	render(h) {
		const {
				$slots,
			handleTabClick,
			type
			} = this

		const navs = h(MoTabNav, {
			props: {
				panes: this.panes,
				currentName: this.currentName,
				onTabClick: handleTabClick
			}
		})

		const head = h('div', {
			'class': 'mo-tabs-head',
		}, [navs])

		const body = h('div', {
			'class': 'mo-tabs-body',
		}, $slots.default)


		const classes = ['mo-tabs']

		if (type) {
			classes.push(`mo-tabs--${type}`)
		}

		return h('div', {
			'class': classes.join(' '),
		}, [head, body])
	},
	created() {
		if (!this.currentName) {
			this.setCurrentName('0')
		}
	},
	watch: {
		value(value) {
			this.setCurrentName(value)
		},
	}
}
</script>

<style lang="scss">
@import '~@/assets/mo/import';
.mo-tabs {
	.mo-tabs-head {
		margin: 0 0 1rem;
		border-bottom: rem(1) solid $color-border;
		padding: 0;
		position: relative;
		user-select: none;
	}
	.mo-tabs-navs {
		display: inline-flex;
		height: 2.5rem;
		margin-bottom: rem(-1);
		.mo-tab-nav {
			padding: .5rem 1.5rem;
			height: 2.5rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			white-space: nowrap;
			vertical-align: middle;
			position: relative;
			cursor: pointer;
			color: $color-description;
			&:hover {
				color: $color-text;
			}
			&.mo-tab-active {
				color: $color-primary;
				&:after {
					content: '';
					width: 100%;
					position: absolute;
					bottom: rem(-1);
					left: 0;
					background-color: $color-primary;
					height: rem(3);
				}
			}
			&.mo-tab-disabled {
				color: $color-description;
				opacity: $disabled-opacity;
				cursor: not-allowed;
			}
		}
	}
	.mo-tabs-body {
		position: relative;
		.mo-tab-pane {
			display: none;
			&.mo-tab-active {
				display: block;
			}
		}
	}
	&.mo-tabs--card {
		.mo-tabs-head {}
		.mo-tabs-navs {
			.mo-tab-nav {
				border: rem(1) solid transparent;
				transition: $form-transition;
				&.mo-tab-active {
					border-color: $color-border;
					border-bottom-color: #fff;
					border-radius: rem(2);
					&:after {
						display: none;
					}
				}
			}
		}
	}
}
</style>