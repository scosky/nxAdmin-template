import request from '@/utils/request'

export function membersData(params) {
  return request({
    url: '/group/members',
    method: 'get',
    params: params
  })
}

export function setTrust(params) {
  return request({
    url: '/set/trust',
    method: 'get',
    params: params
  })
}

export function cancelTrust(params) {
  return request({
    url: '/cancel/trust',
    method: 'get',
    params: params
  })
}

export function startTrust(params) {
  return request({
    url: '/start/trust',
    method: 'get',
    params: params
  })
}

export function stopTrust(params) {
  return request({
    url: '/stop/trust',
    method: 'get',
    params: params
  })
}

export function setGrab(params) {
  return request({
    url: '/set/grab',
    method: 'get',
    params: params
  })
}

export function cancelGrab(params) {
  return request({
    url: '/cancel/grab',
    method: 'get',
    params: params
  })
}

export function startGrab(params) {
  return request({
    url: '/start/grab',
    method: 'get',
    params: params
  })
}

export function stopGrab(params) {
  return request({
    url: '/stop/grab',
    method: 'get',
    params: params
  })
}

export function setIndemnity(params) {
  return request({
    url: '/set/indemnity',
    method: 'get',
    params: params
  })
}

export function cancelIndemnity(params) {
  return request({
    url: '/cancel/indemnity',
    method: 'get',
    params: params
  })
}

export function startIndemnity(params) {
  return request({
    url: '/start/indemnity',
    method: 'get',
    params: params
  })
}

export function stopIndemnity(params) {
  return request({
    url: '/stop/indemnity',
    method: 'get',
    params: params
  })
}

export function setRobot(params) {
  return request({
    url: '/set/robot',
    method: 'get',
    params: params
  })
}

export function cancelRobot(params) {
  return request({
    url: '/cancel/robot',
    method: 'get',
    params: params
  })
}

export function startRobot(params) {
  return request({
    url: '/start/robot',
    method: 'get',
    params: params
  })
}

export function stopRobot(params) {
  return request({
    url: '/stop/robot',
    method: 'get',
    params: params
  })
}


export function mSendData(params) {
  return request({
    url: '/group/members/mSend',
    method: 'get',
    params: params
  })
}

export function grabData(params) {
  return request({
    url: '/group/members/grab',
    method: 'get',
    params: params
  })
}

export function paidData(params) {
  return request({
    url: '/group/members/paid',
    method: 'get',
    params: params
  })
}

export function mcData(params) {
  return request({
    url: '/group/members/mc',
    method: 'get',
    params: params
  })
}
