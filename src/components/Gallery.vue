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
                <img class="materialboxed" :src="image.photoURL" :data-caption="image.timestamp | moment('dddd, MMMM Do YYYY') + ' - '+ image.user" v-on:click="toggleImages(image)" />
                <a class="remove-btn btn-floating btn-large waves-effect waves-light red" @click="removeImage(image)" v-if="checked"><i class="material-icons">clear</i></a>
              </div>
          </div>
        </div>
        
            <div class="navs sideNavLeft" v-on:click="swapImage('left')">
                <a>
                    <span class="circle-nav">
                        <i class="material-icons">chevron_left</i>
                    </span>
                </a>
            </div>
            <div class="navs sideNavRight " v-on:click="swapImage('right')">
                <a >
                    <span class="circle-nav">
                        <i class="material-icons">chevron_right</i>
                    </span>
                </a>
            </div>
    </div>
</template>

<script>
    import Masonry from 'masonry-layout';
    import imagesLoaded from 'imagesloaded';
    import firebase from 'firebase/app'
    import 'firebase/database'
    import moment from 'moment';
    import Vue from 'vue';

    Vue.use(require('vue-moment'));

    export default {
        name: 'Gallery',
        data() {
            return {
                images: [],
                checked: false,
                currentImage: null
            }
        },
        mounted() {
            var ref = firebase.database().ref('/photos');
            ref.on('value', snapshot => {
                this.addToImageArray(snapshot.val())
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
                let that = this;
                let elems = document.querySelectorAll('.materialboxed');
                let instances = M.Materialbox.init(elems, {
                    onOpenEnd: function() {
                        that.showToggle = true;
                        let toggles = document.getElementsByClassName('navs');
                        for (var i = 0; i < toggles.length; i++) {
                            toggles[i].style.opacity = 0.85;
                        }
                    },
                    onCloseStart: function() {
                        that.showToggle = false
                        let toggles = document.getElementsByClassName('navs');
                        for (var i = 0; i < toggles.length; i++) {
                            toggles[i].style.opacity = 0;
                        }
                    }
                });
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
                    M.toast({
                        html: 'Image Removed!'
                    })
                }).catch(function(error) {
                    alert('wrong')
                });

            },
            toggleImages(image) {
                console.log(image)
                this.currentImage = image;
            },
            swapImage(direction) {
                console.log(direction)
                if(direction == 'left'){
                    console.log(this.currentImage)
                } else{
                    console.log(this.images)
                }
            }
        }
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

    .switch {
        margin-top: -45px;
        opacity: 0.15;
        transition: 0.5s;
    }

    .switch:hover {
        opacity: 0.95!important;
    }

    .checkmate {
        opacity: 0.95!important;
    }

    .switch label input[type=checkbox]:checked+.lever {
        background-color: #bababa;
    }

    .switch label input[type=checkbox]:checked+.lever:after {
        background-color: #7b7e7e;
    }

    .navs {
        position: fixed;
        top: 40%;
        transition: all 0.0s;
        opacity: 1;
        z-index: 999999;
        opacity: 0.01;
    }

    .sideNavLeft {
        left: 0;
        margin-left: -40px;
    }

    .sideNavLeft .circle-nav .material-icons {
        margin-left: 25px;
    }

    .sideNavRight {
        right: 0;
        margin-right: -40px;

    }

    .circle-nav .material-icons {
        z-index: 999;
        top: 0;
        font-size: 60px;
        color: white;
        font-weight: 100;
        margin-top: 15px;
    }

    .circle-nav {
        height: 95px;
        width: 85px;
        background-color: rgba(181, 181, 181, 0.5);
        border-radius: 50%;
        display: inline-block;
        transition: all 0.5s;
        cursor: pointer;
    }

    @media (max-width: 494px) {
        .grid-sizer,
        .grid-item {
            width: 48%;
        }

        .switch {
            transform: scale(0.75);
        }
    }

    /*https://github.com/MatteoGabriele/vue-progressive-image*/

</style>
