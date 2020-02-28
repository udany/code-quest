<template>
    <div class="text-right" v-if="session.user">
        <b-button @click="downloadSolution" class="mr-3" v-if="hasSolution" variant="success">
			Baixar Solução {{existingSolution.completion * 100}}%
		</b-button>
        <b-button @click="sendSolution" variant="info">
			Enviar Solução {{completion * 100}}%
		</b-button>
    </div>
</template>

<script>
    import api from "../util/api";
    import localApi from "../util/localApi";
    import {Solution} from "../../../shared/entities/Solution";
    import session from '../util/session';

    export default {
        name: "SolutionSyncManager",
        data: () => ({
            hasSolution: false,
			session: session
        }),
        props: {
            world: {
                type: Number,
                required: true
            },
            level: {
                type: Number,
                required: true
            },
			tests: {
            	type: Array,
				default: () => []
			}
        },
        mounted() {
            this.checkIfHasSolution();
        },
		computed: {
        	completion() {
		        return this.tests.filter(t => t.test()).length / this.tests.length;
			}
		},
        methods: {
            async checkIfHasSolution() {
                let {data} = await api.get(`/solution/${this.world}-${this.level}/exists`);
	            this.hasSolution = data.exists;
	            this.existingSolution = data.solution;
            },
            async downloadSolution() {
                if(!confirm('Tem certeza que deseja baixar a solução existente?')) return;

                let {data} = await api.get(`/solution/${this.world}-${this.level}`);
                await localApi.post(`/Solution/world-${data.world}/1-${data.level}/index`, {content: data.code});

                alert('Solução baixada com sucesso!');
            },
            async sendSolution() {
                if(this.hasSolution && !confirm('Tem certeza que deseja sobrescrever a solução existente?')) return;

                const {data} = await localApi.get(`/Solution/world-${this.world}/1-${this.level}/index`);
                let solution = new Solution({
                    code: data,
                    completion: this.completion,
                    world: this.world,
                    level: this.level
                });
                await api.post(`/solution/`, solution.Serialize());

                alert('Solução enviada com sucesso!');
            }
        },
    }
</script>

<style scoped>

</style>