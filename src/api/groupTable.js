import request from '@/utils/request'

export function getGroupListPage(params) {
  return request({
    url: '/group/listpage',
    method: 'get',
    params: params
  })
}