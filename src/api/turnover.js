import request from '@/utils/request'

export function turnoverData(params) {
    return request({
        url: '/group/trade/stat',
        method: 'get',
        params: params
    })
}