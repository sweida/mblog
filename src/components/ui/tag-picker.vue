<template>
	<div class="mo-tag-picker">
		<div class="tag-picker-item" v-for="(tag, index) in tags" :key="tag">
			<span class="tag-name">{{tag}}</span>
			<a class="tag-remove" @click="remove(index)">&times;</a>
		</div>
		<div class="tag-picker-input" v-if="showInput">
			<mo-dropdown>
				<input type="text" maxlength="40" class="mo-input" :class="{'error' : error}" placeholder="输入标签并回车..." slot="toggle" v-model.trim="name" @keyup.enter="add" @input="error = false">
				<div class="tag-picker-recommend" slot="body">
					<li class="tag-picker-tag" v-for="tag in hotTags" :key="tag" @click="insert(tag)">
						<span class="tag-name">{{tag}}</span>
					</li>
				</div>
			</mo-dropdown>
		</div>
	</div>
</template>

<script>
import MoDropdown from './dropdown'
export default {
	name: 'mo-tag-picker',
	props: {
		value: {
			type: Array,
			default() {
				return []
			}
		},
		maxSize: {
			type: Number,
			default: 10
		}
	},
	components: {
		MoDropdown
	},
	data() {
		return {
			tags: Array.isArray(this.value) ? this.value : [],
			name: '',
			error: false,
			hotTags: []
		}
	},
	computed: {
		showInput() {
			return this.tags.length < this.maxSize
		}
	},
	methods: {
		findTag(name) {
			return !!~this.tags.indexOf(name)
		},
		add(event) {
			if (this.name && !this.findTag(this.name)) {
				this.tags.push(this.name)
				this.name = ''
				this.error = false
				this.$emit('input', this.tags)
			} else {
				this.error = true
			}
		},
		insert(tag) {
			this.error = false
			this.name = tag
			this.add()
		},
		remove(index) {
			this.tags.splice(index, 1)
			this.$emit('input', this.tags)
		}
	},
	watch: {
		value: {
			handler(val, oldVal) {
				this.tags = val
			},
			deep: true
		}
	}
}
</script>

<style lang="scss">
@import '~@/assets/mo/import';
.mo-tag-picker {
	border: rem(1) solid $color-border;
	padding: rem(4 5 0 5);
	min-height: rem(34);
	.tag-picker-item,
	.tag-picker-input {
		display: inline-block;
		vertical-align: middle;
		font-size: 0;
	}
	.tag-picker-item,
	.tag-picker-tag {
		margin-bottom: rem(4);
		margin-right: rem(5);
		line-height: 1.25rem;
		height: 1.5rem;
		padding: rem(2 20 2 5);
		font-size: rem(14);
		background-color: rgba($color-positive, .2);
		color: darken($color-positive, 20%);
		position: relative;
		transition: all .2s;
		user-select: none;
		.tag-name {
			display: block;
			max-width: 12.5rem;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.tag-remove {
			position: absolute;
			right: rem(5);
			top: rem(3);
			font-size: 1rem;
			color: inherit;
			cursor: pointer;
		}
	}
	.tag-picker-item {
		&:nth-last-of-type(1) {
			margin-right: 0;
		}
	}

	.tag-picker-input {
		position: relative;
		padding-bottom: rem(4);
		.mo-input {
			border: none;
			height: 1.5rem;
			line-height: rem(20);
			padding: rem(2 5);
			box-shadow: none!important;
			&.error {
				background-color: rgba($color-negative, .3);
			}
		}
		.mo-dropdown-body {
			margin: rem(5) 0 1rem 0;
		}
		.tag-picker-recommend {
			width: 20rem;
			padding: 1rem rem(10) rem(10) 1rem;
			list-style-type: none;
			.tag-picker-tag {
				display: inline-block;
				padding: rem(2 5);
				cursor: pointer;
				&:hover {
					background-color: $color-positive;
					color: #fff;
				}
			}
		}
	}
}
</style>