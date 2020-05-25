
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      // { "http-equiv": "Content-Security-Policy", content: "default-src *; style-src 'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
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
    { src: '~/plugins/swiper.js', ssr: false },
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
    extend(config, { ctx, isClient }) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader'],
      });
      if (isClient) {
        console.log('Mode: ', process.env.NODE_ENV)
        config.devtool = process.env.NODE_ENV === 'development' ? '#source-map' : '';
      }
    }
  }
}
