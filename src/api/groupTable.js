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

