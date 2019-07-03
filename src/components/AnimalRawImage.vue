<template>
    <div>
        <h1>swag</h1>
    </div>
</template>

<script>
    export default {
        name: 'AnimalRawImage',
        props: {
            image: String,
        },
        mounted() {
            
        },
        methods:{
            imageLoadError: function(){
                
            }
        }
    }

</script>

<style scoped>
    img {
        background: #c9c9c9;
        transition: 0.25s;
    }

</style>
