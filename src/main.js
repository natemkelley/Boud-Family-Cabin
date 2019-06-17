import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import 'material-icons'

import firebase from 'firebase'

Vue.config.productionTip = false

let app = '';
const firebaseConfig = {
    apiKey: "AIzaSyANkYWIx9wvBWnV9tZ-sw5HWoONJXq0wTA",
    authDomain: "boud-family-cabin.firebaseapp.com",
    databaseURL: "https://boud-family-cabin.firebaseio.com",
    projectId: "boud-family-cabin",
    storageBucket: "boud-family-cabin.appspot.com",
    messagingSenderId: "1056669230578",
    appId: "1:1056669230578:web:a835cd8f01f2f144"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            router,
            render: h => h(App)
        }).$mount('#app')
    }
})
