<template>
	<component class="base-layout" :is="layout">
		<metainfo>
			<template v-slot:title="{ content }">{{ content ? content + ' - ' : '' }}Code Quest</template>
		</metainfo>

		<router-view />
	</component>
</template>

<script>
	import DefaultLayout from './layouts/DefaultLayout.vue';
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useActiveMeta } from 'vue-meta';

	export default {
		name: 'App',
		setup() {
			const route = useRoute();
			const layout = computed(() => route.meta.layout || DefaultLayout);

			return {
				layout
			}
		}
	}
</script>

<style lang="scss" scoped>
	.base-layout {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
