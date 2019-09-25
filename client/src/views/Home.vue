<template>
	<bContainer fluid>
		<b-row>
			<b-col>
				<h3 class="mt-4 mb-2">
					HOME

					<level-1-1></level-1-1>
				</h3>
			</b-col>
		</b-row>
	</bContainer>
</template>

<script>
	import Level11 from './world-1/1-1/Level-1-1';

	export default {
		name: 'home',
		components: {Level11},
		data: () => ({})
	}
</script>

<style lang="scss" scoped>
</style>