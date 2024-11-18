import { configure } from "quasar/wrappers";
import commonjs from "@rollup/plugin-commonjs";

export default configure(function () {
  return {
    boot: ["qcalendar", "store", "vuex-orm-axios"],
    css: ["app.scss"],
    extras: ["roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node20",
      },
      vueRouterMode: "hash",
      publicPath: "",
      minify: "esbuild",
      esbuild: {
        target: "esnext",
      },

      vitePlugins: [
        [
          "vite-plugin-checker",
          {
            eslint: {
              lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
        commonjs(), // Ensures CommonJS modules are properly transformed
      ],

      extendViteConf(viteConf) {

        viteConf.build = viteConf.build || {};
        viteConf.build.rollupOptions = viteConf.build.rollupOptions || {};
        viteConf.build.rollupOptions.output = {
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'js/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name].css';
            }
            return 'assets/[name].[ext]';
          },
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        };

        viteConf.build.commonjsOptions = viteConf.build.commonjsOptions || {};
        viteConf.build.commonjsOptions.include = [/node_modules\/moment/];

        viteConf.server = {
          ...viteConf.server,
          fs: {
            strict: false // Disable strict file serving restrictions
          }
        };

      },
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {
        brand: {},
      },
      plugins: [],
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ["render"],
    },

    pwa: {
      workboxMode: "generateSW",
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
    },

    cordova: {},
    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      inspectPort: 5858,
      bundler: "packager",
      packager: {},
      builder: {
        appId: "quasar-project",
      },
    },

    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
