<template>
    <div class="text-right">
        <b-button @click="downloadSolution" class="mr-3" v-if="hasSolution" variant="success">Baixar Solução</b-button>
        <b-button @click="sendSolution" variant="info">Enviar Solução</b-button>
    </div>
</template>

<script>
    import api from "../util/api";
    import localApi from "../util/localApi";
    import {Solution} from "../../../shared/entities/Solution";

    export default {
        name: "SolutionSyncManager",
        data: () => ({
            hasSolution: false
        }),
        props: {
            world: {
                type: Number,
                required: true
            },
            level: {
                type: Number,
                required: true
            }
        },
        mounted() {
            this.checkIfHasSolution();
        },
        methods: {
            async checkIfHasSolution() {
                let {data} = await api.get(`/solution/${this.world}-${this.level}/exists`);
                this.hasSolution = data.exists;
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
                    completion: 0,
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