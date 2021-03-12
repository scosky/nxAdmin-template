import request from '@/utils/request'

export function singleFive(data) {
  return request({
    url: '/odds/singleFive',
    method: 'get',
    data: data
    
  })
}
export function doubleFive(data) {
    return request({
      url: '/odds/doubleFive',
      method: 'get',
      data: data
    })
  }
  export function singleSix(data) {
    return request({
      url: '/odds/singleFive',
      method: 'get',
      data: data
    })
  }
  export function doubleSix(data) {
    return request({
      url: '/odds/doubleFive',
      method: 'get',
      data: data
    })
  }
  

