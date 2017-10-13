<template>
	<div class="mo-sort" @click="toggle">
		<span class="mo-sort_label">
			<slot></slot>
		</span>
		<a class="mo-sort_up" :class="{'mo-sort-active' : isField && sort === 'asc'}"></a>
		<a class="mo-sort_down" :class="{'mo-sort-active' : isField && sort === 'desc'}"></a>
	</div>
</template>
<script>
export default {
	name: 'mo-sort',
	props: {
		value: String,
		name: String,
		type: String
	},
	data() {
		return {
			sort: this.type
		}
	},
	computed: {
		isField() {
			return this.value === this.name
		}
	},
	methods: {
		toggle() {
			if (this.sort === 'asc') {
				this.sort = 'desc'
			} else {
				this.sort = 'asc'
			}
			this.$emit('input', this.name)
			this.$emit('change', this.name, this.sort)
		}
	}
}
</script>
<style lang="scss">
@import '~@/assets/mo/import';
.mo-sort {
	display: inline-block;
	padding-right: 1.25rem;
	position: relative;
	user-select: none;
	cursor: pointer;
	.mo-sort_up,
	.mo-sort_down {
		display: block;
		border: rem(6) solid transparent;
		position: absolute;
		right: 0;
	}
	.mo-sort_up {
		border-bottom-color: $color-placeholder;
		top: rem(-1);
		&:hover {
			border-bottom-color: $color-hint;
		}
		&.mo-sort-active {
			border-bottom-color: $color-description;
		}
	}
	.mo-sort_down {
		border-top-color: $color-placeholder;
		bottom: rem(-4);
		&:hover {
			border-top-color: $color-hint;
		}
		&.mo-sort-active {
			border-top-color: $color-description;
		}
	}
}
</style>
