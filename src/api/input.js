import request from '../utils/request'

// ==================== 模拟数据 ====================
// 生成模拟投入品数据
const generateMockInputs = () => {
  const inputs = []
  const types = ['pesticide', 'fertilizer', 'seed', 'other']
  const typeNames = {
    pesticide: '农药',
    fertilizer: '化肥',
    seed: '种子',
    other: '其他'
  }

  // 农药示例
  inputs.push({
    input_id: 1,
    input_name: '高效氯氟氰菊酯乳油',
    type: 'pesticide',
    input_sku: 'PEST-2024-001',
    trademark: '绿盾',
    register_code: 'PD20240001',
    production_license: 'XK13-003-00123',
    production_standard: 'GB 20684-2006',
    create_time: '2024-01-15 10:30:00',
    create_people: '张三',
    status: 'active',
    producer_name: '山东绿盾农药有限公司',
    producer_address: '山东省济南市历城区工业园区',
    pesticide_properties: {
      total_ingredient_content: '4.5%',
      toxicity_level: 'low',
      target_crops: '水稻、小麦、玉米、果树',
      control_targets: '蚜虫、菜青虫、小菜蛾、红蜘蛛',
      application_method: '喷雾',
      dosage: '30-50ml/亩',
      dilution_ratio: '1500-2000倍',
      safety_interval: 7,
      precautions: '不可在强风天气或雨前施药；施药人员应佩戴防护用具',
      first_aid: '如误服，立即催吐并送医；如皮肤接触，用清水冲洗15分钟以上',
      storage_requirements: '存放于阴凉干燥处，远离食品和饲料'
    }
  })

  inputs.push({
    input_id: 2,
    input_name: '草甘膦异丙胺盐水剂',
    type: 'pesticide',
    input_sku: 'PEST-2024-002',
    trademark: '除草王',
    register_code: 'PD20240002',
    production_license: 'XK13-003-00124',
    production_standard: 'GB 20685-2006',
    create_time: '2024-01-20 14:20:00',
    create_people: '李四',
    status: 'active',
    producer_name: '江苏农化科技股份有限公司',
    producer_address: '江苏省南京市江宁区科技园',
    pesticide_properties: {
      total_ingredient_content: '41%',
      toxicity_level: 'low',
      target_crops: '果园、玉米田、大豆田',
      control_targets: '一年生和多年生杂草',
      application_method: '茎叶喷雾',
      dosage: '100-200ml/亩',
      dilution_ratio: '100-150倍',
      safety_interval: 0,
      precautions: '定向喷雾，避免药液飘移到作物上；施药后6小时内遇雨需重喷',
      first_aid: '误服立即催吐并就医；眼睛接触用大量清水冲洗',
      storage_requirements: '密封保存于阴凉通风处，避免阳光直射'
    }
  })

  // 化肥示例
  inputs.push({
    input_id: 3,
    input_name: '复合肥料(15-15-15)',
    type: 'fertilizer',
    input_sku: 'FERT-2024-001',
    trademark: '丰收',
    register_code: 'FD20240001',
    production_license: 'XK13-001-00230',
    production_standard: 'GB 15063-2020',
    create_time: '2024-02-01 09:15:00',
    create_people: '王五',
    status: 'active',
    producer_name: '河北丰收化肥集团有限公司',
    producer_address: '河北省石家庄市藁城区化肥工业园',
    fertilizer_properties: {
      fertilizer_type: '复合肥',
      total_nutrient_content: '≥45%',
      nitrogen_content: '15%',
      phosphorus_content: '15%',
      potassium_content: '15%',
      organic_matter_content: '',
      medium_trace_elements: '硫≥3%，锌≥0.5%',
      ph_value: '5.5-7.5',
      suitable_crops: '水稻、小麦、玉米、蔬菜',
      application_period: '基肥、追肥',
      application_method: '撒施、条施、穴施',
      recommended_dosage: '40-80kg/亩'
    }
  })

  inputs.push({
    input_id: 4,
    input_name: '有机肥料',
    type: 'fertilizer',
    input_sku: 'FERT-2024-002',
    trademark: '绿野',
    register_code: 'FD20240002',
    production_license: 'XK13-001-00231',
    production_standard: 'NY 525-2021',
    create_time: '2024-02-05 11:30:00',
    create_people: '赵六',
    status: 'active',
    producer_name: '山西绿野有机肥业有限公司',
    producer_address: '山西省太原市清徐县农业示范园区',
    fertilizer_properties: {
      fertilizer_type: '有机肥',
      total_nutrient_content: '≥5%',
      nitrogen_content: '≥2%',
      phosphorus_content: '≥1.5%',
      potassium_content: '≥1.5%',
      organic_matter_content: '≥45%',
      medium_trace_elements: '钙、镁、硼、锌等',
      ph_value: '5.5-8.5',
      suitable_crops: '果树、蔬菜、粮食作物、经济作物',
      application_period: '基肥为主',
      application_method: '撒施后翻耕',
      recommended_dosage: '200-400kg/亩'
    }
  })

  // 种子示例
  inputs.push({
    input_id: 5,
    input_name: '登海605玉米种子',
    type: 'seed',
    input_sku: 'SEED-2024-001',
    trademark: '登海',
    register_code: 'SD20240001',
    production_license: 'XK13-002-00156',
    production_standard: 'GB 4404.1-2008',
    create_time: '2024-03-01 08:45:00',
    create_people: '孙七',
    status: 'active',
    producer_name: '山东登海种业股份有限公司',
    producer_address: '山东省莱州市城港路1336号',
    seed_properties: {
      crop_type: '玉米',
      variety_name: '登海605',
      variety_approval_code: '国审玉20196065',
      variety_source: '登海3632×登海Y3269',
      purity: 98.0,
      cleanliness: 99.0,
      germination_rate: 92.0,
      moisture_content: 12.0
    }
  })

  inputs.push({
    input_id: 6,
    input_name: '郑单958玉米种子',
    type: 'seed',
    input_sku: 'SEED-2024-002',
    trademark: '郑单',
    register_code: 'SD20240002',
    production_license: 'XK13-002-00157',
    production_standard: 'GB 4404.1-2008',
    create_time: '2024-03-05 10:20:00',
    create_people: '周八',
    status: 'active',
    producer_name: '河南省农业科学院',
    producer_address: '河南省郑州市花园路116号',
    seed_properties: {
      crop_type: '玉米',
      variety_name: '郑单958',
      variety_approval_code: '国审玉2000016',
      variety_source: '郑58×昌7-2',
      purity: 98.0,
      cleanliness: 99.0,
      germination_rate: 90.0,
      moisture_content: 13.0
    }
  })

  // 其他类型示例
  inputs.push({
    input_id: 7,
    input_name: '农用塑料薄膜',
    type: 'other',
    input_sku: 'OTHER-2024-001',
    trademark: '强力',
    register_code: 'OD20240001',
    production_license: 'XK13-004-00089',
    production_standard: 'GB 13735-2017',
    create_time: '2024-03-10 15:30:00',
    create_people: '吴九',
    status: 'active',
    producer_name: '江苏强力塑料制品有限公司',
    producer_address: '江苏省常州市武进区塑料工业园'
  })

  return inputs
}

