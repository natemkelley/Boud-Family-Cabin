<template>
    <div v-if="!loadError">
        <img class="responsive-img" :src="image" @error="imageLoadError()" @load="loaded" v-show="loadedImage">
        <div class="center" v-show="!loadedImage">
            <circle-loader></circle-loader>
        </div>
    </div>
</template>

<script>
    import CircleLoader from './CircleLoader.vue'
    
    export default {
        name: 'AnimalRawImage',
        props: {
            image: String,
        },
        methods: {
            imageLoadError: function() {
                console.log("load error")
                this.loadError = true
            },
            loaded() {
                console.log('loaded')
                this.loadedImage = true
            }
        },
        data() {
            return {
                loadedImage: false,
                loadError: false
            }
        },
        watch: {
            image: function(newObj) {
                this.loadedImage = false
            }
        },
        mounted(){
            console.log('mounted')
        },
        components: {
            CircleLoader
        }
    }

</script>

<style scoped>
    img {
        background: #c9c9c9;
        transition: 0.25s;
    }
    
    .center{
        padding: 25px 0px
    }
    img {
        min-width: 99%!important;
    }

</style>
