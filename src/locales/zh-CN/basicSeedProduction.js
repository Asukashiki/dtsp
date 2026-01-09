export default {
  title: 'Basic繁殖批次',
  subtitle: '管理Basic繁殖批次',
  searchPlaceholder: '搜索批次ID或名称',
  add: '新增批次',
  detail: '批次详情',
  list: '批次列表',
  
  columns: {
    produceBatchId: '批次ID',
    produceBatchName: '批次名称',
    prebasicSeedBatchName: '来源原原种批次',
    breedBatchName: '育种批次',
    trialName: '试验批次',
    varietyName: '品种',
    cropType: '作物类型',
    time: '生产时间',
    landName: '地块',
    inputSeedQuantity: '投入数量(kg)',
    produceSeedQuantity: '产出数量(kg)',
    fromSeedLevel: '来源等级',
    toSeedLevel: '目标等级',
    operatorName: '操作人',
    flowStatus: '审核状态',
    produceStatus: '生产状态',
    createTime: '创建时间',
    updateTime: '更新时间',
    actions: '操作'
  },
  
  form: {
    basicInfo: '基础信息',
    productionInfo: '生产信息',
    produceBatchName: '批次名称',
    prebasicSeedBatchName: '来源原原种批次',
    varietyName: '品种',
    cropType: '作物类型',
    time: '生产时间',
    landName: '地块',
    operatorName: '操作人',
    inputSeedQuantity: '投入数量(kg)',
    remainingQuantity: '剩余数量'
  },
  
  placeholder: {
    produceBatchName: '请输入批次名称',
    prebasicSeedBatchName: '请选择来源原原种批次',
    time: '请选择生产时间',
    landName: '请选择地块',
    inputSeedQuantity: '请输入投入数量'
  },
  
  rules: {
    produceBatchNameRequired: '批次名称不能为空',
    prebasicSeedBatchIdRequired: '来源原原种批次不能为空',
    timeRequired: '生产时间不能为空',
    landIdRequired: '地块不能为空',
    operatorNameRequired: '操作人姓名不能为空',
    inputSeedQuantityRequired: '投入数量不能为空',
    inputSeedQuantityMin: '投入数量必须大于0'
  },
  
  flowStatus: {
    S1: '待审核',
    S2: '已审批',
    S3: '已驳回',
    S10: '已作废'
  },
  
  status: {
    Ongoing: '进行中',
    Finished: '已完成',
    Void: '已作废'
  },
  
  voidSuccess: '批次作废成功',
  voidConfirm: '确定要作废该批次吗？'
}
