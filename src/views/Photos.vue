<template>
    <div class="photos">
        <div class="container">
            <div class="row swag"> 
                <h2 class="center-align">Photos</h2>
                <gallery-x></gallery-x>
            </div>
        </div>
        
        <div class="fixed-action-btn">
          <a class="btn-floating btn-large red">
            <i class="large material-icons">mode_edit</i>
          </a>
        </div>
        
        <photos-modal></photos-modal>
    </div>

    

</template>

<script>
    import PhotosModal from '../components/photosModal.vue';
    import GalleryX from '../components/Gallery.vue';

    export default {
        name: 'Photos',
        components: {
            PhotosModal,
            GalleryX
        }
    }
</script>

<style scoped>
    .photos{
        min-height: 75vh;
    }

</style>
