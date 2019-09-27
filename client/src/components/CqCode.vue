<template>
	<component :is="inline ? 'span' : 'pre'" v-highlightjs><code class="javascript"><slot></slot></code></component>
</template>

<script>
	export default {
		name: 'CqCode',
		props: {
			inline: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped></style>
