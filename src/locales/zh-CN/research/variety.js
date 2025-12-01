// 品种管理国际化文件
export default {
  // 品种登记
  registration: {
    title: '品种登记',
    subtitle: '记录种子品种基础信息，提交登记申请',
    list: '品种登记列表',
    add: '新增品种登记',
    edit: '编辑品种信息',
    detail: '品种详情',
    apply: '申请登记',

    // 搜索和筛选
    searchPlaceholder: '搜索品种名称、品种代码、作物类型',
    filterByCrop: '按作物类型筛选',
    filterByStatus: '按登记状态筛选',
    allCrops: '全部作物',
    allStatus: '全部状态',

    // 登记状态
    status: {
      draft: '草稿',
      pending: '审核中',
      approved: '待发布',
      published: '已发布',
      rejected: '已驳回',
    },

    // 表单分区
    sections: {
      enterpriseInfo: '备案实体信息',
      registrationInfo: '备案基础信息',
      identificationInfo: '品种标识信息',
      technicalInfo: '技术性状信息',
      trialInfo: '试验和性能信息',
      regulatoryInfo: '监管信息',
    },

    // 表单字段 - 备案基础信息
    form: {
      registrationType: '备案类型',
      registrationDate: '备案日期',
      registrationStatus: '备案状态',

      // 品种标识信息
      varietyName: '品种名称',
      varietyCode: '品种代码',
      cropType: '作物类型',
      species: '物种',
      genus: '属',
      family: '科',
      breedingMethod: '育种方法',
      methodPedigree: '方法系谱',
      cultivationYear: '培育年份',

      // 技术性状信息
      minYieldPotential: '最低产量潜力（公担/公顷）',
      maxYieldPotential: '最高产量潜力（公担/公顷）',
      diseaseResistance: '抗病性',
      stressResistance: '抗逆性',
      growthPeriod: '生育期（天）',
      plantHeight: '株高（厘米）',
      grainQuality: '谷物质量性状',

      // 试验和性能信息
      trialLocation: '试验地点',
      trialYear: '试验年份',
      averageYield: '平均产量',
      stabilityScore: '稳定性评分',
      trialReport: '试验报告',
      photos: '照片',

      // 监管信息
      approvalDocumentNo: '核准文件编号',
      approvalAgency: '核准机构',
      approvalDate: '核准日期',
      certificationDocument: '认证文件',
    },

    // 表单占位符
    placeholder: {
      varietyName: '请输入品种名称',
      varietyCode: '请输入品种代码',
      cropType: '请选择作物类型',
      species: '请输入物种',
      genus: '请输入属',
      family: '请输入科',
      breedingMethod: '请选择育种方法',
      methodPedigree: '请输入方法系谱',
      cultivationYear: '请选择培育年份',
      minYieldPotential: '请输入最低产量潜力',
      maxYieldPotential: '请输入最高产量潜力',
      diseaseResistance: '请输入抗病性描述',
      stressResistance: '请输入抗逆性描述',
      growthPeriod: '请输入生育期',
      plantHeight: '请输入株高',
      grainQuality: '请输入谷物质量性状',
      trialLocation: '请输入试验地点',
      trialYear: '请选择试验年份',
      averageYield: '请输入平均产量',
      stabilityScore: '请输入稳定性评分',
      approvalDocumentNo: '请输入核准文件编号',
      approvalAgency: '请输入核准机构',
      approvalDate: '请选择核准日期',
      days: '天',
    },

    // 表单验证
    rules: {
      varietyNameRequired: '请输入品种名称',
      varietyCodeRequired: '请输入品种代码',
      cropTypeRequired: '请选择作物类型',
      speciesRequired: '请输入物种',
      breedingMethodRequired: '请选择育种方法',
      cultivationYearRequired: '请选择培育年份',
    },

    // 列表列
    columns: {
      registrationNo: '登记申请号',
      varietyName: '品种名称',
      varietyCode: '品种代码',
      cropType: '作物类型',
      submittingUnit: '提交单位',
      submitDate: '提交日期',
      registrationStatus: '登记状态',
      actions: '操作',
    },

    // 操作按钮
    actions: {
      submit: '提交申请',
      saveDraft: '保存草稿',
      view: '查看',
      edit: '编辑',
      delete: '删除',
    },

    // 提示信息
    messages: {
      submitSuccess: '提交成功',
      saveDraftSuccess: '保存草稿成功',
      deleteConfirm: '确定删除该品种登记申请吗？',
      deleteSuccess: '删除成功',
      uploadTip: '支持 PDF、JPG 格式，单个文件不超过2MB',
    },
  },

  // 品种审核
  audit: {
    title: '品种审核',
    subtitle: '审核品种登记申请的材料完整性、数据真实性及合规性',
    taskList: '审核任务列表',
    taskDetail: '审核任务详情',

    // 搜索和筛选
    searchPlaceholder: '搜索品种名称、提交单位',
    filterByStatus: '按审核状态筛选',
    allStatus: '全部状态',

    // 审核状态
    status: {
      pending: '审核中',
      approved: '已通过',
      rejected: '已驳回',
      published: '已发布',
    },

    // 列表列
    columns: {
      applicationNo: '申请号',
      varietyName: '品种名称',
      cropType: '作物类型',
      submittingUnit: '提交单位',
      submitDate: '提交日期',
      auditStatus: '审核状态',
      auditor: '审核人',
      actions: '操作',
    },

    // 详情页区域标题
    sections: {
      basicInfo: '品种基础信息',
      identificationInfo: '品种标识信息',
      technicalInfo: '技术性状信息',
      trialInfo: '试验和性能数据',
      regulatoryInfo: '监管数据',
      auditOperation: '审核操作',
      auditResult: '审核结果',
    },

    // 表单字段
    form: {
      auditResult: '审核结果',
      auditOpinion: '审核意见',
      auditor: '审核人',
      auditTime: '审核时间',
    },

    // 表单占位符
    placeholder: {
      auditOpinion: '请输入审核意见',
    },

    // 审核结果
    result: {
      pass: '通过',
      reject: '驳回',
    },

    // 表单验证
    rules: {
      auditResultRequired: '请选择审核结果',
      auditOpinionRequired: '请输入审核意见',
    },

    // 操作按钮
    actions: {
      submit: '提交审核',
      backToList: '返回列表',
      audit: '审核',
      view: '查看',
    },

    // 提示信息
    messages: {
      submitSuccess: '审核提交成功',
      confirmSubmit: '确定提交审核结果吗？',
    },
  },

  // 品种发布
  publish: {
    title: '品种发布管理',
    subtitle: '将审核通过的种子品种信息录入品种登记数据库并公示',
    list: '品种发布列表',
    publishQueue: '待发布品种',
    published: '已发布品种',

    // 搜索和筛选
    searchPlaceholder: '搜索品种名称、作物类型',
    filterByCrop: '按作物类型筛选',
    filterByStatus: '按公示状态筛选',
    allCrops: '全部作物',
    allStatus: '全部状态',

    // 公示状态
    status: {
      pending: '待发布',
      published: '公示中',
      offline: '已下架',
    },

    // 列表列
    columns: {
      publishNo: '发布编号',
      varietyName: '品种名称',
      cropType: '作物类型',
      approvalDate: '审核通过时间',
      publishDate: '发布日期',
      publishDept: '发布主管部门',
      publishStatus: '公示状态',
      actions: '操作',
    },

    // 详情页区域标题
    sections: {
      basicInfo: '品种基础信息',
      identificationInfo: '品种标识信息',
      publishInfo: '发布信息',
    },

    // 表单字段
    form: {
      publishNo: '发布编号',
      publishDate: '发布日期',
      publishDept: '发布主管部门',
      publisher: '发布人',
      publishTime: '发布时间',
      decisionExplanation: '决策说明',
      publicDescription: '公开描述',
      recommendedRegion: '推荐地区',
      sowingGuide: '播种指南',
      photos: '照片',
    },

    // 表单占位符
    placeholder: {
      publishDept: '请输入发布主管部门',
      decisionExplanation: '请输入决策说明',
      publicDescription: '请输入公开描述',
      recommendedRegion: '请输入推荐地区',
      sowingGuide: '请输入播种指南',
    },

    // 表单验证
    rules: {
      publishDeptRequired: '请输入发布主管部门',
      publicDescriptionRequired: '请输入公开描述',
      decisionExplanationRequired: '请输入决策说明',
    },

    // 操作按钮
    actions: {
      preview: '预览发布信息',
      publish: '立即发布',
      offline: '下架',
      view: '查看',
      backToList: '返回列表',
    },

    // 提示信息
    messages: {
      publishSuccess: '发布成功',
      offlineSuccess: '下架成功',
      confirmPublish: '确定发布该品种信息吗？',
      confirmOffline: '确定下架该品种信息吗？',
    },
  },

  // 品种公示查询
  query: {
    title: '种子信息公示',
    subtitle: '查询已发布的种子品种信息',
    searchTitle: '品种查询',

    // 搜索
    searchPlaceholder: '搜索品种名称',
    filterByYear: '按年度筛选',
    filterByCrop: '按作物类型筛选',
    allYears: '全部年度',
    allCrops: '全部作物',

    // 列表列
    columns: {
      publishNo: '发布编号',
      registerNo: '登记号',
      varietyName: '品种名称',
      cropType: '作物类型',
      publishDate: '发布日期',
      publishDept: '发布主管部门',
      enterprise: '企业',
      actions: '操作',
    },

    // 详情页
    detail: {
      basicInfo: '品种基本信息',
      description: '品种描述',
      photo: '品种照片',
      technicalInfo: '技术性状信息',
      trialInfo: '试验信息',
      publishInfo: '发布信息',
      decisionExplanation: '决策说明',
      publicDescription: '公开描述',
      recommendedRegion: '推荐地区',
      sowingGuide: '播种指南',
      photos: '照片',
    },

    // 操作按钮
    actions: {
      viewDetail: '查看详情',
      back: '返回',
    },

    // 消息提示
    messages: {
      loadFailed: '加载品种列表失败',
      loadDetailFailed: '加载品种详情失败',
    },
  },
}