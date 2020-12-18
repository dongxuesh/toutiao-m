/*eslint-disable*/
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/') //路由懒加载
  },
  {
    path: '/',
    component: () => import('@/views/layout/'), // 一级路由
    children: [
      {
        path: '',//默认子路由  有且只有一个
        name: 'home',
        component: () => import('@/views/home/') // 二级路由
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: '/my',
        component: () => import('@/views//my/')
      }
    ]
  },
  {
    path:'/search',
    name:'search',
    component: () => import('@/views/search/')
  },
  {
    path:'/article/:articleId',
    name:'article',
    component: () => import('@/views/article/'),
    props:true
  }

]

const router = new VueRouter({
  routes
})

export default router
