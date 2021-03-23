import request from '@/utils/request'

export function winData(params) {
    return request({
        url: '/group/win/list',
        method: 'get',
        params: params
    })
}