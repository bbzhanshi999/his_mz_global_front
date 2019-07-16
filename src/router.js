import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Index.vue'),
      children:[
          {
            path:'department',
            name:'department',
            component:()=> import("./views/index/Department.vue")
          }
      ]
    }
  ]
})
