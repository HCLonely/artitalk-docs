import { defineClientConfig } from 'vuepress/client'

import Demo from './components/demo.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Demo', Demo)
  },
})
