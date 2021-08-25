<template>
	<blockquote class="blockquote text-center" style="padding: 1em 1em">
		<p>
			<slot>{{ quoteText }}</slot>
		</p>

		<footer class="blockquote-footer text-secondary" style="opacity: .7;">
			{{ author }} em
			<cite>{{ book }}</cite>
		</footer>
	</blockquote>
</template>

<script>
	export default {
		name: 'Quotes',
		props: {
			quoteText: String,
			author: String,
			book: String
		}
	}
</script>

<style scoped lang="scss">
	.blockquote {
		margin: 2em 0;

		p {
			margin-bottom: 1.5em;
		}

		.blockquote-footer {
			&:before {
				content: '';
			}
		}
	}
</style>