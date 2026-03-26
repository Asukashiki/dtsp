import agricultureRequest from '../utils/agricultureRequest'

export const getMultiplierReportList = (params = {}) => {
  return agricultureRequest({
    url: '/seed/multiplier-report/list',
    method: 'get',
    params
  })
}

export const getMultiplierReport = (id) => {
  return agricultureRequest({
    url: `/seed/multiplier-report/${id}`,
    method: 'get'
  })
}

export const addMultiplierReport = (data) => {
  return agricultureRequest({
    url: '/seed/multiplier-report',
    method: 'post',
    data
  })
}

export const updateMultiplierReport = (data) => {
  return agricultureRequest({
    url: '/seed/multiplier-report',
    method: 'put',
    data
  })
}

export const deleteMultiplierReport = (id) => {
  return agricultureRequest({
    url: `/seed/multiplier-report/${id}`,
    method: 'delete'
  })
}
