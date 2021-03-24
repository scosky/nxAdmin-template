import request from '@/utils/request'

export function getGroupListPage(params) {
  return request({
    url: '/mgr/group/list',
    method: 'get',
    params: params
  })
}