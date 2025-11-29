import agricultureRequest, { toCamelCase, toSnakeCase } from '../utils/agricultureRequest'
import request from '../utils/request'

// ==================== 供应商认证管理 API ====================

/**
 * 供应商认证申请
 * @param {Object} data - 认证申请数据
 * @param {number} data.userId - 用户ID
 * @param {string} data.orgName - 企业/组织名称
 * @param {string} data.creditCode - 统一社会信用代码
 * @param {string} data.legalPerson - 法定代表人/负责人
 * @param {string} data.legalId - 法定代表人身份证号
 * @param {string} data.adCode - 行政区划代码
 * @param {string} data.businessScope - 经营范围/主要产品
 * @param {string} data.licensePath - 营业执照存储路径
 * @param {string} data.contactName - 联系人姓名
 * @param {string} data.contactPhone - 联系人手机
 */
export const applySupplierCert = (data) => {
  const requestData = toCamelCase({
    user_id: data.userId,
    org_name: data.orgName,
    credit_code: data.creditCode,
    legal_person: data.legalPerson,
    legal_id: data.legalId,
    ad_code: data.adCode,
    business_scope: data.businessScope,
    license_path: data.licensePath,
    contact_name: data.contactName,
    contact_phone: data.contactPhone
  })

  return agricultureRequest({
    url: '/supplier/cert/apply',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 供应商认证审批
 * @param {number} certId - 认证ID
 * @param {Object} data - 审批数据
 * @param {number} data.approverId - 审批人ID
 * @param {number} data.auditResult - 审核结果（1-通过，0-驳回）
 * @param {string} data.auditOpinion - 审核意见/驳回原因
 */
export const approveSupplierCert = (certId, data) => {
  const requestData = toCamelCase({
    approver_id: data.approverId,
    audit_result: data.auditResult,
    audit_opinion: data.auditOpinion
  })

  return agricultureRequest({
    url: `/supplier/cert/approve/${certId}`,
    method: 'put',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 查询认证状态
 * @param {number} userId - 用户ID
 */
export const getSupplierCertStatus = (userId) => {
  return agricultureRequest({
    url: `/supplier/cert/status/${userId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 根据用户ID查询认证信息
 * @param {number} userId - 用户ID
 */
export const getSupplierCertByUser = (userId) => {
  return agricultureRequest({
    url: `/supplier/cert/user/${userId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 更新供应商认证信息
 * @param {Object} data - 更新数据
 * @param {number} data.certId - 认证ID
 * @param {string} data.orgName - 企业/组织名称
 * @param {string} data.creditCode - 统一社会信用代码
 * @param {string} data.legalPerson - 法定代表人/负责人
 * @param {string} data.legalId - 法定代表人身份证号
 * @param {string} data.adCode - 行政区划代码
 * @param {string} data.businessScope - 经营范围/主要产品
 * @param {string} data.licensePath - 营业执照存储路径
 * @param {string} data.contactName - 联系人姓名
 * @param {string} data.contactPhone - 联系人手机
 */
export const updateSupplierCert = (data) => {
  const requestData = toCamelCase({
    cert_id: data.certId,
    org_name: data.orgName,
    credit_code: data.creditCode,
    legal_person: data.legalPerson,
    legal_id: data.legalId,
    ad_code: data.adCode,
    business_scope: data.businessScope,
    license_path: data.licensePath,
    contact_name: data.contactName,
    contact_phone: data.contactPhone
  })

  return agricultureRequest({
    url: '/supplier/cert/update',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 查询待审核列表（分页）
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 */
export const getSupplierAuditList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  return agricultureRequest({
    url: '/supplier/cert/audit/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 查询认证详情
 * @param {number} certId - 认证ID
 */
export const getSupplierCertDetail = (certId) => {
  return agricultureRequest({
    url: `/supplier/cert/${certId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 查询供应商认证列表（带筛选）
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.keyword - 关键词搜索（模糊匹配企业名称/信用代码/联系人）
 * @param {string} params.orgName - 企业名称（模糊匹配）
 * @param {string} params.creditCode - 统一社会信用代码（模糊匹配）
 * @param {string} params.contactName - 联系人姓名（模糊匹配）
 * @param {string} params.contactPhone - 联系人手机（模糊匹配）
 * @param {number} params.status - 认证状态（0-待审核，1-审核通过，2-审核驳回）
 * @param {string} params.adCode - 行政区划代码（精确匹配）
 * @param {string} params.applyTimeStart - 申请开始时间
 * @param {string} params.applyTimeEnd - 申请结束时间
 * @param {string} params.approveTimeStart - 审批开始时间
 * @param {string} params.approveTimeEnd - 审批结束时间
 */
export const getSupplierCertList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  // 添加可选的筛选参数
  if (params.keyword) requestParams.keyword = params.keyword
  if (params.orgName) requestParams.orgName = params.orgName
  if (params.creditCode) requestParams.creditCode = params.creditCode
  if (params.contactName) requestParams.contactName = params.contactName
  if (params.contactPhone) requestParams.contactPhone = params.contactPhone
  if (params.status !== undefined && params.status !== null && params.status !== '') {
    requestParams.status = params.status
  }
  if (params.adCode) requestParams.adCode = params.adCode
  if (params.applyTimeStart) requestParams.applyTimeStart = params.applyTimeStart
  if (params.applyTimeEnd) requestParams.applyTimeEnd = params.applyTimeEnd
  if (params.approveTimeStart) requestParams.approveTimeStart = params.approveTimeStart
  if (params.approveTimeEnd) requestParams.approveTimeEnd = params.approveTimeEnd

  return agricultureRequest({
    url: '/supplier/cert/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 转换组织树数据格式为 Cascader 所需格式
 * @param {Array} treeData - 树形数据
 * @returns {Array} 转换后的数组
 */
function transformOrgTree(treeData) {
  if (!treeData || !Array.isArray(treeData)) return []

  return treeData.map(node => {
    const transformed = {
      value: node.regionCode || node.orgCode,
      label: node.regionName || node.orgName,
      orgId: node.orgId,
      orgType: node.orgType
    }

    // 递归处理子节点
    if (node.children && node.children.length > 0) {
      transformed.children = transformOrgTree(node.children)
    }

    return transformed
  })
}

/**
 * 获取行政区划列表（用于下拉选择）
 * 使用组织机构树接口，返回层级结构数据
 */
export const getAdCodeList = () => {
  return request({
    url: '/rbac/organ/allTree',
    method: 'get',
    params: {
      rootId: '778899'
    }
  }).then(res => {
    if (res.data) {
      // 将数据转换为 Cascader 格式
      res.data = transformOrgTree(res.data)
    }
    return res
  })
}

// ==================== 供应商投入品管理 API ====================

/**
 * 查询供应商投入品列表
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {number} params.supplierId - 供应商ID
 * @param {string} params.inputType - 投入品类型
 * @param {string} params.inputName - 投入品名称
 * @param {string} params.inputSku - 投入品编码
 * @param {string} params.supplierProductCode - 供应商产品编码
 * @param {string} params.qualityRating - 质量评级
 * @param {string} params.keyword - 关键词搜索
 */
export const getSupplierProductList = (params = {}) => {
  const requestParams = {
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  // 添加可选的筛选参数
  if (params.supplierId) requestParams.supplierId = params.supplierId
  if (params.inputType) requestParams.inputType = params.inputType
  if (params.inputName) requestParams.inputName = params.inputName
  if (params.inputSku) requestParams.inputSku = params.inputSku
  if (params.supplierProductCode) requestParams.supplierProductCode = params.supplierProductCode
  if (params.qualityRating) requestParams.qualityRating = params.qualityRating
  if (params.keyword) requestParams.keyword = params.keyword

  return agricultureRequest({
    url: '/supplier/product/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 查询供应商投入品详情
 * @param {number} supplierProductId - 供应关系ID
 */
export const getSupplierProductDetail = (supplierProductId) => {
  return agricultureRequest({
    url: `/supplier/product/${supplierProductId}`,
    method: 'get'
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 添加供应商投入品关系
 * @param {Object} data - 供应关系数据
 * @param {number} data.supplierId - 供应商ID
 * @param {number} data.inputId - 投入品ID
 * @param {string} data.supplierProductCode - 供应商产品编码
 * @param {string} data.supplierProductName - 供应商产品名称
 * @param {string} data.qualityRating - 质量评级
 * @param {string} data.notes - 供应备注
 */
export const addSupplierProduct = (data) => {
  // 直接构造请求数据，避免 toCamelCase 可能的类型转换问题
  const requestData = {
    supplierId: String(data.supplierId), // 确保ID为字符串
    inputId: String(data.inputId), // 确保ID为字符串
    supplierProductCode: data.supplierProductCode,
    supplierProductName: data.supplierProductName,
    qualityRating: data.qualityRating,
    notes: data.notes
  }

  return agricultureRequest({
    url: '/supplier/product',
    method: 'post',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 更新供应商投入品关系
 * @param {number} supplierProductId - 供应关系ID
 * @param {Object} data - 供应关系数据
 */
export const updateSupplierProduct = (supplierProductId, data) => {
  // 直接构造请求数据，避免 toCamelCase 可能的类型转换问题
  const requestData = {
    supplierId: String(data.supplierId), // 确保ID为字符串
    inputId: String(data.inputId), // 确保ID为字符串
    supplierProductCode: data.supplierProductCode,
    supplierProductName: data.supplierProductName,
    qualityRating: data.qualityRating,
    notes: data.notes
  }

  return agricultureRequest({
    url: `/supplier/product/${supplierProductId}`,
    method: 'put',
    data: requestData
  }).then(res => {
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 删除供应商投入品关系
 * @param {number} supplierProductId - 供应关系ID
 */
export const deleteSupplierProduct = (supplierProductId) => {
  return agricultureRequest({
    url: `/supplier/product/${supplierProductId}`,
    method: 'delete'
  })
}

/**
 * 批量删除供应商投入品关系
 * @param {number[]} supplierProductIds - 供应关系ID数组
 */
export const batchDeleteSupplierProduct = (supplierProductIds) => {
  return agricultureRequest({
    url: '/supplier/product/batch',
    method: 'delete',
    data: supplierProductIds
  })
}
