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
              <h4>Modal Header</h4>
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s6">
                        <input id="input_text" type="text" data-length="300">
                        <label for="input_text">Input text</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-field col s12">
                        <textarea id="textarea2" class="materialize-textarea" data-length="300"></textarea>
                        <label for="textarea2">Textarea</label>
                      </div>
                    </div>
                  </form>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
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
                storageService: '',
            }
        },
        methods: {
            startUpload: function(file, type, originalFile) {

            },
        },
        mounted() {
            M.Modal.init(document.querySelectorAll('.modal')); 
            M.CharacterCounter.init(document.querySelectorAll('#textarea2'));
        },
    }

</script>


<style scoped>
    .loader {
        position: absolute;
        margin-left: -45px;
    }

</style>
