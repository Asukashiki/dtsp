// 育种数据集编制国际化文件 (完整版本)
export default {
  // 基础标题/操作
  title: '育种数据集编制',
  subtitle: '汇总育种批次数据,提交审核',
  list: '数据集列表',
  add: '新增数据集',
  compile: '编制',
  edit: '编辑数据集',
  detail: '数据集详情',
  delete: '删除数据集',
  deleteConfirm: '确定删除该数据集吗?',
  deleteSuccess: '删除成功',
  addSuccess: '新增成功',
  editSuccess: '编辑成功',
  submitSuccess: '提交成功',
  submitConfirm: '确定提交该数据集吗?',
  pendingCode: '待生成',

  // 搜索筛选
  searchPlaceholder: '搜索品种名称',
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
    dataDetails:'数据细节',
    basicInfo: '基础信息',
    datasetCode: '数据集编号',
    trialId: '试验ID',
    batchId: '育种批次ID',
    batchName: '育种批次名称',
    versionNo: '版本号',
    cropType: '作物类型',
    varietyName: '品种名称',
    compiledBy: '编制人',
    compiledAt: '编制时间',
    recordCount: '记录数量',
    status: '状态',
    compilationInfo: '编制信息',
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
    auditByName: '审核人姓名',
    auditOpinion: '审核意见',
    creationInfo: '创建信息',
    createTime: '创建时间',
    createBy: '创建人',
    createdTime: '创建时间',
    createdBy: '创建人',
    createdByName: '创建人姓名',
    updatedTime: '更新时间',
    updatedBy: '更新人', // 补充缺失的key
    operatorInfo: '操作信息',
    remark: '备注',
    // 统计信息子项（对应页面统计卡片）
    statistics: {
      trialCount: '试验记录数',
      plotCount: '地块与播种信息数',
      farmingCount: '农事记录数据数',
      agronomicCount: '农艺性状数据数',
      envCount: '环境监测数据数',
      yieldCount: '田间检查数据数',
      labCount: '实验室测试数据数',
      totalCount: '总数据条数' // 补充缺失的总数据统计key
    }
  },

  // 表单占位符
  placeholder: {
    trialId: '请选择试验ID',
    batchId: '请输入育种批次ID',
    batchIdAuto: '将根据试验ID自动填充',
    batchName: '请输入育种批次名称',
    versionNo: '请输入版本号（默认1.0）',
    cropType: '请选择作物类型',
    varietyName: '请输入品种名称',
    compiledBy: '自动获取当前用户',
    compiledAt: '请选择编制时间',
    recordCount: '请输入记录数量',
    recordCountAutoCalculate: '记录数量自动计算（田间数据 + 环境数据 + 实验室测试 + 产量数据）',
    status: '请选择状态',
    remark: '请输入备注(选填)',
    // 表格备注输入框占位符
    remarkInput: '请输入备注'
  },

  // 表单验证
  rules: {
    trialIdRequired: '请选择试验ID',
    batchIdRequired: '请输入育种批次ID',
    batchNameRequired: '请输入育种批次名称',
    cropTypeRequired: '请选择作物类型',
    varietyNameRequired: '请输入品种名称',
    compiledByRequired: '编制人不能为空',
    compiledAtRequired: '请选择编制时间',
  },

  // 列表列
  columns: {
    datasetCode: '数据集编号',
    trialId: '试验ID',
    batchId: '批次ID',
    batchName: '批次名称',
    versionNo: '版本号',
    cropType: '作物类型',
    varietyName: '品种名称',
    recordCount: '记录数量',
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

  // 提示框文案（tooltip）
  tooltip: {
    batchIdAuto: '批次ID将根据试验ID自动填充',
    compiledByAuto: '自动获取当前登录用户',
    cropTypeAuto: '作物类型从试验信息自动获取',
    varietyNameAuto: '品种名称从试验信息自动获取',
    codeAfterApproval: '正式数据集编号将在审核通过后自动生成'
  },

  // Tab页标题
  tab: {
    plot: '地块与播种信息',
    farming: '农事记录数据采集',
    agronomic: '农艺性状数据采集',
    environment: '环境监测数据',
    yield: '田间检查数据采集',
    lab: '实验室测试数据采集'
  },

  // 表格列文案
  table: {
    // 通用列
    common: {
      batchId: '批次ID',
      trialId: '试验ID',
      plotId: '地块ID',
      quantity: '数量',
      unit: '单位',
      remark: '备注',
      remarks: '备注信息',
      createdTime: '创建时间'
    },
    // 地块与播种信息列
    plot: {
      plotId: '地块ID',
      replicationNo: '重复组编号',
      rowNo: '行号',
      columnNo: '列号',
      varietyCode: '品种编码',
      sowingDate: '播种日期',
      seedQuantity: '种子数量(kg)',
      sowingMethod: '播种方式',
      plotAreaM2: '地块面积(㎡)',
      gpsLat: 'GPS纬度',
      gpsLong: 'GPS经度',
      region: '地区'
    },
    // 农事记录数据列
    farming: {
      farmingRecordId: '农事记录ID',
      activityDate: '活动日期',
      activityType: '活动类型',
      inputName: '投入品名称',
      operatorId: '操作人ID',
      operationDesc: '操作描述'
    },
    // 农艺性状数据列
    agronomic: {
      traitRecordId: '性状记录ID',
      observationDate: '观测日期',
      growthStage: '生育期',
      traitName: '性状名称',
      traitValue: '性状值',
      observerId: '观测人ID',
      plantHeightCm: '株高(cm)',
      tillerCount: '分叶数'
    },
    // 环境监测数据列
    environment: {
      envRecordId: '环境记录ID',
      stationId: '气象站ID',
      timestamp: '采集时间',
      parameterCode: '参数代码',
      value: '测量值',
      unit: '单位',
      source: '数据来源',
      collectTime: '采集时间',
      dataType: '数据类型',
      soilPh: '土壤pH值',
      soilTemperature: '土壤温度(℃)',
      soilMoisture: '土壤湿度(%)',
      airTemperature: '空气温度(℃)',
      airHumidity: '空气湿度(%)',
      rainfall: '降雨量(mm)'
    },
    // 田间检查数据列
    yield: {
      inspectionId: '检查ID',
      plotAreaM2: '地块面积(㎡)',
      inspectionDate: '检查日期',
      inspectionType: '检查类型',
      grainWeightKg: '籽粒重量(kg)',
      yieldQtPerHa: '产量(qt/ha)',
      moistureContent: '含水率(%)',
      scoreValue: '评分值',
      harvestDate: '收获日期',
      recorderName: '记录人'
    },
    // 实验室测试数据列
    lab: {
      testId: '测试ID',
      sampleId: '样品ID',
      sampleType: '样品类型',
      germinationRate: '发芽率(%)',
      purityPercent: '纯度(%)',
      moistureContentPercent: '含水率(%)',
      proteinPercent: '蛋白质含量(%)',
      testDate: '测试日期',
      testOrganization: '测试机构',
      testerName: '测试人',
      passFailFlag: '合格标识',
      pass: '合格',
      fail: '不合格'
    }
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
    statisticsLoaded: '统计数据已自动加载',
    statisticsFailed: '获取统计数据失败',
    getTrialInfoFailed: '获取试验信息失败，请手动填写',
    loadFailed: '加载失败' // 补充通用加载失败提示
  },

  // 通用公共文案（组件中用到的common前缀key）
  common: {
    back: '返回',
    noData: '暂无数据',
    edit: '编辑',
    loadFailed: '加载失败'
  }
}