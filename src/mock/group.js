import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      groupId: Mock.Random.guid(),
      name: Mock.Random.cname(),
      creator:  Mock.Random.cname(),
      owner: Mock.Random.cname(),
      status:  Mock.Random.integer(0, 3),
      createTime:  Mock.Random.date()
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