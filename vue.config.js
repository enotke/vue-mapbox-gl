module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.vue', '.js', '.json'],
    },
    externals: {
      'maplibre-gl': {
        commonjs: 'maplibre-gl',
        commonjs2: 'maplibre-gl',
        amd: 'mapboxgl',
        root: 'mapboxgl',
      },
      '@maplibre/maplibre-gl-geocoder': {
        commonjs: '@maplibre/maplibre-gl-geocoder',
        commonjs2: '@maplibre/maplibre-gl-geocoder',
        amd: 'MapboxGeocoder',
        root: 'MapboxGeocoder',
      },
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        am: 'Vue',
        root: 'Vue',
      },
    },
  },
};
