<template>
	<nav class="footer-navigation d-flex justify-content-between">
		<router-link
			v-if="$route.meta.previousLevel"
			:to="$route.meta.previousLevel"
			class="btn btn-primary text-start"
		>
			<fa-icon class="me-2">chevron-left</fa-icon>
			<b>
				{{$route.meta.previousLevel.meta.world}}-{{$route.meta.previousLevel.meta.level}}</b>
			{{$route.meta.previousLevel.meta.title}}
		</router-link>
		<div v-else></div>

		<router-link
			v-if="$route.meta.nextLevel"
			:to="$route.meta.nextLevel"
			class="btn btn-primary"
		>
			<b>{{$route.meta.nextLevel.meta.world}}-{{$route.meta.nextLevel.meta.level}}</b>
			{{$route.meta.nextLevel.meta.title}}
			<fa-icon class="ms-2">chevron-right</fa-icon>
		</router-link>
	</nav>
</template>

<script>
	export default {
		name: 'NavigationFooter',
		data: () => ({}),
	}
</script>

<style lang="scss" scoped>
	.footer-navigation {
		margin-top: 80px;
	}

	.btn {
		padding: .8em 1.5em;
	}
</style>
