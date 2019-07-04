<template>
    <div>
          <div id="modal1" class="modal">
            <div class="modal-content">
                <h4>Photo Uploader</h4>
                <p>Unfortunately, we only support one photo upload at a time for the time being.</p>
                  <transition name="fade">
                      <div class="progress cyan lighten-5" v-if="progress > 1">
                        <div class="determinate light-blue darken-4" :style="{ width: progress + '%' }"></div>
                      </div>
                  </transition>
                    <div class="file-field input-field" style="margin-top:35px;">
                      <div class="btn blue darken-3">
                        <span class="white-text">Click</span>
                        <!--<input type="file" multiple id="imageID" accept="image/*"/>-->
                        <image-uploader
                            :preview="false"
                            :debug="1"
                            doNotResize="gif"
                            :autoRotate="true"
                            outputFormat="verbose"
                            :maxWidth="1150"
                            :quality="0.85"
                            @input="returnProcessedImage"
                            id="imageID"
                          >
                        </image-uploader>
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                      </div>
                    </div>
            </div>
            <div class="modal-footer">
                <transition name="fade">
                    <a href="#!" class="waves-effect waves-green btn blue darken-3" v-on:click="loopFiles(0)" id="file-submit" v-if="showUpload">Upload</a>
                </transition>
            </div>
          </div>
        
        <div class="fixed-action-btn" >
          <a class="modal-trigger btn-floating btn-large red" href="#modal1">
            <i class="large material-icons">add</i>
          </a>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/database'
    import 'firebase/auth'
    import 'firebase/storage'
    import ImageUploader from 'vue-image-upload-resize'
    import Vue from 'vue'
    Vue.use(ImageUploader);

    export default {
        name: 'photosModal',
        data() {
            return {
                storageService: '',
                storageRef: '',
                progress: 0,
                database: '',
                imageDataURL: null,
                showUpload: false,
            }
        },
        methods: {
            startUpload: function(file, type, originalFile) {
                var that = this;
                var uploadTask = null;
                let fileName = 'default';
                let dateModified = new Date();

                return new Promise(function(resolve, reject) {
                    if (type == 'dataURL') {
                        dateModified = originalFile.lastModified;
                        fileName = originalFile.name + '_' + originalFile.lastModified;
                        fileName = fileName.replace(/[^\w\s]/gi, '');
                        var storageRef = firebase.storage().ref('/');
                        uploadTask = storageRef.child(fileName).putString(file, 'data_url');
                    } else {
                        dateModified = file.lastModified;
                        fileName = file.name + '_' + file.lastModified;
                        fileName = fileName.replace(/[^\w\s]/gi, '');
                        uploadTask = that.storageRef.child(fileName).put(file);
                    }

                    uploadTask.on('state_changed', function(snapshot) {
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        that.progress = progress;
                    }, function(error) {
                        alert('There was an error with the upload...')
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            that.progress = 0;
                            that.writePhotoToDatabase(downloadURL, fileName, dateModified);
                            M.toast({
                                html: 'Photo has been uploaded!',
                                classes: 'green darken-1'
                            })
                            resolve(true);
                        });
                    });

                })
            },
            writePhotoToDatabase: function(url, fileName, dateModified) {
                let db = this.database;
                let timeStamp = new Date().getTime() + "_" + Math.floor(Math.random() * 10000) + 1;
                let userName = firebase.auth().currentUser.displayName;
                var time = Date.now();
                let location = 'photos/' + timeStamp;

                db.ref(location).set({
                    photoURL: url,
                    fileName: fileName,
                    timestampUpload: time,
                    timestamp: dateModified,
                    user: userName,
                    location: location
                });
            },
            loopFiles: function(inc) {
                let files = document.getElementById('imageID').files;

                if (files.length == (inc)) {
                    this.closeModal();
                    return
                }

                var dataURL = this.imageDataURL;

                this.startUpload(dataURL, 'dataURL', files[0]).then(value => {
                    inc++
                    this.loopFiles(inc);
                });
            },
            closeModal: function() {
                var elem = document.querySelector('.modal');
                var instance = M.Modal.getInstance(elem);
                instance.close();
                this.showUpload = false;
            },
            returnProcessedImage: function(file) {
                this.imageDataURL = file.dataUrl;
                this.showUpload = true;
                console.log(file)
            },
        },
        mounted() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
            this.storageService = firebase.storage();
            this.storageRef = this.storageService.ref();
            this.database = firebase.database();
        },
    }

</script>

<style>
    .progress {
        height: 7px;
    }

    #file-submit {
        margin-right: 10px;
        margin-top: -5px;
    }

</style>

<style scoped>
    .loader {
        position: absolute;
        margin-left: -45px;
    }

</style>
