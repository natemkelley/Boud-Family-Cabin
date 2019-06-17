<template>
    <div class="photos">
        <div class="container">
            <div class="row swag"> 
                <h2 class="center-align">Photos</h2>
                <gallery-x></gallery-x>
            </div>
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
        },
        mounted(){
        }
    }
</script>

<style scoped>
    .photos{
        min-height: 75vh;
    }

</style>
