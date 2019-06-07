<template>
    <h3>gallery</h3>

</template>

<script>
    export default {
        name: 'Gallery',
        data() {
            return {
                imgsArr: ['https://www.w3schools.com/howto/img_avatar1.png', 'https://www.w3schools.com/howto/img_avatar2.png', 'https://www.w3schools.com/howto/img_avatar3.png'],
            }
        },
        mounted() {
            console.log('Gallery Mounted')
        }
    }

</script>

<style>


</style>
