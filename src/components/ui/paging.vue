<template>
	<ul class="mo-paging">
		<li class="paging-item__select" v-if="showPageSizes && pageSizes && pageSizes.length">
			<select class="mo-input mo-input-small" v-model="customPageSize" @change="limitChange">
				<option v-for="p in pageSizes" :value="p" :key="p">
					{{ p }} / 页
				</option>
			</select>
		</li>
		<li :class="['paging-item', 'paging-item--prev', {'paging-item--disabled' : index === 1}]" v-if="config.prev" @click="prev" v-html="config.prev" :title="index === 1 ? '' : '上一页'"></li>
		<li :class="['paging-item', 'paging-item--first', {'paging-item--disabled' : index === 1}]" v-if="config.first && pages> 1" @click="first" v-html="config.first">
		</li>
		<template v-if="config.pager">
			<li class="paging-item" v-if="!config.first && showPrevMore" @click="first">1</li>
			<li :class="['paging-item', 'paging-item--more']" v-if="showPrevMore" v-html="config.more"></li>
			<li :class="['paging-item', {'paging-item--current' : index === pager}]" v-for="pager in pagers" @click="go(pager)" :key="pager">
				{{ pager }}
			</li>
			<li :class="['paging-item', 'paging-item--more']" v-if="showNextMore" v-html="config.more"></li>
			<li class="paging-item" v-if="!config.last && showNextMore" @click="last">{{ pages }}</li>
		</template>
		<li :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]" v-if="config.last && pages> 1" @click="last" v-html="config.last">
		</li>
		<li :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" v-if="config.next" @click="next" v-html="config.next" :title="index === pages ? '' : '下一页'"></li>
	</ul>
</template>
<style lang="scss">
@import '~@/assets/mo/import';
.mo-paging {
	display: inline-flex;
	flex-wrap: wrap;
	padding: 0;
	margin: 1rem 0;
	list-style: none;
	user-select: none;
	>.paging-item {
		display: flex;
		position: relative;
		height: 2rem;
		padding: rem(5);
		min-width: 2rem;
		text-align: center;
		text-decoration: none;
		border: 1px solid $color-border;
		background-color: #fff;
		margin-left: -1px;
		cursor: pointer;
		color: $color-text;
		justify-content: center;
		align-items: center;
		i {
			position: relative;
			font-size: rem(18);
		}
		&:first-child {
			margin-left: 0;
		}
		&:hover {
			background-color: #f0f0f0;
			color: $color-primary;
		}
		&.paging-item--disabled,
		&.paging-item--more {
			background-color: #fff;
			color: $color-text;
		}
		&.paging-item--disabled {
			cursor: not-allowed;
			opacity: .75;
		}
		&.paging-item--more,
		&.paging-item--current {
			cursor: default;
		}
		&.paging-item--current {
			background-color: $color-primary;
			color: #fff;
			position: relative;
			z-index: 1;
			border-color: $color-primary;
		}
	}
	.paging-item__select {
		border: none;
		margin-right: 1rem;
		select {
			height: 2rem;
			border-color: $color-border;
		}
	}
}
</style>
<script>
export default {
	name: 'mo-paging',
	props: {

		//页面中的可见页码，其他的以...替代, 必须是奇数
		perPages: {
			type: Number,
			default: 5
		},

		//当前页码
		pageIndex: {
			type: Number,
			default: 1
		},

		//每页显示条数
		pageSize: {
			type: Number,
			default: 20
		},

		//总记录数
		total: {
			type: Number,
			default: 1
		},


		//是否显示pageSize下拉
		showPageSizes: Boolean,

		//pageSize配置
		pageSizes: {
			type: Array,
			default() {
				return [10, 20, 50, 100]
			}
		},


		//配置参数
		options: Object
	},
	methods: {
		prev() {
			if (this.index > 1) {
				this.go(this.index - 1)
			}
		},
		next() {
			if (this.index < this.pages) {
				this.go(this.index + 1)
			}
		},
		first() {
			if (this.index !== 1) {
				this.go(1)
			}
		},
		last() {
			if (this.index != this.pages) {
				this.go(this.pages)
			}
		},
		go(page) {
			if (this.index !== page) {
				this.index = page
				this.$emit('change', this.index, this.limit)
			}
		},
		limitChange() {
			this.limit = this.customPageSize
			this.index = 1
			this.$emit('change', this.index, this.limit)
		}
	},
	computed: {

		//计算总页码
		pages() {
			return Math.ceil(this.size / this.limit)
		},

		pagers() {
			const array = []
			const perPages = this.perPages
			const pageCount = this.pages
			let current = this.index
			const _offset = (perPages - 1) / 2


			const offset = {
				start: current - _offset,
				end: current + _offset
			}

			//-1, 3
			if (offset.start < 1) {
				offset.end = offset.end + (1 - offset.start)
				offset.start = 1
			}
			if (offset.end > pageCount) {
				offset.start = offset.start - (offset.end - pageCount)
				offset.end = pageCount
			}
			if (offset.start < 1) offset.start = 1

			this.showPrevMore = (offset.start > 1)
			this.showNextMore = (offset.end < pageCount)

			for (let i = offset.start; i <= offset.end; i++) {
				array.push(i)
			}

			return array
		}
	},
	data() {
		const config = Object.assign({}, {
			first: false,
			last: false,
			prev: '<i class="mo-icon-arrow_left"></i>',
			next: '<i class="mo-icon-arrow_right"></i>',
			more: '...',
			pager: true
		}, this.options)

		let customPageSize = this.pageSize

		return {
			config,
			index: this.pageIndex,
			limit: this.pageSize,
			size: this.total || 1,
			showPrevMore: false,
			showNextMore: false,
			customPageSize
		}
	},
	watch: {
		pageIndex(val) {
			this.index = val || 1
		},
		pageSize(val) {
			this.limit = val || 10
		},
		total(val) {
			this.size = val || 1
		}
	}
}
</script>
