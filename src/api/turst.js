import request from '@/utils/request'

export function membersData(params) {
  return request({
    url: '/trust/list',
    method: 'get',
    params: params
  })
}
