import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 6

for (let i = 1; i < count; i++) {
    List.push(Mock.mock({
        id:i,
        index:i,
        value:i
    }))
}

export default {
    getData: config => {
        return {
          code: 0,
          data: {
            val: List
          }
        }
      }
}