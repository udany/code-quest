<template>
	<b-container class="layout-default p-0" fluid>
		<!-- Header -->
		<div class="cq-header">
			<b-container>
				<b-row align-h="between">
					<b-col cols="auto" class="py-4">
						<h1>> Code Quest</h1>
					</b-col>
				</b-row>
			</b-container>
		</div>

		<!-- Content -->
		<b-container>
			<b-row class="cq-body">
				<b-col class="cq-menu" cols="2">
					<section
						v-for="world in worlds"
						:key="world.name"
						class="mb-5"
					>
						<h3 class="mb-3">{{world.number}}. {{world.name}}</h3>

						<router-link
							v-for="level in world.levels"
							:key="level.name"
							:to="level.name"
						>
							<b>
								{{level.info.world}}-{{level.info.level}}
							</b>
							{{level.info.title}}
						</router-link>
					</section>
					...
				</b-col>
				<b-col class="cq-page-body">
					<slot></slot>
				</b-col>
			</b-row>
		</b-container>
	</b-container>
</template>

<script>
	import { worlds } from '../views/routes/';

	export default {
		name: 'DefaultLayout',
		data: () => ({
			worlds
		})
	}
</script>

<style lang="scss" scoped>
	.cq-header {
		background: #080b10;
		margin-bottom: 25px;

		h1 {
			font-size: $font-size-md;
			margin: 0;
			text-shadow: 0 0 5px rgba(255, 255, 255, .5);
		}
	}

	.cq-page-body {
		padding: 1em 2em;
		background: #112b42;
	}

	.cq-menu {
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
