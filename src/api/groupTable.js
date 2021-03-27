import request from '@/utils/request'

export function getGroupListPage(params) {
  return request({
    url: '/mgr/group/list',
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

export function getGroupOdds(params) {
  return request({
    url: '/group/get/odds',
    method: 'get',
    params: params
  })
}