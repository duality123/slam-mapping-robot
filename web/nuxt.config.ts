// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  css: [
    '@/assets/app.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
 ssr:false,
 modules: [
    // ...
    '@pinia/nuxt',
  ],
 runtimeConfig:{
  public:{
    backendURL:process.env.BACKEND_URL,
    base_url:process.env.BASE_URL
  }
 }
})


