import agricultureRequest from '../utils/agricultureRequest'

/**
 * 环境监测新数据 API
 * Environment New Data API
 */

/**
 * 分页查询环境监测数据列表
 * Query environment new data list with pagination
 */
export const getEnvironmentNewDataPage = (params) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/list',
    method: 'get',
    params
  })
}

/**
 * 获取环境监测数据详情
 * Get environment new data detail
 */
export const getEnvironmentNewDataDetail = (envRecordId) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/getInfo',
    method: 'get',
    params: { envRecordId }
  })
}

/**
 * 新增环境监测数据
 * Add environment new data
 */
export const addEnvironmentNewData = (data) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/add',
    method: 'post',
    data
  })
}

/**
 * 修改环境监测数据
 * Update environment new data
 */
export const updateEnvironmentNewData = (data) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/edit',
    method: 'post',
    data
  })
}

/**
 * 删除环境监测数据
 * Delete environment new data
 */
export const deleteEnvironmentNewData = (envRecordIds) => {
  return agricultureRequest({
    url: '/breeding/environmentNew/remove',
    method: 'get',
    params: { envRecordIds: envRecordIds.join(',') }
  })
}
