export default {
  title: 'Basic繁殖批次数据采集',
  subtitle: '管理Basic繁殖批次数据',
  searchPlaceholder: '搜索批次ID或名称',
  add: '提交数据',
  
  columns: {
    resultId: '结果ID',
    produceBatchId: '批次ID',
    produceBatchName: '批次名称',
    varietyName: '品种',
    collectionDate: '收获日期',
    outputQuantity: '产出数量(kg)',
    actions: '操作'
  },
  
  form: {
    batchInfo: '批次信息',
    resultInfo: '结果信息',
    produceBatchId: '生产批次',
    varietyName: '品种',
    breedBatchName: '育种批次',
    trialName: '试验批次',
    fromSeedLevel: '来源等级',
    toSeedLevel: '目标等级',
    outputQuantity: '产出数量(kg)',
    collectionDate: '收获日期',
    operator: '操作人'
  },
  
  placeholder: {
    produceBatchId: '请选择生产批次',
    outputQuantity: '请输入产出数量',
    collectionDate: '请选择收获日期'
  },
  
  rules: {
    produceBatchIdRequired: '生产批次不能为空',
    outputQuantityRequired: '产出数量不能为空',
    outputQuantityMin: '产出数量必须大于0',
    collectionDateRequired: '收获日期不能为空'
  },
  
  section: {
    batchInfo: '批次信息',
    resultInfo: '结果信息'
  }
}
