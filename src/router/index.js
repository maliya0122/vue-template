/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2019-10-24 19:43:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-08 20:01:20
 */
import Vue from 'vue'
import Router from 'vue-router'
import syncRouterConfig from './config'
const _import = (file) => () => import('@/views/' + file + '.vue')

Vue.use(Router)
export const constRouterConfig = [
  // 基础路由
  // 重定向
  {
    path: '/',
    redirect: '/kfxt'
  },
  {
    path: '/404',
    name: 'error_404',
    component: _import('error/404page')
  },
  {
    path: '/502',
    name: 'error_502',
    component: _import('error/502page')
  }
]

// 右侧菜单栏
export const menuMap = syncRouterConfig

// fullPath：每个都把路径写出来，给后面component
export const transformRouterConfig = (routerRoot, parent, index) => {
  const fullPath = parent.fullPath
    ? `${parent.fullPath}/${routerRoot.path}`
    : `${routerRoot.path}`
  const emunId = parent.emunId
    ? `${parent.emunId}-${index + 1}`
    : `${index + 1}`
  const tmpRouterRoot = {
    path: routerRoot.path,
    fullPath,
    name: routerRoot.name,
    emunId
  }
  if (routerRoot.children && routerRoot.children.length) {
    const children = routerRoot.children.map((child, cIndex) => transformRouterConfig(child, tmpRouterRoot, cIndex))
    tmpRouterRoot.path = '/' + fullPath //  /about/about1
    tmpRouterRoot.children = children
  }
  return tmpRouterRoot
}

// fullPath转化到path路径
const transFullPath = (child, treeRoute) => {
  if (!child.children) {
    treeRoute.push({
      path: child.fullPath, // user/user1/user11
      name: child.name,
      component: _import(child.fullPath.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase()))
    })
  } else {
    child.children.forEach(_child => {
      transFullPath(_child, treeRoute)
    })
  }
  return treeRoute
}

// 路由生成
const _routerMap = () => {
  const routerMap = []
  syncRouterConfig.forEach(item => {
    item.fullPath = `${item.path}` // 第一层路由：about
    const children = item.children.map((child, index) => transformRouterConfig(child, item, index))
    children.forEach(child => {
      const treeRoute = []
      transFullPath(child, treeRoute).forEach(_item => {
        routerMap.push(_item)
      })
    })
  })
  return routerMap // 把fullpath转换成path，把子路由全部写出来了，相当于一级路由了，有7个
}

export const routerMap = _routerMap()

// 整合路由
export const _layout = {
  path: '/kfxt',
  component: _import('layout'),
  children: routerMap
}
// 首页加入二级路由
_layout.children.push({
  path: '/',
  name: 'home',
  component: _import('home/home')
})

constRouterConfig.push(_layout)

// console.log(constRouterConfig)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: constRouterConfig
})

// 未登录禁止访问
// router.beforeEach((to, from, next) => {
//   // if (to.path === '/login') {
//   //   next()
//   // } else {
//   //   let token = sessionStorage.getItem('token')
//   //   if (!token) {
//   //     next('/login')
//   //   } else {
//   //     next()
//   //   }
//   // }
// })
export default router
