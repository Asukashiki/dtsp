// 数据采集国际化文件
export default {
  // 试验基础数据采集
  trialBase: {
    title: '试验基础数据采集',
    subtitle: '采集育种试验基础信息,确保育种数据标准化',
    list: '试验基础数据列表',
    add: '新增试验数据',
    edit: '编辑试验数据',
    detail: '试验数据详情',
    delete: '删除试验数据',
    deleteConfirm: '确定删除该试验数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索试验ID、作物类型、品种名称',
    filterByCrop: '按作物类型筛选',
    filterByDate: '按开始日期筛选',
    allCrops: '全部作物',

    // 表单字段
    form: {
      basicInfo: '试验基础信息',
      locationInfo: '位置信息',
      trialId: '试验ID',
      cropType: '作物类型',
      varietyName: '品种名称',
      researchCenterId: '研究中心ID',
      programId: '程序ID',
      subProgramId: '子程序ID',
      thematicResearchAreaId: '主题研究领域ID',
      region: '地区',
      zone: '区域',
      woreda: '县',
      kebele: '乡',
      agroEcologicalZone: '农业生态区',
      gpsLocation: 'GPS位置',
      startDate: '开始日期',
      activityCode: '活动代码',
      kpiCode: 'KPI代码',
      season: '季节',
      createTime: '创建时间',
      createBy: '创建人',
      auditInfo: '审核信息',
      rejectedBy: '退回人',
      rejectedTime: '退回时间',
      rejectReason: '退回原因',
      rejectInfo: '退回信息',
    },

    // 表单占位符
    placeholder: {
      trialId: '系统自动生成',
      cropType: '请选择作物类型',
      varietyName: '请输入品种名称',
      researchCenterId: '请输入研究中心ID',
      programId: '请输入程序ID',
      subProgramId: '请输入子程序ID',
      thematicResearchAreaId: '请输入主题研究领域ID',
      region: '请选择地区',
      zone: '请选择区域',
      woreda: '请选择县',
      kebele: '请选择乡',
      agroEcologicalZone: '请输入农业生态区(选填)',
      gpsLocation: '格式：经度,纬度',
      startDate: '请选择开始日期',
      activityCode: '请输入活动代码(选填)',
      kpiCode: '请输入KPI代码(选填)',
      season: '请选择季节',
    },

    // 表单验证
    rules: {
      cropTypeRequired: '请选择作物类型',
      varietyNameRequired: '请输入品种名称',
      researchCenterIdRequired: '请输入研究中心ID',
      programIdRequired: '请输入程序ID',
      subProgramIdRequired: '请输入子程序ID',
      thematicResearchAreaIdRequired: '请输入主题研究领域ID',
      regionRequired: '请选择地区',
      zoneRequired: '请选择区域',
      woredaRequired: '请选择县',
      kebeleRequired: '请选择乡',
      gpsLocationRequired: '请输入GPS位置',
      gpsLocationFormat: '请输入正确的GPS位置格式',
      startDateRequired: '请选择开始日期',
      seasonRequired: '请选择季节',
    },

    // 列表列
    columns: {
      trialId: '试验ID',
      cropType: '作物类型',
      varietyName: '品种名称',
      region: '地区',
      zone: '区域',
      startDate: '开始日期',
      season: '季节',
      createTime: '创建时间',
      actions: '操作',
    },
  },

  // 农民与地块属性数据采集
  farmerPlot: {
    title: '农民与地块属性数据采集',
    subtitle: '采集农民及地块信息,确保试验信息完整准确',
    list: '农民地块数据列表',
    add: '新增农民地块数据',
    edit: '编辑农民地块数据',
    detail: '农民地块数据详情',
    delete: '删除数据',
    deleteConfirm: '确定删除该数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索农民姓名、联系电话',
    filterByGender: '按性别筛选',
    allGender: '全部性别',

    // 性别选项
    gender: {
      male: '男',
      female: '女',
    },

    // 青年类别
    youthCategory: {
      youth: '青年',
      adult: '成年',
      elderly: '老年',
    },

    // 表单字段
    form: {
      farmerInfo: '农民基本信息',
      plotInfo: '地块信息',
      operatorInfo: '操作信息',
      dataId: '数据ID',
      farmerName: '农民姓名',
      gender: '性别',
      youthCategory: '青年类别',
      cooperativeMembership: '合作社成员资格',
      plotSizeM2: '地块面积(平方米)',
      householdId: '家庭ID',
      contactPhone: '联系电话',
      createTime: '创建时间',
      createBy: '创建人',
    },

    // 表单占位符
    placeholder: {
      farmerName: '请输入农民姓名',
      gender: '请选择性别',
      youthCategory: '请选择青年类别',
      cooperativeMembership: '请输入合作社成员资格',
      plotSizeM2: '请输入地块面积',
      householdId: '请输入家庭ID(选填)',
      contactPhone: '请输入联系电话',
    },

    // 表单验证
    rules: {
      farmerNameRequired: '请输入农民姓名',
      farmerNameLength: '农民姓名长度应在2-100个字符之间',
      genderRequired: '请选择性别',
      youthCategoryRequired: '请选择青年类别',
      cooperativeMembershipRequired: '请输入合作社成员资格',
      plotSizeM2Required: '请输入地块面积',
      plotSizeM2Min: '地块面积必须大于0',
      plotSizeM2Format: '请输入正确的面积数值',
      contactPhoneRequired: '请输入联系电话',
      contactPhoneFormat: '请输入正确的手机号码',
    },

    // 列表列
    columns: {
      farmerName: '农民姓名',
      gender: '性别',
      youthCategory: '青年类别',
      plotSizeM2: '地块面积(m²)',
      contactPhone: '联系电话',
      createTime: '创建时间',
      createBy: '创建人',
      actions: '操作',
    },
  },

  // 农事记录数据采集
  farmingRecord: {
    title: '农事记录数据采集',
    subtitle: '记录灌溉、施肥、除草等农事管理措施',
    list: '农事记录列表',
    add: '新增农事记录',
    edit: '编辑农事记录',
    detail: '农事记录详情',
    delete: '删除记录',
    deleteConfirm: '确定删除该记录吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索管理措施',
    filterByPractice: '按管理措施筛选',
    allPractices: '全部措施',

    // 管理措施选项
    managementPractice: {
      irrigation: '灌溉',
      fertilization: '施肥',
      weeding: '除草',
      pestControl: '病虫害防治',
      other: '其他',
    },

    // 表单字段
    form: {
      basicInfo: '基础信息',
      managementInfo: '管理信息',
      dataId: '数据ID',
      managementPractice: '管理措施',
      fertilizerType: '肥料类型',
      fertilizerRateKg: '肥料施用量(公斤)',
      ureaRateKg: '尿素施用量(公斤)',
      pesticideType: '农药类型',
      irrigationType: '灌溉类型',
      irrigationFrequency: '灌溉频率',
      weedingDate: '除草日期',
      herbicideUsed: '除草剂使用',
      seedSource: '种子来源',
      createTime: '创建时间',
      createBy: '创建人',
    },

    // 表单占位符
    placeholder: {
      managementPractice: '请选择管理措施',
      fertilizerType: '请输入肥料类型(选填)',
      fertilizerRateKg: '请输入肥料施用量(选填)',
      ureaRateKg: '请输入尿素施用量(选填)',
      pesticideType: '请输入农药类型(选填)',
      irrigationType: '请输入灌溉类型(选填)',
      irrigationFrequency: '请输入灌溉频率(选填)',
      weedingDate: '请选择除草日期(选填)',
      herbicideUsed: '请输入除草剂使用情况(选填)',
      seedSource: '请输入种子来源(选填)',
    },

    // 表单验证
    rules: {
      managementPracticeRequired: '请选择管理措施',
      fertilizerRateKgFormat: '请输入正确的施用量',
      ureaRateKgFormat: '请输入正确的施用量',
      irrigationFrequencyFormat: '请输入正确的频率',
    },

    // 列表列
    columns: {
      managementPractice: '管理措施',
      fertilizerType: '肥料类型',
      irrigationType: '灌溉类型',
      weedingDate: '除草日期',
      createTime: '创建时间',
      actions: '操作',
    },
  },

  // 农艺性状数据采集
  agronomicTrait: {
    title: '农艺性状数据采集',
    subtitle: '记录植物高度、花期、产量等农艺性状信息',
    list: '农艺性状数据列表',
    add: '新增农艺性状数据',
    edit: '编辑农艺性状数据',
    detail: '农艺性状数据详情',
    delete: '删除数据',
    deleteConfirm: '确定删除该数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索数据ID',

    // 表单字段
    form: {
      growthInfo: '生长信息',
      phenologyInfo: '物候期信息',
      yieldInfo: '产量信息',
      healthInfo: '健康状况',
      dataId: '数据ID',
      plantHeightCm: '植物高度(CM)',
      tillerCount: '分蘖数',
      spikeLengthCm: '穗长(CM)',
      daysToEmergence: '天数至出苗期',
      daysToTillering: '天数至分蘖期',
      daysToHeading: '天数至抽穗期',
      daysToFlowering: '天数至开花期',
      daysToGrainFilling: '天数至灌浆期',
      daysToMaturity: '天数至成熟期',
      lodgingScore: '倒伏评分',
      biomassWeightKg: '生物量重量(KG)',
      spikeDensity: '穗密度',
      grainWeightPerSpike: '每穗粒重',
      diseaseScore: '疾病评分',
      stressIndicators: '压力指标',
      pestObservation: '害虫观察',
      photoEvidence: '照片证据',
      createTime: '创建时间',
    },

    // 表单占位符
    placeholder: {
      plantHeightCm: '请输入植物高度',
      tillerCount: '请输入分蘖数',
      spikeLengthCm: '请输入穗长',
      daysToEmergence: '请输入天数',
      daysToTillering: '请输入天数',
      daysToHeading: '请输入天数',
      daysToFlowering: '请输入天数',
      daysToGrainFilling: '请输入天数',
      daysToMaturity: '请输入天数',
      lodgingScore: '请输入倒伏评分',
      biomassWeightKg: '请输入生物量重量',
      spikeDensity: '请输入穗密度',
      grainWeightPerSpike: '请输入每穗粒重',
      diseaseScore: '请输入疾病评分',
      stressIndicators: '请输入压力指标',
      pestObservation: '请输入害虫观察',
    },

    // 表单验证
    rules: {
      plantHeightCmRequired: '请输入植物高度',
      tillerCountRequired: '请输入分蘖数',
      spikeLengthCmRequired: '请输入穗长',
      daysToEmergenceRequired: '请输入天数至出苗期',
      daysToTilleringRequired: '请输入天数至分蘖期',
      daysToHeadingRequired: '请输入天数至抽穗期',
      daysToFloweringRequired: '请输入天数至开花期',
      daysToGrainFillingRequired: '请输入天数至灌浆期',
      daysToMaturityRequired: '请输入天数至成熟期',
      lodgingScoreRequired: '请输入倒伏评分',
      biomassWeightKgRequired: '请输入生物量重量',
      spikeDensityRequired: '请输入穗密度',
      grainWeightPerSpikeRequired: '请输入每穗粒重',
      diseaseScoreRequired: '请输入疾病评分',
      stressIndicatorsRequired: '请输入压力指标',
      pestObservationRequired: '请输入害虫观察',
    },

    // 列表列
    columns: {
      plantHeightCm: '植物高度(CM)',
      tillerCount: '分蘖数',
      daysToMaturity: '成熟天数',
      lodgingScore: '倒伏评分',
      biomassWeightKg: '生物量(KG)',
      createTime: '创建时间',
      actions: '操作',
    },
  },

  // 环境与土壤属性数据采集
  environmentSoil: {
    title: '环境与土壤属性数据采集',
    subtitle: '采集土壤属性和环境监测数据',
    list: '环境土壤数据列表',
    add: '新增环境土壤数据',
    edit: '编辑环境土壤数据',
    detail: '环境土壤数据详情',
    delete: '删除数据',
    deleteConfirm: '确定删除该数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索地貌、水源',
    filterByTopography: '按地貌筛选',
    allTopography: '全部地貌',

    // 表单字段
    form: {
      soilInfo: '土壤属性信息',
      environmentInfo: '环境监测信息',
      dataId: '数据ID',
      soilPh: '土壤pH值',
      soilEc: '土壤电导率',
      soilNitrogenPercent: '土壤氮含量(百分比)',
      soilPhosphorusPpm: '土壤磷含量(PPM)',
      soilPotassiumPpm: '土壤钾含量(PPM)',
      previousCrop: '前茬作物',
      waterSource: '水源',
      topography: '地貌',
      slopePercent: '坡度(百分比)',
      soilMoisturePercent: '土壤湿度(百分比)',
      soilTemperatureC: '土壤温度(摄氏度)',
      rainfallMm: '降雨量(MM)',
      airTemperatureC: '空气温度(摄氏度)',
      humidityPercent: '湿度(百分比)',
      windSpeedMs: '风速(M/S)',
      solarRadiationWm2: '太阳辐射(W/m²)',
      timestamp: '时间戳',
      createTime: '创建时间',
    },

    // 表单占位符
    placeholder: {
      soilPh: '请输入土壤pH值',
      soilEc: '请输入土壤电导率',
      soilNitrogenPercent: '请输入土壤氮含量',
      soilPhosphorusPpm: '请输入土壤磷含量',
      soilPotassiumPpm: '请输入土壤钾含量',
      previousCrop: '请输入前茬作物(选填)',
      waterSource: '请输入水源',
      topography: '请输入地貌',
      slopePercent: '请输入坡度(选填)',
      soilMoisturePercent: '请输入土壤湿度',
      soilTemperatureC: '请输入土壤温度',
      rainfallMm: '请输入降雨量(选填)',
      airTemperatureC: '请输入空气温度(选填)',
      humidityPercent: '请输入湿度',
      windSpeedMs: '请输入风速',
      solarRadiationWm2: '请输入太阳辐射',
      timestamp: '请选择时间戳',
    },

    // 表单验证
    rules: {
      soilPhRequired: '请输入土壤pH值',
      soilEcRequired: '请输入土壤电导率',
      soilNitrogenPercentRequired: '请输入土壤氮含量',
      soilPhosphorusPpmRequired: '请输入土壤磷含量',
      soilPotassiumPpmRequired: '请输入土壤钾含量',
      waterSourceRequired: '请输入水源',
      topographyRequired: '请输入地貌',
      soilMoisturePercentRequired: '请输入土壤湿度',
      soilTemperatureCRequired: '请输入土壤温度',
      humidityPercentRequired: '请输入湿度',
      windSpeedMsRequired: '请输入风速',
      solarRadiationWm2Required: '请输入太阳辐射',
    },

    // 列表列
    columns: {
      soilPh: '土壤pH',
      waterSource: '水源',
      topography: '地貌',
      soilMoisturePercent: '土壤湿度(%)',
      airTemperatureC: '空气温度(°C)',
      timestamp: '时间戳',
      actions: '操作',
    },
  },

  // 品种评估数据采集
  varietyEvaluation: {
    title: '品种评估数据采集',
    subtitle: '采集种子产量数据及审批决策信息',
    list: '品种评估数据列表',
    add: '新增品种评估数据',
    edit: '编辑品种评估数据',
    detail: '品种评估数据详情',
    delete: '删除数据',
    deleteConfirm: '确定删除该数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索地块ID',

    // 表单字段
    form: {
      basicInfo: '基础信息',
      yieldInfo: '产量信息',
      dataId: '数据ID',
      plotId: '地块ID',
      plotAreaM2: '地块面积(平方米)',
      grainWeightKg: '籽粒重量(KG)',
      yieldQtPerHa: '产量(公担/公顷)',
      moistureContent: '含水量(百分比)',
      createTime: '创建时间',
    },

    // 表单占位符
    placeholder: {
      plotId: '请输入地块ID',
      plotAreaM2: '请输入地块面积',
      grainWeightKg: '请输入籽粒重量',
      yieldQtPerHa: '请输入产量',
      moistureContent: '请输入含水量',
    },

    // 表单验证
    rules: {
      plotIdRequired: '请输入地块ID',
      plotAreaM2Required: '请输入地块面积',
      grainWeightKgRequired: '请输入籽粒重量',
      yieldQtPerHaRequired: '请输入产量',
      moistureContentRequired: '请输入含水量',
    },

    // 列表列
    columns: {
      plotId: '地块ID',
      plotAreaM2: '地块面积(m²)',
      grainWeightKg: '籽粒重量(KG)',
      yieldQtPerHa: '产量(公担/公顷)',
      moistureContent: '含水量(%)',
      createTime: '创建时间',
      actions: '操作',
    },
  },

  // 实验室测试数据采集
  laboratoryTest: {
    title: '实验室测试数据采集',
    subtitle: '记录样本数据、发芽率等实验室测试信息',
    list: '实验室测试数据列表',
    add: '新增实验室测试数据',
    edit: '编辑实验室测试数据',
    detail: '实验室测试数据详情',
    delete: '删除数据',
    deleteConfirm: '确定删除该数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索育种批次ID、样本编号',
    filterByBatch: '按育种批次筛选',
    allBatches: '全部批次',

    // 表单字段
    form: {
      basicInfo: '基础信息',
      sampleInfo: '样本信息',
      paramInfo: '实验参数',
      testInfo: '测试信息',
      testData: '测试数据',
      qualityInfo: '质量信息',
      healthTraceability: '健康与追溯',
      testingInfo: '检测信息',
      operatorInfo: '操作信息',
      auditStatus: '审核状态',

      batchId: '育种批次ID',
      trialId: '试验ID',
      plotId: '地块编号',
      testDate: '检测日期',
      sampleId: '样本编号',
      sampleCondition: '样本状态',
      sampleStatus: '样本状态',
      germinationRate: '发芽率',
      purityPercent: '纯度',
      moistureContentPercent: '水分含量',
      proteinPercent: '蛋白质含量',
      toxinLevelPpm: '毒素水平',
      seedHealthFindings: '种子健康发现',
      chainResponsibility: '链路责任',
      traceabilityLink: '溯源链接',
      labReportFile: '实验室报告文件',
      testOrganization: '检测机构',
      testerName: '检测人员',
      sampleType: '样本类型',
      labParameter: '实验参数',
      expectedRange: '预期范围',
      resultValue: '实验结果值',
      passFailFlag: '实验结果标识',
      testStatus: '测试状态',
      remark: '备注',
      createTime: '创建时间',
      createBy: '创建人',
    },

    // 表单占位符
    placeholder: {
      batchId: '请选择育种批次',
      batchIdAuto: '将根据试验ID自动填充',
      trialId: '请选择试验',
      plotId: '请选择地块编号',
      testDate: '请选择检测日期',
      sampleId: '请输入样本编号',
      sampleStatus: '请输入样本状态',
      germinationRate: '请输入发芽率(0-100)',
      purityPercent: '请输入纯度(0-100)',
      moistureContentPercent: '请输入水分含量(0-100)',
      proteinPercent: '请输入蛋白质含量(0-100)',
      toxinLevelPpm: '请输入毒素水平(选填)',
      seedHealthFindings: '请输入种子健康发现',
      chainResponsibility: '请输入溯源链接',
      labReportFile: '点击上传实验室报告文件',
      testOrganization: '请输入检测机构(选填)',
      testerName: '请输入检测人员(选填)',
      sampleType: '请输入样本类型',
      labParameter: '请输入实验参数',
      resultValue: '请输入实验结果值',
      passFailFlag: '请选择实验结果标识',
      remark: '请输入备注(选填)',
      auditOpinion: '请输入审核意见'
    },

    // 审核相关
    auditTitle: '实验室测试数据采集审核',
    auditSubtitle: '审核和批准实验室测试数据',
    auditList: '审核列表',
    audit: '审核',
    pendingAudit: '待审核',
    audited: '已审核',
    canceled: '已作废',
    auditOpinion: '审核意见',
    auditCanceled: '审核记录作废',
    cancelType: '作废类型',
    dataCanceled: '数据作废',

    // 操作
    submit: '提交',
    approve: '通过',
    reject: '退回',
    return: '返回',
    archive: '归档',
    cancel: '作废',

    // 退回信息
    rejected: '已退回',
    rejectionInfo: '退回信息',
    rejectBy: '退回人',
    rejectOrg: '退回机构',
    rejectTime: '退回时间',
    rejectReason: '退回原因',

    // 确认消息
    approveConfirm: '确定审核通过该数据吗？',
    rejectConfirm: '确定退回该数据吗？',
    cancelConfirm: '确定作废该审核记录吗？',
    submitConfirm: '确定提交审核吗？',
    archiveConfirm: '确定归档该数据吗？',
    cancelDataConfirm: '确定作废该数据吗？',

    // 成功消息
    approveSuccess: '审核通过成功',
    rejectSuccess: '退回成功',
    cancelSuccess: '作废成功',
    submitSuccess: '提交审核成功',
    archiveSuccess: '归档成功',

    // 验证消息
    rejectOpinionRequired: '退回时必须填写审核意见',

    // 表单验证
    rules: {
      batchIdRequired: '请选择育种批次',
      trialIdRequired: '请选择试验',
      plotIdRequired: '请选择地块编号',
      testDateRequired: '请选择检测日期',
      testOrganizationRequired: '请输入检测机构',
      testerNameRequired: '请输入检测人员',
      sampleIdRequired: '请输入样本编号',
      sampleConditionRequired: '请输入样本状态',
      sampleStatusRequired: '请输入样本状态',
      germinationRateRequired: '请输入发芽率',
      germinationRateRange: '发芽率范围为0-100',
      purityPercentRequired: '请输入纯度',
      purityPercentRange: '纯度范围为0-100',
      moistureContentPercentRequired: '请输入水分含量',
      moistureContentPercentRange: '水分含量范围为0-100',
      proteinPercentRequired: '请输入蛋白质含量',
      proteinPercentRange: '蛋白质含量范围为0-100',
      seedHealthFindingsRequired: '请输入种子健康发现',
      traceabilityLinkRequired: '请输入溯源链接',
      chainResponsibilityRequired: '请输入溯源链接',
    },

    // 列表列
    columns: {
      batchId: '育种批次ID',
      trialId: '试验ID',
      sampleId: '样本编号',
      sampleStatus: '样本状态',
      sampleType: '样本类型',
      labParameter: '实验参数',
      resultValue: '实验结果值',
      passFailFlag: '实验结果标识',
      germinationRate: '发芽率(%)',
      purityPercent: '纯度(%)',
      moistureContentPercent: '水分含量(%)',
      proteinPercent: '蛋白质(%)',
      testDate: '检测日期',
      createTime: '创建时间',
      actions: '操作',
    },
  },

  // 产量数据采集
  yieldData: {
    title: '产量数据采集',
    subtitle: '记录田间产量验证数据',
    list: '产量数据列表',
    add: '新增产量数据',
    edit: '编辑产量数据',
    detail: '产量数据详情',
    delete: '删除数据',
    deleteConfirm: '确定删除该数据吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',
    submitForReview: '提交审核',
    submitForReviewSuccess: '提交审核成功',
    submitForReviewConfirm: '确定要提交审核吗？',
    void: '作废',
    voidSuccess: '作废成功',
    voidConfirm: '确定要作废该数据吗？',
    voidReason: '作废原因',
    voidReasonPlaceholder: '请输入作废原因',
    voidReasonRequired: '作废原因不能为空',

    // 搜索筛选
    searchPlaceholder: '搜索育种批次ID、地块编号',
    filterByBatch: '按育种批次筛选',
    allBatches: '全部批次',

    // 表单字段
    form: {
      basicInfo: '基础信息',
      plotInfo: '地块信息',
      yieldInfo: '产量信息',
      operatorInfo: '操作信息',

      batchId: '育种批次ID',
      trialId: '试验ID',
      harvestDate: '收获日期',
      plotId: '地块编号',
      plotAreaM2: '地块面积(m²)',
      grainWeightKg: '谷物重量(kg)',
      yieldQtPerHa: '产量(公担/公顷)',
      moistureContent: '含水量(%)',
      inspectionInfo: '检验信息',
      inspectionDate: '检验日期',
      inspectionType: '检验类型',
      scoreCode: '评分代码',
      scoreValue: '评分值',
      recorderName: '记录人员',
      remark: '备注',
      createTime: '创建时间',
      createBy: '创建人',
      updateBy: '修改人',
      updateTime: '修改时间',
      auditBy: '审核人',
      auditTime: '审核时间',
    },

    // 检验类型选项
    inspectionTypes: {
      disease: '病害',
      purity: '纯度',
      pest: '虫害',
      lodging: '倒伏',
      moisture: '水分',
      other: '其他',
    },

    // 评分代码选项
    scoreCodes: {
      yield: '产量',
      diseaseRes: '抗病性',
      pestRes: '抗虫性',
      droughtTol: '耐旱性',
      lodgingRes: '抗倒伏性',
      grainQuality: '籽粒品质',
      maturity: '成熟期',
      plantHeight: '株高',
    },

    // 表单占位符
    placeholder: {
      batchId: '请选择育种批次',
      trialId: '请选择试验',
      harvestDate: '请选择收获日期',
      plotId: '请输入地块编号',
      plotAreaM2: '请输入地块面积',
      grainWeightKg: '请输入谷物重量',
      yieldQtPerHa: '请输入产量',
      moistureContent: '请输入含水量(选填)',
      inspectionDate: '请选择检验日期',
      inspectionType: '请选择检验类型',
      scoreCode: '请输入评分代码',
      scoreValue: '请输入评分值',
      recorderName: '请输入记录人员(选填)',
      remark: '请输入备注(选填)',
    },

    // 表单验证
    rules: {
      batchIdRequired: '请选择育种批次',
      trialIdRequired: '请选择试验',
      harvestDateRequired: '请选择收获日期',
      plotIdRequired: '请输入地块编号',
      plotAreaM2Required: '请输入地块面积',
      plotAreaM2Min: '地块面积必须大于0',
      grainWeightKgRequired: '请输入谷物重量',
      grainWeightKgMin: '谷物重量必须大于0',
      yieldQtPerHaRequired: '请输入产量',
      yieldQtPerHaMin: '产量必须大于0',
      moistureContentRange: '含水量范围为0-100',
      recorderNameRequired: '请输入记录人员',
      // 动态检验字段
      inspectionTypeRequired: '请选择检验类型',
      scoreCodeRequired: '请选择评分代码',
    },

    // 动态提示文案（用于表单内自定义校验消息）
    pleaseSelectCodeFirst: '请先选择评分代码',
    percentRange: '百分比范围为 0 - 100',
    scaleRange: '评分范围为 {min}-{max}',
    numberNonNegative: '请输入非负数字',

    // 列表列
    columns: {
      batchId: '育种批次ID',
      trialId: '试验ID',
      plotId: '地块编号',
      plotAreaM2: '地块面积(m²)',
      grainWeightKg: '谷物重量(kg)',
      yieldQtPerHa: '产量(公担/公顷)',
      moistureContent: '含水量(%)',
      harvestDate: '收获日期',
      inspectionDate: '检验日期',
      inspectionType: '检验类型',
      scoreCode: '评分代码',
      scoreValue: '评分值',
      createTime: '创建时间',
      status: '状态',
      auditStatus: '审核状态',
      actions: '操作',
    },
  },

  // 田间检验数据采集审核
  fieldInspectionAudit: {
    title: '田间检验数据采集审核',
    subtitle: '对田间检验数据进行审核操作',
    list: '待审核田间检验数据列表',
    audit: '审核',
    
    // 搜索筛选
    searchPlaceholder: '搜索育种批次ID、地块编号',
    filterByBatch: '按育种批次筛选',
    allBatches: '全部批次',
    
    // 表单字段
    form: {
      basicInfo: '基础信息',
      plotInfo: '地块信息',
      inspectionInfo: '检验信息',
      auditInfo: '审核信息',
      systemInfo: '系统信息',
      batchId: '育种批次ID',
      trialId: '试验ID',
      plotId: '地块编号',
      inspectionDate: '检验日期',
      inspectionType: '检验类型',
      scoreCode: '评分代码',
      scoreValue: '评分值',
      auditComment: '审核意见',
      auditor: '审核人',
      auditDepartment: '审核部门',
      approvalTime: '审批时间',
    },
    
    // 表单占位符
    placeholder: {
      batchId: '请选择育种批次',
      plotId: '请选择地块编号',
      auditComment: '请输入审核意见',
      auditor: '请输入审核人',
      auditDepartment: '请输入审核部门',
      approvalTime: '请选择审批时间',
      inspectionDate: '请选择检验日期',
    },
    
    // 表单验证
    rules: {
      auditCommentRequired: '审核意见为必填项',
    },
    
    // 操作按钮
    approve: '同意',
    reject: '不同意',
    back: '返回',
    view: '查看',
    audit: '审核',
    
    // 确认提示
    confirmApprove: '确定同意该审核吗？',
    confirmReject: '确定不同意该审核吗？',
    
    // 操作结果
    approveSuccess: '审核已通过',
    rejectSuccess: '审核已退回',

    // 作废相关
    void: '作废',
    voidReason: '作废原因',
    confirmVoid: '确定作废该审核吗？',
    voidSuccess: '作废成功',

    // 表单占位符
    placeholder: {
      voidReason: '请输入作废原因',
    },

    // 表单验证
    rules: {
      voidReasonRequired: '作废原因为必填项',
    },
  },

  // 农事记录数据采集审核
  farmingRecordAudit: {
    title: '农事记录数据采集审核',
    subtitle: '对农事记录数据进行审核管理',
    detailTitle: '农事记录审核详情',
    auditTitle: '农事记录审核操作',
    searchPlaceholder: '请输入关键词搜索',
    
    // 状态选项
    status: {
      placeholder: '请选择审核状态',
      S1: '待审批',
      S2: '已审批', 
      S3: '已退回',
      S10: '作废'
    },
    
    // 管理措施选项
    practices: {
      placeholder: '请选择活动类型',
      fertilization: '施肥',
      irrigation: '灌溉',
      weeding: '除草',
      pest_control: '病虫害防治',
      planting: '播种/整地',
      harvesting: '收获'
    },
    
    // 列表页面
    columns: {
      managementPractice: '管理措施',
      workflowStatus: '审核状态',
      fertilizerType: '肥料类型',
      irrigationType: '灌溉类型',
      createBy: '创建人',
      createTime: '创建时间',
      auditBy: '审核人',
      auditTime: '审核时间'
    },
    
    // 表单字段
    form: {
      managementPractice: '管理措施',
      workflowStatus: '审核状态',
      activityDatetime: '活动日期时间',
      fertilizerType: '肥料类型',
      fertilizerRateKg: '肥料施用量(公斤)',
      ureaRateKg: '尿素施用量(公斤)',
      pesticideType: '农药类型',
      irrigationType: '灌溉类型',
      irrigationFrequency: '灌溉频率',
      weedingDate: '除草日期',
      herbicideUsed: '除草剂使用',
      seedSource: '种子来源',
      createBy: '创建人',
      createTime: '创建时间',
      auditBy: '审核人',
      auditTime: '审核时间',
      auditRemark: '审核意见'
    },
    
    // 分节标题
    sections: {
      basicInfo: '基础信息',
      fertilizerInfo: '肥料信息',
      irrigationInfo: '灌溉信息',
      weedingInfo: '除草信息',
      pesticideInfo: '农药信息',
      createInfo: '创建信息',
      auditInfo: '审核信息',
      remarkInfo: '备注信息'
    },
    
    // 占位符
    placeholder: {
      auditRemark: '请输入审核意见，必填项',
      auditBy: '请输入审核人',
      auditTime: '请选择审核时间'
    },
    
    // 验证规则
    rules: {
      auditRemarkRequired: '审核意见不能为空'
    },
    
    // 操作按钮
    audit: '审批',
    approve: '同意',
    reject: '不同意',
    cancel: '作���',
    
    // 确认消息
    confirmApprove: '确定要同意这条农事记录吗？',
    confirmReject: '确定要退回这条农事记录吗？',
    cancelConfirm: '确定要作废这条农事记录吗？作废后不可恢复！',
    
    // 成功消息
    approveSuccess: '审核通过成功',
    rejectSuccess: '审核退回成功',
    cancelSuccess: '作废成功'
  },
};