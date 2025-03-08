import * as SITE_INFO from './content/site/info.json'
import { COLOR_MODE_FALLBACK } from './utils/globals.js'

export default {
  ssr: process.env.NODE_ENV === 'production',
  target: 'static',
  components: true,
  generate: {
    fallback: true,
  },
  // ? The env Property: https://nuxtjs.org/api/configuration-env/
  env: {
    url:
      process.env.NODE_ENV === 'production'
        ? process.env.URL || 'http://createADotEnvFileAndSetURL'
        : 'http://localhost:3000',
    lang: SITE_INFO.sitelang || 'en-US',
  },
  /*
   ** Headers of the page
   */
  head: {
    title: SITE_INFO.sitename || process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: SITE_INFO.sitedescription || process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap',
        media: 'print',
        onload: `this.media='all'`,
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.1/css/bootstrap.min.css',
      },
    ], // ? Imports the font 'Inter', can be optimized by the netlify plugin 'Subfont' by uncommenting it in `netlify.toml`
    noscript: [
      {
        innerHTML:
          '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap">',
      },
    ],
    __dangerouslyDisableSanitizers: ['noscript'],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#526488' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-content-placeholders.js' },
    { src: '~/plugins/bootstrap.js' },
    { src: '~/plugins/vueTyper.client.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/color-mode', '@nuxtjs/svg'],
  /*
   ** Nuxt.js modules
   */
  modules: ['bootstrap-vue/nuxt', '@nuxt/content', '@nuxtjs/markdownit', '@nuxtjs/recaptcha'],
  markdownit: {
    runtime: true, // Support `$md()`
  },
  bootstrapVue: {
    bootstrapCSS: false,
    icons: true,
  },
  publicRuntimeConfig: {
    emailNotificationUrl: process.env.EMAIL_NOTIFICATION_URL,
    recaptcha: {
      /* reCAPTCHA options */
      version: 2,
      siteKey: process.env.SITE_RECAPTCHA_KEY, // for example
    },
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: {
      ignoreOrder: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    babel: {
      compact: true,
    },
    extend(config, ctx) {
      if (ctx.isClient) {
        // BootstrapVue and PortalVue require access to the global Vue reference (via import Vue from 'vue').
        config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
      }
    },
  },
  /*
   ** Custom additions configuration
   */
  // ? The content property: https://content.nuxtjs.org/configuration
  content: {
    dir: 'content',
  },
  colorMode: {
    classSuffix: '',
    preference: 'system', // default value of $colorMode.preference
    fallback: COLOR_MODE_FALLBACK, // fallback value if not system preference found
    componentName: 'ColorScheme',
    cookie: {
      options: {
        sameSite: 'lax',
      },
    },
  },
}
