import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cpu from '../views/CPU.vue'
import Mem from '../views/Mem.vue'
import Net from '../views/Net'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cpu',
    name: 'cpuinfo',
    component: Cpu
  },
  {
    path: '/memory',
    name: 'meminfo',
    component: Mem
  },
  {
    path: '/net',
    name: 'netinfo',
    component: Net
  }
]

const router = new VueRouter({
  routes
})

export default router
