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
              <h4>Add a Person</h4>
                  <form>
                    <div class="row" style="margin-top: 35px">
                        <div class="input-field col s12">
                          <input id="icon_prefix" value="" type="text" class="validate otherInputField">
                          <label for="icon_prefix" class="active">Additional People</label>
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
                quoters: ["Tom Boud","Meg Boud"]
            }
        },
        methods: {
            submit() {
                var thisdate = new Date().toString();
                var id = new Date().getTime();
                if (document.querySelector('.otherInputField').value.length < 2) {
                    M.toast({
                        html: 'No person.',
                        classes: "red darken-1"
                    })
                    return
                }
                var info = {
                    name: document.querySelector('.otherInputField').value,
                }
                firebase.database().ref('/quotes/person' + id).set(info);
            }
        },
        mounted() {
            M.Modal.init(document.querySelectorAll('.modal'));
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

    .modal-close {
        margin: 10px 0px
    }

</style>
