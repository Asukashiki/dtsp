export default {
  // 区级需求汇聚审核
  title: '区级需求汇聚审核',
  subtitle: '审核镇级提交的需求汇聚数据',
  listTitle: '镇级汇聚记录列表',

  // 操作按钮
  actions: {
    viewDetail: '查看明细',
    approve: '审批通过',
    reject: '驳回',
  },

  // 表格列
  columns: {
    sourceCode: '来源区划代码',
    sourceName: '来源区划名称',
    targetCode: '目标区划代码',
    targetName: '目标区划名称',
    status: '状态',
    actions: '操作',
  },

  // 状态
  status: {
    draft: '草稿',
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回',
  },

  // 审批对话框
  approveDialog: {
    confirmMessage: '确定要审批通过这条记录吗？',
  },

  // 明细对话框
  detailDialog: {
    title: '汇聚明细',
    noData: '暂无明细数据',
  },

  // 消息提示
  messages: {
    noData: '暂无数据',
    loadFailed: '加载数据失败',
    detailLoadFailed: '加载明细数据失败',
    approveSuccess: '审批成功',
    approveFailed: '审批失败',
  },
}
