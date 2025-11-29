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
  },
}
