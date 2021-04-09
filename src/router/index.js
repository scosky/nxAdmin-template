import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [

  {
    path: '',
    component: Layout,
    redirect: '/dashboard/dashboard'
  },

  { path: '/login', component: () => import('@/views/login'), name: '登录星辰', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },

  {
    path: '/dashboard',
    component: Layout,
    meta: { title: 'dashboard', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: '群基本管理',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: '群基本管理', icon: 'dashboard' }
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  return newRouter;
}


// export default new Router({
//   mode: 'history', // 后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export const asyncRouterMap = [

  // {
  //   path: '/group',
  //   component: Layout,
  //   meta: { title: '群功能设置', icon: 'dashboard' },
  //   children: [
  //     {
  //       path: '/menu',
  //       name: 'xxx群列表',
  //       component: () => import('@/views/group/menu/index'),
  //       meta: { title: 'xxx群列表', icon: 'dashboard' },
  //       redirect: "/menu/odds",
  //       children: [
  //         {
  //           path: 'odds0',
  //           name: '赔率设置',
  //           component: () => import('@/views/group/menu/odds/index'),
  //           meta: { title: '赔率设置', icon: 'dashboard' },
  //           props: { id: 123 }
  //         },
  //         {
  //           path: 'trust0',
  //           name: '托号设置',
  //           component: () => import('@/views/group/menu/trust/index'),
  //           meta: { title: '托号设置', icon: 'dashboard' },
  //           props: { id: 123 }
  //         },
  //         {
  //           path: 'grab0',
  //           name: '秒号设置',
  //           component: () => import('@/views/group/menu/grab/index'),
  //           meta: { title: '秒号设置', icon: 'dashboard' },
  //           props: { id: 123 }
  //         },
  //         {
  //           path: 'claim0',
  //           name: '赔付号设置',
  //           component: () => import('@/views/group/menu/claim/index'),
  //           meta: { title: '赔付号设置', icon: 'dashboard' },
  //           props: { id: 123 }
  //         },
  //         {
  //           path: 'monitor0',
  //           name: '报奖监控',
  //           component: () => import('@/views/group/menu/monitor/index'),
  //           meta: { title: '报奖监控', icon: 'dashboard' },
  //           props: { id: 123 }
  //         },
  //         {
  //           path: 'win0',
  //           name: '中奖查询',
  //           component: () => import('@/views/group/menu/win/index'),
  //           meta: { title: '中奖查询', icon: 'dashboard' },
  //           props: { id: 123 }
  //         },
  //         {
  //           path: 'turnover0',
  //           name: '流水统计',
  //           component: () => import('@/views/group/menu/turnover/index'),
  //           meta: { title: '流水统计', icon: 'dashboard' },
  //           props: { id: 123 }
  //         }
  //       ]
  //     },
  //     {
  //       path: '/menu1',
  //       name: 'xxx1群列表',
  //       component: () => import('@/views/group/menu/index'),
  //       redirect: "/menu1/odds1",
  //       meta: { title: 'xxx1群列表', icon: 'dashboard', groupId: 456 },
  //       children: [
  //         {
  //           path: 'odds1',
  //           name: '赔率设置',
  //           component: () => import('@/views/group/menu/odds/index'),
  //           meta: { title: '赔率设置', icon: 'dashboard' },
  //           props: { id: 456 }
  //         },
  //         {
  //           path: 'trust1',
  //           name: '托号设置',
  //           component: () => import('@/views/group/menu/trust/index'),
  //           meta: { title: '托号设置', icon: 'dashboard' },
  //           props: { id: 456 }
  //         },
  //         {
  //           path: 'grab1',
  //           name: '秒号设置',
  //           component: () => import('@/views/group/menu/grab/index'),
  //           meta: { title: '秒号设置', icon: 'dashboard' },
  //           props: { id: 456 }
  //         },
  //         {
  //           path: 'claim1',
  //           name: '赔付号设置',
  //           component: () => import('@/views/group/menu/claim/index'),
  //           meta: { title: '赔付号设置', icon: 'dashboard' },
  //           props: { id: 456 }
  //         },
  //         {
  //           path: 'monitor1',
  //           name: '报奖监控',
  //           component: () => import('@/views/group/menu/monitor/index'),
  //           meta: { title: '报奖监控', icon: 'dashboard' },
  //           props: { id: 456 }
  //         },
  //         {
  //           path: 'win1',
  //           name: '中奖查询',
  //           component: () => import('@/views/group/menu/win/index'),
  //           meta: { title: '中奖查询', icon: 'dashboard' },
  //           props: { id: 456 }
  //         },
  //         {
  //           path: 'turnover1',
  //           name: '流水统计',
  //           component: () => import('@/views/group/menu/turnover/index'),
  //           meta: { title: '流水统计', icon: 'dashboard' },
  //           props: { id: 456 }
  //         }
  //       ]
  //     }
  //   ]
  // }
]

export default router
