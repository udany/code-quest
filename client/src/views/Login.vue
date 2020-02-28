<template>
	<bContainer fluid>
		<b-row>
			<b-col>
				<h3 class="mt-4 mb-2">
					HOME

				</h3>
			</b-col>
		</b-row>
		<b-row>
			<b-col cols="6">
				<h3>
					LOGIN
				</h3>
				<input type="email" v-model="loginEmail" placeholder="Email"><br>
				<input type="password" v-model="loginPassword" placeholder="Senha"><br>
				<button @click="login">Entrar</button>
			</b-col>
			<b-col cols="6">
				<h3>
					REGISTER
				</h3>
				<input type="text" v-model="registerName" placeholder="Nome"><br>
				<input type="email" v-model="registerEmail" placeholder="Email"><br>
				<input type="password" v-model="registerPassword" placeholder="Senha"><br>
				<button @click="register">Registrar</button>

			</b-col>
		</b-row>
	</bContainer>
</template>

<script>
	import api from '../util/api';
	import session from '../util/session';

	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	export default {
		name: 'Login',
		components: {},
		data: () => ({
			loginEmail: 'joao.sousa@uniriotec.br',
			loginPassword: 'senhateste',
			registerEmail: '',
			registerName: '',
			registerPassword: ''
		}),
		methods: {
			async login() {
				//Checar se todos os campos foram preenchidos
				if(!this.loginEmail || !this.loginPassword){
					alert('Preencha todos os campos do formulátio de login.');
					return;
				}

				try {
					let { data } = await api.post('/user/login', {
						loginPassword: this.loginPassword,
						loginEmail: this.loginEmail
					});

					if (data.status) {
						session.load();

						let path = this.$route.query.returnUrl || '/';
						this.$router.push(path);
					}
				} catch (e) {
					alert('Erro ao realizar o login.');
				}

			},
			async register() {
				//Checar se todos os campos foram preenchidos
				if(!this.registerName || !this.registerEmail || !this.registerPassword){
					alert('Preencha todos os campos do formulátio de cadastro.');
					return;
				}

				//Checar se a estrutura do email é válida
				if(!emailRegex.test(this.registerEmail)) {
					alert('Insira um email válido.');
					return;
				}

				try {
					await api.post('/user/register', {
						passwordRaw: this.registerPassword,
						name: this.registerName,
						email: this.registerEmail
					});

					session.load();
				} catch (e) {
					if (e.response.status === 409){
						alert('Email já cadastrado.');
					}else{
						alert('Oops! Something went wrong ):');
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>