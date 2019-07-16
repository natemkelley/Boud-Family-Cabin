module.exports = {
  staticFileGlobs: [
    'index.html',
    'manifest.json',
    'dist/**.js',
    '../dist/**.js',
    'animalImages/**.*',
    'img/**.*'  
  ]
}

//sw-precache --config sw-config.js
//https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-sw
//https://naturaily.com/blog/pwa-vue-cli-3