<template>
	<div>
		<test-group v-for="test in tests" :key="test.name" :test="test"></test-group>
	</div>
</template>

<script>
	import TestGroup from "../../../components/TestGroup.vue";

	import { tests } from './tests';

	export default {
		name: 'Tests-1-5',
		components: {  TestGroup },
		data: () => ({
			tests,
		}),
	}
</script>

<style lang="scss" scoped></style>
