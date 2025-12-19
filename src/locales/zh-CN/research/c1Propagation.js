// C1种子繁殖申请国际化文件 - 中文
export default {
  // 页面标题
  title: 'C1种子繁殖申请',
  subtitle: 'Union/Cooperative申请进行C1繁殖',
  auditTitle: 'C1种子繁殖申请审核',
  auditSubtitle: 'OIA审核C1种子繁殖申请',

  // 操作
  add: '新增申请',
  edit: '编辑申请',
  delete: '删除申请',
  audit: '审核',
  detail: '申请详情',
  auditDetail: '审核详情',
  searchPlaceholder: '搜索机构名称、品种名称',
  deleteConfirm: '确定要删除该申请吗？',
  deleteSuccess: '删除成功',
  addSuccess: '添加成功',
  updateSuccess: '更新成功',
  auditSuccess: '审核提交成功',

  // 状态
  status: {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  },

  // 表单区块
  form: {
    basicInfo: '基础信息',
    applicationInfo: '申请信息',
    propagationInfo: '繁殖信息',
    auditInfo: '审核信息',
    operatorInfo: '操作人信息',

    // 字段
    applicantOrgType: '申请组织类型',
    applicantOrgName: '申请组织名称',
    applicantOrgId: '申请组织ID',
    propagationBatchId: '繁育批次ID',
    cropType: '作物种类',
    varietyName: '品种名称',
    varietyCode: '品种代码',
    species: '物种',
    applyDate: '申请日期',
    applyDescription: '申请描述',
    applyStatus: '申请状态',
    demandQuantity: '需求数量',
    fromSeedType: '从种子类型',
    toSeedType: '到种子类型',

    // 审核字段
    auditResult: '审核结果',
    auditOpinion: '审核意见',
    auditor: '审核人',
    auditOrg: '审核机构',
    auditTime: '审核时间',

    // 操作人字段
    operator: '操作人',
    operationOrg: '操作机构',
    operationTime: '操作时间',
    createdTime: '创建时间'
  },

  // 占位符
  placeholder: {
    applicantOrgType: '请选择机构类型',
    applicantOrgName: '请输入机构名称',
    applicantOrgId: '请输入机构ID',
    propagationBatchId: '请输入繁育批次ID',
    cropType: '请选择作物种类',
    varietyName: '请输入品种名称',
    varietyCode: '请输入品种代码',
    species: '请输入物种',
    applyDate: '请选择申请日期',
    applyDescription: '请输入申请描述',
    auditResult: '请选择审核结果',
    auditOpinion: '请输入审核意见',
    demandQuantity: '请输入需求数量',
    fromSeedType: '请选择从种子类型',
    toSeedType: '请选择到种子类型'
  },

  // 验证规则
  rules: {
    applicantOrgTypeRequired: '请选择机构类型',
    applicantOrgNameRequired: '请输入机构名称',
    applicantOrgIdRequired: '请输入机构ID',
    propagationBatchIdRequired: '请输入繁育批次ID',
    cropTypeRequired: '请选择作物种类',
    varietyNameRequired: '请输入品种名称',
    auditResultRequired: '请选择审核结果',
    auditOpinionRequired: '请输入审核意见',
    demandQuantityRequired: '请输入需求数量',
    fromSeedTypeRequired: '请选择从种子类型',
    toSeedTypeRequired: '请选择到种子类型'
  },

  // 表格列
  columns: {
    applicantOrgName: '组织名称',
    cropType: '作物种类',
    varietyName: '品种名称',
    applyDate: '申请日期',
    applyStatus: '状态',
    auditResult: '审核结果',
    auditor: '审核人',
    auditTime: '审核时间',
    createdTime: '创建时间',
    actions: '操作'
  },

  // 机构类型
  orgType: {
    union: '联合社',
    cooperative: '合作社'
  },

  // 审核结果
  auditResult: {
    approved: '通过',
    rejected: '拒绝'
  }
}
