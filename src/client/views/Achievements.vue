<template>
    <div class="container container-fluid">
        <div class="row">
            <div class="col">
                <h3 class="mt-4 mb-2">
                    Achievements

                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Achievement
                    v-for="achievement in achievements"
                    :key="achievement.name"
                    :achievement="achievement"
                >
                </Achievement>
            </div>
        </div>
	</div>
</template>

<script>
    import Achievement from '../components/Achievement.vue';
    import achievements from '../../shared/entities/achievements';

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
