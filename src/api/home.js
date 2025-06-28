import request from '../utils/request'

export const getNoticeList = (params) => {
    return request({
      url: '/rbac/notice/list',
      method: 'post',
      data: params
    })
  }


  export const getNoticeDetail = (id) => {
    return request({
      url: '/rbac/notice/detail',
      method: 'get',
      params: {
        id
      }
    })
  } 