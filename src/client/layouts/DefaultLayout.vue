<template>
	<div class="container container-fluid layout-default p-0" fluid>
		<!-- Header -->
		<div class="cq-header">
			<div class="container">
				<div class="row">
					<div class="col py-4">
						<h1>> Code Quest</h1>
					</div>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="container">
			<div class="cq-body">
				<div class="cq-menu" :class="{ closed: menuClosed }">
					<div class="activator" @click="menuClosed = !menuClosed">
						<fa-icon key="bars" v-if="menuClosed">bars</fa-icon>
						<fa-icon key="times" v-else>times</fa-icon>
					</div>

					<div class="cq-menu-body">
						<section
							v-for="world in worlds"
							:key="world.name"
							class="mb-5"
						>
							<h3 style="cursor: pointer" class="mb-3" @click="world.collapsed = !world.collapsed">
								{{world.number}}. {{world.name}}
								<font-awesome-icon
									class="rotate" :class="{down: !world.collapsed}"
									:id="'icon'+world.number"
									:icon="['fas', 'caret-down']" />
							</h3>
							<cq-collapse :collapsed="world.collapsed">
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
							</cq-collapse>
						</section>
						...
					</div>
				</div>
				<div class="cq-page-body">
					<slot></slot>

					<NavigationFooter v-if="$route.meta.level >= 0" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { worlds } from '../views/routes/';
	import FaIcon from '../components/FaIcon.vue';
	import CqCollapse from '../components/CqCollapse.vue';
	import NavigationFooter from '../views/NavigationFooter.vue';

	export default {
		name: 'DefaultLayout',
		components: { NavigationFooter, CqCollapse, FaIcon},
		data: () => ({
			worlds: worlds.map((x) => ({...x, collapsed: true})),
			menuClosed: true
		}),
		watch: {
			$route(now) {
				let nextWorld = this.getWorldFromRoute(now);

				if (nextWorld) nextWorld.collapsed = false;
			}
		},
		methods: {
			getWorldFromRoute(route) {
				return this.worlds.find(w => w.number === route.meta.world);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cq-header {
		background: #080b10;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;

		z-index: 10;

		h1 {
			font-size: $font-size-lg;
			margin: 0;
			text-shadow: 0 0 5px rgba(255, 255, 255, .5);
		}

		height: 50px;
	}

	.cq-body {
		display: flex;
		flex-wrap: nowrap;
		padding-top: 75px;

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

			width: 200px;
			flex-shrink: 0;

			.activator {
				display: none;
			}
		}


		.cq-page-body {
			padding: 1em 2em;
			background: #112b42;
			flex-grow: 1;
		}
	}

	@include media-breakpoint-down(lg) {
		.cq-body {
			display: block;

			.cq-menu {
				position: fixed;
				left: 0;
				top: 50px;
				bottom: 0;
				z-index: 50;

				width: 220px;

				background: rgba($background, .85);

				transform: translate(0, 0);
				transition: .3s all;

				.cq-menu-body {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;

					padding: 1em 1em;

					overflow: auto;
					box-shadow: 0 0 15px rgba(black, .3);
				}

				.activator {
					display: block;
					position: absolute;
					right: 0;
					top: 0;
					z-index: 5;

					font-size: $font-size-md;
					background: rgba($background, .85);
					padding: 5px 10px;
					box-shadow: 0 0 15px rgba(black, .3);

					cursor: pointer;

					transform: translate(0, 0);
					transition: .3s all;

					&:hover {
						color: $highlight;
						background: lighten($background, 15);
					}
				}

				&.closed {
					transform: translate(-100%, 0);

					.activator {
						transform: translate(80%, 0);

						&:hover {
							transform: translate(100%, 0);
						}
					}
				}
			}
		}
	}
</style>
