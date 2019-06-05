<template>
    <div class="login-page container row">
        <div class="col m8 offset-m2">
            <div class="card large">
                <div class="card-image">
                  <img src="../assets/sbend.jpg">
                  <span class="card-title">Sign In</span>
                </div>
                <div class="card-content">
                  <p>You've reached the Boud Family Cabin website. Please sign in to access all features.</p>
                </div>
                <div class="card-action">
                    <div class="row">
                        <div class="input-field col s12">
                            <a @click="glogin" class="waves-effect waves-dark btn google-btn">
                                <i class="google-icon-wrapper left"><img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/></i>Sign in with Google</a>
                        </div>
                        <div class="input-field col s12">
                            <a @click="flogin" class="waves-effect waves-light btn fb-btn">
                            <i class="fb-icon-wrapper left"><img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg"/></i>Sign in with Facebook</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'Login',
        data() {
            return {}
        },
        methods: {
            glogin: function() {
                var provider = new firebase.auth.GoogleAuthProvider();
                var that = this;
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    let userName = result.additionalUserInfo.profile.name;
                    if (result.additionalUserInfo.isNewUser) {
                        that.toast(userName + " your account has been created")
                    } else {
                        that.toast('Welcome Back ' + userName + "!")
                    }
                    that.$router.replace('home')
                }).catch(function(error) {
                    console.error(error);
                    that.toast(error, true);
                });
            },
            flogin: function() {
                var that = this;
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    that.toast("Welcome Back " + result.additionalUserInfo.profile.name)
                    that.$router.replace('home')
                }).catch(function(error) {
                    console.error(error);
                    that.toast(error, true);
                });
            },
            toast: function(message, error) {
                let classToAdd = '';
                if (error) {
                    classToAdd = 'red'
                }

                M.toast({
                    html: message,
                    classes: classToAdd + ' darken-1',
                    displayLength: 8200
                });
            },
            signOut: function() {
                return new Promise(function(resolve, reject) {
                    firebase.auth().signOut().then(() => {
                        resolve(true);
                    });
                })
            }
        },
        created() {
            console.log('Login created!');
            this.signOut();
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '432901480833658',
                    cookie: true,
                    xfbml: true,
                    version: 'v3.3'
                });

                FB.AppEvents.logPageView();

            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }

</script>

<style scoped>
    .login-page {
        margin-top: 3.4vh;
        font-family: Roboto;
        min-height: 80vh;
    }

    .google-btn {
        background: white;
        width: 100%;
        text-align: center;
        color: #757575
    }

    .google-icon-wrapper {
        position: absolute;
        width: 20px;
        height: 20px;
        margin-left: -28px;
        margin-top: 3px;
    }

    .fb-btn {
        background: #3b5998;
        width: 100%;
        text-align: center;
        color: #fff;
    }

    .fb-icon-wrapper {
        position: absolute;
        width: 20px;
        height: 20px;
        margin-left: -28px;
        margin-top: 0px;
    }

    .fb-icon-wrapper img {
        width: 100%
    }

    .input-field {
        margin-bottom: 0px;
    }

    .cabin-img img {
        padding: 5px 0px
    }

    .card-title {
        font-size: 3em;
        font-weight: 400;
    }

    .card.large .card-image {
        max-height: 50%;
        overflow: hidden;
    }

    .fb-btn:hover {
        background: rgba(59, 89, 152, 1)
    }

    .google-btn:hover {
        background: rgb(247, 247, 247)
    }

</style>

/*https://stackoverflow.com/questions/47535317/how-to-fade-in-images-when-loaded-with-vue*/
