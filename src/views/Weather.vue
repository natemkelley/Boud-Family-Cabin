<template>
  <div class="hello container">
      <div class="row"> 
        <div class="col m12 offset-m0 s12" id="simple" style="margin-top:37px">
        </div>
        <div class="col m12 offset-m0 s12" id="linear" style="">
        </div>
        <div class="col m12 offset-m0 s12" style="">
            <div id="complex"></div>
        </div>
        <div class="col m12 offset-m0 s12" id="map" style="">
        </div>
          
        <div class="testMap" id="testMap"> 
        </div>  
    </div>
  </div>
</template>

<script>
    import postscribe from 'postscribe'

    export default {
        name: 'Weather',
        mounted() {
            this.createCharts();
        },
        methods: {
            createCharts: function() {
                let devicewidth = document.getElementById("complex").offsetWidth

                //simple weather
                var script = "<script type='text/javascript' src='https://darksky.net/widget/default/42.360082,-71.05888/us12/en.js?width=100%&height=423&title=Boud Cabin&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes'><\/script>";
                if(devicewidth > 870){
                    script = '<iframe id="forecast_embed" frameborder="0" height="245" width="100%" src="//forecast.io/embed/#lat=40.6202&lon=-111.5919&name=Boud Family Cabin"></iframe>' 
                }
                postscribe('#simple', script)

                var script = "<script type='text/javascript' src='https://darksky.net/widget/graph/40.6202,-111.5919/us12/en.js?width=100%&height=320&title=Boud Family Cabin&textColor=333333&bgColor=transparent&transparency=true&fontFamily=Default&customFont=&units=us&graph=temperature_graph&timeColor=333333&tempColor=333333&lineColor=4fa717&markerColor=3d8111'><\/script>";
                postscribe('#linear', script)

                var script = "<script type='text/javascript' src='https://darksky.net/widget/graph-bar/40.6202,-111.5919/us12/en.js?width=" + devicewidth + "px&height=450&title=Full Forecast&textColor=333333&bgColor=FFFFFF&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&timeColor=333333&tempColor=333333&currentDetailsOption=true'><\/script>";
                postscribe('#complex', script);

                var map = "<script src='https://darksky.net/map-embed/@radar,40.708,-111.017,7.js?embed=true&timeControl=true&fieldControl=true&defaultField=radar'><\/script>"

                postscribe('#testMap', map);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        min-height: 90vh;
        padding-bottom: 25px;
    }

    .col {
        padding-top: 25px;
    }

    #complex {
        max-width: 100%
    }

    @supports (-webkit-overflow-scrolling: touch) {
        .testMap {
            position: relative;
            margin-left: -15px;
        }
    }

</style>
