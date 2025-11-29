export default {
  // 页面标题
  title: '繁殖机构注册',
  subtitle: '填写繁殖机构信息，提交注册申请',
  list: '繁殖机构列表',
  add: '新增繁殖机构注册',
  edit: '编辑繁殖机构信息',
  detail: '繁殖机构详情',
  apply: '申请注册',
  viewDetail: '查看详情',

  // 搜索和筛选
  searchPlaceholder: '搜索企业名称、注册ID、许可证编号',
  filterByType: '按企业类型筛选',
  filterByStatus: '按认证状态筛选',
  allTypes: '全部类型',
  allStatus: '全部状态',

  // 按钮
  submit: '提交申请',
  saveDraft: '保存草稿',
  cancel: '取消',
  reset: '重置',
  search: '搜索',
  delete: '删除',
  batchDelete: '批量删除',
  export: '导出',
  back: '返回',

  // 标签页
  tabs: {
    identityInfo: '身份信息',
    operationInfo: '运营信息',
    licenseInfo: '许可信息',
    operatorInfo: '操作人信息'
  },

  // 表单字段 - 身份信息
  form: {
    identityInfo: '企业身份信息',
    operationInfo: '位置与运营信息',
    licenseInfo: '许可信息',
    operatorInfo: '操作人信息',

    enterpriseName: '企业名称',
    enterpriseRegistrationId: '企业注册ID',
    unifiedSocialCreditCode: '统一社会信用代码',
    seedEnterpriseLicenseNumber: '种子企业许可证编号',
    enterpriseType: '企业类型',
    licenseValidityStart: '许可证有效期起',
    licenseValidityEnd: '许可证有效期止',

    // 运营信息
    region: '地区',
    zone: '区域',
    woreda: 'Woreda',
    kebele: 'Kebele',
    fullAddress: '完整地址',
    gpsLatitude: 'GPS纬度',
    gpsLongitude: 'GPS经度',
    businessScope: '业务范围',
    annualProductionCapacity: '年生产能力',

    // 许可信息
    businessLicense: '营业执照',
    seedLicense: '种子许可证',
    taxCertificate: '税务登记证',
    factoryPermit: '工厂许可证',

    // 操作人信息
    operator: '操作人',
    operationOrg: '操作机构',
    operationTime: '操作时间',
    certificationStatus: '认证状态',
    rejectReason: '驳回原因',
    remark: '备注'
  },

  // 占位符
  placeholder: {
    enterpriseName: '请输入企业名称',
    enterpriseRegistrationId: '请输入企业注册ID',
    unifiedSocialCreditCode: '请输入统一社会信用代码',
    seedEnterpriseLicenseNumber: '请输入种子企业许可证编号',
    enterpriseType: '请选择企业类型',
    licenseValidityStart: '请选择许可证有效期起始日期',
    licenseValidityEnd: '请选择许可证有效期截止日期',
    region: '请选择地区',
    zone: '请选择区域',
    woreda: '请选择Woreda',
    kebele: '请选择Kebele',
    fullAddress: '请输入完整地址',
    gpsLatitude: '请输入GPS纬度',
    gpsLongitude: '请输入GPS经度',
    businessScope: '请输入业务范围',
    annualProductionCapacity: '请输入年生产能力（吨）',
    operator: '请输入操作人',
    operationOrg: '请输入操作机构',
    businessLicense: '请上传营业执照',
    seedLicense: '请上传种子许可证',
    taxCertificate: '请上传税务登记证',
    factoryPermit: '请上传工厂许可证',
    remark: '请输入备注'
  },

  // 企业类型
  type: {
    production: '生产型',
    trade: '贸易型',
    integrated: '综合型'
  },

  // 认证状态
  status: {
    notApplied: '未申请',
    draft: '草稿',
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回'
  },

  // 表格列
  table: {
    enterpriseName: '企业名称',
    enterpriseRegistrationId: '注册ID',
    seedEnterpriseLicenseNumber: '许可证编号',
    enterpriseType: '企业类型',
    certificationStatus: '状态',
    operator: '操作人',
    operationTime: '操作时间',
    actions: '操作'
  },

  // 操作按钮
  actions: {
    submit: '提交申请',
    saveDraft: '保存草稿',
    cancel: '取消',
    uploadFile: '上传文件'
  },

  // 消息提示
  messages: {
    submitSuccess: '注册成功',
    submitFailed: '注册失败',
    saveDraftSuccess: '草稿保存成功',
    saveDraftFailed: '草稿保存失败',
    deleteSuccess: '删除成功',
    deleteFailed: '删除失败',
    deleteConfirm: '确定要删除选中的繁殖机构注册信息吗？',
    deleteWarning: '此操作不可撤销',
    noDataSelected: '请至少选择一条记录',
    loadFailed: '数据加载失败',
    uploadSuccess: '文件上传成功',
    uploadFailed: '文件上传失败',
    fileSizeLimit: '文件大小不能超过10MB',
    fileTypeError: '只允许上传PDF、JPG、PNG格式的文件',
    requiredField: '此字段为必填项',
    invalidFormat: '格式不正确',
    dateRangeError: '结束日期必须晚于开始日期',
    rejectedTitle: '申请已被驳回',
    rejectReason: '驳回原因'
  },

  // 状态提示
  statusTips: {
    draft: '您的申请已保存为草稿，请完善信息后提交。',
    pending: '您的申请正在审核中，请耐心等待。',
    approved: '恭喜！您的申请已通过审核。',
    rejected: '您的申请已被驳回，请查看驳回原因并重新提交。'
  },

  // 上传提示
  uploadTips: {
    title: '上传要求',
    format: '支持格式：PDF、JPG、PNG',
    size: '文件大小限制：10MB',
    required: '带*号的文件为必传项'
  },

  // 验证规则
  rules: {
    enterpriseNameRequired: '企业名称不能为空',
    seedEnterpriseLicenseNumberRequired: '种子企业许可证编号不能为空',
    enterpriseTypeRequired: '企业类型不能为空',
    licenseValidityStartRequired: '许可证有效期起始日期不能为空',
    licenseValidityEndRequired: '许可证有效期截止日期不能为空',
    woredaRequired: 'Woreda不能为空',
    kebeleRequired: 'Kebele不能为空',
    fullAddressRequired: '完整地址不能为空',
    gpsLatitudeRequired: 'GPS纬度不能为空',
    businessLicenseRequired: '营业执照不能为空',
    factoryPermitRequired: '工厂许可证不能为空',
    operatorRequired: '操作人不能为空'
  }
}
