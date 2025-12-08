export default {
  // 页面标题
  title: 'C1繁殖批次管理',
  subtitle: '管理C1种子繁殖批次信息',

  // 操作
  add: '新增批次',
  edit: '编辑批次',
  delete: '删除',
  view: '查看详情',

  // 搜索
  searchPlaceholder: '搜索批次编号、品种名称...',
  filterByCrop: '按作物筛选',
  filterByStatus: '按状态筛选',
  allCrops: '全部作物',
  allStatus: '全部状态',

  // 表单
  form: {
    basicInfo: '基本信息',
    breedingInfo: '繁育信息',
    orgInfo: '机构信息',
    batchId: '批次编号',
    linkedBatchNo: '关联批次号',
    propagationId: '关联申请ID',
    cropType: '作物种类',
    varietyName: '品种名称',
    varietyCode: '品种代码',
    breedingLevel: '繁殖级别',
    breedingMethod: '繁育方法',
    parentSeedSource: '亲本种子来源',
    startDate: '开始日期',
    endDate: '结束日期',
    expectedYield: '预期产量 (kg)',
    actualYield: '实际产量 (kg)',
    plantingArea: '种植面积 (公顷)',
    batchStatus: '批次状态',
    orgId: '机构ID',
    orgName: '机构名称',
    orgType: '机构类型',
    location: '繁殖地点',
    remark: '备注'
  },

  // 占位符
  placeholder: {
    linkedBatchNo: '请选择已审核通过的繁殖申请',
    cropType: '请选择作物种类',
    varietyName: '请输入品种名称',
    varietyCode: '请输入品种代码',
    breedingLevel: '请选择繁殖级别',
    breedingMethod: '请选择繁育方法',
    parentSeedSource: '请输入亲本种子来源',
    startDate: '请选择开始日期',
    endDate: '请选择结束日期',
    expectedYield: '请输入预期产量',
    actualYield: '请输入实际产量',
    plantingArea: '请输入种植面积',
    orgId: '机构ID',
    orgName: '机构名称',
    location: '请输入繁殖地点',
    remark: '请输入备注'
  },

  // 表格列
  columns: {
    batchId: '批次编号',
    cropType: '作物种类',
    varietyName: '品种名称',
    breedingLevel: '繁殖级别',
    startDate: '开始日期',
    status: '状态',
    trackingCount: '跟踪记录',
    testCount: '检测记录',
    actions: '操作'
  },

  // 繁殖级别
  breedingLevel: {
    parentPrep: '亲本预备',
    original: '原种',
    foundation: '基础种',
    certified: '认证种'
  },

  // 状态
  status: {
    ongoing: '进行中',
    completed: '已完成',
    terminated: '已中止'
  },

  // 详情页
  detail: {
    title: '批次详情',
    tabs: {
      basicInfo: '基本信息',
      trackingRecords: '跟踪记录',
      testRecords: '检测记录'
    },
    basicInfo: '基本信息',
    timeline: '时间节点',
    yieldData: '产量数据',
    relatedRecords: '相关记录',
    orgInfo: '机构信息',
    trackingCount: '跟踪记录数',
    testCount: '检测记录数'
  },

  // 验证规则
  rules: {
    cropTypeRequired: '请选择作物种类',
    varietyNameRequired: '请输入品种名称',
    breedingLevelRequired: '请选择繁殖级别',
    startDateRequired: '请选择开始日期'
  },

  // 消息
  messages: {
    addSuccess: '批次新增成功',
    updateSuccess: '批次更新成功',
    deleteSuccess: '批次删除成功',
    deleteConfirm: '确定要删除该批次吗？',
    loadError: '数据加载失败'
  },

  // 跟踪记录
  tracking: {
    add: '新增跟踪记录',
    edit: '编辑跟踪记录',
    detail: '跟踪记录详情',
    deleteConfirm: '确定要删除该跟踪记录吗？',
    trackingId: '跟踪编号',
    location: '地点',
    result: '跟踪结论',
    startDate: '开始日期',
    endDate: '结束日期',
    operator: '操作人',
    description: '跟踪描述',
    resultNormal: '正常',
    resultAbnormal: '异常',
    resultObserving: '观察中'
  },

  // 检测记录
  test: {
    add: '新增检测记录',
    edit: '编辑检测记录',
    detail: '检测记录详情',
    deleteConfirm: '确定要删除该检测记录吗？',
    testId: '检测编号',
    testItem: '检测项目',
    testDate: '检测日期',
    testValue: '检测值',
    testResult: '检测结论',
    tester: '检测人',
    testOrg: '检测机构',
    description: '检测描述',
    resultPass: '合格',
    resultFail: '不合格',
    resultRetest: '待复检'
  }
}

