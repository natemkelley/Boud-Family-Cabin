const SWPrecache = require('sw-precache-webpack-plugin')

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(
                new SWPrecache({
                    cacheId: 'boud-family-cabin',
                    filepath: 'public/service-worker.js',
                    staticFileGlobs: [
                    'index.html',
                    'manifest.json',
                    'dist/*.{js,css}'
                  ],
                    stripPrefix: '/'
                }))
        } else {
            console.log('bummer dude')
        }
    },
}

/*
        plugins: [
                new SWPrecache({
                cacheId: 'boud-family-cabin',
                filepath: 'public/service-worker.js',
                staticFileGlobs: [
                    'index.html',
                    'manifest.json',
                    'dist/*.{js,css}'
                  ],
                stripPrefix: '/'
            })

]
*/
