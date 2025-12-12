export default {
  title: '镇投入品需求审核',
  subtitle: '镇级分级审核农民投入品需求申请',
  list: '待审核列表',
  detail: '审核详情',

  tabs: {
    pending: '待审核',
    summary: '数据汇聚',
  },

  searchPlaceholder: '搜索农民姓名',

  actions: {
    view: '查看',
    approve: '通过',
    reject: '驳回',
    batchApprove: '批量通过',
    batchReject: '批量驳回',
    summarySubmit: '汇聚数据提交',
  },

  // 待审核列表列定义（镇级）
  columns: {
    source: '来源',
    inputCategory: '投入品大类',
    inputType: '农资类型',
    totalQuantity: '需求总数量',
    submitTime: '提交时间',
    actions: '操作',
  },

  // 数据汇聚表头保持与村级一致
  summary: {
    title: '已通过需求汇聚',
    description: '汇总当前镇已通过审核的投入品需求数据',
    list: '汇聚列表',
    inputCategory: '投入品大类',
    inputType: '农资类型',
    totalQuantity: '需求总数量',
  },

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

  messages: {
    selectItems: '请选择要操作的需求',
    noData: '暂无数据',
    loadFailed: '加载失败',
    operationFailed: '操作失败',
  },
}
