<template>
    <ul class="sidenav " id="slide-out">
        <li>
            <div class="user-view">
                <div class="background">
                    <img src="../assets/bcc2.jpeg">
                </div>
                <a href="#user"><img class="circle" v-bind:src="profilePic"></a>
                <a href="#name"><span class="white-text name">{{userName}}</span></a>
                <a href="#email"><span class="white-text email">{{email}}</span></a>
                <a v-on:click="toggleLog">Logout</a>
            </div>
        </li>
        <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
        <li><a href="#!">Second Link</a></li>
        <li>
            <div class="divider"></div>
        </li>
        <li><a class="subheader">Subheader</a></li>
        <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
</template>

<script>
    export default {
        name: 'SlideOut',
        mounted() {

        }
    }

</script>

<style>


</style>
