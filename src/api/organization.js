import agricultureRequest from '../utils/agricultureRequest'

/** 查询组织列表 */
export const getOrganizationList = (params = {}) => {
  return agricultureRequest({
    url: '/seed/organization/list',
    method: 'get',
    params
  })
}

/** 查询组织详情 */
export const getOrganization = (id) => {
  return agricultureRequest({
    url: `/seed/organization/${id}`,
    method: 'get'
  })
}

/** 新增组织 */
export const addOrganization = (data) => {
  return agricultureRequest({
    url: '/seed/organization',
    method: 'post',
    data
  })
}

/** 修改组织 */
export const updateOrganization = (data) => {
  return agricultureRequest({
    url: '/seed/organization',
    method: 'put',
    data
  })
}

/** 删除组织 */
export const deleteOrganization = (id) => {
  return agricultureRequest({
    url: `/seed/organization/${id}`,
    method: 'delete'
  })
}
