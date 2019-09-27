<template>
	<div>
		<h2>
			{{info.title}}
		</h2>

		<p>
			Os condicionais no js podem ser expressados na forma:
		</p>

<cq-code>if (x < 5) {
	console.log('menor que 5');
} else if (x > 5) {
	console.log('maior que 5');
} else {
	console.log('igual a 5');
}</cq-code>
	</div>
</template>

<script>
	import CqCode from '../../../components/CqCode';
	const info = {
		world: 0,
		level: 2,
		title: 'Condicionais'
	};

	export default {
		name: 'Level-0-2',
		components: {CqCode},
		info,
		metaInfo (){
			return {
				title: `${info.world}-${info.level} ${info.title}`
			}
		},
		data: () => ({
			info
		}),
	}
</script>

<style lang="scss" scoped></style>
