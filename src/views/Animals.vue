<template>
  <div class="hello container">
    <h1>Animals</h1>

    <div class="row">          
        <div v-if="animals">
              <nav>
                <div class="nav-wrapper light-green darken-3">
                  <form>
                    <div class="input-field">
                      <input id="search" type="search" v-model="searchQuery">
                      <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                      <i class="material-icons">close</i>
                    </div>
                  </form>
                </div>
              </nav>
            
              <ul class="collapsible popout">
                <li v-for="tax of taxonomies">
                  <div class="collapsible-header">{{tax}}</div>
                  <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
              </ul>
            <!--<div class="col s6 m7" v-for="animal of animals" >
                  <img class="materialboxed" :src="animal.localImage"/>
              </div>-->
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

    export default {
        name: 'Animals',
        data() {
            return {
                animals: false,
                publicPath: process.env.BASE_URL,
                taxonomies: ''
            }
        },
        created() {},
        mounted() {
            this.getAnimals()
        },
        updated() {
            let elems = document.querySelectorAll('.collapsible');
            let instances = M.Collapsible.init(elems);
        },
        methods: {
            getAnimals: function() {
                firebase.database().ref('/animals').once('value').then(snapshot => {
                    console.log(snapshot.val())
                    this.createTaxArray(snapshot.val())
                        .then(() => {
                            let animalsArray = snapshot.val()
                            let array = [];
                            let that = this
                            animalsArray.forEach(function(obj) {
                                if (!obj.localImage.includes('http')) {
                                    obj.localImage = that.publicPath + obj.localImage
                                }
                                array.push(obj)
                            })
                            this.animals = array
                        })
                })
            },
            createTaxArray: function(animals) {
                let that = this;
                return new Promise(function(resolve, reject) {
                    let array = []
                    animals.forEach(function(obj) {
                        if (array.indexOf(obj.TaxonomicGroup) === -1) {
                            array.push(obj.TaxonomicGroup);
                        }
                    })
                    that.taxonomies = array
                    resolve(true)
                })
            }
        },
        components: {
            CircleLoader
        }
    }

</script>

<style scoped>
    .hello {
        min-height: 85vh;
        margin-top: 35px
    }

    .bigger {
        transform: scale(1.75);
        margin-top: 15%;
    }

    img {
        background: #afadad;
        transition: 0.25s;
    }

    nav {
        margin: 15px 0px
    }


    
    input {
        color:white
    }

    input:focus {
        color: black!important
    }

    /*https://listjs.com/*/

</style>
