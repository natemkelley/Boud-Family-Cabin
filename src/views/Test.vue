<template>
  <div class="hello">
      <h1>test</h1>
    </div>
</template>

<script>
            var load = require('load-iframe');

    export default {
        name: 'Test',
        data() {
            return {
                image: null
            };
        },
        methods: {
            returnProcessedImage: function(output) {

            }
        },
        mounted() {

            load({
                https: 'https://heera.it'
            });
        }
    }

</script>

<style scoped>


</style>
