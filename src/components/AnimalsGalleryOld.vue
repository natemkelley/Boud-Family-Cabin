<template>
    <div >
        <div class="col s12 m8 offset-m2">
              <nav>
                <div class="nav-wrapper light-green darken-3">
                  <form v-on:submit.prevent="filterResults(true)">
                    <div class="input-field">
                      <input id="search" type="search" v-model="searchQuery" v-on:keyup="filterResults()">
                      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                      <!--<i class="material-icons">close</i>-->
                    </div>
                  </form>
                </div>
              </nav>

            <ul class="collapsible popout">
                <li v-for="tax of taxonomies">
                  <div class="collapsible-header">{{tax.name}}<span class="badge">{{tax.count}}</span></div>
                    <div class="collapsible-body">
                         <div class="card horizontal"  v-for="animal of displayAnimals" v-if="tax.name === animal.TaxonomicGroup" v-on:click="clickAnimal(animal)">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="object-fit_cover" :src="animal.localImage">
                            </div>
                            <div class="card-content">
                              <span class="card-title grey-text text-darken-4">{{animal.CommonName}}</span>
                              <p></p>
                            </div>
                          </div>  
                    </div>
                </li>
              </ul>
        </div>
        <animals-modal v-bind:clickedAnimal="clickedAnimal" v-bind:tryToOpen="tryToOpen"></animals-modal>
    </div>
</template>

<script>
    import Fuse from 'fuse.js'
    import AnimalsModal from '../components/AnimalsModal.vue'

    export default {
        name: 'AnimalsGallery',
        data: function() {
            return {
                taxonomies: '',
                displayAnimals: false,
                publicPath: process.env.BASE_URL,
                searchQuery: '',
                clickedAnimal: {},
                tryToOpen: 0
            }
        },
        props: {
            allAnimals: Array
        },
        updated() {
            M.Collapsible.init(document.querySelectorAll('.collapsible'))
        },
        created() {
            this.correctImages()
        },
        mounted() {
            this.createTaxArray()
        },
        methods: {
            createTaxArray: function(animals) {
                if (!animals) {
                    animals = this.allAnimals
                }
                let that = this;
                var taxArray = []
                var returnArray = []
                animals.forEach(function(obj) {
                    if (taxArray.indexOf(obj.TaxonomicGroup) === -1) {
                        taxArray.push(obj.TaxonomicGroup);
                    }
                })
                taxArray.forEach(function(tax) {
                    let counter = 0;
                    animals.forEach(function(animal) {
                        if (animal.TaxonomicGroup == tax) {
                            counter++
                        }
                    })
                    returnArray.push({
                        name: tax,
                        count: counter
                    })
                })
                this.taxonomies = returnArray
                console.log('created tax array')
            },
            correctImages() {
                let array = [];
                this.allAnimals.forEach(obj => {
                    if (!obj.localImage.includes('http')) {
                        obj.localImage = this.publicPath + obj.localImage
                    }
                    array.push(obj)
                })
                this.displayAnimals = array
                console.log('corrected images')
            },
            filterResults(override) {
                let searchQuery = this.searchQuery

                var options = {
                    shouldSort: true,
                    minMatchCharLength: 3,
                    threshold: 0.2,
                    keys: [{
                        name: "CommonName",
                        weight: 0.6
                    }, {
                        name: "summary",
                        weight: 0.2
                    }, {
                        name: "TaxonomicGroup",
                        weight: 0.2
                    }]
                };

                var fuse = new Fuse(this.allAnimals, options)

                var results = fuse.search(searchQuery)

                this.displayAnimals = results
                this.createTaxArray(results)
            },
            clickAnimal(data) {
                this.clickedAnimal = data
                this.incTry();
            },
            incTry() {
                this.tryToOpen = this.tryToOpen + 1;
            }
        },
        components: {
            AnimalsModal
        }
    }

</script>

<style scoped>
    img {
        background: #afadad;
        transition: 0.25s;
    }

    nav {
        margin: 15px 0px
    }



    input {
        color: white
    }

    input:focus {
        color: black!important
    }

    .fill {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden
    }

    .fill img {
        flex-shrink: 0;
        min-width: 100%;
        min-height: 100%
    }

    .object-fit_cover {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .card.horizontal {
        max-height: 155px;
    }

    .card.horizontal .card-image {
        max-width: 65%;
        min-width: 47%;
    }

    .card.horizontal .card-image img {
        width: fit-content;
    }

</style>
