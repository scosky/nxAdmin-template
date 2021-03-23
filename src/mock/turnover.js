import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let turnovers = {}


turnovers.packs = Mock.Random.integer(1, 10000)
turnovers.persons = Mock.Random.integer(1, 100)
turnovers.waters = Mock.Random.integer(1, 10000)
turnovers.time = Mock.Random.now("yyyy-MM-dd HH:mm:ss")
turnovers.data = []
let data = []
for (let i = 1; i < 60; i++) {
    data.push(Mock.mock({
        seq: Mock.Random.integer(1, 100),
        nickname: Mock.Random.cname(),
        pack: Mock.Random.integer(1, 100),
        water: Mock.Random.integer(1, 1000),
        time: Mock.Random.now("yyyy-MM-dd HH:mm:ss")
    }))
}
turnovers.data = data;


export default {
    turnoverList: config => {
        const { statrTime, endTime, groupId, page = 1, limit = 10 } = param2Obj(config.url);
        const mockList = turnovers.data.filter(group => {
            return true
        })
        const list = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 0,
            data: {
                total: turnovers.length,
                turnoverData: turnovers
            }
        }
    },
}