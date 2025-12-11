export default {
  // 投入品需求审核
  title: '投入品需求审核',
  subtitle: '分级审核农民投入品需求申请',
  list: '待审核列表',
  detail: '审核详情',

  // Tab
  tabs: {
    pending: '待审核',
    approved: '已审核',
  },

  // 搜索和筛选
  searchPlaceholder: '搜索农民姓名',
  filterByBatch: '按批次筛选',
  filterByKebele: '按Kebele筛选',
  filterByWoreda: '按Woreda筛选',
  allBatches: '全部批次',
  allKebeles: '全部Kebele',
  allWoredas: '全部Woreda',

  // 操作按钮
  actions: {
    view: '查看',
    approve: '通过',
    reject: '驳回',
    batchApprove: '批量通过',
    batchReject: '批量驳回',
    submit: '提交审核',
    lockBatch: '锁定批次',
    aggregationSubmit: '汇聚数据提交',
    aggregationDetail: '汇聚数据详情',
    back: '返回',
  },

  // 列表列
  columns: {
    batchNo: '批次编号',
    farmerName: '农民姓名',
    farmerIdNumber: '身份证号',
    kebele: 'Kebele',
    woreda: 'Woreda',
    village: '村庄',
    landArea: '地块面积',
    currentAuditLevel: '当前审核层级',
    submitTime: '提交时间',
    actions: '操作',
  },

  // 审核层级
  auditLevel: {
    village: '村级',
    town: '镇级',
    district: '区级',
    state: '州级',
    ministry: '农业部',
  },

  // 审核对话框
  approveDialog: {
    title: '审核通过',
    remark: '审核备注',
    remarkPlaceholder: '请输入审核备注(选填)',
    confirmMessage: '确定通过选中的 {count} 条需求吗？',
    success: '审核通过成功',
  },

  rejectDialog: {
    title: '审核驳回',
    auditOpinion: '驳回原因',
    auditOpinionPlaceholder: '请输入驳回原因(必填)',
    remark: '审核备注',
    remarkPlaceholder: '请输入审核备注(选填)',
    confirmMessage: '确定驳回选中的 {count} 条需求吗？',
    success: '驳回成功',
    auditOpinionRequired: '请输入驳回原因',
  },

  lockBatchDialog: {
    title: '锁定批次',
    message: '锁定后批次数据将不可修改，确定要锁定该批次吗？',
    success: '批次锁定成功',
    notAllApproved: '批次中存在未通过的需求，无法锁定',
  },

  submitDialog: {
    title: '提交审核',
    confirmMessage: '确定提交选中的 {count} 条需求吗？',
    success: '提交成功',
  },

  // 详情页面
  detailSections: {
    basicInfo: '基本信息',
    farmerInfo: '农民信息',
    itemsInfo: '投入品明细',
    auditInfo: '审核记录',
  },

  // 表单字段(引用农民需求的字段)
  form: {
    batchNo: '批次编号',
    farmerId: '农民ID',
    farmerName: '农民姓名',
    farmerIdNumber: '农民身份证号',
    zone: 'Zone',
    woreda: 'Woreda',
    kebele: 'Kebele',
    village: '村庄',
    landArea: '地块总面积(公顷)',
    maxSeedQuantity: '估算最大种子量(kg)',
    maxFertilizerQuantity: '估算最大肥料量(kg)',
    status: '状态',
    currentAuditLevel: '当前审核层级',
    daUserName: '录入DA',
    submitTime: '提交时间',
    remark: '备注',
    createdTime: '创建时间',

    // 投入品明细
    inputCategory: '投入品大类',
    inputType: '农资类型',
    variety: '品种',
    specification: '规格',
    unit: '单位',
    quantity: '需求数量',
    noItems: '暂无投入品明细',
  },

  // 审核记录
  auditRecords: {
    title: '审核记录',
    noRecords: '暂无审核记录',
    auditLevel: '审核层级',
    auditUserName: '审核人',
    auditTime: '审核时间',
    auditAction: '审核动作',
    auditResult: '审核结果',
    auditOpinion: '审核意见',
  },

  // 审核动作
  auditAction: {
    submit: '提交',
    approve: '通过',
    reject: '驳回',
  },

  // 审核结果
  auditResult: {
    passed: '通过',
    rejected: '驳回',
  },

  // 状态
  status: {
    draft: '草稿',
    submitted: '已提交',
    approved: '已通过',
    rejected: '已驳回',
    locked: '已锁定',
  },

  // 投入品大类
  inputCategory: {
    seed: '种子',
    fertilizer: '化肥',
    pesticide: '农药',
  },

  // 数据汇聚
  aggregation: {
    title: '农资汇聚详情',
    dialogTitle: '汇聚统计数据',
    submitConfirm: '确定要提交汇聚数据吗？',
    submitSuccess: '汇聚数据提交成功',
    submitFailed: '汇聚数据提交失败',
    inputCategory: '农资分类',
    inputType: '农资类型',
    totalQuantity: '总数量',
    totalCount: '总项目数',
    demandCount: '涉及需求数',
    sourceName: '来源',
    targetName: '目标',
    status: '状态',
    createdTime: '创建时间',
    noData: '暂无汇聚数据',
  },

  // 汇聚状态
  aggregationStatus: {
    pending: '待审核',
    success: '成功',
    rejected: '拒绝',
  },

  // 提示信息
  messages: {
    selectItems: '请选择要操作的需求',
    noData: '暂无数据',
    loadFailed: '加载失败',
    operationSuccess: '操作成功',
    operationFailed: '操作失败',
    auditLevelMismatch: '审核层级不匹配',
    demandNotFound: '需求不存在',
    invalidStatus: '状态不符合要求',
  },
}
