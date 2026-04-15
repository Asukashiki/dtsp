import agricultureRequest from '../utils/agricultureRequest'
import { getBreedSeedProduceResultList } from './breedSeed'
import { getBreedSeedProduceDetail } from './breedSeed'
import { getPrebasicSeedProduceResultList } from './prebasicSeed'
import { getPrebasicSeedProduceDetail } from './prebasicSeed'
import { getBasicSeedProduceResultList } from './basicSeed'
import { getBasicSeedProduceDetail } from './basicSeed'

/**
 * 通用种子检测API
 * 支持Basic和C1两个阶段的田间检测和实验室检测
 */

// ==================== 批次选择 ====================

const normalizeDetectionBatch = (item) => ({
  batchId: item.batchId,
  batchName: item.batchName || item.batchId || '',
  varietyName: item.varietyName || '',
  cropType: item.cropType || '',
  seedClass: item.seedClass,
  startDate: item.startDate || item.time || '',
  endDate: item.endDate || ''
})

const normalizeProductionResultBatch = (item, seedClass) => ({
  batchId: item.produceBatchId,
  batchName: item.produceBatchName || item.produceBatchId || '',
  varietyName: item.varietyName || '',
  cropType: item.cropType || '',
  seedClass,
  startDate: item.collectionDate || item.createTime || '',
  endDate: '',
  source: 'production-result',
  _rawData: item
})

const buildSuccessResponse = (data) => ({
  code: 200,
  data
})

/**
 * 获取用于检测的批次列表
 * 包含原有检测批次，以及 Breeder / Pre-Basic / Basic 生产结果批次
 */
export const getBatchesForDetection = async () => {
  const [detectionRes, breederRes, prebasicRes, basicRes] = await Promise.allSettled([
    agricultureRequest({
      url: '/seed/batch/list-for-detection',
      method: 'get'
    }),
    getBreedSeedProduceResultList({ pageNum: 1, pageSize: 1000 }),
    getPrebasicSeedProduceResultList({ pageNum: 1, pageSize: 1000 }),
    getBasicSeedProduceResultList({ pageNum: 1, pageSize: 1000 })
  ])

  const mergedMap = new Map()

  if (detectionRes.status === 'fulfilled' && detectionRes.value?.code === 200) {
    ;(detectionRes.value.data || []).forEach((item) => {
      const normalized = normalizeDetectionBatch(item)
      if (!normalized.batchId || !normalized.seedClass) return
      mergedMap.set(`${normalized.seedClass}-${normalized.batchId}`, normalized)
    })
  }

  const resultConfigs = [
    { response: breederRes, seedClass: 'Breeder' },
    { response: prebasicRes, seedClass: 'Pre-Basic' },
    { response: basicRes, seedClass: 'Basic' }
  ]

  resultConfigs.forEach(({ response, seedClass }) => {
    if (response.status !== 'fulfilled' || response.value?.code !== 200) return

    ;(response.value.rows || []).forEach((item) => {
      const normalized = normalizeProductionResultBatch(item, seedClass)
      if (!normalized.batchId) return
      mergedMap.set(`${seedClass}-${normalized.batchId}`, normalized)
    })
  })

  return buildSuccessResponse(Array.from(mergedMap.values()))
}

// ==================== 田间检测 Tracking ====================

/**
 * 获取田间检测记录列表
 * @param {Object} data - {batchId, seedClass, pageNum, pageSize}
 */
export const getTrackingList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/list',
    method: 'post',
    data
  })
}

/**
 * 根据ID获取田间检测记录详情
 * @param {String} id - 记录ID
 */
export const getTrackingById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-tracking/getById/${id}`,
    method: 'get'
  })
}

/**
 * 新增田间检测记录
 * @param {Object} data - 记录数据（包含seedClass字段）
 */
export const addTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/add',
    method: 'post',
    data
  })
}

/**
 * 更新田间检测记录
 * @param {Object} data - 记录数据（包含id和seedClass字段）
 */
export const updateTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/update',
    method: 'post',
    data
  })
}

/**
 * 删除田间检测记录
 * @param {Array<String>} ids - 记录ID数组
 */
export const deleteTracking = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/delete',
    method: 'post',
    data: ids
  })
}

export const submitTracking = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-tracking/submit/${id}`,
    method: 'post'
  })
}

