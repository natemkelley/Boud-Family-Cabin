<template>
  <div class="hello container">
      <div class="row" >
        <div class="col s12 m12 fill header-image">
            <img class="object-fit_fill" src="../assets/bcc2.jpg">
        </div>
      </div>
      <div class="row" > 
        <div class="col s12 m12 l5 weather">
          <div class="card">
            <div class="card-content weather">
              <span class="card-title">Weather</span>
                <div id="weather"></div>
            </div>
          </div>
        </div>  
        <div class="col s12 m12 l7">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Quick Links</span>
                <ul class="collection">
                    <li class="collection-item active"><router-link @click.native="clickRoute" to="/home"><i class="material-icons">home</i>Home</router-link></li>
                    <li class="collection-item"><router-link @click.native="clickRoute" to="/webcams"><i class="material-icons">linked_camera</i>Webcams</router-link></li>
                    <li class="collection-item"><router-link @click.native="clickRoute" to="/photos"><i class="material-icons">add_a_photo</i>Photos</router-link></li>
                    <li class="collection-item"><router-link @click.native="clickRoute" to="/weather"><i class="material-icons">cloud_queue</i>Weather</router-link></li>
                </ul>            
                </div>
          </div>
        </div>  
    </div>
  </div>
</template>

<script>
    import postscribe from 'postscribe'

    export default {
        name: 'Home',
        mounted() {
            let weather = "<script type='text/javascript' src='https://darksky.net/widget/default/42.360082,-71.05888/us12/en.js?width=100%&height=355&title=Boud Family Cabin&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes'><\/script>";
            if (!document.getElementById("weather").innerHTML) {
                postscribe('#weather', weather);
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
        min-height: 345px!important;
    }

    .row {
        margin-top: 25px;
    }

    .fill {
        display: flex;
        justify-content: center;
        align-items: top;
        overflow: hidden;
    }

    .fill img {
        flex-shrink: 0;
        min-width: 100%;
        min-height: 100%;
        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }

    .object-fit_fill {
        object-fit: cover;
        object-position: 0px 10%;
    }

    .header-image {
        height: 150px;
    }

    @media only screen and (max-width: 470px) {
        iframe {
            transform: scale(1.25);
            margin-top: 15px;
        }
    }

</style>

<style>
    @media only screen and (max-width: 789px) {
        #weather iframe {
            transform: scale(1.25);
            margin-top: 15px;
        }
        #weather {
            min-height: 410px;
        }
    }
</style>