// 模拟数据存储
let mockInputs = generateMockInputs()
let nextId = 8

// ==================== API 函数 ====================

// 获取投入品列表
export const getInputList = (params = {}) => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...mockInputs]

      // 按类型筛选
      if (params.type && params.type !== 'all') {
        result = result.filter(item => item.type === params.type)
      }

      // 搜索
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        result = result.filter(item =>
          item.input_name.toLowerCase().includes(keyword) ||
          item.register_code.toLowerCase().includes(keyword) ||
          item.input_sku.toLowerCase().includes(keyword)
        )
      }

      // 按状态筛选
      if (params.status) {
        result = result.filter(item => item.status === params.status)
      }

      // 分页
      const page = params.page || 1
      const pageSize = params.pageSize || 10
      const total = result.length
      const start = (page - 1) * pageSize
      const end = start + pageSize

      result = result.slice(start, end)

      resolve({
        code: 200,
        data: {
          list: result,
          total,
          page,
          pageSize
        },
        message: 'Success'
      })
    }, 300)
  })
}

// 获取投入品详情
export const getInputDetail = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = mockInputs.find(input => input.input_id === parseInt(id))
      if (item) {
        resolve({
          code: 200,
          data: item,
          message: 'Success'
        })
      } else {
        reject({
          code: 404,
          message: 'Input not found'
        })
      }
    }, 200)
  })
}

// 新增投入品
export const addInput = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newInput = {
        ...data,
        input_id: nextId++,
        create_time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        create_people: '当前用户'
      }
      mockInputs.push(newInput)
      resolve({
        code: 200,
        data: newInput,
        message: 'Added successfully'
      })
    }, 500)
  })
}

// 更新投入品
export const updateInput = (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockInputs.findIndex(item => item.input_id === parseInt(id))
      if (index !== -1) {
        mockInputs[index] = {
          ...mockInputs[index],
          ...data
        }
        resolve({
          code: 200,
          data: mockInputs[index],
          message: 'Updated successfully'
        })
      } else {
        reject({
          code: 404,
          message: 'Input not found'
        })
      }
    }, 500)
  })
}

// 删除投入品
export const deleteInput = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockInputs.findIndex(item => item.input_id === parseInt(id))
      if (index !== -1) {
        mockInputs.splice(index, 1)
        resolve({
          code: 200,
          message: 'Deleted successfully'
        })
      } else {
        reject({
          code: 404,
          message: 'Input not found'
        })
      }
    }, 300)
  })
}

// 批量删除投入品
export const batchDeleteInputs = (ids) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockInputs = mockInputs.filter(item => !ids.includes(item.input_id))
      resolve({
        code: 200,
        message: 'Batch deleted successfully'
      })
    }, 500)
  })
}

// 导出投入品数据
export const exportInputs = (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...mockInputs]

      // 应用筛选条件
      if (params.type && params.type !== 'all') {
        result = result.filter(item => item.type === params.type)
      }

      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        result = result.filter(item =>
          item.input_name.toLowerCase().includes(keyword) ||
          item.register_code.toLowerCase().includes(keyword)
        )
      }

      resolve({
        code: 200,
        data: result,
        message: 'Export successful'
      })
    }, 800)
  })
}

// 获取投入品统计信息
export const getInputStatistics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = {
        total: mockInputs.length,
        pesticide: mockInputs.filter(item => item.type === 'pesticide').length,
        fertilizer: mockInputs.filter(item => item.type === 'fertilizer').length,
        seed: mockInputs.filter(item => item.type === 'seed').length,
        other: mockInputs.filter(item => item.type === 'other').length,
        active: mockInputs.filter(item => item.status === 'active').length,
        inactive: mockInputs.filter(item => item.status === 'inactive').length
      }

      resolve({
        code: 200,
        data: stats,
        message: 'Success'
      })
    }, 200)
  })
}
