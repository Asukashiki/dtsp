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

  export const postProcessList = (params) => {
    return request({
      url: '/rbac/process/list',
      method: 'post',
      data: params
    })
  }

  
  export const postHistoryList = () => {
    return request({
      url: '/history/list',
      method: 'get'
    })
  }

  export const postHistoryListWeek = () => {
    return request({
      url: '/history/listWeek',
      method: 'get'
    })
  }