<template>
    <b-row class="achievement">
        <b-col class="achievCol" cols="1">
            <img :src="achievement.image" alt="">
        </b-col>
        <b-col>
            <b-row>
                <h4>{{achievement.name}}</h4>
            </b-row>
            <b-row>
                <p>
                    {{achievement.description}}
                </p>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
    import Achievement from '../../../shared/entities/Achievement'

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