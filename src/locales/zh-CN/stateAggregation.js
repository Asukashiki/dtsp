export default {
  // 州级需求汇聚
  title: '州级需求汇聚',
  subtitle: '管理和汇聚州级区级需求数据',

  // 操作按钮
  actions: {
    addYear: '新增年度',
    publishAll: '发布全部',
    detail: '明细',
    view: '查看',
  },

  // 发布全部对话框
  publishAllDialog: {
    title: '发布全部任务',
    year: '选择年度',
    yearPlaceholder: '请选择年度',
    confirm: '确认',
    cancel: '取消',
    success: '任务发布成功',
    failed: '发布任务失败',
    yearRequired: '请选择年度',
  },

  // 表格列
  columns: {
    year: '年度',
    sourceCode: '来源区划代码',
    sourceName: '来源区划名称',
    targetCode: '目标区划代码',
    targetName: '目标区划名称',
    status: '状态',
    creator: '创建人',
    createTime: '创建时间',
    subQuantity: '下级数量',
    actions: '操作',
  },

  // 状态
  status: {
    draft: '草稿',
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回',
  },

  // 新增年度对话框
  addYearDialog: {
    title: '新增年度记录',
    year: '选择年度',
    yearPlaceholder: '请选择年度',
    confirm: '确认',
    cancel: '取消',
    success: '年度记录创建成功',
    failed: '创建年度记录失败',
    yearRequired: '请选择年度',
  },

  // 明细对话框
  detailDialog: {
    title: '汇聚数据明细',
    columns: {
      inputCategory: '投入品类别',
      inputType: '投入品类型',
      totalQuantity: '总数量',
      totalCount: '总条数',
    },
    noData: '暂无明细数据',
    loadFailed: '加载明细数据失败',
  },

  // 消息提示
  messages: {
    noData: '暂无数据',
    loadFailed: '加载数据失败',
  },
}
