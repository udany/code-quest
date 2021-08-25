<template>
	<div>
		<h2>
			{{info.title}}
		</h2>

		<p>
			O JavaScript possui tanto operadores binários quanto unários, além de um operador ternário,
			o condicional. Um operador binário exige dois operandos, um antes do operador e outro depois.
			 Já o operador unário exige um único operando, seja antes ou depois do operador.
		</p>

		<cq-code>
			x+y; //Operador binário
			x++; //Operador unário
		</cq-code>

		<h3>
			Operadores de atribuição
		</h3>

		<p>
			Um operador de atribuição atribui um valor ao operando à sua esquerda baseado no valor do operando à
			direita. O operador de atribuição básico é o <code>=</code>, que atribui o valor do operando à direita ao
			operando à esquerda.
		</p>

		<cq-code>
			x = 10; //x recebe 10
			x = y;  //x recebe o valor de y
		</cq-code>

		<p>
			Existem outros operadores de atribuição que servem como encurtamentos do operador padrão, os mais utilizados
			sendo o de adição e de subtração:
		</p>

		<cq-code>
			x += y //Significa x = x + y
			x -= y //Significa x = x - y
		</cq-code>

		<h3>
			Operadores de comparação
		</h3>

		<p>
			Um operador de comparação compara seus operandos e retorna um valor lógico baseado em se a
			comparação é verdadeira.
		</p>

		<p>
			Na maioria dos casos, se dois operandos não são do mesmo tipo, o JavaScript
			tenta convertê-los para um tipo apropriado. As únicas exceções a esta regra são os operadores
			<code>===</code> e o <code>!==</code>, que realizam comparações de igualdade e desigualdade "estritas".
			Estes operadores não tentam converter os operandos em tipos compatíveis antes de verificar a igualdade.
		</p>

		<cq-code>
			let x = 10;	//X é do tipo inteiro
			let y = '10';	//Y é do tipo string
			x == y;		//Realiza conversão de tipos, retorna true
			x === y;	//Não realiza conversão de tipos, retorna false
		</cq-code>

		<p>
			Além dos operadores <code>==</code> e <code>===</code>, o Javascript também possui outros operadores de
			 comparação:
		</p>

		<cq-code>
			x &gt; y 	//Maior que
			x &lt; y 	//Menor que
			x &gt;= y 	//Maior ou igual a
			x &lt;= y 	//Menor ou igual a
			x != y 	//Diferente de
			x !== y //Estritamente diferente de
		</cq-code>

		<h3>
			Operadores aritméticos
		</h3>

		<p>
			Operadores aritméticos tomam valores numéricos (sejam literais ou variáveis) como seus operandos e
			retornam um único valor númerico. Os operadores aritméticos padrão são os de soma <code>(+)</code>,
			subtração <code>(-)</code>, multiplicação <code>(*)</code> e divisão <code>(/)</code>.
		</p>

		<p>
			Em complemento às operações aritméticas padrões, o JavaScript disponibiliza outros operadores aritméticos,
			alguns estão listados a seguir:
		</p>

		<cq-code>
			x % y 	//Retorna o resto da divisão de x por y
			x++ 	//Incrementa o valor de x em 1
			x-- 	//Decrementa o valor de x em 1
		</cq-code>

		<h3>
			Operadores lógicos
		</h3>

		<p>
			Operadores lógicos são utilizados tipicamente com valores booleanos (lógicos); neste caso, retornam um
			valor booleano. Os operadores lógicos são o AND lógico <code>&&</code>, o OU lógico <code>||</code> e
			o operador de negação <code>!</code>.
		</p>

		<p>
			O AND lógico retorna true se o valor dos dois operandos for true, retornando false caso contrário. O OU
			lógico retorna true se o valor de pelo menos um dos operandos for true, retornando false caso contrário.
			Já operador de negação é um operador unário, que retorna o valor booleano invertido do operando.
		</p>

		<cq-code>
			let x = true;
			let y = false;
			x && y 		//Retorna false
			x || y 		//Retorna true
			!x		//Retorna false
			x && !y		//Retorna true
		</cq-code>

	</div>
</template>

<script>
	import CqCode from '../../../components/CqCode.vue';
	const info = {
		world: 0,
		level: 2,
		title: 'Operadores'
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
