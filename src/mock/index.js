import Mock from 'mockjs'
import tableAPI from './table'
import loginAPI from './login'
import articleAPI from './article'
import groupAPI from './group'
import oddsAPI from './odds'
import trustAPI from "./tust"
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 用户相关
Mock.mock(/\/user\/listpage/, 'get', tableAPI.getUserList)
Mock.mock(/\/user\/remove/, 'get', tableAPI.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', tableAPI.batchremove)
Mock.mock(/\/user\/add/, 'get', tableAPI.createUser)
Mock.mock(/\/user\/edit/, 'get', tableAPI.updateUser)

// 群组
Mock.mock(/\/group\/listpage/, 'get', groupAPI.getGroupList)

// 赔率
Mock.mock(/\/odds\/singleFive/, 'get', oddsAPI.getSingleFiveData)
Mock.mock(/\/odds\/doubleFive/, 'get', oddsAPI.getDoubleFiveData)
Mock.mock(/\/odds\/singleSix/, 'get', oddsAPI.getSingleSixData)
Mock.mock(/\/odds\/doubleSix/, 'get', oddsAPI.getDoubleSixData)
//托号
Mock.mock(/\/trust\/list/, 'get', trustAPI.membersList)


export default Mock
