<template>
    <div class="gallery">
        <div class="grid">
          <div class="grid-sizer"></div>
          <div v-for="image of images">
              <div class="grid-item">
                <img class="materialboxed" :src="image.photoURL" data-caption="This is a caption" />
              </div>
          </div>
        </div>
    </div>

</template>

<script>
    import Masonry from 'masonry-layout';
    import imagesLoaded from 'imagesloaded';
    import firebase from 'firebase';

    export default {
        name: 'Gallery',
        data() {
            return {
                images: [],
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
        updated(){
            console.log('Gallery Materialized');
            this.createGrid();
            this.materializePhotos();
        },
        methods: {
            materializePhotos: function() {                
                let elems = document.querySelectorAll('.materialboxed');
                let instances = M.Materialbox.init(elems);
            },
            createGrid: function(){
                var grid = document.querySelector('.grid');
                var msnry = new Masonry( grid, {
                  itemSelector: '.grid-item',
                  columnWidth: '.grid-sizer',
                  percentPosition: true,
                  transitionDuration: '0.3s',
                  gutter: 5
                });
                imagesLoaded( grid ).on( 'progress', function() {
                    msnry.layout();
                    console.log('updated grid')
                });
            },
            addToImageArray(jsonObj){
                console.log(jsonObj);
                this.images = [];
                for(var i in jsonObj) {
                    this.images.push(jsonObj[i]);
                }
                console.log(this.images)
            }
        }
    }

</script>

<style scoped>
    .gallery {
        min-height: 90vh
    }

    /* ---- grid ---- */

    /* clear fix */
    .grid:after {
      content: '';
      display: block;
      clear: both;
    }

    /* ---- .grid-item ---- */

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
    
    img{
        background: gray;
    }
    
    @media (max-width : 494px) {
        .grid-sizer,
        .grid-item {
          width: 48%;
        }
    }
    
    /*https://github.com/MatteoGabriele/vue-progressive-image*/
</style>
