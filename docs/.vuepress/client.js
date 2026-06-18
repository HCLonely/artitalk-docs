import { defineClientConfig } from 'vuepress/client'

import AdsByGoogle from './components/AdsByGoogle.vue'
import Demo from './components/demo.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('AdsByGoogle', AdsByGoogle)
    app.component('Demo', Demo)
  },
})
