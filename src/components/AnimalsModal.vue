<template>
    <div>
          <div id="modal1" class="modal bottom-sheet col m7 offset-m1 l5 offset-l2">
            <div class="modal-content" v-if="shownAnimal">
                <ul class="collection with-header main">
                    <li class="collection-header">                
                        <h4>{{shownAnimal.CommonName}}</h4>
                    </li>
                    <li class="collection-item">                
                        <img class="responsive-img" :src="shownAnimal.mainImage" @load="loaded" v-show="loadedImage">
                        <img class="responsive-img" src="https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" v-show="!loadedImage">
                    </li>
                </ul>
                <ul class="collection with-header" v-if="shownAnimal.statusImg">
                    <li class="collection-header"><h6>Conservation Status</h6></li>
                    <li class="collection-item">                
                        <img class="responsive-img status" :src="shownAnimal.statusImg">
                    </li>
                </ul>
                <ul class="collection with-header" v-if="shownAnimal.mapImg">
                    <li class="collection-header"><h6>Range Map</h6></li>
                    <li class="collection-item">                
                        <img class="responsive-img map" :src="shownAnimal.mapImg">
                    </li>
                </ul>
                <ul class="collection with-header">
                    <li class="collection-header"><h5>Classifications</h5></li>
                    <li class="collection-item">                
                        <p class="desc">{{shownAnimal.summary}}</p>
                    </li>
                    <li class="collection-item" v-if="shownAnimal.mapImg">Scientific Name: <span>{{shownAnimal.ScientificName}}</span></li>
                    <li class="collection-item" v-if="shownAnimal.Family">Family: <span>{{shownAnimal.Family}}</span></li>
                    <li class="collection-item" v-if="shownAnimal.genus">Genus: <span>{{shownAnimal.genus}}</span></li>
                    <li class="collection-item" v-if="shownAnimal.species">Species: <span>{{shownAnimal.species}}</span></li>
                    <li class="collection-item">Taxonomic Group: <span>{{shownAnimal.TaxonomicGroup}}</span></li>
                    <li class="collection-item">Additional Information: <span><a v-bind:href="shownAnimal.url">Wikipedia</a></span></li>
                </ul>
                <ul class="collection with-header" v-if="shownAnimal.rawImages">
                    <li class="collection-header"><h6>Images</h6></li>
                    <li class="collection-item image" v-for="(image,index) of shownAnimal.rawImages">                
                        <img class="responsive-img" :src="image" @error="imageLoadError(index)">
                    </li>
                </ul>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-light btn-small light-green darken-3" style="    margin-right: 20px;margin-top: -20px;width: 145px;">Exit Page</a>
            </div>
          </div>
    </div>
</template>

<script>
    import AnimalRawImage from './AnimalRawImage.vue'
    
    export default {
        name: 'AnimalsModal',
        data() {
            return {
                instance: '',
                shownAnimal: {},
                mainImageCopy: null,
                oldCommonName: null,
                loadedImage: false,
            }
        },
        props: {
            clickedAnimal: Object,
            tryToOpen: Number
        },
        mounted() {
            let that = this
            let elems = document.querySelectorAll('.modal');
            let instances = M.Modal.init(elems, {
                onCloseEnd: function(modal, trigger) {
                    that.mainImageCopy = that.shownAnimal.mainImage
                    that.oldCommonName = that.shownAnimal.CommonName
                    console.log('after merge')
                    console.log(that.mainImageCopy)
                    console.log(that.shownAnimal.mainImage)
                }
            });
            var instance = M.Modal.getInstance(elems[0]);
            this.instance = instance
        },
        methods: {
            imageLoadError: function(index) {
                this.shownAnimal.rawImages.splice(index, 1)
            },
            openModal: function() {
                this.instance.open();
            },
            loaded() {
                console.log('loaded')
                this.loadedImage = true
            }
        },
        watch: {
            clickedAnimal: function(newObj) {
                if (newObj.hasOwnProperty("CommonName")) {
                    this.openModal();
                    this.shownAnimal = newObj
                }

            },
            tryToOpen: function(number) {
                if (this.shownAnimal.CommonName != this.oldCommonName) {
                    this.loadedImage = false;
                }
                this.openModal();
            }
        },
        components: {
            AnimalRawImage
        }
    }

</script>

<style scoped>
    img {
        background: #c9c9c9;
        transition: 0.25s;
    }

    .desc {
        font-size: 16px
    }

    .bottom-sheet {
        max-height: 90%;
        height: 88%;
    }

    .collection-item {
        color: #5f5f5f
    }

    .collection-item span {
        color: black;
        float: right;
        text-transform: capitalize
    }

    .status {
        width: 90%;
        margin-left: 5%;
        background: transparent!important
    }

    .map {
        background: transparent!important
    }

    h6 {
        font-size: 18px
    }

    .main .collection-item {
        padding: 0px
    }

    @media only screen and (min-width: 600px) {
        .bottom-sheet {
            max-height: 100%;
            height: 98%;
        }
    }

</style>
