<template>
  <div class="hello container">
    <h1>Animals</h1>

  </div>
</template>

<script>
    import firebase from 'firebase';
    import wiki from 'wikijs';

    export default {
        name: 'Animals',
        data() {
            return {
                searchQuery: '',
            }
        },
        mounted() {            
            wiki().page('Pine Grosbeak')
                .then(page => {
                    console.log(page)
                    console.log(page.url())
                    page.summary().then(console.log)
                    page.fullInfo().then(console.log)
                    page.mainImage().then(console.log)
                    page.rawImages().then(console.log)
                    
                    //fullInfo to get map and then loop raw images for title and then get url
                    //the status could be intering?
                })


        },
        updated() {},
        methods: {
            queryWiki: function() {}
        }
    }

</script>

<style scoped>
    .hello {
        min-height: 85vh;
        margin-top: 35px
    }

    /*
    
    https://www.inaturalist.org/guides/2181
https://www.inaturalist.org/guides/7945
https://www.inaturalist.org/guides/5506
http://api.inaturalist.org/v1/docs/


https://mol.org/regions/?region=Utah&regionid=b2f8b3dd-c3e2-4b70-b35b-b112dfcafc39&bounds=-114.0541,36.9986,-109.0409,42.0042

https://npm.runkit.com/wikipedia
https://www.npmjs.com/package/wikijs
https://www.npmjs.com/package/wtf_wikipedia
https://www.npmjs.com/package/wikipedia-js 


naturalist search or taxa?
    */

</style>
