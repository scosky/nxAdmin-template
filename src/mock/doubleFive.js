import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 6

for (let i = 1; i < count; i++) {
  List.push(Mock.mock({
    id: i,
    index: i,
    value: Mock.Random.integer(0, 100)
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