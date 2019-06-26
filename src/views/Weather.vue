<template>
  <div class="hello container">
      <div class="row"> 
        <div class="col m12 offset-m0 s12" id="simple" style="">
        </div>
        <div class="col m12 offset-m0 s12" id="linear" style="">
        </div>
        <div class="col m12 offset-m0 s12" style="">
            <div id="complex"></div>
        </div>
        <div class="col m12 offset-m0 s12" id="map" style="">
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
                //simple weather
                var script = "<script type='text/javascript' src='https://darksky.net/widget/default/42.360082,-71.05888/us12/en.js?width=100%&height=423&title=Boud Cabin&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes'><\/script>";
                postscribe('#simple', script)

                var script = "<script type='text/javascript' src='https://darksky.net/widget/graph/40.6202,-111.5919/us12/en.js?width=100%&height=320&textColor=333333&bgColor=transparent&transparency=true&fontFamily=Default&customFont=&units=us&graph=temperature_graph&timeColor=333333&tempColor=333333&lineColor=333333&markerColor=333333'><\/script>";
                postscribe('#linear', script)

                var script = "<script type='text/javascript' src='https://darksky.net/widget/graph-bar/40.6202,-111.5919/us12/en.js?width=100%&height=420&title=Full Forecast&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&timeColor=333333&tempColor=333333&currentDetailsOption=true'><\/script>";
                postscribe('#complex', script);

                var map = "<script src='https://darksky.net/map-embed/@radar,40.709,-111.555,7.js?embed=true&timeControl=true&fieldControl=true&defaultField=radar'><\/script>"
                postscribe('#map', map);
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        min-height: 75vh;
        padding-bottom: 25px;
    }

    .col {
        padding-top: 25px;
    }
    
    #complex{
        max-width: 100%
    }

</style>
