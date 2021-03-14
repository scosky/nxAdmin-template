import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    groupId: Mock.Random.integer(10000, 99999999),
    name: Mock.Random.cname(),
    creator: Mock.Random.cname(),
    owner: Mock.Random.cname(),
    status: Mock.Random.integer(0, 3),
    intro: "testest",
    isAddFriend: Mock.Random.integer(0, 1),
    isSetNickname: Mock.Random.integer(0, 1),
    isVodChat: Mock.Random.integer(0, 1),
    isGrpQrcode: Mock.Random.integer(0, 1),
    inviteConfirm: Mock.Random.integer(0, 1),
    createTime: Mock.Random.datetime()
  }))
}

export default {
  getGroupList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(group => {
      if (name && group.name.indexOf(name) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        groups: pageList
      }
    }
  }
}