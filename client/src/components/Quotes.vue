<template>
    <blockquote class="blockquote text-center" style="padding: 1em 1em">
        <p class="mb-0">
            <slot>{{quoteText}}</slot>
        </p>

        <footer class="blockquote-footer">
            {{author}} em
            <cite>{{book}}</cite>
        </footer>
    </blockquote>
</template>

<script>
    export default {
        name: "Quotes",
        props:{
            quoteText: String,
            author: String,
            book: String
        }
    }
</script>

<style scoped>

</style>