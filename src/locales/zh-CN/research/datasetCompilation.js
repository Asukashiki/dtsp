// 育种数据集编制国际化文件
export default {
  title: '育种数据集编制',
  subtitle: '汇总育种批次数据,提交审核',
  list: '数据集列表',
  add: '新增数据集',
  edit: '编辑数据集',
  detail: '数据集详情',
  delete: '删除数据集',
  deleteConfirm: '确定删除该数据集吗?',
  deleteSuccess: '删除成功',
  addSuccess: '新增成功',
  editSuccess: '编辑成功',
  submitSuccess: '提交成功',
  submitConfirm: '确定提交该数据集吗?',

  // 搜索筛选
  searchPlaceholder: '搜索批次ID、批次名称、品种名称',
  filterByCrop: '按作物类型筛选',
  filterByStatus: '按数据集状态筛选',
  allCrops: '全部作物',
  allStatus: '全部状态',

  // 数据集状态
  status: {
    draft: '草稿',
    submitted: '已提交',
    reviewing: '审核中',
    approved: '已通过',
    rejected: '已驳回',
  },

  // 表单字段
  form: {
    basicInfo: '基础信息',
    datasetCode: '数据集编号',
    batchId: '育种批次ID',
    batchName: '育种批次名称',
    cropType: '作物类型',
    varietyName: '品种名称',
    statisticsInfo: '数据统计信息',
    trialCount: '试验记录数',
    fieldDataCount: '田间数据记录数',
    envDataCount: '环境数据记录数',
    labTestCount: '实验室检测记录数',
    yieldDataCount: '产量数据记录数',
    datasetStatus: '数据集状态',
    submitInfo: '提交信息',
    submitTime: '提交时间',
    submitBy: '提交人',
    submitByName: '提交人姓名',
    submitOrgName: '提交机构',
    auditInfo: '审核信息',
    auditTime: '审核时间',
    auditBy: '审核人',
    auditOpinion: '审核意见',
    creationInfo: '创建信息',
    createTime: '创建时间',
    createBy: '创建人',
    createdTime: '创建时间',
    createdBy: '创建人',
    updatedTime: '更新时间',
    operatorInfo: '操作信息',
    remark: '备注',
  },

  // 表单占位符
  placeholder: {
    batchId: '请输入育种批次ID',
    batchName: '请输入育种批次名称',
    cropType: '请选择作物类型',
    varietyName: '请输入品种名称',
    remark: '请输入备注(选填)',
  },

  // 表单验证
  rules: {
    batchIdRequired: '请输入育种批次ID',
    batchNameRequired: '请输入育种批次名称',
    cropTypeRequired: '请选择作物类型',
    varietyNameRequired: '请输入品种名称',
  },

  // 列表列
  columns: {
    datasetCode: '数据集编号',
    batchId: '批次ID',
    batchName: '批次名称',
    cropType: '作物类型',
    varietyName: '品种名称',
    trialCount: '试验数',
    labTestCount: '检测数',
    yieldDataCount: '产量数',
    datasetStatus: '状态',
    submitTime: '提交时间',
    createTime: '创建时间',
    actions: '操作',
  },

  // 操作按钮
  actions: {
    submit: '提交审核',
    statistics: '数据统计',
    view: '查看',
    edit: '编辑',
    delete: '删除',
  },

  // 提示信息
  message: {
    noLabTest: '至少需要一条实验室检测记录才能提交',
    noYieldData: '至少需要一条产量数据记录才能提交',
    onlyDraftCanEdit: '只有草稿状态的数据集可以修改',
    onlyDraftCanDelete: '只能删除草稿状态的数据集',
    onlyDraftCanSubmit: '只有草稿状态的数据集可以提交',
    submitRequirement: '提示: 至少需要1条实验室检测记录和1条产量数据记录才能提交审核',
    cannotEditApproved: '该数据集已审核通过,不可修改',
  },
}
