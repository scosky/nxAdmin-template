import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let singleFiveData = []
let doubleFiveData = []

let singleSixData = []
let doubleSixData = []

for (let i = 1; i < 6; i++) {
    singleFiveData.push(Mock.mock({
        id: i,
        index: i,
        value: Mock.Random.integer(0, 100)
    }))

    doubleFiveData.push(Mock.mock({
        id: i,
        index: i,
        value: Mock.Random.integer(0, 100)
    }))
}

for (let i = 1; i < 7; i++) {
    singleSixData.push(Mock.mock({
        id: i,
        index: i,
        value: Mock.Random.integer(0, 100)
    }))

    doubleSixData.push(Mock.mock({
        id: i,
        index: i,
        value: Mock.Random.integer(0, 100)
    }))
}

export default {
    getSingleFiveData: config => {
        return {
            code: 0,
            data: {
                singleFive: singleFiveData
            }
        }
    },

    getDoubleFiveData: config => {
        return {
            code: 0,
            data: {
                doubleFive: doubleFiveData
            }
        }
    },
    getSingleSixData: config => {
        return {
            code: 0,
            data: {
                singleSix: singleSixData
            }
        }
    },
    getDoubleSixData: config => {
        return {
            code: 0,
            data: {
                doubleSix: doubleSixData
            }
        }
    }
}