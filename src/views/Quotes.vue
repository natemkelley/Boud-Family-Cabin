<template>
  <div class="page">
      <div class="container">
         <h1>Quotes</h1> 
          
          <div class="switch right" v-bind:class="{checkmate: checked}">
            <label>
              Off
              <input type="checkbox" v-model="checked">
              <span class="lever"></span>
              On
            </label>
          </div>
          
         <nav v-if="quotes">
            <div class="nav-wrapper light-blue darken-4">
              <form v-on:submit.prevent="filterResults(true)">
                <div class="input-field">
                  <input id="search" type="search" v-model="searchQuery" v-on:keyup="filterResults()">
                  <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                  <!--<i class="material-icons">close</i>-->
                </div>
              </form>
            </div>
          </nav>
          
          <div class="grid" v-if="quotes">
              <div class="grid-sizer"></div>
              <div class=" grid-item card" v-for="quote of quotes">
                <div class=" card-content activator">
                    {{quote.quotes}}
                </div>
                <div class="card-action">
                    <div class="row">
                        <div class="col s9">
                            <span class="grey-text text-darken-4 activator tester">{{quote.names}}</span>
                        </div>
                        <div class="col s3">
                            <span class="waves-effect waves-light new badge blue darken-3 tooltipped" data-badge-caption="" @click="updateLikes(quote)" data-position="top" :data-tooltip="quote.likers | likersfixed"><span class="likes">{{quote.likes}}<i class="material-icons right-align">thumb_up</i></span></span>
                        </div>
                    </div>
                </div>
                <div class="card-reveal light-blue darken-4 white-text">
                      <span class="card-title white-text text-darken-4">{{quote.names}}<i class="material-icons right">close</i></span>
                      <p>Uploaded by {{ quote.uploaderName}}</p>
                      <p>{{ quote.date | moment }}</p>
                      <p>Liked by {{quote.likers | likersfixed}}</p>
                    </div>
                <a class="remove-btn btn-floating btn-large waves-effect waves-light red" @click="removeQuote(quote)" v-if="checked"><i class="material-icons">clear</i></a>
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
                quotes: [],
                checked: false,
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
            },
            removeQuote(quote) {
                var json = JSON.stringify(quote);
                firebase.database().ref('/quotes/quote/' + quote.id).remove();
                this.undoToast(quote)
            },
            undoToast(quote) {
                var toastHTML = "<span>Removed quote by " + quote.names + "</span><button class='btn-flat toast-action undo' quotedata='" + JSON.stringify(quote) + "'>Undo</button>";
                M.toast({
                    html: toastHTML,
                    displayLength: 6000,
                    classes: 'red darken-3'
                });
                var anchors = document.getElementsByClassName('undo');
                for (var i = 0; i < anchors.length; i++) {
                    var anchor = anchors[i];
                    anchor.onclick = function() {
                        var undoJSON = JSON.parse(anchor.getAttribute("quotedata"));
                        firebase.database().ref('/quotes/quote/' + undoJSON.id).set(undoJSON);
                        M.toast({
                            html: '<span>Restored quote!</span>',
                            classes: 'green darken-1',
                            displayLength: 3000
                        });
                    }
                }
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
                this.quotes.reverse()
            });
            this.createGrid();
        },
        updated() {
            this.createGrid()
        },
        filters: {
            moment: function(date) {
                return moment(date).format('LLL');
            },
            likersfixed: function(likers) {
                var swagger = Array.from(likers);
                swagger.shift()
                var x = swagger.toString().replace(",", ", ")
                return x
            }
        }
    }

</script>

<style scoped>
    .page {
        min-height: 78vh;
        padding-bottom: 25px;
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
        font-size: 1.44rem;
        line-height: 103%;
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

    .card-action .row .col {
        padding: 0px
    }

    .card-action .row {
        margin-bottom: 0px
    }

    .card-action .badge {
        min-width: 50px;
    }

    .remove-btn {
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(0.65);
        opacity: 0.70;
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

    @media only screen and (max-width: 850px) {
        .grid-sizer,
        .grid-item {
            width: 47%;
            margin-bottom: 5px;
        }
    }

    @media only screen and (max-width: 494px) {
        .grid-sizer,
        .grid-item {
            width: 100%;
            margin-bottom: 5px;
        }
        .switch {
            transform: scale(0.95);
        }
    }

</style>
