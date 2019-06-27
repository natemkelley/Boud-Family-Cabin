<template>
    <div>
        <div class="progress">
            <div class="determinate" style="width: 70%"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'DeterminateLoader',
        data: function() {
            return {
                progress: 0
            }},
        mounted(){
            console.log('loading')
        }
    }

</script>

<style scoped>


</style>
