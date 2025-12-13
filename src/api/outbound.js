import agricultureRequest from '../utils/agricultureRequest'

/**
 * 出库管理 API
 * 基于接口文档: 出入库管理系统接口文档 - 二、出库管理接口
 */

/**
 * 2.1 查询出库单列表
 * @param {Object} params - 查询参数
 * @param {Number} params.page - 页码，默认1
 * @param {Number} params.pageSize - 每页数量，默认20
 * @param {String} params.outboundStatus - 出库状态：pending/completed/cancelled/all
 * @param {String} params.outboundType - 出库类型：1/2/all
 * @param {String} params.outboundOrderId - 出库单ID（模糊查询）
 * @param {String} params.relatedOrderNo - 关联单号
 * @param {String} params.warehouseId - 仓库ID
 * @param {String} params.organCode - 部门编码(权限过滤)
 */
export const getOutboundOrderList = (params) => {
  return agricultureRequest({
    url: '/api/outbound/orders',
    method: 'get',
    params
  })
}

/**
 * 2.2 获取出库单详情
 * @param {string} outboundOrderId - 出库单ID
 */
export const getOutboundOrderDetail = (outboundOrderId) => {
  return agricultureRequest({
    url: `/api/outbound/orders/${outboundOrderId}`,
    method: 'get'
  })
}

/**
 * 2.3 创建出库单
 * @param {Object} data - 出库单数据
 * @param {Number} data.outboundType - 出库类型：1-销售出库/2-调拨出库
 * @param {String} data.warehouseId - 出库仓库ID
 * @param {String} data.relatedOrderNo - 关联单号（销售单号/调拨单号）
 * @param {String} data.outboundObjectId - 出库对象ID（客户ID/仓库ID）
 * @param {String} data.outboundObjectName - 出库对象名称
 * @param {String} data.outboundUser - 出库员
 * @param {String} data.outboundDept - 出库部门
 * @param {String} data.operator - 经办人
 * @param {String} data.remark - 备注
 * @param {Array} data.details - 出库明细列表
 * @param {String} data.details[].materialId - 物料ID
 * @param {String} data.details[].materialName - 物料名称
 * @param {String} data.details[].materialType - 物料类型
 * @param {String} data.details[].materialBatchId - 物料批次号
 * @param {Number} data.details[].quantity - 出库数量
 * @param {String} data.details[].specModel - 规格型号
 * @param {String} data.details[].unitOfMeasure - 计量单位
 */
export const createOutboundOrder = (data) => {
  // 转换为驼峰形式
  const requestData = {
    outboundType: data.outboundType,
    warehouseId: data.warehouseId,
    relatedOrderNo: data.relatedOrderNo,
    outboundObjectId: data.outboundObjectId,
    outboundObjectName: data.outboundObjectName,
    outboundUser: data.outboundUser,
    outboundDept: data.outboundDept,
    operator: data.operator,
    remark: data.remark,
    details: data.details?.map(detail => ({
      materialId: detail.materialId,
      materialName: detail.materialName,
      materialType: detail.materialType,
      materialBatchId: detail.materialBatchId,
      agriculturalInputType: detail.agriculturalInputType,
      quantity: detail.quantity,
      specModel: detail.specModel,
      unitOfMeasure: detail.unitOfMeasure
    }))
  }

  return agricultureRequest({
    url: '/api/outbound/orders',
    method: 'post',
    data: requestData
  })
}

/**
 * 2.4 审核出库单
 * @param {string} outboundOrderId - 出库单ID
 * @param {Object} data - 审核数据
 * @param {String} data.auditStatus - 审核状态：approved-通过/rejected-拒绝
 * @param {String} data.auditUser - 审核人
 * @param {String} data.auditTime - 审核时间（yyyy-MM-dd HH:mm:ss）
 * @param {String} data.remark - 审核意见
 */
export const auditOutboundOrder = (outboundOrderId, data) => {
  // 转换为驼峰形式
  const requestData = {
    auditStatus: data.auditStatus,
    auditUser: data.auditUser,
    auditTime: data.auditTime,
    remark: data.remark
  }

  return agricultureRequest({
    url: `/api/outbound/orders/${outboundOrderId}/audit`,
    method: 'put',
    data: requestData
  })
}

/**
 * 2.5 执行出库（出库确认）
 * @param {string} outboundOrderId - 出库单ID
 * @param {Object} data - 出库数据
 * @param {String} data.outboundTime - 出库时间（yyyy-MM-dd HH:mm:ss）
 * @param {String} data.operator - 操作人
 */
export const confirmOutbound = (outboundOrderId, data) => {
  // 转换为驼峰形式
  const requestData = {
    outboundTime: data.outboundTime,
    operator: data.operator
  }

  return agricultureRequest({
    url: `/api/outbound/orders/${outboundOrderId}/confirm`,
    method: 'put',
    data: requestData
  })
}

/**
 * 2.6 取消出库单
 * @param {string} outboundOrderId - 出库单ID
 * @param {string} operator - 操作人
 */
export const cancelOutboundOrder = (outboundOrderId, operator) => {
  return agricultureRequest({
    url: `/api/outbound/orders/${outboundOrderId}/cancel`,
    method: 'put',
    params: { operator }
  })
}

/**
 * 2.7 统计出库单数量
 * @param {String} warehouseId - 仓库ID
 */
export const getOutboundOrderCount = (warehouseId) => {
  return agricultureRequest({
    url: '/api/outbound/orders/count',
    method: 'get',
    params: { warehouseId }
  })
}

/**
 * 2.8 查询待审核出库单数量
 * @param {String} warehouseId - 仓库ID
 */
export const getPendingOutboundCount = (warehouseId) => {
  return agricultureRequest({
    url: '/api/outbound/orders/pending/count',
    method: 'get',
    params: { warehouseId }
  })
}

/**
 * 2.9 按状态统计出库单
 * @param {String} warehouseId - 仓库ID
 */
export const getOutboundStatsByStatus = (warehouseId) => {
  return agricultureRequest({
    url: '/api/outbound/orders/stats/status',
    method: 'get',
    params: { warehouseId }
  })
}

/**
 * 2.10 按出库类型统计
 * @param {Object} params - 查询参数
 * @param {String} params.startDate - 开始日期（yyyy-MM-dd）
 * @param {String} params.endDate - 结束日期（yyyy-MM-dd）
 */
export const getOutboundStatsByType = (params) => {
  return agricultureRequest({
    url: '/api/outbound/orders/stats/type',
    method: 'get',
    params
  })
}

/**
 * 批量校验库存是否充足
 * @param {Object} data - 校验数据
 * @param {String} data.warehouseId - 仓库ID
 * @param {Array} data.details - 出库明细列表
 * @param {String} data.details[].materialId - 物料ID
 * @param {String} data.details[].materialName - 物料名称
 * @param {Number} data.details[].quantity - 出库数量
 */
export const validateStock = (data) => {
  return agricultureRequest({
    url: '/api/outbound/orders/validate-stock',
    method: 'post',
    data: {
      warehouseId: data.warehouseId,
      details: data.details?.map(detail => ({
        materialId: detail.materialId,
        materialName: detail.materialName,
        quantity: detail.quantity
      }))
    }
  })
}
