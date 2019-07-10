<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="slide-fade" mode="out-in">
        <router-view/>
    </transition>
    <footer-x></footer-x>
  </div>
</template>

<script>
    import NavBar from './components/Navbar.vue';
    import FooterX from './components/Footer'
    import firebase from 'firebase/app'
    import 'firebase/database'
    import 'firebase/auth'

    export default {
        name: 'App',
        components: {
            NavBar,
            FooterX
        },
        mounted() {
            console.log('app mounted')
            var changed = false;
            firebase.auth().onAuthStateChanged(function(user) {
                if (user && !changed) {
                    changed = true;
                    setTimeout(function() {
                        logUser();
                        logAttempt();
                    }, 3000);
                } else {
                    // No user is signed in.
                }
            });

            function logUser(user) {
                let time = Date.now();
                let ref = 'logs/userLogs/' + time;
                let userName = firebase.auth().currentUser.displayName;
                let photoURL = firebase.auth().currentUser.photoURL;

                firebase.database().ref('logs/userLogs/').once('value').then(function(snapshot) {
                    console.log('inside logs')
                    let data = snapshot.val();
                    let proceed = logOlderThanTwentyMinutes(data, time, userName)
                    if (proceed) {
                        firebase.database().ref(ref).set({
                            name: userName,
                            log: time,
                            photoURL: photoURL
                        }).then(function(swagshot) {
                            console.log('success')
                        });
                    }
                });

                function logOlderThanTwentyMinutes(logs, time, uname) {
                    let TENMINUTES = 10 * 60 * 1000; //30 minutes
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

            function logAttempt() {
                let time = Date.now();
                setTimeout(function() {
                    firebase.database().ref('attempt/' + time).set({
                        time: time,
                        name: firebase.auth().currentUser.displayName,
                        type:firebase.auth().currentUser.photoURL
                    })
                }, 3000);
            }
        }
    };

</script>

<style>
    html,
    body {
        font-family: 'Roboto ', sans-serif;
    }

    #app {
        min-height: 90vh;
    }

    body {
        background: #FAFAFA
    }

    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.35s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .25s ease;
    }

    .slide-fade-leave-active {
        transition: all .35s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

</style>
