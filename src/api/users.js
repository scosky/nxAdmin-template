import ajaxRequest from '@/utils/ajaxRequest'

export function modifyUser(params) {
    return ajaxRequest({
        url: '/user/modify',
        method: 'post',
        data: params
    })
}
export function modifyPwd(params) {
    return ajaxRequest({
        url: '/user/update/pwd',
        method: 'post',
        data: params
    })
}

export function setPaidRate(params) {
    return ajaxRequest({
        url: '/group/set/paidRate',
        method: 'post',
        data: params
    })
}

export function setNinePaidRate(params) {
    return ajaxRequest({
        url: '/group/set/ninePaidRate',
        method: 'post',
        data: params
    })
}


export function modifyGroup(params) {
    return ajaxRequest({
        url: '/group/modify',
        method: 'post',
        data: params
    })
}
