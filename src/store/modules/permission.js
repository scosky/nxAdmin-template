import { asyncRouterMap, constantRouterMap } from '@/router'
import { getGroupMens } from "@/api/groupTable"
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, roles)
    }
  })
  return accessedRouters
}

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
            var menuChild = {
              path: '/menu' + index,
              component: () => import('@/views/group/menu/index'),
              meta: {
                title: item.name,
                icon: 'dashboard'
              },
              redirect: "/menu/odds",
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
        // let accessedRouters = menu
        // console.log(accessedRouters)
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // console.log(accessedRouters)
        // commit('SET_ROUTERS', accessedRouters)
      })
    }
  }
}

export default permission
