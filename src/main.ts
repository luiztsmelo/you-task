import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueApexCharts from 'vue3-apexcharts'
import { worker } from '@/mocks/browser'

loadFonts()

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueApexCharts)
  .mount('#app')
