 import request from '@/utils/agricultureRequest'

/**
 * 公开的公告接口 - 用于首页和公告详情页
 * 不需要 system:notice:* 权限
 */

/**
 * 获取公开公告列表
 * @param {Object} params - 查询参数 { pageNum, pageSize, noticeType }
 */
export const listPublicNotice = (params) => {
  return request({
    url: '/public/notice/list',
    method: 'get',
    params
  })
}

/**
 * 获取公开公告详情
 * @param {String} noticeId - 公告ID
 */
export const getPublicNotice = (noticeId) => {
  return request({
    url: `/public/notice/${noticeId}`,
    method: 'get'
  })
}
