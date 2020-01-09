<template>
	<component :is="inline ? 'span' : 'pre'" v-highlightjs><code class="javascript" v-html="text"></code></component>
</template>

<script>
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
		computed: {
			text() {
				let text = this.$slots.default[0].text;
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
