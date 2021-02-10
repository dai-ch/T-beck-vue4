import { createRouter, createWebHistory } from 'vue-router'
import CustomerInfo from '../views/CustomerInfo.vue'

const routes = [
  {
    path: '/',
    name: 'CustomerInfo',
    component: CustomerInfo
  },
  {
    path: '/interview',
    name: 'Interview',
    component: () => import(/* webpackChunkName: "about" */ '../views/Interview.vue')
  },
  {
    path: '/consultation',
    name: 'Consultation',
    // route level code-splitting
    // this generates a separate chunk (consultation.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "consultation" */ '../views/Consultation.vue')
  }, {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (consultation.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "consultation" */ '../views/About.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


//Module Error(from./ node_modules / eslint - loader / index.js):