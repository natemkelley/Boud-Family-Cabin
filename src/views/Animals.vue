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
    import firebase from 'firebase/app'
    import 'firebase/database'
    import CircleLoader from '../components/CircleLoader.vue'
    import AnimalsGallery from '../components/AnimalsGallery.vue'

    export default {
        name: 'Animals',
        data() {
            return {
                allAnimals: [],
                finishedLoading: false
            }
        },
        mounted() {
            M.Toast.dismissAll();
            M.toast({
                html: 'This feature is still in beta.',
                classes: 'orange darken-2',
                displayLength: 2000
            });
        },
        created() {
            this.getAnimals()
        },
        methods: {
            getAnimals: function() {
                if (!localStorage.animal) {
                    firebase.database().ref('/animals').once('value').then(snapshot => {
                        this.allAnimals = snapshot.val();
                        this.finishedLoading = true;
                        localStorage.setItem("animal", JSON.stringify(this.allAnimals));
                    })
                } else {
                    this.allAnimals = JSON.parse(localStorage.animal)
                    setTimeout(()=> {
                        console.log(this.finishedLoading)
                        this.finishedLoading = true;
                        console.log(this.finishedLoading)
                    }, 200);
                }
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
