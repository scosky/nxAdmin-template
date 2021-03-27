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

export function setGroupOdds(params) {
  return request({
    url: '/group/set/odds',
    method: 'post',
    params: params
  })
}

export function getGroupOdds(params) {
  return request({
    url: '/group/get/odds',
    method: 'get',
    params: params
  })
}