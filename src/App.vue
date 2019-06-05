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

    export default {
        name: 'App',
        components: {
            NavBar,
            FooterX
        }
    };

</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');

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
        transition-duration: 0.5s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

</style>
