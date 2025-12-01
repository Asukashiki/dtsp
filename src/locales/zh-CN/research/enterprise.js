// 企业注册备案国际化文件
export default {
  title: '种子企业认证',
  subtitle: '填写企业基础信息，提交认证申请',
  list: '企业列表',
  add: '新增企业认证',
  edit: '编辑企业信息',
  detail: '企业详情',
  apply: '申请认证',
  viewDetail: '查看详情',

  // 搜索和筛选
  searchPlaceholder: '搜索企业名称、统一社会信用代码、许可证编号',
  filterByType: '按企业类型筛选',
  filterByStatus: '按认证状态筛选',
  allTypes: '全部类型',
  allStatus: '全部状态',

  // 企业类型
  type: {
    production: '生产型',
    trade: '贸易型',
    integrated: '综合型',
  },

  // 认证状态
  status: {
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回',
    draft: '草稿',
  },

  // 表单字段 - 企业身份信息
  form: {
    identityInfo: '企业身份信息',
    locationInfo: '位置与运营信息',
    extraInfo: '企业额外信息',
    documentsInfo: '所需文件',
    operationInfo: '操作信息',

    enterpriseName: '企业名称',
    enterpriseId: '企业注册ID',
    unifiedSocialCreditCode: '统一社会信用代码',
    enterpriseType: '企业类型',
    seedLicenseNo: '种子企业许可证编号',
    licenseStartDate: '许可证有效期起始日',
    licenseEndDate: '许可证有效期',

    region: '地区',
    zone: '区域',
    county: '县',
    township: '乡',
    detailedAddress: '完整地址',
    businessScope: '业务范围',
    annualProductionCapacity: '年生产能力（吨/年）',

    establishmentDate: '企业成立时间',
    legalPersonName: '法人姓名',
    legalPersonId: '法人ID',
    contactPerson: '联系人姓名',
    contactPhone: '联系电话',
    contactEmail: '邮箱',

    businessLicense: '营业执照',
    seedLicense: '种子许可证',
    taxRegistration: '税务登记证',
    factoryLicense: '工厂许可证',

    operator: '操作人',
    operationOrg: '操作机构',
    operationTime: '操作时间',
    certificationStatus: '认证状态',
  },

  // 表单占位符
  placeholder: {
    enterpriseName: '请输入企业名称',
    unifiedSocialCreditCode: '请输入统一社会信用代码',
    enterpriseType: '请选择企业类型',
    seedLicenseNo: '请输入种子企业许可证编号',
    licenseStartDate: '请选择许可证有效期起始日',
    licenseEndDate: '请选择许可证有效期',
    region: '请选择地区',
    zone: '请选择区域',
    county: '请选择县',
    township: '请选择乡',
    detailedAddress: '请输入完整地址',
    businessScope: '请输入业务范围',
    annualProductionCapacity: '请输入年生产能力',
    establishmentDate: '请选择企业成立时间',
    legalPersonName: '请输入法人姓名',
    legalPersonId: '请输入法人ID',
    contactPerson: '请输入联系人姓名',
    contactPhone: '请输入联系电话',
    contactEmail: '请输入邮箱（选填）',
  },

  // 表单验证
  rules: {
    enterpriseNameRequired: '请输入企业名称',
    unifiedSocialCreditCodeRequired: '请输入统一社会信用代码',
    unifiedSocialCreditCodeLength: '统一社会信用代码应为18位',
    enterpriseTypeRequired: '请选择企业类型',
    seedLicenseNoRequired: '请输入种子企业许可证编号',
    licenseStartDateRequired: '请选择许可证有效期起始日',
    licenseEndDateRequired: '请选择许可证有效期',
    regionRequired: '请选择地区',
    zoneRequired: '请选择区域',
    countyRequired: '请选择县',
    townshipRequired: '请选择乡',
    detailedAddressRequired: '请输入完整地址',
    businessScopeRequired: '请输入业务范围',
    annualProductionCapacityRequired: '请输入年生产能力',
    establishmentDateRequired: '请选择企业成立时间',
    legalPersonNameRequired: '请输入法人姓名',
    legalPersonIdRequired: '请输入法人ID',
    contactPersonRequired: '请输入联系人姓名',
    contactPhoneRequired: '请输入联系电话',
    contactPhoneFormat: '请输入正确的手机号码',
    contactEmailFormat: '请输入正确的邮箱格式',
    businessLicenseRequired: '请上传营业执照',
    seedLicenseRequired: '请上传种子许可证',
    taxRegistrationRequired: '请上传税务登记证',
    factoryLicenseRequired: '请上传工厂许可证',
  },

  // 列表列
  columns: {
    enterpriseName: '企业名称',
    unifiedSocialCreditCode: '统一社会信用代码',
    enterpriseType: '企业类型',
    seedLicenseNo: '许可证编号',
    licenseEndDate: '许可证有效期',
    certificationStatus: '认证状态',
    applicationDate: '申请日期',
    auditStage: '审核阶段',
    auditor: '审核人',
    createTime: '创建时间',
    actions: '操作',
  },

  // 操作按钮
  actions: {
    submit: '提交申请',
    saveDraft: '保存草稿',
    edit: '编辑',
    view: '查看',
    audit: '审核',
    delete: '删除',
    approve: '通过',
    reject: '驳回',
  },

  // 提示信息
  messages: {
    submitSuccess: '提交成功',
    saveDraftSuccess: '保存草稿成功',
    deleteConfirm: '确定删除该企业认证申请吗？',
    deleteSuccess: '删除成功',
    uploadTip: '支持 PDF、JPG 格式，单个文件不超过2MB',
    rejectedTitle: '审核未通过',
    notApplied: '未申请',
    tonsPerYear: '吨/年',
  },
}