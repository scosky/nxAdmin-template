import Mock from 'mockjs'
import loginAPI from './login'
import groupAPI from './group'
import oddsAPI from './odds'
import trustAPI from "./tust"
import winAPI from "./win"
import turnoverAPI from "./turnover"
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 群组
Mock.mock(/\/group\/listpage/, 'get', groupAPI.getGroupList)
Mock.mock(/\/odds\/singleFive/, 'get', oddsAPI.getSingleFiveData)
Mock.mock(/\/odds\/doubleFive/, 'get', oddsAPI.getDoubleFiveData)
Mock.mock(/\/odds\/singleSix/, 'get', oddsAPI.getSingleSixData)
Mock.mock(/\/odds\/doubleSix/, 'get', oddsAPI.getDoubleSixData)
Mock.mock(/\/trust\/list/, 'get', trustAPI.membersList)
Mock.mock(/\/group\/win\/list/, 'get', winAPI.winsList)
Mock.mock(/\/group\/trade\/stat/, 'get', turnoverAPI.turnoverList)

export default Mock
