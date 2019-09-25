<template>
	<b-container class="layout-default p-0" fluid>
		<!-- Header -->
		<b-container fluid class="cq-header">
			<b-row align-h="between">
				<b-col cols="auto" class="py-4">
					<h1>>Code Quest</h1>
				</b-col>
			</b-row>
		</b-container>

		<!-- Content -->
		<b-container fluid >
			<b-row class="cq-body">
				<b-col class="cq-menu" cols="2">
					<h3>Fases</h3>

					<router-link
						v-for="levelRoute in levelRoutes"
						:key="levelRoute.name"
						:to="levelRoute.name"
					>
						{{levelRoute.world}}-{{levelRoute.level}}
					</router-link>
				</b-col>
				<b-col class="cq-page-body">
					<slot></slot>
				</b-col>
			</b-row>
		</b-container>
	</b-container>
</template>

<script>
	import levelRoutes from '../views/routes';

	export default {
		name: 'DefaultLayout',
		data: () => ({
			levelRoutes: levelRoutes.map(x => x.component)
		})
	}
</script>

<style lang="scss" scoped>
	.cq-header {
		background: #080b10;

		h1 {
			font-size: $font-size-md;
			margin: 0;
			text-shadow: 0 0 5px rgba(255, 255, 255, .5);
		}
	}

	.cq-page-body {
		padding: 1em .7em;
		background: #112b42;
	}

	.cq-menu {
		text-align: center;
		padding: 1em 0;

		h3 {
			margin-bottom: .8em;
		}

		a {
			font-family: $font-title;
			display: block;
			margin-bottom: .5em;
		}
	}
</style>
