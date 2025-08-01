
// 
import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue'
import App from '../App.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// 1.配置路由规则
const routes = [
  {
    path:'/',
    name:'home',
    component:App,
  },
  {
    path: '/map',  //路径
    name: 'map',
    component: MapView,  // 页面
  }
]

//2.创建路由器
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  //路由工作模式
  routes:routes
})

export default router

// 3.在main.ts中查看代码，也可以放到这里，是加载路由器
