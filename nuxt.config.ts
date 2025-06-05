// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/scss/main.scss'
  ],
  runtimeConfig: {
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    public: {
      azureStorageContainerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
    }
  }
})
