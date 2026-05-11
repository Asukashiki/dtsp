export default {
  title: '镇级需求汇聚审核',
  subtitle: '审核村级需求汇聚数据',
  listTitle: '镇级需求汇聚审核列表',

  columns: {
    sourceCode: '来源编码',
    sourceName: '来源名称',
    targetCode: '目标编码',
    targetName: '目标名称',
    status: '状态',
  },

  status: {
    draft: '草稿',
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
  },

  detailDialog: {
    title: '汇聚数据明细',
    noData: '暂无明细数据',
  },

  adjustment: {
    title: 'WOREDA LEVEL - 调整来自 Kebele 的需求',
    index: '#',
    emptyTitle: '请选择一条明细',
    emptyTip: '点击调整或查看历史后，可在此处管理单条需求明细。',
    kebeleName: 'Kebele 名称',
    inputType: '投入品类型',
    category: '类别',
    variety: '品种',
    season: '季节',
    receivedDemand: 'Kebele 上报需求',
    adjustedDemand: 'Woreda 调整后需求',
    currentAdjustedDemand: '当前 Woreda 调整后需求',
    newAdjustedDemand: '新的 Woreda 调整后需求',
    adjustmentRemark: '调整备注',
    status: '状态',
    adjust: '调整',
    adjustPanelTitle: '调整需求',
    submitToZone: '提交到 Zone',
    alreadySubmitted: '已提交',
    viewHistory: '查看历史',
    historyTitle: '调整历史',
    saveAdjustment: '保存调整',
    cancel: '取消',
    originalQuantity: '原始数量',
    beforeQuantity: '调整前',
    afterQuantity: '调整后',
    operator: '操作人',
    operationType: '操作类型',
    operationTime: '操作时间',
    remark: '备注',
    noHistory: '暂无调整历史',
    saveSuccess: '调整保存成功',
    saveFailed: '调整保存失败',
    historyLoadFailed: '调整历史加载失败',
    submitConfirm: '确认将此明细提交到 Zone 吗？',
    submitSuccess: '提交到 Zone 成功',
    submitFailed: '提交到 Zone 失败',
    requiredAdjustedQuantity: '请输入调整后数量',
    requiredAdjustmentRemark: '请输入调整备注',
  },

  adjustmentStatus: {
    pending: '待处理',
    adjusted: '已调整',
    submitted: '已提交',
    approved: '已通过',
    rejected: '已驳回',
  },

  aggregateDialog: {
    title: '汇聚统计数据',
    noData: '暂无统计数据',
  },

  messages: {
    noData: '暂无数据',
    loadFailed: '加载失败',
    detailLoadFailed: '加载明细数据失败',
    aggregateLoadFailed: '加载汇聚数据失败',
    approveSuccess: '审批成功',
    approveFailed: '审批失败',
    rejectSuccess: '驳回成功',
    rejectFailed: '驳回失败',
  },

  approveDialog: {
    confirmMessage: '确认审批通过此记录吗？',
  },

  rejectDialog: {
    confirmMessage: '确认驳回此记录吗？',
  },

  actions: {
    viewDetail: '查看明细',
    viewAggregate: '汇聚统计',
  },
}
