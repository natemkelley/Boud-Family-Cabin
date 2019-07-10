<template>
  <div class="container">
      <div class="row swag"> 
          <h1 class="center-align">Webcams</h1>
        <ul class="collapsible popout" v-for="video in videoIDs">
            <li>
              <div class="collapsible-header"><i class="material-icons">linked_camera</i>{{video.name}}</div>
              <div class="collapsible-body">
                    <div class="video-container">
                        <youtube :video-id="video.id" :player-vars="playerVars" @playing="playing"></youtube>
                    </div>
                </div>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import VueYoutube from 'vue-youtube'
    Vue.use(VueYoutube)

    export default {
        name: 'Webcams',
        data() {
            return {
                videoIDs: [{
                    id: '5b2dUgK6VV4',
                    name: "Eagle's Nest"
                }, {
                    id: 'LXWVYoBluT4',
                    name: 'Cabin Back Door'
                }, {
                    id: 'DY5RYp4sxYc',
                    name: 'Cabin Front Door'
                }, {
                    id: 'KGuCGd726RA',
                    name: 'Cabin Living Room'
                }],
                playerVars: {
                    autoplay: 1
                }
            }
        },
        methods: {
            playing() {
                console.log('started video')
            }
        },
        mounted() {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems);
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .swag {
        padding-top: 25px;
        min-height: 80vh;
        height: 100%;
    }

    .collapsible-body {
        display: none;
        border-bottom: 1px solid #ddd;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 1rem;
    }

    /*          <div v-for="video in videoIDs">
            <h4>{{video.name}}</h4>
            <div class="video-container">
              <youtube :video-id="video.id" :player-vars="playerVars" @playing="playing"></youtube>
            </div>
          </div>*/

</style>
