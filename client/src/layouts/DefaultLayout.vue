<template>
	<b-container class="layout-default" fluid>
		<!-- Header -->
		<b-container fluid>
			<b-row align-h="between">
				<b-col cols="auto" class="p-0">
					HEADER <br>
					<router-link to="/">Home</router-link> - <router-link to="/about">About</router-link>
				</b-col>
			</b-row>
		</b-container>

		<!-- Content -->
		<b-container fluid >
			<b-row class="rb-content-page">
				<slot></slot>
			</b-row>
		</b-container>
	</b-container>
</template>

<script>
	export default {
		name: 'DefaultLayout'
	}
</script>

<style lang="scss" scoped>
</style>
