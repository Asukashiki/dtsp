import agricultureRequest from '../utils/agricultureRequest'

/**
 * 物联网传感器维护 API
 * IoT Sensor Maintenance API
 */

/**
 * 分页查询物联网传感器列表
 * Query IoT sensor list with pagination
 */
export const getIotSensorPage = (data) => {
  return agricultureRequest({
    url: '/seed/iotSensor/page',
    method: 'post',
    data
  })
}

/**
 * 查询物联网传感器列表（不分页）
 * Query IoT sensor list without pagination
 */
export const getIotSensorList = (data) => {
  return agricultureRequest({
    url: '/seed/iotSensor/page',
    method: 'post',
    data
  })
}

/**
 * 获取物联网传感器详情
 * Get IoT sensor detail
 */
export const getIotSensorDetail = (dataId) => {
  return agricultureRequest({
    url: '/seed/iotSensor/detail',
    method: 'get',
    params: { dataId }
  })
}

/**
 * 新增物联网传感器
 * Add IoT sensor
 */
export const addIotSensor = (data) => {
  return agricultureRequest({
    url: '/seed/iotSensor/add',
    method: 'post',
    data
  })
}

/**
 * 修改物联网传感器
 * Update IoT sensor
 */
export const updateIotSensor = (data) => {
  return agricultureRequest({
    url: '/seed/iotSensor/update',
    method: 'post',
    data
  })
}

/**
 * 删除物联网传感器
 * Delete IoT sensor
 */
export const deleteIotSensor = (dataIds) => {
  return agricultureRequest({
    url: '/seed/iotSensor/delete',
    method: 'post',
    data: dataIds
  })
}
