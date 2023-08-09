import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/index'
import login from '@/components/login/login'
import home from '@/components/home/home'
import analysis from '@/components/analysis/analysis'
import analysisDetails from '@/components/analysis/analysisDetails'
import operation from '@/components/operation/index'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: analysis,
  },
  {
    path: '/analysisDetails',
    name: 'analysisDetails',
    component: analysisDetails,
  },
  {
    path: '/operation',
    name: 'operation',
    component: operation,
  },
  ]
})