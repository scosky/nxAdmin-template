import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let wins = []

for (let i = 1; i < 60; i++) {
    wins.push(Mock.mock({
        money: Mock.Random.integer(1, 10000),
        packs: Mock.Random.integer(1, 10),
        sendContent: '1-2-3',
        winResult: '1-2-3-9-7-8',
        odds: Mock.Random.integer(1, 100),
        payAmount: Mock.Random.integer(1, 10000),
        time: Mock.Random.now("yyyy-MM-dd HH:mm:ss")
    }))
}


export default {
    winsList: config => {
        const { statrTime, endTime, userId, page = 1, limit = 10 } = param2Obj(config.url);
        const mockList = wins.filter(group => {
            return true
        })
        const winList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 0,
            data: {
                total: mockList.length,
                winsData: winList
            }
        }
    },
}