export default {
  title: '原原种生产结果',
  subtitle: 'Pre-basic Seed Production Result',
  add: '新增生产结果',
  detail: '结果详情',
  searchPlaceholder: '搜索批次名称或品种名称',
  submitResult: '提交生产结果',
  section: {
    batchInfo: '批次信息',
    yieldData: '产量数据',
    qualityData: '质量数据'
  },
  columns: {
    resultId: '结果ID',
    produceBatchId: '批次ID',
    produceBatchName: '批次名称',
    varietyName: '品种名称',
    breedBatchName: '育种批次',
    collectionDate: '收获日期',
    outputQuantity: '产出数量',
    operator: '操作员',
    actions: '操作'
  },
  form: {
    batchInfo: '批次信息',
    resultInfo: '生产结果数据',
    produceBatchId: '生产批次',
    varietyName: '品种名称',
    breedBatchName: '育种批次',
    trialName: '试验名称',
    fromSeedLevel: '种子级别（来源）',
    toSeedLevel: '种子级别（目标）',
    breedBatchId: '育种批次ID',
    varietyId: '品种ID',
    cropType: '作物类型',
    collectionDate: '收获日期',
    outputQuantity: '产出数量 (kg)',
    operator: '操作员',
    qualityGrade: '质量等级',
    moistureContent: '含水量 (%)',
    purity: '纯度 (%)',
    germinationRate: '发芽率 (%)',
    remarks: '备注'
  },
  placeholder: {
    produceBatchId: '请选择生产批次',
    collectionDate: '请选择收获日期',
    outputQuantity: '请输入产出数量',
    qualityGrade: '请选择质量等级',
    moistureContent: '请输入含水量',
    purity: '请输入纯度',
    germinationRate: '请输入发芽率',
    remarks: '请输入备注信息'
  },
  rules: {
    produceBatchIdRequired: '请选择生产批次',
    collectionDateRequired: '请选择收获日期',
    outputQuantityRequired: '请输入产出数量',
    outputQuantityMin: '产出数量必须大于0',
    qualityGradeRequired: '请选择质量等级',
    moistureContentRequired: '请输入含水量',
    moistureContentRange: '含水量必须在0-100之间',
    purityRequired: '请输入纯度',
    purityRange: '纯度必须在0-100之间',
    germinationRateRequired: '请输入发芽率',
    germinationRateRange: '发芽率必须在0-100之间'
  }
}
