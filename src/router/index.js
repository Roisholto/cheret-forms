import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PersonalInfo from '@/components/PersonalInfo.vue' ;
import Forms from '@/components/Forms.vue' ;

import store from '@/store' ;
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/info',
    name:'personal-info',
    component:PersonalInfo
  },
  {
    path:'/forms',
    component:Forms,
    children:[
      {
        name:'publishing',
        path:'publishing',
        component:()=>import(/* webpackChunkName: "about" */ '@/components/Publishing.vue')
      },
      {
        name:'promotion',
        path:'promotion',
        component:()=>import(/* webpackChunkName: "about" */ '@/components/Promotion.vue')
      },
      {
        name:'launching',
        path:'launching',
        component:()=>import(/* webpackChunkName: "about" */ '@/components/Promotion.vue')
      },
      {
        name:'proofreading',
        path:'proofreading',
        component:()=>import(/* webpackChunkName: "about" */ '@/components/Proofreading.vue')
      },
      {
        name:'writing',
        path:'writing',
        component:()=>import(/* webpackChunkName: "about" */ '@/components/Writing.vue')
      }
    ]
  },

  {
    path: '/success',
    name: 'success',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/Success.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
