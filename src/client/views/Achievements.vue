<template>
    <bContainer fluid>
        <b-row>
            <b-col>
                <h3 class="mt-4 mb-2">
                    Achievements

                </h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Achievement
                    v-for="achievement in achievements"
                    :key="achievement.name"
                    :achievement="achievement"
                >
                </Achievement>
            </b-col>
        </b-row>
    </bContainer>
</template>

<script>
    import Achievement from '../components/Achievement';
    import achievements from '../../../shared/entities/achievements';

    export default {
        name: "Achievements",
        components: {Achievement},
        data: () => ({
            achievements
        })
    }
</script>

<style scoped>

</style>