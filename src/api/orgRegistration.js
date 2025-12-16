import request from '@/utils/agricultureRequest'

/**
 * 机构注册管理 API
 */

/**
 * 提交/修改注册申请
 * @param {Object} data - 注册申请数据
 */
export function submitRegistration(data) {
  return request({
    url: '/input/org-registration/submit',
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
    url: '/input/org-registration/audit',
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
    url: '/input/org-registration/list',
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
    url: '/input/org-registration/detail',
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
    url: '/input/org-registration/checkUsername',
    method: 'get',
    params: { username, excludeId }
  })
}

/**
 * 转换组织树数据格式为 Cascader 所需格式
 * - orgType: "3" 显示 orgName
 * - 其他显示 regionName
 */
function transformOrgTree(treeData) {
  if (!treeData || !Array.isArray(treeData)) return []

  return treeData.map(node => {
    // orgType "3" 显示 orgName，其他显示 regionName
    const displayLabel = node.orgType === '3' 
      ? (node.orgName || node.regionName)
      : (node.regionName || node.orgName)
    
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
 * 根据选中的节点值，生成拼接格式的 regionCode 和 regionName
 * @param {Array} tree - 树形数据
 * @param {String} selectedValue - 选中的节点值
 * @returns {Object} - { regionCode: "code1,code2", regionName: "name1#name2" }
 */
export function buildRegionPath(tree, selectedValue) {
  const path = findNodePath(tree, selectedValue)
  
  if (!path || path.length === 0) {
    return { regionCode: selectedValue, regionName: '' }
  }

  // 拼接 regionCode：用逗号分隔所有 orgCode
  const regionCode = path.map(node => node.orgCode || node.value).join(',')
  
  // 拼接 regionName：用 # 分隔所有显示名称
  const regionName = path.map(node => node.label).join('#')
  
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
