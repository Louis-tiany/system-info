import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CPU from '../views/CPU.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CPU',
    component: CPU
  },
]

const router = new VueRouter({
  routes
})

export default router
