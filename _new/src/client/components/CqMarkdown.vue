<template>
	<div class="cq-markdown" v-html="parsed" :style="{display: inline ? 'inline' : ''}"></div>
</template>

<script>
	import MarkdownIt from 'markdown-it';

	let md = new MarkdownIt({
		html: false,
		linkify: true,
		typographer: true
	});

	export default {
		name: "CqMarkdown",
		props: {
			value: {
				type: String,
				default: ''
			},
			inline: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			parsed() {
				if (this.inline) {
					return this.value ? md.renderInline(this.value) : "";
				} else {
					return this.value ? md.render(this.value) : "";
				}
			}
		}
	}
</script>

<style lang="scss" scoped></style>
