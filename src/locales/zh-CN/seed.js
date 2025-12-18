export default {
  // 繁殖种子认证申请模块
  breedingCertification: {
    title: '繁殖种子认证申请',
    subtitle: '管理繁殖种子认证申请、品种信息、试验数据及监管信息',
    list: '认证申请列表',
    add: '新增认证申请',
    edit: '编辑认证申请',
    detail: '认证申请详情',
    delete: '删除认证申请',
    deleteConfirm: '确定删除该认证申请吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',
    searchVarietyName: '品种名称',

    // 搜索和筛选
    searchPlaceholder: '搜索申请单位、品种名称',
    filterByCrop: '按作物类型筛选',
    filterByStatus: '按备案状态筛选',

    // 表格列
    columns: {
      applyOrgName: '申请单位',
      cropType: '作物类型',
      varietyName: '品种名称',
      recordDate: '备案日期',
      recordStatus: '备案状态',
      approvalNumber: '批准编号',
      approvalOrganization: '批准机构',
      createTime: '创建时间',
      actions: '操作',
    },

    // 备案状态
    recordStatus: {
      pending: '待审核',
      approved: '已批准',
      rejected: '已驳回',
      draft: '草稿',
    },

    // 表单 - 认证申请信息
    form: {
      certificationInfo: '认证申请信息',
      varietyInfo: '品种信息',
      technicalTrait: '技术性状信息',
      trialPerformance: '试验与性能信息',
      supervision: '监管信息',

      // 认证申请
      breedingBatchId: '繁育批次ID',
      authId: '认证ID',
      applyOrgName: '申请机构名称',
      applyOrgId: '申请机构ID',
      recordDate: '备案日期',
      cropType: '作物类型',
      varietyName: '品种名称',
      recordStatus: '备案状态',

      // 品种信息
      varietyCode: '品种代码',
      species: '物种',
      genus: '属',
      family: '科',
      breedingMethod: '培育方法',
      pedigree: '系谱',
      breedingYear: '培育年份',

      // 技术性状
      minYieldPotential: '最低产量潜力',
      maxYieldPotential: '最高产量潜力',
      diseaseResistance: '抗病性',
      stressResistance: '抗逆性',
      maturityPeriod: '成熟期(天)',
      plantHeight: '株高(CM)',
      grainQualityTrait: '谷物质量性状',

      // 试验性能
      trialLocation: '试验地点',
      trialYear: '试验年份',
      averageYield: '平均产量',
      stabilityScore: '稳定性评分',
      trialReport: '试验报告',
      photo: '照片',

      // 监管信息
      approvalNumber: '批准编号',
      approvalOrganization: '批准机构',
      approvalDate: '批准日期',
      certificationDocument: '认证文件',
    },

    // 表单占位符
    placeholder: {
      breedingBatchId: '请输入繁育批次ID',
      authId: '请输入认证ID',
      applyOrgName: '请输入申请机构名称',
      applyOrgId: '请输入申请机构ID',
      recordDate: '请选择备案日期',
      cropType: '请选择作物类型',
      varietyName: '请输入品种名称',
      recordStatus: '请选择备案状态',

      varietyCode: '请输入品种代码',
      species: '请输入物种',
      genus: '请输入属',
      family: '请输入科',
      breedingMethod: '请选择培育方法',
      pedigree: '请输入系谱',
      breedingYear: '请输入培育年份',

      minYieldPotential: '请输入最低产量潜力',
      maxYieldPotential: '请输入最高产量潜力',
      diseaseResistance: '请输入抗病性',
      stressResistance: '请输入抗逆性',
      maturityPeriod: '请输入成熟期天数',
      plantHeight: '请输入株高(CM)',
      grainQualityTrait: '请输入谷物质量性状',

      trialLocation: '请输入试验地点',
      trialYear: '请输入试验年份',
      averageYield: '请输入平均产量',
      stabilityScore: '请输入稳定性评分',
      trialReport: '请上传试验报告',
      photo: '请上传照片',

      approvalNumber: '请输入批准编号',
      approvalOrganization: '请输入批准机构',
      approvalDate: '请选择批准日期',
      certificationDocument: '请上传认证文件',
    },

    // 表单验证
    rules: {
      authIdRequired: '请输入认证ID',
      cropTypeRequired: '请选择作物类型',
      varietyNameRequired: '请输入品种名称',
      recordStatusRequired: '请选择备案状态',

      varietyCodeRequired: '请输入品种代码',
      speciesRequired: '请输入物种',
      genusRequired: '请输入属',
      familyRequired: '请输入科',
      breedingMethodRequired: '请选择培育方法',
      pedigreeRequired: '请输入系谱',
      breedingYearRequired: '请输入培育年份',

      minYieldPotentialRequired: '请输入最低产量潜力',
      maxYieldPotentialRequired: '请输入最高产量潜力',
      diseaseResistanceRequired: '请输入抗病性',
      stressResistanceRequired: '请输入抗逆性',
      maturityPeriodRequired: '请输入成熟期',
      plantHeightRequired: '请输入株高',
      grainQualityTraitRequired: '请输入谷物质量性状',

      trialLocationRequired: '请输入试验地点',
      trialYearRequired: '请输入试验年份',
      averageYieldRequired: '请输入平均产量',
      stabilityScoreRequired: '请输入稳定性评分',
      trialReportRequired: '请上传试验报告',
      photoRequired: '请上传照片',

      approvalNumberRequired: '请输入批准编号',
      approvalOrganizationRequired: '请输入批准机构',
      approvalDateRequired: '请选择批准日期',
      certificationDocumentRequired: '请上传认证文件',
    },

    // 作物类型
    cropTypes: {
      wheat: '小麦',
      rice: '水稻',
      corn: '玉米',
      soybean: '大豆',
      cotton: '棉花',
      other: '其他',
    },

    // 培育方法
    breedingMethods: {
      hybridization: '杂交育种',
      mutation: '诱变育种',
      selection: '选择育种',
      biotechnology: '生物技术育种',
      other: '其他',
    },

    // 审核相关
    submit: '提交审核',
    submitForAudit: '提交审核',
    submitSuccess: '提交成功',
    auditResult: '审核结果',
    auditComment: '审核意见',
    auditTime: '审核时间',
    auditor: '审核人',
    auditorOrg: '审核机构',
    approve: '通过',
    reject: '驳回',
    auditSuccess: '审核成功',
    auditDialog: '审核',
    auditCommentPlaceholder: '请输入审核意见',
    auditCommentRequired: '请输入审核意见',

    // 打印相关
    print: '打印',
    printCount: '打印次数',
    lastPrintTime: '最后打印时间',
    certificateLabel: '种子认证标签',
    printSuccess: '打印记录成功',
    printInfo: '打印信息',
  },

  // 繁殖种子认证审核
  breedingAudit: {
    title: '繁殖种子认证审核',
    subtitle: '审核待审核状态的繁殖种子认证申请',
    list: '审核列表',
    pendingOnly: '仅显示待审核数据',
    auditInfo: '审核信息',
    audit: '审核',
    noData: '暂无待审核数据',
  },

  // 繁殖种子证书颁发
  breedingCertificate: {
    title: '繁殖种子证书颁发',
    subtitle: '管理已通过审核的种子认证证书',
    list: '证书列表',
    approvedOnly: '仅显示已通过认证',
    viewCertificate: '查看证书',
    printCertificate: '打印证书',
    certificateInfo: '证书信息',
  },

  // C1繁殖批次审核
  c1BatchAudit: {
    title: 'C1繁殖批次审核',
    subtitle: '审核待审核状态的C1繁殖批次',
    searchPlaceholder: '搜索批次号、品种名称、机构名称',
    filterByCrop: '按作物类型筛选',
    noData: '暂无待审核数据',
    audit: '审核',
    auditDialog: '审核C1繁殖批次',
    auditResult: '审核结果',
    auditComment: '审核意见',
    auditCommentPlaceholder: '请输入审核意见',
    approve: '通过',
    reject: '驳回',
    resultRequired: '请选择审核结果',
    commentRequired: '请输入审核意见',
    auditSuccess: '审核成功',
    columns: {
      batchId: '批次编号',
      varietyName: '品种名称',
      cropType: '作物类型',
      orgName: '机构名称',
      startDate: '开始日期',
      batchStatus: '批次状态',
      auditStatus: '审核状态',
    },
    auditStatus: {
      pending: '待审核',
      approved: '已通过',
      rejected: '已驳回',
    },
    status: {
      ongoing: '进行中',
      completed: '已完成',
      terminated: '已终止',
    },
    error: {
      noTrackingRecord: '该批次暂无跟踪记录，请先添加跟踪记录',
      invalidTrackingResult: '跟踪记录结论异常，请确保所有跟踪记录结果为正常',
      noTestRecord: '该批次暂无检测记录，请先添加检测记录',
      invalidTestResult: '检测记录结论不合格，请确保所有检测记录结果为合格',
      validationFailed: '数据校验失败，请稍后重试',
    },
  },

  // C1繁殖批次证书颁发
  c1Certificate: {
    title: 'C1繁殖批次证书颁发',
    subtitle: '管理已通过审核的C1繁殖批次证书',
    searchPlaceholder: '搜索批次号、品种名称',
    print: '打印证书',
    columns: {
      batchId: '批次编号',
      varietyName: '品种名称',
      cropType: '作物类型',
      orgName: '机构名称',
      startDate: '开始日期',
      auditor: '审核人',
      auditorOrg: '认证机构',
      auditTime: '审核时间',
      printCount: '打印次数',
      lastPrintTime: '最后打印时间',
    },
  },
}

