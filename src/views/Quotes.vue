<template>
  <div class="container page">
     <h1>Quotes</h1>
      
      
      
      <div class="grid " >
          <div class="grid-sizer"></div>
          <div class="grid-item card" v-for="quote of quotes">
            <div class="card-content">
                {{quote.quotes}}
            </div>
            <div class="card-action">
                <div class="row">
                    <div class="col s9">
                        <span class="grey-text text-darken-4 activator tester">{{quote.names}}</span>
                    </div>
                    <div class="col s3">
                        <span class="new badge blue darken-3 tooltipped" data-badge-caption="" @click="updateLikes(quote)" data-position="top" :data-tooltip="quote.likers | likersfixed"><span class="likes">{{quote.likes}}<i class="material-icons right-align">thumb_up</i></span></span>
                    </div>
                </div>
            </div>
                <div class="card-reveal light-blue darken-4 white-text">
                  <span class="card-title white-text text-darken-4"><i class="material-icons right">close</i></span>
                  <h5>{{quote.names}}</h5>
                  <p>Uploaded by: {{ quote.uploaderName}}</p>
                  <p>{{ quote.date | moment }}</p>
                </div>
          </div>
      </div>
      <quotes-upload></quotes-upload>
  </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'
    import moment from 'moment';
    import QuotesUpload from '../components/QuoteUpload.vue'
    import Masonry from 'masonry-layout';

    export default {
        name: 'Quotes',
        data() {
            return {
                quotes: []
            }
        },
        methods: {
            createGrid: function() {
                var grid = document.querySelector('.grid');
                var msnry = new Masonry(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    transitionDuration: '0.3s',
                    gutter: 5
                });

                var elems = document.querySelectorAll('.tooltipped');
                M.Tooltip.init(elems);
            },
            updateLikes: function(dater) {
                if (!dater.hasOwnProperty('likers')) {
                    dater.likers = ['init'];
                }
                if (dater.likers.includes(firebase.auth().currentUser.displayName)) {
                    for (var i = 0; i < dater.likers.length; i++) {
                        if (dater.likers[i] == firebase.auth().currentUser.displayName) {
                            dater.likers.splice(i, 1);
                        }
                    }
                    dater.likes = dater.likes - 1;
                } else {
                    dater.likes = dater.likes + 1;
                    dater.likers.push(firebase.auth().currentUser.displayName);
                }
                firebase.database().ref('/quotes/quote/' + dater.id).set(dater);
            }
        },
        components: {
            QuotesUpload,
        },
        mounted() {
            firebase.database().ref('/quotes/quote').on('value', snapshot => {
                this.quotes = []
                var quotes = snapshot.val()
                for (var key in quotes) {
                    this.quotes.push(quotes[key])
                }
            });
            this.createGrid();
        },
        updated() {
            this.createGrid()
        },
        filters: {
            moment: function(date) {
                return moment(date).format('MMMM Do YYYY');
            },
            likersfixed: function(likers){
                var swagger = Array.from(likers);
                swagger.shift()
                return swagger
            }
        }
    }

</script>

<style scoped>
    .page {
        min-height: 81vh;
    }

    .grid-item--width2 {
        width: 20%;
    }

    .grid-sizer,
    .grid-item {
        width: 30%;
        margin: 6px
    }

    .activator .grey-text {
        pointer-events: none;

    }

    h5 {
        font-size: 1.rem;
        line-height: 103%;
    }

    .thumb {
        margin-right: -3px!important;
    }

    .likes {
        margin-left: -12px;
    }

    .badge .material-icons {
        font-size: 12px;
        padding: 3px 0px 0px 4px;
        position: absolute;
        margin-top: 2px;
    }

    .col1 {
        max-width: 80%;
    }

    .col2 {
        max-width: 20%;
    }

    .card-action .row {
        margin-bottom: 0px
    }

    @media only screen and (max-width: 550px) {
        .grid-sizer,
        .grid-item {
            width: 100%;
            margin-bottom: 5px;
        }
    }

</style>
