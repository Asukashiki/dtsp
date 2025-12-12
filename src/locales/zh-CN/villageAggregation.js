export default {
  // 村级需求汇聚
  title: '村级需求汇聚',
  subtitle: '管理和汇聚村级农民需求数据',

  // 操作按钮
  actions: {
    addYear: '新增年度',
    approve: '审批',
    submit: '提交',
    detail: '明细',
    view: '查看',
    delete: '删除',
  },

  // 列表列
  columns: {
    year: '年度',
    sourceCode: '来源编码',
    sourceName: '来源名称',
    targetCode: '目标编码',
    targetName: '目标名称',
    status: '状态',
    creator: '创建人',
    createTime: '创建时间',
    subQuantity: '子汇聚数量',
    actions: '操作',
  },

  // 状态
  status: {
    draft: '草稿',
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
  },

  // 新增年度对话框
  addYearDialog: {
    title: '新增年度记录',
    year: '选择年度',
    yearPlaceholder: '请选择年度',
    confirm: '确定',
    cancel: '取消',
    success: '年度记录创建成功',
    failed: '年度记录创建失败',
    yearRequired: '请选择年度',
  },

  // 提交对话框
  submitDialog: {
    confirmMessage: '确定要提交汇聚数据吗？',
    success: '汇聚数据提交成功',
    failed: '汇聚数据提交失败',
  },

  // 明细对话框
  detailDialog: {
    title: '汇聚数据明细',
    columns: {
      inputCategory: '投入品类别',
      inputType: '投入品类型',
      totalQuantity: '总数量',
      totalCount: '总计数',
    },
    noData: '暂无明细数据',
    loadFailed: '加载明细数据失败',
  },

  // 提示信息
  messages: {
    noData: '暂无数据',
    loadFailed: '加载失败',
    deleteConfirm: '确定要删除这条记录吗？',
    deleteSuccess: '删除成功',
    deleteFailed: '删除失败',
  },
}