// 研发数据采集模块
export const research = {
  dataCollection: {
    // 环境/IoT数据模块
    environmentIot: {
      title: '环境/IoT数据',
      subtitle: '管理环境监测数据、IoT设备数据及气象站数据',
      list: '环境数据列表',
      detail: '环境数据详情',
      dataInfo: '数据信息',

      // 表单字段
      form: {
        envRecordId: '记录ID',
        trialId: '试验ID',
        trialName: '试验名称',
        batchId: '育种批次ID',
        batchName: '批次名称',
        plotId: '地块ID',
        plotName: '地块名称',
        stationId: '气象站ID',
        stationName: '气象站名称',
        timestamp: '采集时间',
        parameterCode: '参数代码',
        parameterName: '参数名称',
        value: '数值',
        unit: '单位',
        dataSource: '数据来源',
        remark: '备注',
        dateRange: '时间范围',
      },

      // 表单占位符
      placeholder: {
        trialId: '请输入试验ID',
        batchId: '请输入育种批次ID',
        plotId: '请输入地块ID（选填）',
        stationId: '请输入气象站ID',
        timestamp: '请选择数据采集时间',
        parameterCode: '请选择参数类型',
        value: '请输入数值',
        unit: '请输入单位（如: mm, °C, %）',
        remark: '请输入备注',
      },

      // 表单验证
      rules: {
        trialIdRequired: '请输入试验ID',
        batchIdRequired: '请输入育种批次ID',
        stationIdRequired: '请输入气象站ID',
        timestampRequired: '请选择采集时间',
        parameterCodeRequired: '请选择参数类型',
        valueRequired: '请输入数值',
      },

      // 表格列
      columns: {
        envRecordId: '记录ID',
        batchName: '批次名称',
        plotName: '地块名称',
        stationName: '气象站',
        timestamp: '采集时间',
        parameterName: '参数',
        value: '数值',
        unit: '单位',
        dataSource: '数据来源',
      },

      // 环境参数
      parameters: {
        RAIN_DAILY: '日降雨量',
        RAIN_MONTHLY: '月降雨量',
        TMAX: '最高温度',
        TMIN: '最低温度',
        TEMP_AVG: '平均温度',
        RH_AVG: '相对湿度',
        SOLAR_RAD: '光照强度',
        SOIL_MOISTURE: '土壤湿度',
      },

      // 数据来源
      dataSource: {
        IOT_SYSTEM: 'IoT系统',
        CSV_IMPORT: 'CSV导入',
        MANUAL: '手动录入',
      },

      // 操作
      actions: {
        importCsv: 'CSV导入',
      },

      // 上传
      upload: {
        dragText: '将文件拖到此处，或点击上传',
        tip: '仅支持CSV文件',
        selectFile: '请选择CSV文件',
      },

      // 提示信息
      messages: {
        deleteConfirm: '确定删除该环境数据吗？',
        batchDeleteConfirm: '确定删除选中的 {count} 条环境数据吗？',
        importSuccess: 'CSV数据导入成功',
        importFailed: 'CSV数据导入失败',
        validateFailed: '数据验证失败',
      },
    },
  },
}
