<template>
	<ol class="mo-breadcrumb">
		<li>
			<router-link to="/overview/">MBlog</router-link>
		</li>
		<li v-for="(item, index) in links" :key="index">
			<router-link :to="item.url" v-if="item.url">{{item.name}}</router-link>
			<template v-else>{{item.name}}</template>
		</li>
	</ol>
</template>
<script>
export default {
	name: 'mb-breadcrumb',
	props: {
		links: Array,
	}
}
</script>

<style lang="scss">
@import '~@/assets/mo/import';
.mo-breadcrumb {
	position: relative;
	padding: .5rem 1rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid $color-border;
	list-style: none;
	font-size: 0;
	margin-left: -1rem;
	margin-right: -1rem;
	color: $color-description;
	>li {
		display: inline-block;
		font-size: rem(14);
		&+li:before {
			padding: 0 .5rem;
			color: #ccc;
			content: "/\00a0";
		}
	}
}
</style>