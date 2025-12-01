// 育种许可数据录入国际化文件
export default {
  title: '育种许可数据录入',
  subtitle: '录入育种许可信息及物种特性数据',
  list: '许可列表',
  add: '新增许可',
  edit: '编辑许可',
  detail: '许可详情',
  viewDetail: '查看详情',

  // 搜索和筛选
  searchPlaceholder: '搜索许可证号、批次名称',
  filterByStatus: '按许可状态筛选',
  filterByApprovalDate: '按审批日期筛选',
  allStatus: '全部状态',

  // 许可状态
  status: {
    valid: '有效',
    expired: '已过期',
    revoked: '已撤销',
  },

  // 列表列
  columns: {
    licenseNo: '许可证号',
    batchName: '批次名称',
    cropType: '作物类型',
    varietyName: '品种名称',
    approvalOrg: '审批机构',
    approvalDate: '批准日期',
    validStartDate: '有效期开始',
    validEndDate: '有效期结束',
    licenseStatus: '许可状态',
    createTime: '创建时间',
    actions: '操作',
  },

  // 详情页区域标题
  sections: {
    basicInfo: '基础信息',
    licenseInfo: '许可证信息',
    varietyTraits: '物种特性',
    yieldInfo: '产量潜力',
    resistanceInfo: '抗性信息',
    otherInfo: '其他信息',
    statistics: '数据统计',
  },

  // 表单字段
  form: {
    // 基础信息
    basicInfo: '基础信息',
    batchId: '育种批次',
    batchName: '批次名称',
    datasetId: '数据集',
    datasetCode: '数据集编号',
    cropType: '作物类型',
    varietyName: '品种名称',

    // 许可证信息
    licenseInfo: '许可证信息',
    licenseNo: '许可证号',
    approvalOrg: '审批机构',
    approvalDate: '批准日期',
    validStartDate: '有效期开始日期',
    validEndDate: '有效期结束日期',
    certificateFile: '认证文件',
    licenseStatus: '许可状态',
    remark: '备注',

    // 物种特性
    varietyTraits: '物种特性',
    minYieldPotential: '最小产量潜力 (公吨/公顷)',
    maxYieldPotential: '最大产量潜力 (公吨/公顷)',
    diseaseResistance: '抗病性 (JSON格式)',
    stressTolerance: '压力耐受性 (JSON格式)',
    maturityDays: '成熟期 (天)',
    plantHeight: '株高 (cm)',
    grainQualityTraits: '谷物品质性状',
    otherTraits: '其他特性 (JSON格式)',

    // 操作信息
    operationInfo: '操作信息',
    createTime: '创建时间',
    createBy: '创建人',
    updateTime: '更新时间',
    updateBy: '更新人',
  },

  // 表单占位符
  placeholder: {
    batchId: '请选择育种批次',
    datasetId: '请选择数据集(可选)',
    cropType: '请输入作物类型',
    varietyName: '请输入品种名称',
    licenseNo: '请输入许可证号',
    approvalOrg: '请输入审批机构',
    approvalDate: '请选择批准日期',
    validStartDate: '请选择有效期开始日期',
    validEndDate: '请选择有效期结束日期',
    certificateFile: '请上传认证文件',
    licenseStatus: '请选择许可状态',
    remark: '请输入备注(选填)',
    minYieldPotential: '请输入最小产量潜力',
    maxYieldPotential: '请输入最大产量潜力',
    diseaseResistance: '例如: {"rust":"high","blight":"medium"}',
    stressTolerance: '例如: {"drought":"high","heat":"medium"}',
    maturityDays: '请输入成熟期天数',
    plantHeight: '请输入株高',
    grainQualityTraits: '请输入谷物品质性状',
    otherTraits: '例如: {"lodging_resistance":"good"}',
  },

  // 表单验证
  rules: {
    batchIdRequired: '请选择育种批次',
    cropTypeRequired: '请输入作物类型',
    varietyNameRequired: '请输入品种名称',
    licenseNoRequired: '请输入许可证号',
    approvalOrgRequired: '请输入审批机构',
    approvalDateRequired: '请选择批准日期',
    validStartDateRequired: '请选择有效期开始日期',
    validEndDateRequired: '请选择有效期结束日期',
    licenseStatusRequired: '请选择许可状态',
    minYieldPotentialMin: '最小产量潜力必须大于0',
    maxYieldPotentialMin: '最大产量潜力必须大于0',
    maturityDaysMin: '成熟期天数必须大于0',
    plantHeightMin: '株高必须大于0',
    jsonFormat: '请输入有效的JSON格式',
  },

  // 操作按钮
  actions: {
    add: '新增许可',
    edit: '编辑',
    delete: '删除',
    detail: '查看详情',
    backToList: '返回列表',
    submit: '提交',
    cancel: '取消',
    search: '搜索',
    reset: '重置',
    upload: '上传文件',
  },

  // 提示信息
  message: {
    addSuccess: '新增许可成功',
    updateSuccess: '更新许可成功',
    deleteSuccess: '删除许可成功',
    submitSuccess: '提交成功',
    confirmDelete: '确定要删除选中的许可吗？',
    selectAtLeastOne: '请至少选择一条记录',
    batchAlreadyHasLicense: '该批次已存在许可',
    datasetNotApproved: '数据集尚未审核通过',
    licenseNoExists: '许可证号已存在',
    loading: '加载中...',
    noData: '暂无数据',
  },

  // 数据统计
  statistics: {
    totalLicenses: '许可总数',
    validLicenses: '有效许可',
    expiredLicenses: '过期许可',
    revokedLicenses: '已撤销许可',
  },
};