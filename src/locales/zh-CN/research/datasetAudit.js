export default {
  title: '育种数据集审核',
  subtitle: '对已提交的数据集进行审核',
  list: '审核列表',
  detail: '审核详情',
  history: '审核历史',
  auditSuccess: '审核成功',
  approveConfirm: '确定审核通过该数据集吗?',
  rejectConfirm: '确定驳回该数据集吗?请填写驳回原因',

  // 搜索筛选
  searchPlaceholder: '搜索数据集编号、批次名称、品种名称',
  filterByAuditStatus: '按审核状态筛选',
  filterByDatasetStatus: '按数据集状态筛选',
  allAuditStatus: '全部审核状态',
  allDatasetStatus: '全部数据集状态',

  // 审核状态
  auditStatus: {
    pending: '待审核',
    approved: '审核通过',
    rejected: '审核驳回',
  },

  // 数据集状态(复用编制模块的状态)
  datasetStatus: {
    submitted: '已提交',
    reviewing: '审核中',
    approved: '已通过',
    rejected: '已驳回',
  },

  // 表单字段
  form: {
    basicInfo: '数据集基础信息',
    dataStatistics: '数据统计',
    auditInfo: '审核信息',
    submitInfo: '提交信息',
    auditOpinion: '审核意见',
    auditTime: '审核时间',
    auditorName: '审核人',
    auditorOrgName: '审核机构',
    submitTime: '提交时间',
    submitterName: '提交人',
    submitterOrgName: '提交机构',
    datasetCode: '数据集编号',
    batchId: '育种批次ID',
    batchName: '育种批次名称',
    cropType: '作物类型',
    varietyName: '品种名称',
    datasetStatus: '数据集状态',
    auditStatus: '审核状态',
    createdTime: '创建时间',
    updatedTime: '更新时间',
    createdBy: '创建人',
    submitBy: '提交人',
    submitOrg: '提交机构',
    auditBy: '审核人',
    creationInfo: '创建信息',
  },

  // 表单占位符
  placeholder: {
    auditOpinion: '请填写审核意见(驳回时必填)',
    selectAuditStatus: '请选择审核状态',
    selectDatasetStatus: '请选择数据集状态',
  },

  // 表单验证
  rules: {
    auditOpinionRequired: '驳回时必须填写审核意见',
    auditStatusRequired: '请选择审核状态',
  },

  // 列表列
  columns: {
    datasetCode: '数据集编号',
    batchName: '批次名称',
    cropType: '作物类型',
    varietyName: '品种名称',
    trialCount: '试验数',
    fieldDataCount: '田间数据数',
    envDataCount: '环境数据数',
    labTestCount: '检测数',
    yieldDataCount: '产量数',
    datasetStatus: '数据集状态',
    auditStatus: '审核状态',
    submitTime: '提交时间',
    submitterName: '提交人',
    auditTime: '审核时间',
    auditorName: '审核人',
    createdTime: '创建时间',
    updatedTime: '更新时间',
    actions: '操作',
  },

  // 操作按钮
  actions: {
    view: '查看',
    approve: '审核通过',
    reject: '驳回',
    audit: '审核',
    viewHistory: '查看历史',
  },

  // 提示信息
  message: {
    approveSuccess: '审核通过成功',
    rejectSuccess: '审核驳回成功',
    datasetCodeGenerated: '数据集编号已生成',
    onlySubmittedCanAudit: '只能审核已提交或审核中的数据集',
    rejectOpinionRequired: '驳回时必须填写驳回原因',
    auditOpinionLabel: '审核意见',
  },
}