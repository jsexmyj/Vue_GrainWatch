import './assets/global.css'
import 'element-plus/dist/index.css'
import 'leaflet/dist/leaflet.css'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'


// 3.加载路由器
const app = createApp(App)
// app.use(router)
app.mount('#app')
