<template>
  <div class="hello container">
      <div class="row" >
          
           <div class="slider">
                <ul class="slides">
                  <li v-for="(image, propertyName, index) in slider">
                    <img :src="image.photoURL"> 
                    <div class=" center-align" v-if="index==0">
                      <h4 class="light grey-text text-lighten-3">Welcome to the Boud Family Cabin</h4>
                    </div>
                  </li>
                </ul>
              </div>

      </div>
      <div class="row" > 
        <div class="col s12 m12 l5 weather">
          <div class="card">
              <div class="card-content weather">
                <router-link  to="/weather">
                  <span class="card-title">Weather</span>
                    <div id="weather" v-show="loaded"></div>
                    <div class="center" v-if="!loaded">
                        <div class="bigger">
                        <circle-loader ></circle-loader>
                        </div>
                    </div>
                </router-link>
               </div>
          </div>
        </div>  
        <div class="col s12 m12 l7">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Quick Links</span>
                <ul class="collection">
                    <li class="collection-item active"><router-link  to="/home"><i class="material-icons">home</i>Home</router-link></li>
                    <li class="collection-item"><router-link  to="/webcams"><i class="material-icons">linked_camera</i>Webcams</router-link></li>
                    <li class="collection-item"><router-link  to="/photos"><i class="material-icons">add_a_photo</i>Photos</router-link></li>
                    <li class="collection-item"><router-link  to="/weather"><i class="material-icons">cloud_queue</i>Weather</router-link></li>
                </ul>            
                </div>
          </div>
        </div>  
    </div>
  </div>
</template>

<script>
    import postscribe from 'postscribe'
    import CircleLoader from '../components/CircleLoader.vue';
    import firebase from 'firebase/app'
    import 'firebase/database'

    export default {
        name: 'Home',
        mounted() {
            this.initing()

            var that = this;
            let weather = "<script type='text/javascript' src='https://darksky.net/widget/default/42.360082,-71.05888/us12/en.js?width=100%&height=355&title=Boud Family Cabin&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes'><\/script>";

            if (!document.getElementById("weather").innerHTML) {
                postscribe('#weather', weather, {
                    done: function() {
                        setTimeout(function() {
                            that.loaded = true
                        }, 550)
                    }
                });
            }

            setTimeout(function() {
                let deferredPrompt;
                window.addEventListener('beforeinstallprompt', (e) => {
                    console.log('before installed prompt')
                    e.preventDefault();
                    // Stash the event so it can be triggered later.
                    deferredPrompt = e;

                    // Update UI notify the user they can add to home screen
                    btnAdd.style.display = 'block';
                });
            }, 3500)
        },
        data() {
            return {
                loaded: false,
                slider: {
                    123: {
                        photoURL: "/img/bcc2.e89ef672.jpg",
                        timestamp: 1560791383835,
                    }
                }
            }
        },
        components: {
            CircleLoader
        },
        created() {
            this.initSlider()
        },
        updated: function() {
            this.initing()
        },
        methods: {
            initSlider: function() {
                var that = this;
                var ref = firebase.database().ref('/photos');
                ref.on('value', snapshot => {
                    var result = [];
                    for (var i in snapshot.val()) {
                        result.push([snapshot.val()[i]]);
                    }

                    for (var i = 0; i < 5; i++) {
                        var rand = result[Math.floor(Math.random() * result.length)];
                        var timestamp = String(rand[0].timestamp);
                        this.slider[timestamp] = rand[0];
                    }
                });

            },
            initing: function() {
                let options = {
                    indicators: false,
                    height: 200,
                    interval: 5000
                }
                var elems = document.querySelectorAll('.slider');
                M.Slider.init(elems, options);
            }
        }
    }

</script>

<style scoped>
    .hello {
        min-height: 75vh;
    }

    a {
        color: #4b4b4b
    }

    a:hover {
        color: #0d47a1
    }

    .collection .collection-item.active {
        background-color: rgba(13, 71, 161, 0.04);
        color: #313131;
    }

    .collection .collection-item:hover {
        background-color: rgba(13, 71, 161, 0.025);
    }

    i {
        margin-top: -5px;
        position: absolute;
        margin-left: -30px;
    }

    .collection-item a {
        margin-left: 30px;
    }

    .weather {
        min-height: 325px!important;
    }

    .row {
        margin-top: 25px;
    }


    .bigger {
        margin-top: 33%;
        transform: scale(1.25);
    }

    h4 {
        text-shadow: 2px 8px 9px #000000;
        color: #fff;
        position: absolute;
        top: 15%;
        left: 15%;
        width: 70%;
        opacity: 0.95;
    }

    @media only screen and (max-width: 789px) {
        #weather {
            transform: scale(1.95);
            -webkit-transform: scale(1.24);
            margin-top: 35px;
            margin-bottom: 40px;
        }

        .weather {
            min-height: 300px;
        }
    }

    @media only screen and (max-width: 470px) {
        /*iframe {
            transform: scale(1.25);
            -webkit-transform: scale(1.24);
            margin-top: 15px;
        }*/
    }

</style>
