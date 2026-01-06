import request from '@/utils/agricultureRequest'

/**
 * 繁殖机构注册管理 API
 */

/**
 * 提交/修改注册申请
 * @param {Object} data - 注册申请数据
 */
export function submitRegistration(data) {
  return request({
    url: '/seed/breeding-org-registration/submit',
    method: 'post',
    data
  })
}

/**
 * 审核操作
 * @param {Object} data - 审核数据 { registrationId, auditResult, auditComment }
 */
export function auditRegistration(data) {
  return request({
    url: '/seed/breeding-org-registration/audit',
    method: 'post',
    data
  })
}

/**
 * 分页查询申请列表
 * @param {Object} params - 查询参数
 */
export function getRegistrationList(params) {
  return request({
    url: '/seed/breeding-org-registration/list',
    method: 'get',
    params
  })
}

/**
 * 获取申请详情（含审核历史）
 * @param {Number} id - 申请ID
 */
export function getRegistrationDetail(id) {
  return request({
    url: '/seed/breeding-org-registration/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 检查用户名是否可用
 * @param {String} username - 用户名
 * @param {Number} excludeId - 排除的ID
 */
export function checkUsernameUnique(username, excludeId) {
  return request({
    url: '/seed/breeding-org-registration/checkUsername',
    method: 'get',
    params: { username, excludeId }
  })
}

/**
 * 转换组织树数据格式为 Cascader 所需格式
 * 过滤掉 orgType === '3' 的节点，只保留行政区域
 */
function transformOrgTree(treeData) {
  if (!treeData || !Array.isArray(treeData)) return []

  return treeData
    .filter(node => node.orgType !== '3') // 过滤掉 orgType='3' 的节点
    .map(node => {
      const displayLabel = node.regionName || node.orgName
      
      const transformed = {
        value: node.orgCode || node.regionCode,
        label: displayLabel,
        orgId: node.orgId,
        orgCode: node.orgCode,
        orgName: node.orgName,
        orgType: node.orgType,
        regionCode: node.regionCode,
        regionName: node.regionName
      }

      if (node.children && node.children.length > 0) {
        // 递归处理子节点，同样会过滤 orgType='3'
        transformed.children = transformOrgTree(node.children)
      }

      return transformed
    })
}

/**
 * 在树中查找节点的完整路径
 * @param {Array} tree - 树形数据
 * @param {String} targetValue - 目标值
 * @param {Array} path - 当前路径
 * @returns {Array|null} - 返回路径数组或 null
 */
export function findNodePath(tree, targetValue, path = []) {
  for (const node of tree) {
    const currentPath = [...path, node]
    
    if (node.value === targetValue) {
      return currentPath
    }
    
    if (node.children && node.children.length > 0) {
      const found = findNodePath(node.children, targetValue, currentPath)
      if (found) return found
    }
  }
  return null
}

/**
 * 根据选中的节点值，获取最后一级的 regionCode 和 regionName
 * @param {Array} tree - 树形数据
 * @param {String} selectedValue - 选中的节点值
 * @returns {Object} - { regionCode: "选中节点的code", regionName: "选中节点的name" }
 */
export function buildRegionPath(tree, selectedValue) {
  const path = findNodePath(tree, selectedValue)
  
  if (!path || path.length === 0) {
    return { regionCode: selectedValue, regionName: '' }
  }

  // 只返回最后一级节点的信息
  const lastNode = path[path.length - 1]
  const regionCode = lastNode.orgCode || lastNode.value
  const regionName = lastNode.regionName || lastNode.label
  
  return { regionCode, regionName }
}

/**
 * 获取行政区划树（用于区域选择）
 */
export function getRegionTree() {
  // 使用 authRequest 因为这个接口是 /auth 前缀的
  return import('@/utils/request').then(module => {
    return module.default({
      url: '/rbac/organ/allTree',
      method: 'get',
      params: { rootId: '102000000' }
    }).then(res => {
      if (res.data) {
        res.data = transformOrgTree(res.data)
      }
      return res
    })
  })
}
