<template>
  <div class="hello container">
    <div class="row">          
        <div v-if="finishedLoading">
            <animals-gallery v-bind:allAnimals="allAnimals"></animals-gallery>
        </div>
        <div v-else class="center bigger">
            <circle-loader></circle-loader>
        </div>
    </div>
</div>
</template>

<script>
    import firebase from 'firebase';
    import wiki from 'wikijs';
    import CircleLoader from '../components/CircleLoader.vue'
    import AnimalsGallery from '../components/AnimalsGallery.vue'

    export default {
        name: 'Animals',
        data() {
            return {
                allAnimals: false,
                taxonomies: '',
                animals: false,
                finishedLoading: false
            }
        },
        mounted() {
            this.getAnimals()
        },
        updated() {
            let elems = document.querySelectorAll('.collapsible')
            M.Collapsible.init(elems)
        },
        methods: {
            getAnimals: function() {
                firebase.database().ref('/animals').once('value').then(snapshot => {
                    console.log(snapshot.val())
                    this.allAnimals = snapshot.val();
                    this.finishedLoading = true;
                })
            }
        },
        components: {
            CircleLoader,
            AnimalsGallery
        },
    }

</script>

<style scoped>
    .hello {
        min-height: 81vh;
        margin-top: 35px
    }

    .bigger {
        margin-top: 15%;
    }


    /*https://listjs.com/*/

</style>
