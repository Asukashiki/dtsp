export default {
  title: 'OSE繁殖批次信息数据采集',
  subtitle: 'Seed Multiplication Batch Data',
  list: '繁殖批次采集列表',
  add: '新增批次采集',
  detail: '批次详情',
  searchPlaceholder: '搜索批次ID、分发ID或品种名称',
  section: {
    batchInfo: '批次信息',
    collectionData: '采集数据'
  },
  columns: {
    batchId: '批次ID',
    breedingBatchId: '繁殖批次ID',
    varietyName: '品种名称',
    toMultiplyQuantity: '繁殖数量',
    collectionDate: '采集日期',
    operator: '操作员',
    actions: '操作'
  },
  form: {
    batchInfo: '批次信息',
    collectionInfo: '采集信息',
    breedingBatchId: '繁殖批次',
    parentalSeedSource: '亲本种子来源',
    varietyName: '品种名称',
    cropType: '作物类型',
    breedingLevel: '繁殖级别',
    toMultiplyQuantity: '繁殖数量 (kg)',
    collectionDate: '采集日期',
    operator: '操作员'
  },
  placeholder: {
    breedingBatchId: '请选择繁殖批次',
    toMultiplyQuantity: '请输入繁殖数量',
    collectionDate: '请选择采集日期',
    remark: '请输入备注信息'
  },
  rules: {
    breedingBatchIdRequired: '请选择繁殖批次',
    toMultiplyQuantityRequired: '请输入繁殖数量',
    toMultiplyQuantityMin: '繁殖数量必须大于0',
    collectionDateRequired: '请选择采集日期'
  }
}
