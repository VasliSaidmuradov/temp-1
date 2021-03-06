
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Интернет-магазин уходовой косметики | SKINY.KZ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Интернет-магазин уходовой косметики, заказать косметику Алматы, косметика Алматы, доставка косметика Алматы, доставка уходовой косметики' },
      { hid: 'yandex-v', name: 'yandex-verification', content: 'dc85a4bf8dfbf82e' },
      // { "http-equiv": "Content-Security-Policy", content: "default-src *; style-src 'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'"}
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
    // script: [
    //   { src: '//code.jivosite.com/widget/42hJJnq8V7', async: true }
    // ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading:  'components/partials/Preloader.vue',
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.scss',
    'swiper/dist/css/swiper.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/swiper.js', mode: 'client' },
    { src: '~/plugins/vue-the-mask.js', ssr: false },
    { src: '~/plugins/smooth-scroll', ssr: false },
    { src: '~/plugins/vue-scrollmagic', ssr: false },
    { src: '~/plugins/api' },
    { src: '~/plugins/error' },
    { src: '~/plugins/auth' },
    { src: '~/plugins/helpers' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: 'UA-115008368-2'
    }],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '65062288',
        webvisor: true,
        clickmap: true,
        // useCDN:false,
        trackLinks: true,
        accurateTrackBounce: true,
      }
    ],
    ['nuxt-lazy-load', {
        // These are the default values
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        native: false,
        polyfill: true,
        directiveOnly: false,

        // Default image must be in the static folder
        defaultImage: '/images/placeholder.jpg',

        // To remove class set value to false
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',

        observerConfig: {
            // See IntersectionObserver documentation
        }
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'https://demo-13.brandstudio.kz/api',
    proxyHeaders: false,
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    analyze: false,
    extend(config, { ctx, isClient }) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      });
      if (isClient) {
        config.devtool = process.env.NODE_ENV === 'development' ? '#source-map' : '';
      }
    }
  },
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },
  // server: {
  //   port: 3000, // default: 3000
  //   host: '0.0.0.0' // default: localhost
  // }
}
