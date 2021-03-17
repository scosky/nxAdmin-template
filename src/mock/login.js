import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    code: 0,
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://raw.githubusercontent.com/mgbq/nx-admin/master/src/assets/img/home/logo.png',
    name: 'Super Admin'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    return {
      code: 0,
      Message: 'success'
    }
  }
}
