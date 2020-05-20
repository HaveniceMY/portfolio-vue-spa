/* eslint-disable no-param-reassign */
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'SC Kim Portfolio',
    themeColor: '#0d1679',
    msTileColor: '#0d1679',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#0d1679',
    manifestOptions: {
      background_color: '#f2f2f2',
      purpose: 'maskable any',
    },
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js',
      // ...other Workbox options...
    },
  },

  // pluginOptions: {
  //   prerenderSpa: {
  //     registry: undefined,
  //     renderRoutes: [
  //       '/',
  //       '/timeline',
  //       '/interests',
  //       '/skills',
  //       '/awards',
  //       '/contact',
  //       '/success',
  //     ],
  //     postProcess(renderedRoute) {
  //       renderedRoute.route = renderedRoute.originalRoute;
  //       renderedRoute.html = renderedRoute.html.split(/>[\s]+</gim).join('><');
  //       if (renderedRoute.route.endsWith('.html')) {
  //         renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route);
  //       }
  //       return renderedRoute;
  //     },
  //     useRenderEvent: true,
  //     headless: true,
  //     onlyProduction: true,
  //   },
  // },
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),

        // IMPORTANT HERE
        routes: ['/',
          '/timeline',
          '/interests',
          '/skills',
          '/awards',
          '/contact',
          '/success'],

        // IMPORTANT HERE
        postProcess(renderedRoute) {
          renderedRoute.route = renderedRoute.originalRoute;
          renderedRoute.html = renderedRoute.html.split(/>[\s]+</gim).join('><');
          if (renderedRoute.route.endsWith('.html')) {
            renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route);
          }
          return renderedRoute;
        },
      }),
    ],
  },
};
