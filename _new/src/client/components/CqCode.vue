<template>
	<component :is="inline ? 'span' : 'pre'"><code class="javascript" v-html="text"></code></component>
</template>

<script>
	import hljs from 'highlight.js';

	export default {
		name: 'CqCode',
		props: {
			inline: {
				type: Boolean,
				default: false
			},
			tabSize: {
				type: Number,
				default: 4
			}
		},
		mounted() {
			hljs.highlightBlock(this.$el);
		},
		computed: {
			text() {
				let children = this.$slots.default()[0].children;
				while (children instanceof Array) {
					children = children[0].children;
				}

				let text = children;
				let tabInSpaces = (' ').repeat(this.tabSize);

				text = text.split('\n')
					.map(l => l.replace(/\t/g, tabInSpaces))
					.filter(l => l.trim().length);

				let baseIndent = (/^\s*/).exec(text[0])[0];
				text = text
					.map(l => l.replace(baseIndent, ''));

				return text.join('\n');
			}
		}
	}
</script>

<style lang="scss" scoped></style>
