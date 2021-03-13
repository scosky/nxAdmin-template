import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let members = []
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
    }
  })

for (let i = 1; i < 60; i++) {
    const phonePrefix = ['132', '135', '189']
    const index = Math.floor(Math.random() * phonePrefix.length)
    var phone = phonePrefix[index] + Mock.mock(/\d{8}/)
    members.push(Mock.mock({
        id:  Mock.Random.integer(0, 100)+"",
        name: Mock.Random.cname(),
        phone:phone,
        isTrust: Mock.Random.integer(0, 1)
    }))
}


export default {
    membersList: config => {
            const { phone,id, page = 1, limit = 10 } = param2Obj(config.url)
            const mockList = members.filter(group => {  
              if (phone && group.phone.indexOf(phone) === -1){
                return false
              } 
              if (id && group.id.indexOf(id) === -1){
                return false
              } 
              if (id && group.id.indexOf(id) === -1 && phone && group.phone.indexOf(phone) === -1 ){
                return false
              } 
              return true
            })
        const membersData = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 0,
            data: {
                total :mockList.length,
                members: membersData
            }
        }
    },
}