<template>
	<div>
		<h2>
			{{info.title}}
		</h2>

		<h3>
			Variáveis
		</h3>

		<p>
			No javascript, para declarar uma variável você usa a palavra chave <cq-code inline>let</cq-code>:
		</p>

<cq-code>let age = 18;
let name = 'Anakin';
let group = 'Jedi'; // TODO: Trocar depois do filme 3</cq-code>

		<p>
			<b>Dica:</b> Usando o <cq-code inline>//</cq-code> você pode criar comentários para explicar seu código,
			em geral o código deve ser auto-explicativo, porém em alguns casos é possível que não seja 100% óbvio
			o que ele faz, nesses casos é uma boa ideia documentar isso para facilitar a vida de quem for ler.
		</p>

		<h3>
			Tipos
		</h3>

		<p>
			Existem alguns tipos que são chamados de <b>primitivos</b>, são os tipos mais básicos em uma linguagem, no
			js eles são:
		</p>

		<ul>
			<li>
				<b>Boolean</b> - Um valor boleano, pode ser <code>true</code> ou <code>false</code>
			</li>
			<li>
				<b>Number</b> - Um número, seja inteiro ou racional
			</li>
			<li>
				<b>String</b> - Uma sequência de caracteres
			</li>
			<li>
				<b>Null</b> - Usado pra representar a ausência de um valor
			</li>
			<li>
				<b>Undefined</b> - Usado pra representar o estado de uma variável que nunca recebeu um valor.
			</li>
		</ul>

		<p>
			Existem outros dois primitivos (<b>BigInt</b> e <b>Symbol</b>) que não serão tratados aqui por serem mais
			avançados e só necessários para algumas aplicações mais avançadas.
		</p>

		<p>
			As variáveis no js não possuem tipos <b>fixos</b>, isso quer dizer que uma mesma variável pode receber
			valores com tipos diferentes ao longo da sua vida:
		</p>

<cq-code>let x;
x = 42; // x está armazenando um inteiro
x = 'kek';  // agora x armazena uma string</cq-code>

		<p>
			Isso <b>não significa</b> que não existam tipos no js, e sim que o tipo de uma variável só pode ser aferido
			para o valor que ela guarda em um dado momento de tempo.
		</p>
	</div>
</template>

<script>
	import CqCode from '../../../components/CqCode';
	const info = {
		world: 0,
		level: 1,
		title: 'Variáveis e tipos'
	};

	export default {
		name: 'Level-0-1',
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
