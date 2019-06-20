<template>
    <div class="gallery">
          <div class="switch right" v-bind:class="{ checkmate: checked}">
            <label>
              Off
              <input type="checkbox" v-model="checked">
              <span class="lever"></span>
              On
            </label>
          </div>
        
        <div class="grid">
          <div class="grid-sizer"></div>
          <div v-for="image of images">
              <div class="grid-item">
                <img class="materialboxed" :src="image.photoURL" :data-caption="image.timestamp | moment('dddd, MMMM Do YYYY') + ' - '+ image.user" />
                <a class="remove-btn btn-floating btn-large waves-effect waves-light red" @click="removeImage(image)" v-if="checked"><i class="material-icons">clear</i></a>
              </div>
          </div>
        </div>
    </div>

</template>

<script>
    import Masonry from 'masonry-layout';
    import imagesLoaded from 'imagesloaded';
    import firebase from 'firebase';
    import moment from 'moment';
    import Vue from 'vue';
    
    Vue.use(require('vue-moment'));

    export default {
        name: 'Gallery',
        data() {
            return {
                images: [],
                checked: false
            }
        },
        mounted() {
            var ref = firebase.database().ref('/photos');
            var that = this;
            ref.on('value', function(snapshot) {
                that.addToImageArray(snapshot.val())
            });
            this.createGrid();
            this.materializePhotos();
        },
        updated() {
            this.createGrid();
            this.materializePhotos();
        },
        methods: {
            materializePhotos: function() {
                let elems = document.querySelectorAll('.materialboxed');
                let instances = M.Materialbox.init(elems);
            },
            createGrid: function() {
                var grid = document.querySelector('.grid');
                var msnry = new Masonry(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    transitionDuration: '0.3s',
                    gutter: 5
                });
                imagesLoaded(grid).on('progress', function() {
                    msnry.layout();
                });
            },
            addToImageArray(jsonObj) {
                this.images = [];
                for (var i in jsonObj) {
                    this.images.push(jsonObj[i]);
                }
                console.log(this.images)
            },
            removeImage(image) {
                var imageRef = firebase.storage().ref(image.fileName);
                imageRef.delete().then(function() {
                    firebase.database().ref(image.location).remove();
                    M.toast({html: 'Image Removed!'})
                }).catch(function(error) {
                    alert('wrong')
                });

            },
            
        },
        
    }

</script>

<style scoped>
    .gallery {
        min-height: 90vh
    }

    .grid:after {
        content: '';
        display: block;
        clear: both;
    }

    .grid-sizer,
    .grid-item {
        width: 32.333%;
        margin-bottom: 5px;
    }

    .grid-item {
        float: left;
    }

    .grid-item img {
        display: block;
        max-width: 100%;
    }

    img {
        background: gray;
    }

    .remove-btn {
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(0.65);
        opacity: 0.75;
        margin-right: -5px;
        margin-top: -5px;
    }
    
    .switch{
        margin-top: -45px;
        opacity: 0.15;
        transition: 0.5s;
    }
    
    .switch:hover{
        opacity: 0.95!important;
    }
    
    .checkmate{
        opacity: 0.95!important;
    }
    
    .switch label input[type=checkbox]:checked + .lever {
        background-color: #bababa;
    }
    
    .switch label input[type=checkbox]:checked + .lever:after {
        background-color: #7b7e7e;
    }

    @media (max-width: 494px) {
        .grid-sizer,
        .grid-item {
            width: 48%;
        }
        
        .switch{
              transform: scale(0.75);
        }
    }

    /*https://github.com/MatteoGabriele/vue-progressive-image*/

</style>
