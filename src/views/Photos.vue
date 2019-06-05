<template>
    <div class="photos">
        <div class="container">
            <div class="row swag"> 
                <h2 class="center-align">Cabin Memories</h2>
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

    export default {
        name: 'Photos',
        components: {
            PhotosModal,
        }
    }
</script>

<style scoped>
    .photos{
        min-height: 75vh;
    }

</style>
