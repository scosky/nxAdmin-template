import router from './router'
import store from './store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import {
  setTitle
} from '@/utils/util'

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})
