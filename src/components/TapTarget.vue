<template>
        <!-- Tap Target Structure -->
          <div class="tap-target blue darken-4" v-bind:class="color" data-target="menudiddly">
            <div class="tap-target-content">
              <h5 class="white-text">Navigation</h5>
              <p>Use the menu here to navigate between pages</p>
            </div>
          </div>
</template>

<script>
    export default {
        name: 'TapTarget',
        props: {
            loggedIn: Boolean,
            color: String,
            textColor: String
        },
        mounted() {
            if (this.loggedIn && (!localStorage.shown || this.dateIsTwoWeeksOld())) {
                var elems = document.querySelectorAll('.tap-target');
                var instances = M.TapTarget.init(elems);
                var instance = M.TapTarget.getInstance(elems[0]);
                instance.open();
                this.setShown();
            }
            if (!localStorage.installed) {
                let isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                let webpage = "https://www.lifewire.com/home-screen-icons-in-safari-for-iphone-and-amp-ipod-touch-4103654"
               
                if(!isIOS){
                    webpage = "https://www.howtogeek.com/196087/how-to-add-websites-to-the-home-screen-on-any-smartphone-or-tablet/"
                }
                
                var toastHTML = "<span>This is a web app! Have you installed it yet?</span><a href='"+webpage+"' target='_blank' class='btn-flat toast-action not-installed'>How?</a><button class='btn-flat toast-action installed'>Yes I have!</button>";
                M.toast({
                    html: toastHTML,
                    displayLength: 10000,
                    classes: 'light-blue darken-3'
                });
                var anchors = document.getElementsByClassName('installed');
                for (var i = 0; i < anchors.length; i++) {
                    var anchor = anchors[i];
                    anchor.onclick = function() {
                        localStorage.installed = true;
                        M.Toast.dismissAll();
                        M.toast({
                            html: '<span>Thanks for installing the app!</span>',
                            displayLength: 3000,
                            classes: 'green darken-3'
                        });
                    }
                }
            }
        },
        methods: {
            setShown: function() {
                localStorage.setItem("shown", 1);
            },
            dateIsTwoWeeksOld: function() {
                let recordedTime = new Date();

                if (localStorage.timeStamp) {
                    recordedTime = new Date(localStorage.timeStamp);
                } else {
                    localStorage.setItem("timeStamp", recordedTime);
                }

                let fortnightAgo = new Date(new Date() - 12090e5);

                if (recordedTime > fortnightAgo) {
                    return false
                } else {
                    localStorage.setItem("timeStamp", new Date());
                    return true
                }
            }
        }
    }

</script>

<style>
    .tap-target {
        color: grey;
    }

    .tap-target p {
        color: white;
        font-size: 15px;
        line-height: 25px;
    }

    .tap-target-wrapper.open .tap-target-wave::before {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        background-color: white
    }

    .tap-target-origin {
        color: gray;
        border: 2px solid rgba(128, 128, 128, 0.13);
        border-radius: 35px;
        box-shadow: 0 1.5px 1.5px 0 rgba(47, 47, 47, 0.25);
        padding: 0px 15px 0px 15px;
        margin: 0!important
    }

    .installed {
        line-height: 15px!important;
    }

</style>

<style scoped>
    .toast {
        line-height: 15px!important;
    }

</style>
