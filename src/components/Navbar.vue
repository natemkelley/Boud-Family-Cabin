<template>
    <div>
      <div class="navbar-fixed">
          <nav>
            <div class="nav-wrapper" v-bind:class="color">
                <router-link to="/home" class="brand-logo center" v-bind:class="textColor"> {{activePage}}</router-link>
                <ul class="left" v-if="loggedIn">
                    <li>  <a href="#" id="menudiddly" data-target="slide-out" class="show-on-large sidenav-trigger"><i class="material-icons" v-bind:class="textColor">menu</i></a>
                    </li>
                    <TapTarget :loggedIn="loggedIn" :color="color" :textColor="textColor" />
                </ul>
                <ul class="right">
                    <li><a><div id="right"></div></a></li>
                </ul>
            </div>
          </nav>
        </div>

        <ul class="sidenav " id="slide-out">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img src="../assets/bcc2.jpg">
                    </div>
                    <a><img class="circle" v-bind:src="profilePic"></a>
                    <a><span class="white-text name">{{userName}}</span></a>
                    <a><span class="white-text email">{{email}}</span></a>
                </div>
            </li>
            
            <li><router-link @click.native="clickRoute" to="/home" class="waves-effect"><i class="material-icons">home</i>Home</router-link></li>
            <li><router-link @click.native="clickRoute" to="/webcams" class="waves-effect"><i class="material-icons">linked_camera</i>Webcams</router-link></li>
            <li><router-link @click.native="clickRoute" to="/weather" class="waves-effect"><i class="material-icons">cloud_queue</i>Weather</router-link></li>
            <li><router-link @click.native="clickRoute" to="/animals" class="waves-effect"><i class="material-icons">pets</i>Wildlife</router-link></li>

            <li>
                <div class="divider"></div>
            </li>
            <li><router-link @click.native="clickRoute" to="/photos"><!--<i class="material-icons">add_a_photo</i>-->Photos</router-link></li>
            <li><router-link @click.native="clickRoute" to="/quotes" class="waves-effect"><!--<i class="material-icons">add_a_photo</i>-->Quotes</router-link></li>
            <li><router-link @click.native="clickRoute" to="/logs" v-if="admin">Logs</router-link></li>

            <li><a v-on:click="toggleLog" class="logout">Logout</a></li>
        </ul>
        
        <div class="content-wrapper-before gradient-45deg-indigo-purple"></div>
    </div>
</template>

<script>
    import Login from '../views/Login.vue';
    import firebase from 'firebase/app'
    import 'firebase/database'
    import 'firebase/auth'
    import TapTarget from './TapTarget.vue';

    export default {
        name: 'NavBar',
        data() {
            return {
                loggedIn: false,
                userName: 'Log In',
                color: 'light-green',
                textColor: 'text-white',
                profilePic: '../assets/img_avatar.png',
                email: '',
                activePage: 'Boud Cabin',
                admin: false
            }
        },
        mounted() {
            this.intiSideNav();
            this.updateRouteName();
        },
        created() {
            this.randomColor();
            this.getUserInfo();
        },
        watch: {
            $route(to, from) {
                this.updateRouteName(to.name)
            }
        },
        methods: {
            getUserInfo: function() {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        this.loggedIn = true;
                        this.userName = user.displayName;
                        this.profilePic = user.photoURL;
                        this.email = user.email;
                        logUser(user.providerData[0])
                        if (user.displayName.includes('Kelley')) {
                            this.admin = true;
                            M.toast({
                                html: 'Howdy Admin'
                            })
                        }
                    }
                });

                function logUser(user) {
                    let time = Date.now();
                    let ref = 'logs/userLogs/' + time;
                    let userName = user.displayName;
                    firebase.database().ref('logs/userLogs/').once('value').then(function(snapshot) {
                        let data = snapshot.val();
                        let proceed = logOlderThanTwentyMinutes(data, time, userName)
                        if (proceed) {
                            firebase.database().ref(ref).set({
                                name: user.displayName,
                                log: time,
                                photoURL: user.photoURL
                            });
                        }
                    });

                    function logOlderThanTwentyMinutes(logs, time, uname) {
                        let TENMINUTES = 30 * 60 * 1000; //30 minutes
                        let newest = getNewestLogByName(uname);
                        let returnVal = false;

                        if (newest) {
                            if (time > (newest + TENMINUTES)) {
                                returnVal = true
                            }
                        } else {
                            returnVal = true;
                        }

                        return returnVal

                        function getNewestLogByName(name) {
                            let newest = 0;
                            for (var key in logs) {
                                if (logs[key].log > newest) {
                                    newest = logs[key].log
                                }
                            }
                            return newest
                        }
                    }
                }
            },
            intiSideNav: function() {
                var elems = document.querySelectorAll('.sidenav');
                var instances = M.Sidenav.init(elems, {
                    preventScrolling: true
                });
            },
            randomColor: function() {
                var colorArray = ['light-blue darken-4', 'white', 'white', 'white']
                var rand = colorArray[Math.floor(Math.random() * colorArray.length)];
                this.color = rand;
                if (rand == "white") {
                    this.textColor = 'grey-text text-darken-1'
                }
            },
            toggleLog: function() {
                let status = Login.methods.signOut();
                status.then((value) => {
                    this.$router.replace('login');
                    let elems = document.querySelectorAll('.sidenav');
                    let instance = M.Sidenav.getInstance(elems[0]);
                    instance.close();
                })
            },
            clickRoute: function() {
                console.log('click')
                var elems = document.querySelector('.sidenav');
                var instance = M.Sidenav.init(elems);
                instance.close();
                this.updateRouteName();
            },
            updateRouteName: function(routeName) {
                var name = location.pathname.split('/')[1];
                this.activePage = routeName || name || 'Boud Cabin';
            }
        },
        components: {
            TapTarget
        }
    }

</script>

<style scoped>
    .avatar {
        height: 38px;
        margin: 12px 10px 0px 0px;
        position: absolute;
        background: 'grey'
    }

    .avatar-text {
        padding-left: 45px;
    }

    .permaside {
        display: contents!important
    }

    .logout {
        position: fixed;
        bottom: 0;
        bottom: 0;
        width: 299px;
        left: 0;
        margin-bottom: 1px;
        background-color: rgba(255, 32, 32, 0.03)!important;
    }

    .logout:hover {
        background-color: rgba(255, 32, 32, 0.10)!important;
    }

    .sidenav li>a>i {
        margin-right: 12px!important;
    }

    .nav-wrapper .brand-logo {
        text-transform: capitalize
    }

    .content-wrapper-before {
        position: absolute;
        z-index: -1;
        top: 64px;
        left: 0;
        width: 100%;
        height: 150px;
        -webkit-transition: .3s ease all;
        -moz-transition: .3s ease all;
        -o-transition: .3s ease all;
        transition: .3s ease all;
        margin-top: -5px;
    }

    .gradient-45deg-indigo-purple {
        background: #FAFAFA;
        background: -webkit-linear-gradient(0deg, #FAFAFA, #efefef) !important;
        background: -moz- oldlinear-gradient(0deg, #FAFAFA, #efefef) !important;
        background: -o-linear-gradient(0deg, #FAFAFA, #efefef) !important;
        background: linear-gradient(0deg, #FAFAFA, #efefef) !important;
    }

</style>
