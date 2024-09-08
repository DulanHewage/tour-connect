// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
    "nuxt-icons",
    "@vueuse/nuxt",
  ],
  css: ["~/assets/css/common.css"],
  runtimeConfig: {
    public: {
      localApiBase: "http://localhost:5000/api/v1",
      dockerApiBase: "http://express-app:5000/api/v1",
      isDocker: process.env.DOCKER,
    },
  },
});
