<template>
  <div class="hello container">
     <h1>Quotes</h1>

        
        <div class="card "  v-for="quote of quotes">
            <div class="card-content">
              <span class="card-title grey-text text-darken-4">{{quote.quote}}</span>
            </div>
            <div class="card-footer">
                  <span class="card-title grey-text text-darken-4">{{quote.name}}</span>
            </div>
          </div>  
        
  </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'
    import moment from 'moment';

    export default {
        name: 'Quotes',
        data() {
            return {
                quotes: []
            }
        },
        created() {
            for (var i = 0; i < 10; i++) {
                console.log(i)
                this.quotes.push({
                    name: "Name " + i,
                    quote: 'This is a quote',
                    date: new Date(),
                    image: '/Favicon.png'
                })
            }

        },
        methods: {}
    }

</script>

<style scoped>


</style>
