// import { constantRouterMap } from '@/router'
import { getGroupMens } from '@/api/groupTable'
import Layout from '@/views/layout/Layout'

const constantRouterMap = [

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

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const menu = [{
          path: '/group',
          component: Layout,
          meta: { title: '群功能设置', icon: 'dashboard', roles: ['admin'] },
          children: []
        }]
        getGroupMens().then((res) => {
          res.data.map(function (item, index) {
            const menuChild = {
              path: '/menu' + index,
              component: () => import('@/views/group/menu/index'),
              meta: {
                title: item.name,
                icon: 'dashboard'
              },
              redirect: '/menu/odds',
              children: [
                {
                  path: 'odds',
                  name: '赔率设置【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/odds/index'),
                  meta: {
                    title: '赔率设置',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                },
                {
                  path: 'trust' + index,
                  name: '托号设置【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/trust/index'),
                  meta: {
                    title: '托号设置',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                },
                {
                  path: 'grab' + index,
                  name: '秒号设置【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/grab/index'),
                  meta: {
                    title: '秒号设置',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                },
                {
                  path: 'claim' + index,
                  name: '赔付号设置【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/claim/index'),
                  meta: {
                    title: '赔付号设置',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                },
                {
                  path: 'monitor' + index,
                  name: '报奖监控【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/monitor/index'),
                  meta: {
                    title: '报奖监控',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                },
                {
                  path: 'win' + index,
                  name: '中奖查询【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/win/index'),
                  meta: {
                    title: '中奖查询',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                },
                {
                  path: 'turnover' + index,
                  name: '流水统计【' + item.groupId + '】',
                  component: () => import('@/views/group/menu/turnover/index'),
                  meta: {
                    title: '流水统计',
                    icon: 'dashboard'
                  },
                  props: { id: item.groupId, name: item.name }
                }
              ]
            }
            menu[0].children.push(menuChild)
          })
          commit('SET_ROUTERS', menu)
          resolve()
        })
      })
    }
  }
}

export default permission
