<template>
    <div >
        <div class="fixed-action-btn" >
          <a class="waves-effect waves-light btn-floating btn-large red">
            <i class="large material-icons">add</i>
          </a>
          <ul>
            <li><a class="btn-floating green lighten-1 modal-trigger" href="#modal2"><i class="material-icons">person_add</i></a></li>
            <li><a class="btn-floating blue darken-1 modal-trigger" href="#modal1"><i class="material-icons">format_quote</i></a></li>
          </ul>
        </div>

          <!-- Modal Structure -->
          <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>Add a Quote</h4>
                  <form>
                    <div class="row" style="margin-top: 35px">
                      <div class="input-field col s12">
                        <select multiple @change="onChange($event)">
                              <option v-for="quoter in sortedPersons" :value="quoter.name">{{quoter.name}}</option>
                          <option value="other"><div class="icon-inline-fix"><i class="material-icons inline-icon">person_add</i>Add a person that's not listed</div></option>
                        </select>
                        <label>Select Person(s)</label>
                      </div>
                    </div>
                    <div class="row" v-show="showOther">
                        <div class="input-field col s12">
                          <input id="icon_prefix" value="" type="text" class="validate otherInputField">
                          <label for="icon_prefix" class="active">Additional People</label>
                        </div>                
                    </div>  
                    <div class="row">
                      <div class="input-field col s12">
                        <textarea id="textarea2" class="materialize-textarea" rows="3" data-length="1250"></textarea>
                        <label for="textarea2">Textarea</label>
                      </div>
                    </div>
                  </form>
            </div>
            <div class="modal-footer">
                  <button href="#!" class="modal-close btn waves-effect waves-light green darken-2" v-on:click="submit">Submit
                    <i class="material-icons right">send</i>
                  </button>
            </div>
          </div>
        
          <div id="modal2" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>Add a Person</h4>
                  <form>
                    <div class="row" style="margin-top: 35px">
                        <div class="input-field col s12">
                          <input id="icon_prefix" value="" type="text" class="validate newPerson">
                          <label for="icon_prefix" class="active">Additional Person</label>
                        </div>                
                    </div>  
                    <div class="row" style="margin-top: 15px">
                        <ul class="collection">
                            <li class="collection-item" v-for="quoter in sortedPersons"><div>{{quoter.name}}<a class="secondary-content red-text text-darken-1" @click="deletePerson(quoter)"><i class="material-icons">delete_forever</i></a></div></li>
                        </ul>
                    </div>  
                  </form>
            </div>
            <div class="modal-footer">
                  <button href="#!" class="modal-close btn waves-effect waves-light green darken-2" v-on:click="submit2">Submit
                    <i class="material-icons right">send</i>
                  </button>
            </div>
          </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'
    import 'firebase/auth'

    export default {
        name: 'QuoteUpload',
        data() {
            return {
                showOther: false,
                quoters: []
            }
        },
        methods: {
            onChange(event) {
                var instance = M.FormSelect.getInstance(document.querySelectorAll('select')[0]);
                var people = instance.getSelectedValues();
                if (people.includes("other")) {
                    this.showOther = true;
                    people.pop();
                    M.toast({
                        html: 'Add additional people people in appended text box.',
                        classes: "green darken-2"
                    })
                } else {
                    this.showOther = false;
                }
                document.querySelector('.otherInputField').value = people.toString().replace(/,/g, ", ");
                M.updateTextFields();
            },
            submit() {
                var thisdate = new Date().toString();
                var id = new Date().getTime();
                if (document.querySelector('.otherInputField').value.length < 2) {
                    M.toast({
                        html: 'No people selected.',
                        classes: "red darken-1"
                    })
                    return
                }
                if (document.querySelector('#textarea2').value.length < 5) {
                    M.toast({
                        html: 'No quote detected.',
                        classes: "red darken-1"
                    })
                    return
                }
                let uploaderName = firebase.auth().currentUser.displayName;
                
                console.log(document.querySelector('#textarea2').value)
                var info = {
                    names: document.querySelector('.otherInputField').value,
                    quotes: document.querySelector('#textarea2').value,
                    date: thisdate,
                    uploaderName: uploaderName,
                    likes:0,
                    likers:['init'],
                    id: id
                }
                firebase.database().ref('/quotes/quote/' + id).set(info);
                document.querySelector('#textarea2').value = ''
            },
            submit2() {
                var thisdate = new Date().toString();
                var id = new Date().getTime();
                if (document.querySelector('.newPerson').value.length < 2) {
                    M.toast({
                        html: 'No person.',
                        classes: "red darken-1"
                    })
                    return
                }
                var info = {
                    name: document.querySelector('.newPerson').value,
                    id: id,
                }

                var duplicate = false
                this.quoters.forEach(function(pers) {
                    if (pers == info.name) {
                        M.toast({
                            html: 'Person Already Exists',
                            classes: "red darken-1"
                        })
                        duplicate = true
                    }
                })

                if (duplicate) {
                    return
                }

                firebase.database().ref('/quotes/person/' + id).set(info);
                M.toast({
                    html: 'Added ' + document.querySelector('.newPerson').value,
                    classes: "green darken-1"
                })
            },
            deletePerson(quoter) {
                console.log(quoter)
                if (confirm("Sure you want to delete this person?")) {
                    firebase.database().ref('/quotes/person/' + quoter.id).remove();
                }
            }
        },
        mounted() {
            var that = this;
            firebase.database().ref('/quotes/person/').on('value', snapshot => {
                that.quoters = [];
                var persons = snapshot.val();
                for (var key in persons) {
                    that.quoters.push(persons[key])
                }
                M.FormSelect.init(document.querySelectorAll('select'));
            });

            M.Modal.init(document.querySelectorAll('.modal'));
            M.CharacterCounter.init(document.querySelectorAll('#textarea2'));
            M.FormSelect.init(document.querySelectorAll('select'));
            M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
                'direction': 'left',
                hoverEnabled: false
            });
        },
        updated() {
            M.FormSelect.init(document.querySelectorAll('select'));
        },
        computed: {
            sortedPersons: function() {
                return this.quoters.sort((t1,t2) => t1.name < t2.name ? -1 : 1);
            }
        }
    }

</script>


<style scoped>
    .loader {
        position: absolute;
        margin-left: -45px;
    }

    .inline-icon {
        position: absolute;
        margin-left: -30px;
    }

    .icon-inline-fix {
        padding-left: 27px;
    }

    .input-field {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .row {
        margin-bottom: 12px
    }
    
    .card-action .row .col{
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 0rem!important;
    min-height: 1px;
    }

    .modal-close {
        margin: 10px 0px
    }

    #modal2 .collection {
        max-height: 30vh;
        overflow: scroll;
    }
    
    .card-content{
            white-space: pre-line;
    }

</style>
