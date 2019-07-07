<template>
    <div>
        <div class="fixed-action-btn" >
          <a class="modal-trigger btn-floating btn-large red" href="#modal1">
            <i class="large material-icons">add</i>
          </a>
        </div>

          <!-- Modal Structure -->
          <div id="modal1" class="modal modal-fixed-footer">
            <div class="modal-content">
              <h4>Add a Quote</h4>
                  <form>
                    <div class="row" style="margin-top: 35px">
                      <div class="input-field col s12">
                        <select multiple @change="onChange($event)">
                          <option value="1111111">Option 1</option>
                          <option value="2222222">Option 2</option>
                          <option value="3333333">Option 3</option>
                          <option value="44444444">Option 4</option>
                          <option value="other"><div class="icon-inline-fix"><i class="material-icons inline-icon">person_add</i>Add Person</div></option>
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
                        <textarea id="textarea2" class="materialize-textarea" rows="3" data-length="300"></textarea>
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
                console.log(document.querySelector('.otherInputField').value)
            },
            submit() {
                var thisdate = new Date().toString();
                var id = new Date().getTime();

                console.log(document.querySelector('.otherInputField').value)
                if (document.querySelector('.otherInputField').value.length < 2) {
                    M.toast({
                        html: 'No people selected.',
                        classes: "red darken-1"
                    })
                    return
                }

                if (document.querySelector('#textarea2').value.length< 5) {
                    M.toast({
                        html: 'No quote detected.',
                        classes: "red darken-1"
                    })
                    return
                }

                var info = {
                    names: document.querySelector('.otherInputField').value,
                    quotes: document.querySelector('#textarea2').value,
                    date: thisdate,
                }
                console.log(info);
                firebase.database().ref('/quotes/' + id).set(info);
                console.log('here')
            }
        },
        mounted() {
            M.Modal.init(document.querySelectorAll('.modal'));
            M.CharacterCounter.init(document.querySelectorAll('#textarea2'));
            M.FormSelect.init(document.querySelectorAll('select'));
        },
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

    .modal-close {
        margin: 10px 0px
    }

</style>
