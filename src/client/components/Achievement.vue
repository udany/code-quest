<template>
    <div class="row achievement">
        <div class="col col-1 achievCol">
            <img :src="achievement.image" alt="">
        </div>
        <div class="col">
            <div class="row">
                <h4>{{achievement.name}}</h4>
            </div>
            <div class="row">
                <p>
                    {{achievement.description}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Achievement from '../../shared/entities/Achievement.js'

    export default {
        name: "Achievement",
        props: {
            achievement: {
                type: Achievement
            }
        }
    }
</script>

<style scoped>
    img{
        width: 70px;
        min-width: 20px;
        background-color: #fff;
        border: 2px solid #000;
        border-radius: 4px;
        position: relative;
    }
    .achievement{
        background-color: rgba(13, 30, 39, 1);
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 4px;
    }
    .achievCol{
        display: flex;
        align-items: center;
    }
</style>