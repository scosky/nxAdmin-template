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
