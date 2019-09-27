<template>
	<div>
		<h2>
			Bem Vindo ao Code Quest!
		</h2>

		<p>
			Aqui você irá encontrar uma série de desafios, para resolvê-los	vocês devem alterar o código fonte
			fornecido com as suas soluções.
		</p>

		<p>
			Cada desafio conterá uma breve descrição do que é esperado e, quando necessário, alguns links de
			referência para ajudar você. Quando em dúvida, lembre-se: <mark>O Google é seu amigo!</mark>
		</p>

		<p>
			<small style="color: #aaa">E claro, podem chamar pra pedir ajuda também, sz</small>
		</p>

		<p class="text-right">
			<b>Boa viagem e boa sorte! &lt;3</b>
		</p>

	</div>
</template>

<script>
	const info = {
		world: 0,
		level: 0,
		title: 'Introdução'
	};

	export default {
		name: 'Level-0-0',
		info,
		metaInfo (){
			return {
				title: `${info.world}-${info.level} ${info.title}`
			}
		},
		data: () => ({
		}),
	}
</script>

<style lang="scss" scoped></style>