export const approveTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/approve',
    method: 'post',
    data
  })
}

export const rejectTracking = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-tracking/reject',
    method: 'post',
    data
  })
}

// ==================== 实验室检测 Test ====================

/**
 * 获取实验室检测记录列表
 * @param {Object} data - {batchId, seedClass, pageNum, pageSize}
 */
export const getTestList = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/list',
    method: 'post',
    data
  })
}

/**
 * 根据ID获取实验室检测记录详情
 * @param {String} id - 记录ID
 */
export const getTestById = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-test/getById/${id}`,
    method: 'get'
  })
}

/**
 * 新增实验室检测记录
 * @param {Object} data - 记录数据（包含seedClass字段）
 */
export const addTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/add',
    method: 'post',
    data
  })
}

/**
 * 更新实验室检测记录
 * @param {Object} data - 记录数据（包含id和seedClass字段）
 */
export const updateTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/update',
    method: 'post',
    data
  })
}

/**
 * 删除实验室检测记录
 * @param {Array<String>} ids - 记录ID数组
 */
export const deleteTest = (ids) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/delete',
    method: 'post',
    data: ids
  })
}

export const submitTest = (id) => {
  return agricultureRequest({
    url: `/seed/c1-breeding-test/submit/${id}`,
    method: 'post'
  })
}

export const approveTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/approve',
    method: 'post',
    data
  })
}

export const rejectTest = (data) => {
  return agricultureRequest({
    url: '/seed/c1-breeding-test/reject',
    method: 'post',
    data
  })
}

const normalizeCertificateDateTime = (value) => {
  if (!value) return ''
  return typeof value === 'string' && value.includes('T') ? value.replace('T', ' ') : value
}

export const getCertificateIdMapByBatchIds = (batchIds = []) => agricultureRequest({
  url: '/seed/batch/certificate-id-map',
  method: 'post',
  data: batchIds
})

export const getCertificateIdByBatchId = (batchId, params = {}) => agricultureRequest({
  url: `/seed/batch/certificate-id/${encodeURIComponent(batchId)}`,
  method: 'get',
  params
})

const buildCertificateSourceMap = async () => {
  const [detectionRes, breederRes, prebasicRes, basicRes] = await Promise.allSettled([
    agricultureRequest({
      url: '/seed/batch/list-for-detection',
      method: 'get'
    }),
    getBreedSeedProduceResultList({ pageNum: 1, pageSize: 1000 }),
    getPrebasicSeedProduceResultList({ pageNum: 1, pageSize: 1000 }),
    getBasicSeedProduceResultList({ pageNum: 1, pageSize: 1000 })
  ])

  const sourceMap = new Map()

  if (detectionRes.status === 'fulfilled' && detectionRes.value?.code === 200) {
    ;(detectionRes.value.data || []).forEach((item) => {
      if (!item?.batchId) return
      sourceMap.set(item.batchId, {
        batchId: item.batchId,
        varietyName: item.varietyName || '',
        cropType: item.cropType || '',
        startDate: item.startDate || item.time || '',
        endDate: item.endDate || ''
      })
    })
  }

  const fillFromResults = (response, key) => {
    if (response.status !== 'fulfilled' || response.value?.code !== 200) return
    ;(response.value.rows || []).forEach((item) => {
      if (!item?.produceBatchId) return
      sourceMap.set(item.produceBatchId, {
        batchId: item.produceBatchId,
        varietyName: item.varietyName || '',
        cropType: item.cropType || '',
        startDate: item.collectionDate || item.createTime || '',
        endDate: '',
        operator: item.operator || '',
        source: key
      })
    })
  }

  fillFromResults(breederRes, 'Breeder')
  fillFromResults(prebasicRes, 'Pre-Basic')
  fillFromResults(basicRes, 'Basic')

  return sourceMap
}

const fillCertificateDetailFromSource = async (row) => {
  try {
    const primarySeedClass = row.seedClasses[0]
    if (primarySeedClass === 'Pre-Basic') {
      const res = await getPrebasicSeedProduceDetail(row.batchId)
      if (res.code === 200 && res.data) {
        row.varietyName = row.varietyName || res.data.varietyName || ''
        row.cropType = row.cropType || res.data.cropType || ''
        row.startDate = row.startDate || res.data.time || res.data.createTime || ''
        row.orgName = row.orgName || res.data.operatorName || ''
      }
    } else if (primarySeedClass === 'Basic') {
      const res = await getBasicSeedProduceDetail(row.batchId)
      if (res.code === 200 && res.data) {
        row.varietyName = row.varietyName || res.data.varietyName || ''
        row.cropType = row.cropType || res.data.cropType || ''
        row.startDate = row.startDate || res.data.time || res.data.createTime || ''
        row.orgName = row.orgName || res.data.operatorName || ''
      }
    } else if (primarySeedClass === 'Breeder') {
      const res = await getBreedSeedProduceDetail(row.batchId)
      if (res.code === 200 && res.data) {
        row.varietyName = row.varietyName || res.data.varietyName || ''
        row.cropType = row.cropType || res.data.cropType || ''
        row.startDate = row.startDate || res.data.collectionDate || res.data.createTime || ''
        row.orgName = row.orgName || res.data.operator || ''
      }
    }
  } catch (error) {
    console.error('Fill certificate detail from source error:', error)
  }

  return row
}

const mergeDetectionCertificates = (trackingList = [], testList = [], sourceMap = new Map()) => {
  const mergedMap = new Map()

  const ensureRow = (batchId) => {
    if (!mergedMap.has(batchId)) {
      mergedMap.set(batchId, {
        id: '',
        batchId,
        varietyName: '',
        cropType: '',
        startDate: '',
        endDate: '',
        location: '',
        auditor: '',
        auditorOrgName: '',
        auditTime: '',
        auditComment: '',
        auditStatus: 'approved',
        batchStatus: '02',
        printCount: 0,
        lastPrintTime: '',
        seedClasses: [],
        fieldCount: 0,
        testCount: 0,
        orgName: '',
        orgType: ''
      })
    }
    return mergedMap.get(batchId)
  }

  const updateCommonFields = (row, record, type) => {
    const source = sourceMap.get(record.batchId)
    if (!row.id && (record.id || record.dataId)) {
      row.id = record.id || record.dataId
    }
    if (record.seedClass && !row.seedClasses.includes(record.seedClass)) {
      row.seedClasses.push(record.seedClass)
    }
    if (!row.varietyName) row.varietyName = record.varietyName || source?.varietyName || ''
    if (!row.cropType) row.cropType = record.cropType || source?.cropType || ''
    if (!row.startDate) row.startDate = record.startDate || source?.startDate || ''
    if (!row.endDate) row.endDate = record.endDate || source?.endDate || ''
    if (!row.location && record.location) row.location = record.location
    if (!row.auditor && record.updatedBy) row.auditor = record.updatedBy
    if (!row.auditTime && record.updatedTime) row.auditTime = normalizeCertificateDateTime(record.updatedTime)
    if (!row.auditComment && record.auditComment) row.auditComment = record.auditComment
    if (!row.orgName) row.orgName = source?.orgName || source?.operator || record.operator || ''
    if (!row.auditorOrgName && row.auditor) row.auditorOrgName = row.auditor
    if (type === 'field') row.fieldCount += 1
    if (type === 'test') row.testCount += 1
  }

  trackingList.forEach((record) => {
    if (!record?.batchId) return
    const row = ensureRow(record.batchId)
    updateCommonFields(row, record, 'field')
  })

  testList.forEach((record) => {
    if (!record?.batchId) return
    const row = ensureRow(record.batchId)
    updateCommonFields(row, record, 'test')
  })

  return Array.from(mergedMap.values()).map((row) => ({
    ...row,
    id: row.id || row.batchId
  })).sort((a, b) => {
    const timeA = a.auditTime ? new Date(a.auditTime).getTime() : 0
    const timeB = b.auditTime ? new Date(b.auditTime).getTime() : 0
    return timeB - timeA
  })
}

export const getApprovedDetectionCertificateList = async (params = {}) => {
  const requestParams = {
    pageNum: 1,
    pageSize: 1000,
    auditStatus: 'approved',
    ...params
  }

  const [trackingRes, testRes] = await Promise.all([
    getTrackingList(requestParams),
    getTestList(requestParams)
  ])

  const trackingList = trackingRes.code === 200 ? (trackingRes.data?.records || []) : []
  const testList = testRes.code === 200 ? (testRes.data?.records || []) : []

  const sourceMap = await buildCertificateSourceMap()
  const mergedList = await Promise.all(
    mergeDetectionCertificates(trackingList, testList, sourceMap).map(item => fillCertificateDetailFromSource(item))
  )
  const batchIds = mergedList.map(item => item.batchId).filter(Boolean)
  const certMapRes = await getCertificateIdMapByBatchIds(batchIds)
  const certificateIdMap = certMapRes.code === 200 && certMapRes.data ? certMapRes.data : {}
  const listWithCertificateId = mergedList.map((item) => {
    const resolvedCertificateId = certificateIdMap[item.batchId] || ''
    return {
      ...item,
      certificateId: resolvedCertificateId
    }
  })
  const keyword = params.keyword?.trim().toLowerCase()
  const batchId = params.batchId?.trim()
  const varietyName = params.varietyName?.trim().toLowerCase()
  const cropType = params.cropType?.trim()
  const startDateBegin = params.startDateBegin
  const startDateEnd = params.startDateEnd

  const filteredList = listWithCertificateId.filter((item) => {
    const matchBatchId = !batchId || item.batchId === batchId
    const matchKeyword = !keyword
      || item.batchId?.toLowerCase().includes(keyword)
      || item.certificateId?.toLowerCase().includes(keyword)
    const matchVariety = !varietyName || item.varietyName?.toLowerCase().includes(varietyName)
    const matchCropType = !cropType || item.cropType === cropType
    const matchStartBegin = !startDateBegin || (item.startDate && item.startDate >= startDateBegin)
    const matchStartEnd = !startDateEnd || (item.startDate && item.startDate <= startDateEnd)
    return matchBatchId && matchKeyword && matchVariety && matchCropType && matchStartBegin && matchStartEnd
  })

  const pageNum = Number(params.pageNum) || 1
  const pageSize = Number(params.pageSize) || filteredList.length || 10
  const startIndex = (pageNum - 1) * pageSize
  const list = filteredList.slice(startIndex, startIndex + pageSize)

  return {
    code: 200,
    data: {
      total: filteredList.length,
      pageNum,
      pageSize,
      list
    }
  }
}

export const getApprovedDetectionCertificateByBatchId = async (batchId) => {
  const [res, certRes] = await Promise.all([
    getApprovedDetectionCertificateList({ batchId, pageNum: 1, pageSize: 1000 }),
    getCertificateIdByBatchId(batchId)
  ])
  const record = (res.data?.list || []).find(item => item.batchId === batchId) || null
  if (record && certRes.code === 200) {
    record.certificateId = certRes.data?.certificateId || record.certificateId || ''
  }
  return {
    code: 200,
    data: record
  }
}

// ==================== 规则检查 ====================

/**
 * 获取所有检测类型
 */
export const getInspectionTypes = () => {
  return agricultureRequest({
    url: '/seed/rulesInfo/inspectionTypes',
    method: 'get'
  })
}

/**
 * 根据检测类型获取规则列表
 */
export const getRulesByType = (inspectionType) => {
  return agricultureRequest({
    url: '/seed/rulesInfo/listByType',
    method: 'get',
    params: { inspectionType }
  })
}

/**
 * 检查检测值是否符合规则
 * @param {String} dictCode - 字典代码
 * @param {Number} value - 检测值
 */
export const checkRule = (dictCode, value) => {
  return agricultureRequest({
    url: '/seed/rulesInfo/checkRule',
    method: 'get',
    params: { dictCode, value }
  })
}
