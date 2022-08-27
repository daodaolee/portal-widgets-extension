import { createApp } from 'vue'
import app from './App.vue'

import '../icons'
import svgIcon from './components/icon.vue'
// import hotReload from '../utils/tools'
// hotReload()
createApp(app).component('svg-icon', svgIcon).mount('#app')
