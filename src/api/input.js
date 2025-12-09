import agricultureRequest, { toCamelCase, toSnakeCase } from '../utils/agricultureRequest'

// ==================== 投入品目录管理 API ====================

/**
 * 获取投入品列表（分页）
 * @param {Object} params - 查询参数
 * @param {string} params.keyword - 关键词搜索（名称/登记证号/SKU）
 * @param {string} params.type - 投入品类型（pesticide/fertilizer/seed/other）
 * @param {string} params.status - 状态（active/inactive）
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 */
export const getInputList = (params = {}) => {
  // 转换字段名：下划线转驼峰
  const requestParams = {
    keyword: params.keyword || '',
    type: params.type==='all'?'': params.type || '',
    status: params.status || '',
    page: params.page || 1,
    pageSize: params.pageSize || 10
  }

  return agricultureRequest({
    url: '/agriculture/input/list',
    method: 'get',
    params: requestParams
  }).then(res => {
    // 转换返回数据：驼峰转下划线
    if (res.data && res.data.list) {
      res.data.list = res.data.list.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 获取全部投入品列表
 * @param
 */
export const getAllInputList = () => {
  return agricultureRequest({
    url: `/agriculture/input/getAllInputList`,
    method: 'get'
  }).then(res => {
    // // 转换返回数据：驼峰转下划线
    // if (res.data) {
    //   // res.data = toSnakeCase(res.data)
    // }
    return res
  })
}

/**
 * 获取投入品详情
 * @param {number} id - 投入品ID
 */
export const getInputDetail = (id) => {
  return agricultureRequest({
    url: `/agriculture/input/${id}`,
    method: 'get'
  }).then(res => {
    // 转换返回数据：驼峰转下划线
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 新增投入品
 * @param {Object} data - 投入品数据
 */
export const addInput = (data) => {
  // 转换字段名：下划线转驼峰
  const requestData = transformInputData(data)

  return agricultureRequest({
    url: '/agriculture/input',
    method: 'post',
    data: requestData
  }).then(res => {
    // 转换返回数据
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 更新投入品
 * @param {number} id - 投入品ID
 * @param {Object} data - 投入品数据
 */
export const updateInput = (id, data) => {
  // 转换字段名：下划线转驼峰
  const requestData = transformInputData(data)

  return agricultureRequest({
    url: `/agriculture/input/${id}`,
    method: 'put',
    data: requestData
  }).then(res => {
    // 转换返回数据
    if (res.data) {
      res.data = toSnakeCase(res.data)
    }
    return res
  })
}

/**
 * 删除投入品
 * @param {number} id - 投入品ID
 */
export const deleteInput = (id) => {
  return agricultureRequest({
    url: `/agriculture/input/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除投入品
 * @param {Array} ids - 投入品ID数组
 */
export const batchDeleteInputs = (ids) => {
  return agricultureRequest({
    url: '/agriculture/input/batch',
    method: 'delete',
    data: ids
  })
}

/**
 * 导出投入品数据
 * @param {Object} params - 查询参数
 */
export const exportInputs = (params = {}) => {
  const requestParams = {
    keyword: params.keyword || '',
    type: params.type || ''
  }

  return agricultureRequest({
    url: '/agriculture/input/export',
    method: 'get',
    params: requestParams
  }).then(res => {
    // 转换返回数据
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(item => toSnakeCase(item))
    }
    return res
  })
}

/**
 * 获取投入品统计信息
 */
export const getInputStatistics = () => {
  return agricultureRequest({
    url: '/agriculture/input/statistics',
    method: 'get'
  })
}

// ==================== 数据转换辅助函数 ====================

/**
 * 转换投入品数据：前端格式 -> 后端格式
 * 下划线命名 -> 驼峰命名
 */
function transformInputData(data) {
  const transformed = {
    inputName: data.input_name,
    type: data.type,
    agriculturalInputType: data.agricultural_input_type,
    variety: data.variety,
    inputSku: data.input_sku,
    trademark: data.trademark,
    registerCode: data.register_code,
    productionLicense: data.production_license,
    productionStandard: data.production_standard,
    producerName: data.producer_name,
    producerAddress: data.producer_address,
    status: data.status
  }

  // 根据类型添加对应的特性数据
  if (data.type === 'pesticide' && data.pesticide_properties) {
    transformed.pesticideProperties = {
      totalIngredientContent: data.pesticide_properties.total_ingredient_content,
      toxicityLevel: data.pesticide_properties.toxicity_level,
      targetCrops: data.pesticide_properties.target_crops,
      controlTargets: data.pesticide_properties.control_targets,
      applicationMethod: data.pesticide_properties.application_method,
      dosage: data.pesticide_properties.dosage,
      dilutionRatio: data.pesticide_properties.dilution_ratio,
      safetyInterval: data.pesticide_properties.safety_interval,
      precautions: data.pesticide_properties.precautions,
      firstAid: data.pesticide_properties.first_aid,
      storageRequirements: data.pesticide_properties.storage_requirements
    }
  } else if (data.type === 'fertilizer' && data.fertilizer_properties) {
    transformed.fertilizerProperties = {
      fertilizerType: data.fertilizer_properties.fertilizer_type,
      totalNutrientContent: data.fertilizer_properties.total_nutrient_content,
      nitrogenContent: data.fertilizer_properties.nitrogen_content,
      phosphorusContent: data.fertilizer_properties.phosphorus_content,
      potassiumContent: data.fertilizer_properties.potassium_content,
      organicMatterContent: data.fertilizer_properties.organic_matter_content,
      mediumTraceElements: data.fertilizer_properties.medium_trace_elements,
      phValue: data.fertilizer_properties.ph_value,
      suitableCrops: data.fertilizer_properties.suitable_crops,
      applicationPeriod: data.fertilizer_properties.application_period,
      applicationMethod: data.fertilizer_properties.application_method,
      recommendedDosage: data.fertilizer_properties.recommended_dosage
    }
  } else if (data.type === 'seed' && data.seed_properties) {
    transformed.seedProperties = {
      cropType: data.seed_properties.crop_type,
      varietyName: data.seed_properties.variety_name,
      varietyApprovalCode: data.seed_properties.variety_approval_code,
      varietySource: data.seed_properties.variety_source,
      purity: data.seed_properties.purity,
      cleanliness: data.seed_properties.cleanliness,
      germinationRate: data.seed_properties.germination_rate,
      moistureContent: data.seed_properties.moisture_content
    }
  }

  return transformed
}
