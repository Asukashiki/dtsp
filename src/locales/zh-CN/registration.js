export default {
  // 注册管理模块
  title: '注册管理',
  subtitle: 'Union/Cooperative注册申请与审核管理',

  // 菜单导航
  menu: {
    registrationManagement: '注册管理',
    registration: 'Union/Cooperative注册申请',
    registrationApproval: 'Union/Cooperative注册审核',
  },

  // Union/Cooperative注册申请
  application: {
    title: 'Union/Cooperative注册申请',
    subtitle: '申请Union或Cooperative机构注册',
    list: '注册申请列表',
    add: '新增注册申请',
    edit: '编辑注册申请',
    detail: '注册申请详情',
    submit: '提交审核',
    delete: '删除申请',
    deleteConfirm: '确定删除该注册申请吗?',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',
    submitSuccess: '提交审核成功',

    // 搜索筛选
    searchPlaceholder: '搜索机构名称、许可证号',
    filterByOrgType: '按机构类型筛选',
    filterByStatus: '按申请状态筛选',
    filterByInputType: '按投入品类型筛选',
    allOrgTypes: '全部类型',
    allStatus: '全部状态',
    allInputTypes: '全部投入品类型',
    dateRange: '创建时间范围',

    // 机构类型
    orgType: {
      union: 'Union (联合社)',
      cooperative: 'Cooperative (合作社)',
    },

    // 申请状态
    status: {
      draft: '草稿',
      pending: '待审核',
      approved: '已通过',
      rejected: '已驳回',
    },

    // 投入品类型
    inputType: {
      seed: '种子',
      fertilizer: '化肥',
      pesticide: '农药',
    },

    // 表单字段
    form: {
      basicInfo: '基础信息',
      locationInfo: '位置运营信息',
      licenseInfo: '许可证件信息',

      enterpriseName: '机构名称',
      enterpriseRegistrationId: '企业注册号',
      unifiedSocialCreditCode: '统一社会信用代码',
      seedEnterpriseLicenseNumber: '种子企业许可证号',
      licenseValidityStart: '许可证有效期开始',
      licenseValidityEnd: '许可证有效期结束',
      enterpriseType: '企业类型',
      orgType: '机构类型',
      inputTypes: '投入品类型',
      salesRegions: '销售区域',
      applicationStatus: '申请状态',
      remark: '备注',
      version: '版本号',

      // 位置运营信息
      region: '大区',
      zone: 'Zone',
      woreda: 'Woreda',
      kebele: 'Kebele',
      fullAddress: '详细地址',
      gpsLatitude: 'GPS纬度',
      gpsLongitude: 'GPS经度',
      businessScope: '经营范围',
      annualProductionCapacity: '年生产能力',

      // 许可证件
      licenses: '许可证件',
      licenseType: '证件类型',
      licenseNumber: '证件号码',
      licenseFile: '证件文件',
      issueDate: '发证日期',
      expiryDate: '到期日期',

      addLicense: '添加证件',
      removeLicense: '移除',

      createdBy: '创建人',
      createdTime: '创建时间',
      updatedBy: '更新人',
      updatedTime: '更新时间',
    },

    // 证件类型
    licenseType: {
      businessLicense: '营业执照',
      seedLicense: '种子许可证',
      taxCertificate: '税务登记证',
      factoryPermit: '工厂许可证',
      // 后端使用下划线格式
      business_license: '营业执照',
      seed_license: '种子许可证',
      tax_certificate: '税务登记证',
      factory_permit: '工厂许可证',
    },

    // 表单占位符
    placeholder: {
      enterpriseName: '请输入机构名称(2-200字符)',
      enterpriseRegistrationId: '请输入企业注册号',
      unifiedSocialCreditCode: '请输入统一社会信用代码',
      seedEnterpriseLicenseNumber: '请输入种子企业许可证号',
      licenseValidityStart: '请选择许可证有效期开始日期',
      licenseValidityEnd: '请选择许可证有效期结束日期',
      enterpriseType: '请输入企业类型',
      orgType: '请选择机构类型',
      inputTypes: '请选择投入品类型(可多选)',
      salesRegions: '请选择销售区域(可多选)',
      remark: '请输入备注信息',

      region: '请输入大区',
      zone: '请输入Zone',
      woreda: '请输入Woreda',
      kebele: '请输入Kebele',
      fullAddress: '请输入详细地址(5-500字符)',
      gpsLatitude: '请输入GPS纬度',
      gpsLongitude: '请输入GPS经度',
      businessScope: '请输入经营范围',
      annualProductionCapacity: '请输入年生产能力',

      licenseType: '请选择证件类型',
      licenseNumber: '请输入证件号码',
      issueDate: '请选择发证日期',
      expiryDate: '请选择到期日期',
    },

    // 表单验证
    rules: {
      enterpriseNameRequired: '请输入机构名称',
      enterpriseNameLength: '机构名称应为2-200字符',
      seedEnterpriseLicenseNumberRequired: '请输入种子企业许可证号',
      licenseValidityStartRequired: '请选择许可证有效期开始日期',
      licenseValidityEndRequired: '请选择许可证有效期结束日期',
      licenseValidityInvalid: '许可证有效期结束日期不能早于开始日期',
      licenseExpired: '许可证有效期结束日期不能早于当前日期',
      enterpriseTypeRequired: '请输入企业类型',
      orgTypeRequired: '请选择机构类型',
      inputTypesRequired: '请选择投入品类型',
      salesRegionsRequired: '请选择销售区域',

      woredaRequired: '请输入Woreda',
      kebeleRequired: '请输入Kebele',
      fullAddressRequired: '请输入详细地址',
      fullAddressLength: '详细地址应为5-500字符',
      gpsLatitudeInvalid: 'GPS纬度格式不正确',
      gpsLongitudeInvalid: 'GPS经度格式不正确',

      licenseTypeRequired: '请选择证件类型',
      licenseFileRequired: '请上传证件文件',
      issueDateInvalid: '发证日期不能晚于到期日期',
      licenseItemsRequired: '请至少添加一个许可证件',
    },

    // 列表列
    columns: {
      enterpriseName: '机构名称',
      orgType: '机构类型',
      inputTypes: '投入品类型',
      seedEnterpriseLicenseNumber: '许可证号',
      woreda: 'Woreda',
      zone: 'Zone',
      applicationStatus: '申请状态',
      createdTime: '创建时间',
      actions: '操作',
    },

    // 操作按钮
    actions: {
      view: '查看',
      edit: '编辑',
      delete: '删除',
      submit: '提交审核',
      add: '新增申请',
    },

    // 提示信息
    messages: {
      noData: '暂无数据',
      onlyDraftCanEdit: '只能编辑草稿状态的申请',
      onlyDraftCanDelete: '只能删除草稿状态的申请',
      onlyDraftCanSubmit: '只能提交草稿状态的申请',
      submitConfirm: '确定提交该申请进行审核吗?提交后将无法修改。',
      uploadTip: '支持 jpg/png/pdf 格式,单个文件不超过 5MB',
    },

    // 审核记录
    auditRecords: '审核记录',
    auditRecord: {
      auditUserName: '审核人',
      auditTime: '审核时间',
      auditResult: '审核结果',
      auditOpinion: '审核意见',
      noRecords: '暂无审核记录',
    },
  },

  // Union/Cooperative注册审核
  approval: {
    title: 'Union/Cooperative注册审核',
    subtitle: '审核Union或Cooperative机构注册申请',
    list: '待审核列表',
    detail: '审核详情',
    approve: '通过',
    reject: '驳回',
    approveSuccess: '审核通过',
    rejectSuccess: '已驳回',

    searchPlaceholder: '搜索机构名称、许可证号',
    filterByOrgType: '按机构类型筛选',

    // 表单字段
    form: {
      applicationInfo: '申请信息',
      auditInfo: '审核操作',
      auditResult: '审核结果',
      auditOpinion: '审核意见',
      remark: '备注',
    },

    placeholder: {
      auditOpinion: '请输入审核意见(驳回时必填)',
      remark: '请输入备注信息',
    },

    rules: {
      auditOpinionRequired: '驳回时必须填写审核意见',
    },

    actions: {
      audit: '审核',
      view: '查看',
      approve: '通过',
      reject: '驳回',
    },

    messages: {
      approveConfirm: '确定通过该注册申请吗?',
      rejectConfirm: '确定驳回该注册申请吗?',
      onlyPendingCanAudit: '只能审核待审核状态的申请',
    },
  },
}
