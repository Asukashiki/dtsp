export default {
  // 页面标题
  title: '机构注册管理',
  subtitle: '管理联合会和合作社的注册申请与审核',
  
  // 列表页
  list: {
    title: '注册申请列表',
    searchPlaceholder: '按机构名称搜索',
    filterByStatus: '按状态筛选',
    filterByType: '按类型筛选',
    allStatus: '全部状态',
    allTypes: '全部类型',
    noData: '暂无注册申请'
  },

  // 审核列表页
  audit: {
    title: '注册审核管理',
    subtitle: '审核联合会和合作社的注册申请',
    listTitle: '待审核申请列表',
    noData: '暂无待审核申请'
  },

  // 机构类型
  orgType: {
    UNION: '联合会',
    COOPERATIVE: '合作社'
  },

  // 审核状态
  status: {
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回'
  },

  // 表格列
  columns: {
    orgName: '机构名称',
    orgType: '机构类型',
    licenseNumber: '许可证号',
    regionCode: '所属区域',
    applyUsername: '登录账号',
    auditStatus: '状态',
    createTime: '申请时间',
    actions: '操作'
  },

  // 操作按钮
  actions: {
    view: '查看',
    edit: '编辑',
    audit: '审核',
    approve: '通过',
    reject: '驳回',
    resubmit: '重新提交'
  },

  // 表单
  form: {
    title: {
      add: '新增注册申请',
      edit: '编辑注册申请',
      view: '注册详情',
      audit: '审核注册申请'
    },
    // 基础信息
    basicInfo: '基本信息',
    orgType: '机构类型',
    orgName: '机构名称',
    unifiedCode: '统一社会信用代码',
    licenseNumber: '经营许可证号',
    licenseStart: '许可有效期起',
    licenseEnd: '许可有效期止',
    inputTypes: '投入品类型',
    salesAreaCodes: '销售区域代码',
    
    // 位置信息
    locationInfo: '位置信息',
    regionCode: '所属区域',
    fullAddress: '详细地址',
    gpsLat: 'GPS纬度',
    gpsLng: 'GPS经度',
    
    // 业务信息
    businessInfo: '业务信息',
    annualCapacity: '年产能/吞吐量',
    
    // 证照信息
    certificateInfo: '证照信息',
    businessLicenseUrl: '营业执照图片',
    taxCertUrl: '税务登记证图片',
    otherCertsJson: '其他许可证',
    
    // 账号信息
    accountInfo: '账号信息',
    applyUsername: '登录账号',
    applyPassword: '登录密码',
    confirmPassword: '确认密码',
    
    // 联系信息
    contactInfo: '联系信息',
    contactName: '联系人姓名',
    contactMobile: '联系人手机号',
    contactEmail: '联系人邮箱',
    
    // 审核信息
    auditInfo: '审核信息',
    auditResult: '审核结果',
    auditComment: '审核意见',
    auditHistory: '审核历史',
    auditorName: '审核人',
    auditTime: '审核时间'
  },

  // 占位符
  placeholder: {
    orgType: '请选择机构类型',
    orgName: '请输入机构名称',
    unifiedCode: '请输入统一社会信用代码',
    licenseNumber: '请输入经营许可证号',
    licenseStart: '请选择开始日期',
    licenseEnd: '请选择结束日期',
    inputTypes: '请选择投入品类型',
    regionCode: '请选择所属区域',
    fullAddress: '请输入详细地址',
    gpsLat: '请输入纬度',
    gpsLng: '请输入经度',
    annualCapacity: '请输入年产能',
    businessLicenseUrl: '请上传营业执照',
    taxCertUrl: '请上传税务登记证',
    applyUsername: '请输入登录账号',
    applyPassword: '请输入登录密码',
    confirmPassword: '请确认密码',
    contactName: '请输入联系人姓名',
    contactMobile: '请输入联系人手机号',
    contactEmail: '请输入联系人邮箱',
    auditComment: '请输入审核意见'
  },

  // 验证规则
  rules: {
    orgTypeRequired: '请选择机构类型',
    orgNameRequired: '请输入机构名称',
    licenseNumberRequired: '请输入许可证号',
    regionCodeRequired: '请选择所属区域',
    businessLicenseRequired: '请上传营业执照',
    applyUsernameRequired: '请输入登录账号',
    applyPasswordRequired: '请输入登录密码',
    confirmPasswordRequired: '请确认密码',
    passwordMismatch: '两次输入的密码不一致',
    usernameExists: '该用户名已存在',
    auditResultRequired: '请选择审核结果',
    inputTypesRequired: '请选择投入品类型',
    licenseStartRequired: '请选择许可开始日期',
    licenseEndRequired: '请选择许可结束日期'
  },

  // 提示消息
  messages: {
    submitSuccess: '注册申请提交成功',
    submitFailed: '注册申请提交失败',
    auditSuccess: '审核操作成功',
    auditFailed: '审核操作失败',
    loadFailed: '加载数据失败',
    confirmApprove: '确定要通过此申请吗？',
    confirmReject: '确定要驳回此申请吗？',
    usernameAvailable: '用户名可用',
    usernameUnavailable: '用户名不可用'
  },

  // 投入品类型选项
  inputTypeOptions: {
    SEED: '种子',
    FERTILIZER: '化肥',
    PESTICIDE: '农药'
  },

  // 审核结果选项
  auditResultOptions: {
    approve: '通过',
    reject: '驳回'
  }
}
