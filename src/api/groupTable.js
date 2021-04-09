import request from '@/utils/request'

export function getGroupListPage(params) {
  return request({
    url: '/mgr/group/list',
    method: 'get',
    params: params
  })
}

export function getGroupDetail(params) {
  return request({
    url: '/mgr/group/detail',
    method: 'get',
    params: params
  })
}

export function getGroupMens() {
  return request({
    url: '/mgr/group/menu',
    method: 'get',
  })
}

export function getTurnovers(params) {
  return request({
    url: '/group/trade/stat',
    method: 'get',
    params: params
  })
}

export function getThisField(params) {
  return request({
    url: '/group/trade/stat/thisField',
    method: 'get',
    params: params
  })
}

export function getPaidRate(params) {
  return request({
    url: '/group/get/paidRate',
    method: 'get',
    params: params
  })
}

export function getNinePaidRate(params) {
  return request({
    url: '/group/get/ninePaidRate',
    method: 'get',
    params: params
  })
}

export function setPaidMoney(params) {
  return request({
    url: '/set/topLimit',
    method: 'get',
    params: params
  })
}

export function getPaidMoney(params) {
  return request({
    url: '/get/topLimit',
    method: 'get',
    params: params
  })
}

export function getPaidRule(params) {
  return request({
    url: '/get/paidRule',
    method: 'get',
    params: params
  })
}

export function getWinData(params) {
  return request({
    url: '/group/win/list',
    method: 'get',
    params: params
  })
}

