<template>
  <div class="hello">
      <image-uploader
        :preview="true"
        capture="environment"
        :debug="1"
        doNotResize="gif"
        :autoRotate="true"
        outputFormat="verbose"
        :maxWidth="950"
        :quality="0.85"
        @input="returnProcessedImage"
      >
      </image-uploader>
    </div>
</template>

<script>
import ImageUploader from 'vue-image-upload-resize'
import Vue from 'vue'    
Vue.use(ImageUploader);

export default {
  name: 'Test',
  data() {
    return {
      image: null
    };
  },
  methods: {
    returnProcessedImage: function(output) {
      this.image = output;
      console.log(this.image);
      console.log(output)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
