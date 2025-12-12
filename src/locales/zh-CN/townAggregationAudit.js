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
