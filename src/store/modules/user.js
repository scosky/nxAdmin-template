import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import md5 from 'blueimp-md5'

const user = {
  state: {
    token: getToken(),
    name: '',
    uuid: '',
    avatar: '',
    wsUrl: '',
    roles: []

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_UUId: (state, uuid) => {
      state.uuid = uuid
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_WS_URL: (state, wsUrl) => {
      state.wsUrl = wsUrl
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const pwd = md5(userInfo.password.trim())
      return new Promise((resolve, reject) => {
        login(username, pwd).then(response => {
          console.log(response)
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_WS_URL', data.wsUrl)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const uuid = response.data.userId
          const name = response.data.nickName
          commit('SET_UUId', uuid)
          commit('SET_NAME', name)
          const roles = ['admin']
          commit('SET_ROLES', roles)
          resolve({ 'roles': roles })
        })
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_NAME', '')
          commit('SET_WS_URL', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        commit('SET_WS_URL', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
