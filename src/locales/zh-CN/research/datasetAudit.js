export default {
  // 页面基础标题
  title: '数据集审核详情',
  subtitle: '对已提交的数据集进行审核',
  list: '审核列表',
  detail: '审核详情',
  history: '审核历史',
  auditSuccess: '审核成功',

  // 确认框文案
  confirm: {
    approve: '确定审核通过该数据集吗？',
    reject: '确定驳回该数据集吗？',
    needsRevision: '确定将该数据集标记为需要修订吗？'
  },

  // 搜索筛选
  searchPlaceholder: '搜索数据集编号、批次名称、品种名称',
  filterByAuditStatus: '按审核状态筛选',
  filterByDatasetStatus: '按数据集状态筛选',
  allAuditStatus: '全部审核状态',
  allDatasetStatus: '全部数据集状态',

  // 审核状态
  auditStatus: {
    pending: '待审核',
    approved: '审核通过',
    rejected: '审核驳回',
    needs_revision: '需要修订'
  },

  // 数据集状态(复用编制模块的状态)
  datasetStatus: {
    draft: '草稿',
    submitted: '已提交',
    reviewing: '审核中',
    approved: '已通过',
    rejected: '已驳回'
  },

  // 表单字段
  form: {
    basicInfo: '数据集基础信息',
    dataStatistics: '数据统计信息',
    auditInfo: '审核信息',
    submitInfo: '提交信息',
    compilationInfo: '编制信息',
    dataDetails: '数据详情',
    auditOpinion: '审核意见',
    auditTime: '审核时间',
    auditorName: '审核人',
    auditorOrgName: '审核机构',
    submitTime: '提交时间',
    submitterName: '提交人',
    submitOrgName: '提交机构',
    datasetCode: '数据集编号',
    trialId: '试验ID',
    batchId: '育种批次ID',
    batchName: '育种批次名称',
    versionNo: '版本号',
    cropType: '作物类型',
    varietyName: '品种名称',
    recordCount: '记录数量',
    remark: '备注',
    compiledBy: '编制人',
    compiledByName: '编制人姓名',
    compiledAt: '编制时间',
    datasetStatus: '数据集状态',
    auditStatus: '审核状态',
    createdTime: '创建时间',
    updatedTime: '更新时间',
    createdBy: '创建人',
    submitBy: '提交人',
    submitOrg: '提交机构',
    auditBy: '审核人',
    creationInfo: '创建信息',
    lockedFlag: '锁定状态',
    locked: '已锁定',
    unlocked: '未锁定',
    lockDataset: '锁定数据集',
    lockDatasetTip: '审核通过后锁定数据集，锁定后数据集将变为只读状态'
  },

  // 表单占位符
  placeholder: {
    auditOpinion: '请填写审核意见(驳回/需要修订时必填)',
    selectAuditStatus: '请选择审核状态',
    selectDatasetStatus: '请选择数据集状态'
  },

  // 表单验证规则
  rules: {
    auditOpinionRequired: '驳回/需要修订时必须填写审核意见'
  },

  // 列表列名
  columns: {
    auditId: '审核ID',
    datasetId: '数据集ID',
    datasetCode: '数据集编号',
    reviewerId: '审核人ID',
    trialId: '试验ID',
    trialCount: '试验数量',
    batchId: '批次ID',
    batchName: '批次名称',
    versionNo: '版本号',
    cropType: '作物类型',
    varietyName: '品种名称',
    recordCount: '记录数量',
    farmingRecordCount: '农事记录数',
    fieldDataCount: '田间数据数',
    envDataCount: '环境数据数',
    labTestCount: '检测数',
    yieldDataCount: '产量数',
    datasetStatus: '数据集状态',
    auditStatus: '审核状态',
    submitTime: '提交时间',
    submitterName: '提交人',
    auditTime: '审核时间',
    auditorName: '审核人',
    auditOpinion: '审核意见',
    lockedFlag: '锁定状态',
    createdTime: '创建时间',
    updatedTime: '更新时间',
    actions: '操作'
  },

  // 统计项文案
  statistics: {
    trialCount: '试验数量',
    plotCount: '地块数量',
    farmingCount: '农事记录数量',
    agronomicCount: '农艺性状数量',
    envCount: '环境监测数量',
    yieldCount: '产量数据数量',
    labCount: '实验室测试数量',
    totalCount: '数据总条数'
  },

  // Tab页标题
  tab: {
    plot: '地块及播种信息',
    farming: '农事记录数据',
    agronomic: '农艺性状数据',
    environment: '环境监测数据',
    yield: '产量/田间检查数据',
    lab: '实验室测试数据'
  },

  // 表格列文案
  table: {
    // 公共列
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
    // 地块及播种信息列
    plot: {
      plotId: '地块ID',
      replicationNo: '重复号',
      rowNo: '行号',
      columnNo: '列号',
      varietyCode: '品种编码',
      sowingDate: '播种日期',
      seedQuantity: '播种量',
      sowingMethod: '播种方式',
      plotAreaM2: '地块面积(㎡)',
      gpsLat: 'GPS纬度',
      gpsLong: 'GPS经度',
      region: '种植区域'
    },
    // 农事记录列
    farming: {
      farmingRecordId: '农事记录ID',
      activityDate: '作业日期',
      activityType: '作业类型',
      inputName: '投入品名称',
      operatorId: '操作人ID',
      operationDesc: '作业描述'
    },
    // 农艺性状列
    agronomic: {
      traitRecordId: '性状记录ID',
      observationDate: '观测日期',
      growthStage: '生育期',
      traitName: '性状名称',
      traitValue: '性状值',
      observerId: '观测人ID',
      plantHeightCm: '株高(cm)',
      tillerCount: '分蘖数'
    },
    // 环境监测列
    environment: {
      envRecordId: '环境记录ID',
      collectTime: '采集时间',
      dataType: '数据类型',
      soilPh: '土壤pH值',
      soilTemperature: '土壤温度(℃)',
      soilMoisture: '土壤湿度(%)',
      airTemperature: '空气温度(℃)',
      airHumidity: '空气湿度(%)',
      rainfall: '降雨量(mm)'
    },
    // 产量/田间检查列
    yield: {
      inspectionId: '检查ID',
      plotAreaM2: '地块面积(㎡)',
      inspectionDate: '检查日期',
      inspectionType: '检查类型',
      grainWeightKg: '籽粒重量(kg)',
      yieldQtPerHa: '产量(吨/公顷)',
      moistureContent: '含水率(%)',
      scoreValue: '评分值',
      harvestDate: '收获日期',
      recorderName: '记录人'
    },
    // 实验室测试列
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
      passFailFlag: '合格状态',
      pass: '合格',
      fail: '不合格'
    }
  },

  // 操作按钮文案
  actions: {
    view: '查看',
    approve: '审核通过',
    reject: '驳回',
    needsRevision: '需要修订',
    audit: '审核',
    viewHistory: '查看历史'
  },

  // 提示信息
  message: {
    approveSuccess: '审核通过成功',
    rejectSuccess: '审核驳回成功',
    needsRevisionSuccess: '已标记为需要修订',
    datasetCodeGenerated: '数据集编号已生成',
    onlySubmittedCanAudit: '只能审核已提交或审核中的数据集',
    rejectOpinionRequired: '驳回时必须填写驳回原因',
    needsRevisionOpinionRequired: '标记需要修订时必须填写修订意见',
    auditOpinionLabel: '审核意见',
    datasetLocked: '数据集已锁定，不可修改',
    datasetUnlocked: '数据集未锁定，可以修改',
    loadDataFailed: '数据加载失败，请稍后重试',
    loadDetailFailed: '详情数据加载失败'
  },

  // 日志文案（前端调试用，非用户可见）
  log: {
    loadingDataList: '正在加载数据列表，试验ID：{trialId}',
    loadPlotFailed: '地块数据加载失败',
    loadFarmingFailed: '农事记录数据加载失败',
    loadAgronomicFailed: '农艺性状数据加载失败',
    loadEnvironmentFailed: '环境监测数据加载失败',
    loadLabFailed: '实验室测试数据加载失败',
    loadYieldFailed: '产量数据加载失败',
    loadDataSuccess: '数据列表加载完成',
    parseRemarkFailed: '解析模块备注失败',
    loadDataFailed: '数据加载失败',
    loadingStatistics: '正在加载统计数据，试验ID：{trialId}',
    loadFarmingStatsFailed: '农事记录统计数据加载失败',
    loadFieldStatsFailed: '田间数据统计加载失败',
    loadEnvStatsFailed: '环境数据统计加载失败',
    loadLabStatsFailed: '实验室测试统计加载失败',
    loadYieldStatsFailed: '产量数据统计加载失败',
    loadPlotStatsFailed: '地块数据统计加载失败',
    statsApiResult: '统计接口返回结果',
    statsResult: '统计计算结果',
    loadStatsFailed: '统计数据加载失败',
    detectedTrialId: '检测到试验ID：{trialId}，开始加载相关数据',
    noTrialIdInDataset: '数据集中未找到试验ID',
    noTrialId: '试验ID为空，无法加载统计数据',
    statsUpdated: '统计数据已更新到详情数据中',
    noAuditRecord: '未查询到审核记录，使用默认状态',
    loadDetailFailed: '详情数据加载失败',
    loadYieldError: '产量数据接口返回异常'
  }
}