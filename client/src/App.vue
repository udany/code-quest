<template>
	<component class="base-layout" :is="layout">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
	</component>
</template>

<script>
	import DefaultLayout from './layouts/DefaultLayout';

	export default {
		name: 'App',
		metaInfo: {
			titleTemplate: (titleChunk) => {
				return titleChunk ? `${titleChunk} | Vue Boilerplate` : 'Vue Boilerplate';
			}
		},
		computed: {
			layout() {
				return this.$route.meta.layout || DefaultLayout;
			}
		}
	}
</script>

<style lang="scss">
	.base-layout {
		min-height: 100vh;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
