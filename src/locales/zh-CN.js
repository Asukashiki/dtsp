export default {
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    search: '搜索',
    reset: '重置',
    submit: '提交',
    back: '返回',
    loading: '加载中...',
    more: '查看更多',
    viewDetails: '查看详情',
    pleaseSelect: '请选择',
    pleaseInput: '请输入',
    success: '操作成功',
    failed: '操作失败',
    tips: '提示',
    upload: '上传文件',
    uploadSuccess: '上传成功',
    add: '新增',
    close: '关闭',
    startDate: '开始时间',
    endDate: '结束时间'
  },

  header: {
    home: '首页',
    identity: '用户身份认证',
    knowledge: '知识中心',
    userInfo: '个人信息',
    logout: '退出登录',
    modifyPassword: '修改密码',
    modifyContact: '修改联系方式',
    language: '语言',
  },

  footer: {
    platformName: '奥罗米亚智能农业价值链大数据平台',
    platformNameShort: '智慧农业平台',
    copyright: '© 2025 浪潮软件科技有限公司版权所有',
    contact: '联系方式',
    serviceTime: '服务时间：工作日 08:30-17:30',
    address: '地址：埃塞俄比亚奥罗米亚州',
    phone: '电话：+251-XXX-XXXX',
    email: '邮箱：support@oromia-agri.et',
  },

  home: {
    // Hero Section
    heroTitle: '奥罗米亚智能农业价值链大数据平台',
    heroSubtitle: '赋能农业现代化，构建智慧农业生态系统',
    heroDescription: '通过数字化技术提升农业生产效率，优化供应链管理，促进农业可持续发展',

    // 公告板块
    announcement: '系统公告',
    latestNews: '最新动态',
    viewAll: '查看全部',
    noData: '暂无数据',

    // 系统入口板块
    systemEntries: '系统入口',
    systemModules: '系统模块',
    quickAccess: '快速访问',

    // 系统模块
    modules: {
      portal: {
        name: '系统门户',
        desc: '用户注册、登录、身份认证及信息管理',
      },
      research: {
        name: '研究与开发',
        desc: '品种管理、育种管理及种子信息服务',
      },
      input: {
        name: '农业投入品供应',
        desc: '投入品管理、库存管理及供应链追溯',
      },
      production: {
        name: '生产管理',
        desc: '农事记录、生产计划及作物监测',
      },
      procurement: {
        name: '采购管理',
        desc: '采购订单、供应商管理及合同管理',
      },
      traceability: {
        name: '产品追溯',
        desc: '全程追溯、质量检测及溯源查询',
      },
      data: {
        name: '数据服务',
        desc: '数据采集、分析展示及决策支持',
      },
      farm: {
        name: '农田管理系统',
        desc: '农民认证、土地信息管理及农田数据服务',
      },
    },

    // 操作指南板块
    operationGuide: '操作指南',
    documents: '文档中心',

    guides: {
      userManual: {
        title: '用户手册',
        desc: '系统功能介绍、操作流程及常见问题',
      },
      farmerGuide: {
        title: '农民指南',
        desc: '种植技术、投入品使用及病虫害防治',
      },
      supplierGuide: {
        title: '供应商指南',
        desc: '产品注册、库存管理及订单处理',
      },
      apiDocs: {
        title: 'API文档',
        desc: '接口说明、开发指南及集成示例',
      },
    },

    // 统计数据
    statistics: {
      users: '注册用户',
      farmers: '认证农民',
      suppliers: '认证供应商',
      products: '农产品种类',
    },

    myTodo: '我的待办',
    myDone: '我的已办',
    systemVisits: '各系统访问总量',
    recentTrends: '近期访问趋势',

    columns: {
      taskName: '事项名称',
      date: '日期',
      system: '系统',
    },
  },

  identity: {
    title: '用户身份认证',
    subtitle: '请选择认证类型',
    description: '完成身份认证后，即可使用对应的系统功能',

    farmer: '农民认证',
    supplier: '供应商认证',
    buyer: '收购商认证',

    farmerTitle: '农民认证申请',
    farmerDesc: '面向个人农户的身份认证，便于接入相关服务',
    farmerSubtitle: '请填写以下信息以完成农民身份认证',

    supplierTitle: '供应商认证申请',
    supplierDesc: '面向供应商主体的身份认证，支持供给侧业务接入',
    supplierSubtitle: '请填写以下信息以完成供应商主体认证',

    buyerTitle: '收购商认证申请',
    buyerDesc: '面向收购主体的身份认证，便于开展交易与协作',
    buyerSubtitle: '请填写以下信息以完成收购主体认证',

    applyNow: '立即申请',
    viewStatus: '查看状态',
    goApply: '去填写',

    status: {
      notCertified: '未认证',
      underReview: '审核中',
      certified: '已认证',
      rejected: '已驳回',
    },

    form: {
      // 通用字段
      name: '真实姓名',
      idNo: '身份证号',
      mobile: '手机号码',
      region: '行政区划',
      address: '详细住址',
      remark: '备注',
      contactName: '联系人姓名',
      contactMobile: '联系人手机',

      // 农民字段
      cropTypes: '种植类型',
      attachments: '证明文件',

      // 供应商/收购商字段
      entityType: '主体类型',
      entityName: '名称',
      uscc: '统一社会信用代码',
      legalPerson: '法定代表人/负责人',
      legalIdNo: '法定代表人身份证号',
      scope: '经营范围/主要产品',
      license: '营业执照',
      principalName: '负责人姓名',
      principalIdNo: '负责人身份证号',
      productTypes: '主要收购产品类型',

      // 审核字段
      auditOpinion: '审核意见',
      auditResult: '审核结果',
      pass: '通过',
      reject: '驳回',
    },

    placeholder: {
      name: '请输入真实姓名',
      idNo: '请输入身份证号',
      mobile: '请输入手机号码',
      region: '请选择行政区划',
      address: '请输入详细住址',
      remark: '备注信息（选填）',
      cropTypes: '请选择种植类型',
      entityName: '请输入主体名称',
      uscc: '请输入统一社会信用代码（18位）',
      legalPerson: '请输入法定代表人/负责人',
      legalIdNo: '请输入身份证号',
      scope: '请输入经营范围或主要产品',
      contactName: '请输入联系人姓名',
      contactMobile: '请输入联系人手机',
      principalName: '请输入负责人姓名',
      principalIdNo: '请输入负责人身份证号',
      productTypes: '请选择产品类型',
      auditOpinion: '请输入审核意见',
    },

    uploadTip: '支持 jpg/png/pdf，最多{count}个文件',
  },

  user: {
    name: '姓名',
    employeeId: '工号',
    department: '部门',
    phone: '电话',
    email: '邮箱',
    lastPasswordChange: '上次密码修改时间',
  },

  dataList: {
    systemAnnouncement: '系统公告',
    myDone: '我的已办',
    myTodo: '我的待办',
    totalCount: '共 {count} 条',
    noData: '暂无{type}数据',
    unread: '未读',
    read: '已读',
    clickToView: '点击查看详情',
    // 详情弹窗
    systemTime: '系统时间',
    doneTime: '已办时间',
    publishTime: '发布时间',
    publisher: '发布者',
  },

  userInfo: {
    title: '个人信息',
    subtitle: '管理你的个人信息和账户设置',
    basicInfo: '基本信息',
    contactInfo: '联系方式',
    accountSecurity: '账户安全',

    // Basic Info
    name: '姓名',
    employeeId: '工号',
    department: '部门',

    // Contact Info
    phone: '手机号',
    email: '邮箱',
    modifyPhone: '修改手机号',
    modifyEmail: '修改邮箱',
    enterNewPhone: '请输入新手机号',
    enterNewEmail: '请输入新邮箱',
    phoneFormat: '请输入正确的手机号',
    emailFormat: '请输入正确的邮箱格式',

    // Security
    password: '登录密码',
    passwordSet: '已设置',
    modifyPassword: '修改密码',
    securityLevel: '安全等级',
    securityHigh: '高',
    securityMedium: '中',
    securityLow: '低',
    currentPassword: '当前密码',
    newPassword: '新密码',
    confirmPassword: '确认新密码',
    enterCurrentPassword: '请输入当前密码',
    enterNewPassword: '请输入新密码',
    enterConfirmPassword: '再次输入新密码',
    passwordRule: '密码应至少包含一位数字和一位字母，且不少于8位',
    passwordNotSame: '新密码不能与当前密码相同',
    passwordNotMatch: '两次输入的密码不一致',
    modifySuccess: '修改成功',
    confirmLogout: '确定要退出登录吗？',
  },

  // 研究与开发系统
  research: {
    // 系统通用
    systemName: '研究与开发管理系统',
    systemDesc: '品种管理、育种管理及种子信息服务',
    backToHome: '返回首页',

    // 菜单导航
    menu: {
      enterpriseRegistration: '企业注册备案',
      enterpriseAuth: '种子企业认证',
      enterpriseAudit: '种子企业审核',
      enterpriseList: '企业列表',
      varietyManagement: '品种管理',
      varietyRegistration: '品种登记',
      varietyAudit: '品种审核',
      varietyPublish: '品种发布',
      breedingManagement: '育种管理',
      breedingPlan: '育种计划管理',
      breedingMaterial: '育种材料登记',
      breedingTracking: '育种跟踪管理',
      dataCollection: '数据采集',
      trialData: '试验基础数据采集',
      agronomicData: '农艺性状数据采集',
      farmingRecord: '农事记录数据采集',
      environmentData: '环境与土壤属性数据采集',
      farmerData: '农民与地块属性数据采集',
      labData: '实验室测试数据采集',
      yieldData: '产量数据采集',
      iotData: 'IOT传感器数据采集',
      seedService: '种子信息服务',
      promotionManagement: '种子推广信息管理',
      seedInfo: '种子信息公示',
    },

    // 企业注册备案
    enterprise: {
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
        unifiedSocialCreditCode: '请输入统一社会信用代码（18位）',
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
      },
    },

    // 企业审核
    audit: {
      title: '种子企业审核',
      subtitle: '审核企业提交的备案申请材料',
      taskList: '审核任务列表',
      taskDetail: '审核任务详情',
      detailTitle: '审核详情',
      detailSubtitle: '查看企业信息并进行审核',

      // 搜索和筛选
      search: {
        placeholder: '搜索企业名称、统一社会信用代码',
      },
      filter: {
        enterpriseType: '按企业类型筛选',
        urgency: '按紧急程度筛选',
      },

      // 紧急程度
      urgency: {
        high: '高',
        medium: '中',
        low: '低',
      },

      // 表格列
      columns: {
        enterpriseName: '企业名称',
        unifiedSocialCreditCode: '统一社会信用代码',
        enterpriseType: '企业类型',
        seedLicenseNo: '种子许可证号',
        applicationDate: '申请日期',
        currentStage: '当前审核阶段',
        assignedAuditor: '分配审核人',
        auditStatus: '审核状态',
        submissionTime: '提交时间',
        urgency: '紧急程度',
        actions: '操作',
      },

      // 表格提示
      table: {
        noData: '暂无数据',
      },

      // 审核状态
      status: {
        pending: '审核中',
        approved: '已通过',
        rejected: '已驳回',
      },

      // 审核阶段
      stage: {
        initial: '初审',
        recheck: '复审',
        final: '终审',
      },

      // 审核结果
      result: {
        pass: '通过',
        reject: '驳回',
      },

      // 详情页区域标题
      sections: {
        basicInfo: '企业基础信息',
        extraInfo: '企业额外信息',
        documents: '所需文件',
        auditOperation: '审核操作',
      },

      // 企业额外信息
      extraInfo: {
        establishmentDate: '企业成立时间',
        legalPersonName: '法人姓名',
        legalPersonId: '法人ID',
        contactPersonName: '联系人姓名',
        contactPhone: '联系电话',
        email: '邮箱',
      },

      // 所需文件
      documents: {
        businessLicense: '营业执照',
        seedLicense: '种子许可证',
        taxRegistration: '税务登记证',
        factoryPermit: '工厂许可证',
        otherDocuments: '其他证明材料',
        viewDocument: '查看文件',
        download: '下载',
      },

      // 表单字段
      form: {
        auditResult: '审核结果',
        auditOpinion: '审核意见',
        auditor: '审核人',
        auditTime: '审核时间',
        rejectReason: '驳回原因',
      },

      // 表单占位符
      placeholder: {
        auditOpinion: '请输入审核意见',
        rejectReason: '请输入驳回原因',
      },

      // 表单验证
      rules: {
        auditResultRequired: '请选择审核结果',
        auditOpinionRequired: '请输入审核意见',
        rejectReasonRequired: '驳回时必须填写驳回原因',
      },

      // 操作按钮
      actions: {
        submit: '提交审核',
        back: '返回列表',
        backToList: '返回列表',
        audit: '审核',
        search: '搜索',
        reset: '重置',
      },

      // 提示信息
      messages: {
        submitSuccess: '审核提交成功',
        confirmSubmit: '确定提交审核结果吗？',
      },
    },

    // 品种管理
    variety: {
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

        // 表单字段
        form: {
          publishNo: '发布编号',
          publishDate: '发布日期',
          publishDept: '发布主管部门',
          decisionExplanation: '决策说明',
          publicDescription: '公开描述',
          recommendedRegion: '推荐地区',
          sowingGuide: '播种指南',
          photos: '照片',
        },

        // 表单占位符
        placeholder: {
          decisionExplanation: '请输入决策说明',
          publicDescription: '请输入公开描述',
          recommendedRegion: '请输入推荐地区',
          sowingGuide: '请输入播种指南',
        },

        // 操作按钮
        actions: {
          preview: '预览发布信息',
          publish: '立即发布',
          offline: '下架',
          view: '查看',
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
          varietyName: '品种名称',
          cropType: '作物类型',
          publishDate: '发布日期',
          publishDept: '发布主管部门',
          actions: '操作',
        },

        // 详情页
        detail: {
          basicInfo: '品种基本信息',
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
      },
    },
  },

  // 投入品管理系统
  input: {
    // 系统通用
    systemName: '农业投入品供应管理系统',
    systemDesc: '投入品管理、库存管理及供应链追溯',
    backToHome: '返回首页',

    // 菜单导航
    menu: {
      dashboard: '数据概览',
      supplierManagement: '供应商管理',
      supplierAuth: '供应商认证',
      supplierAuthApproval: '供应商认证审批',
      supplierInfo: '供应商信息维护',
      inputManagement: '投入品管理',
      inputCatalog: '投入品目录管理',
      supplierInput: '供应商投入品信息管理',
      inputSupply: '投入品供应管理',
      inventoryManagement: '库存管理',
      warehouse: '仓库管理',
      stockIn: '入库管理',
      stockOut: '出库管理',
      stockQuery: '库存查询',
      dashboard: '大屏管理',
      feedback: '信息反馈',
    },

    // 投入品目录管理
    catalog: {
      title: '投入品目录管理',
      subtitle: '管理农业投入品基础信息、规格参数及资质要求',
      list: '投入品列表',
      add: '新增投入品',
      edit: '编辑投入品',
      detail: '投入品详情',
      delete: '删除投入品',
      deleteConfirm: '确定删除该投入品吗？',
      deleteSuccess: '删除成功',
      addSuccess: '新增成功',
      editSuccess: '编辑成功',

      // 搜索和筛选
      searchPlaceholder: '搜索产品名称、登记证号、生产批号',
      filterByType: '按投入品类型筛选',
      allTypes: '全部类型',

      // 投入品类型
      type: {
        all: '全部',
        pesticide: '农药',
        fertilizer: '化肥',
        seed: '种子',
        other: '其他',
      },

      // 表单字段 - 基本信息
      form: {
        basicInfo: '基本信息',
        productionInfo: '生产与责任信息',
        regulatoryInfo: '法规与许可信息',
        ingredientsInfo: '成分与使用信息',

        inputName: '投入品名称',
        inputType: '投入品类型',
        inputSku: '唯一产品标识码/SKU',
        trademark: '注册商标',
        registerCode: '登记批号',
        productionLicense: '生产许可证号',
        productionStandard: '产品标准证号',
        producerName: '生产企业名称',
        producerAddress: '生产企业地址',
        createTime: '创建时间',
        createPeople: '创建人',
        status: '状态',
      },

      // 表单占位符
      placeholder: {
        inputName: '请输入投入品名称（2-100个字符）',
        inputType: '请选择投入品类型',
        inputSku: '请输入唯一产品标识码（8-50个字符）',
        trademark: '请输入注册商标',
        registerCode: '请输入登记批号',
        productionLicense: '请输入生产许可证号',
        productionStandard: '请输入产品标准证号',
        producerName: '请输入生产企业名称（2-200个字符）',
        producerAddress: '请输入生产企业地址（5-255个字符）',
      },

      // 表单验证
      rules: {
        inputNameRequired: '请输入投入品名称',
        inputNameLength: '投入品名称应为2-100个字符',
        inputTypeRequired: '请选择投入品类型',
        inputSkuRequired: '请输入唯一产品标识码',
        inputSkuLength: '产品标识码应为8-50个字符',
        trademarkRequired: '请输入注册商标',
        registerCodeRequired: '请输入登记批号',
        productionLicenseRequired: '请输入生产许可证号',
        productionStandardRequired: '请输入产品标准证号',
        producerNameRequired: '请输入生产企业名称',
        producerNameLength: '企业名称应为2-200个字符',
        producerAddressRequired: '请输入生产企业地址',
        producerAddressLength: '企业地址应为5-255个字符',
      },

      // 农药特性字段
      pesticide: {
        title: '农药特性信息',
        totalIngredientContent: '总有效成分含量',
        toxicityLevel: '毒性等级',
        targetCrops: '适用作物',
        controlTargets: '防治对象',
        applicationMethod: '施用方法',
        dosage: '使用剂量',
        dilutionRatio: '稀释倍数',
        safetyInterval: '安全间隔期（天）',
        precautions: '注意事项',
        firstAid: '中毒急救措施',
        storageRequirements: '储存要求',

        toxicity: {
          micro: '微毒',
          low: '低毒',
          medium: '中等毒',
          high: '高毒',
          severe: '剧毒',
        },
      },

      // 化肥特性字段
      fertilizer: {
        title: '化肥特性信息',
        fertilizerType: '肥料类型',
        totalNutrientContent: '总养分含量',
        nitrogenContent: '氮含量',
        phosphorusContent: '磷含量(P₂O₅)',
        potassiumContent: '钾含量(K₂O)',
        organicMatterContent: '有机质含量',
        mediumTraceElements: '中微量元素',
        phValue: 'pH值',
        suitableCrops: '适用作物',
        applicationPeriod: '施用时期',
        applicationMethod: '施用方法',
        recommendedDosage: '建议用量',
      },

      // 种子特性字段
      seed: {
        title: '种子特性信息',
        cropType: '作物种类',
        varietyName: '品种名称',
        varietyApprovalCode: '品种审定编号',
        varietySource: '品种来源',
        purity: '纯度(%)',
        cleanliness: '净度(%)',
        germinationRate: '发芽率(%)',
        moistureContent: '水分含量(%)',
      },

      // 列表列
      columns: {
        inputName: '投入品名称',
        inputType: '类型',
        inputSku: '产品标识码',
        trademark: '商标',
        registerCode: '登记批号',
        producerName: '生产企业',
        createTime: '创建时间',
        status: '状态',
        actions: '操作',
      },

      // 状态
      statusOptions: {
        active: '启用',
        inactive: '停用',
      },
    },

    // 供应商管理
    supplier: {
      // 供应商认证
      auth: {
        title: '供应商认证申请',
        subtitle: '填写供应商身份认证所需的详细资料',
        applySuccess: '认证申请提交成功',
        applyFailed: '认证申请提交失败',

        form: {
          orgName: '企业/组织名称',
          creditCode: '统一社会信用代码',
          legalPerson: '法定代表人/负责人',
          legalId: '法定代表人身份证号',
          adCode: '行政区划',
          businessScope: '经营范围/主要产品',
          licensePath: '营业执照',
          contactName: '联系人姓名',
          contactPhone: '联系人手机',
        },

        placeholder: {
          orgName: '请输入企业/组织名称',
          creditCode: '请输入统一社会信用代码（18位）',
          legalPerson: '请输入法定代表人/负责人',
          legalId: '请输入身份证号',
          adCode: '请选择行政区划',
          businessScope: '请输入经营范围或主要产品',
          contactName: '请输入联系人姓名',
          contactPhone: '请输入联系人手机号',
        },

        rules: {
          orgNameRequired: '请输入企业/组织名称',
          creditCodeRequired: '请输入统一社会信用代码',
          creditCodeLength: '统一社会信用代码应为18位',
          legalPersonRequired: '请输入法定代表人/负责人',
          legalIdRequired: '请输入法定代表人身份证号',
          legalIdFormat: '请输入正确的身份证号',
          adCodeRequired: '请选择行政区划',
          businessScopeRequired: '请输入经营范围或主要产品',
          licensePathRequired: '请上传营业执照',
          contactNameRequired: '请输入联系人姓名',
          contactPhoneRequired: '请输入联系人手机号',
          contactPhoneFormat: '请输入正确的手机号码',
        },

        uploadTip: '支持 jpg/png/pdf，单个文件不超过2MB',
      },

      // 供应商认证审批
      approval: {
        title: '供应商认证审批',
        subtitle: '审核供应商提交的身份认证申请材料',
        list: '待审批列表',
        detail: '审批详情',
        approveSuccess: '审核已通过',
        rejectSuccess: '已驳回',

        searchPlaceholder: '搜索企业名称、统一社会信用代码、联系人',
        advancedSearch: '高级筛选',
        showAdvanced: '展开高级筛选',
        hideAdvanced: '收起高级筛选',
        resetFilters: '重置筛选',
        applyFilters: '应用筛选',

        filter: {
          keyword: '关键词',
          status: '认证状态',
          allStatus: '全部状态',
          adCode: '行政区划',
          allRegion: '全部区划',
          applyTime: '申请时间',
          approveTime: '审批时间',
          timeTo: '至',
        },

        status: {
          pending: '审核中',
          approved: '已通过',
          rejected: '已驳回',
        },

        columns: {
          orgName: '企业/组织名称',
          creditCode: '统一社会信用代码',
          legalPerson: '法定代表人',
          contactName: '联系人',
          contactPhone: '联系电话',
          applyTime: '申请时间',
          status: '认证状态',
          actions: '操作',
        },

        form: {
          applicantInfo: '申请人信息',
          certInfo: '认证信息',
          auditInfo: '审核操作',
          auditResult: '审核结果',
          auditOpinion: '审核意见',
          pass: '通过',
          reject: '驳回',
        },

        placeholder: {
          auditOpinion: '请输入审核意见',
        },

        rules: {
          auditResultRequired: '请选择审核结果',
          auditOpinionRequired: '请输入审核意见',
        },

        actions: {
          submit: '提交审核',
          audit: '审核',
          view: '查看',
        },

        messages: {
          submitSuccess: '审核提交成功',
          confirmSubmit: '确定提交审核结果吗？',
        },
      },

      // 供应商信息维护
      info: {
        title: '供应商信息维护',
        subtitle: '查看和管理所有供应商的认证信息',
        list: '供应商列表',
        detail: '供应商详情',

        searchPlaceholder: '搜索企业名称、统一社会信用代码、联系人',
        showAdvanced: '展开高级筛选',
        hideAdvanced: '收起高级筛选',
        resetFilters: '重置筛选',
        applyFilters: '应用筛选',

        filter: {
          keyword: '关键词',
          status: '认证状态',
          allStatus: '全部状态',
          adCode: '行政区划',
          allRegion: '全部区划',
          applyTime: '申请时间',
          approveTime: '审批时间',
        },

        columns: {
          orgName: '企业/组织名称',
          creditCode: '统一社会信用代码',
          legalPerson: '法定代表人',
          contactName: '联系人',
          contactPhone: '联系电话',
          adCode: '行政区划',
          applyTime: '申请时间',
          approveTime: '审批时间',
          status: '认证状态',
          actions: '操作',
        },

        actions: {
          view: '查看详情',
          edit: '编辑',
          delete: '删除',
        },

        status: {
          pending: '审核中',
          approved: '已通过',
          rejected: '已驳回',
        },
      },

      // 供应商投入品管理
      product: {
        title: '供应商投入品管理',
        subtitle: '管理供应商与投入品的关联关系',
        list: '投入品供应列表',
        detail: '供应详情',
        add: '新增供应关系',
        edit: '编辑供应关系',
        delete: '删除供应关系',
        batchDelete: '批量删除',
        deleteConfirm: '确定删除该供应关系吗？',
        batchDeleteConfirm: '确定删除选中的供应关系吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索和筛选
        searchPlaceholder: '搜索商品名称、商品编码、供应商',
        filterBySupplier: '按供应商筛选',
        filterByType: '按投入品类型筛选',
        filterByQuality: '按质量评级筛选',
        allSuppliers: '全部供应商',
        allTypes: '全部类型',
        allQuality: '全部评级',
        keyword: '关键词',

        // 投入品类型
        inputType: {
          all: '全部',
          pesticide: '农药',
          fertilizer: '化肥',
          seed: '种子',
          other: '其他',
        },

        // 质量评级
        qualityRating: {
          all: '全部',
          A: 'A级（优秀）',
          B: 'B级（良好）',
          C: 'C级（一般）',
          D: 'D级（较差）',
        },

        // 认证状态
        certStatus: {
          notPassed: '未通过',
          pending: '审核中',
          passed: '已通过',
        },

        // 表单字段
        form: {
          basicInfo: '基础信息',
          supplyInfo: '供应信息',
          productInfo: '商品详情',
          qualityInfo: '质量信息',

          supplierId: '供应商',
          supplierName: '供应商名称',
          inputId: '投入品',
          inputName: '投入品名称',
          inputType: '投入品类型',
          inputSku: '投入品编码',
          inputSpec: '商品规格',
          supplierProductCode: '供应商商品编码',
          supplierProductName: '供应商商品名称',
          currentPrice: '当前价格',
          qualityRating: '质量评级',
          certStatus: '认证状态',
          notes: '备注信息',
          createTime: '创建时间',
          updateTime: '更新时间',
        },

        // 表单占位符
        placeholder: {
          supplierId: '请选择供应商',
          inputId: '请选择投入品',
          inputName: '请输入投入品名称',
          inputSku: '请输入投入品编码',
          supplierProductCode: '请输入供应商商品编码（最多100字符）',
          supplierProductName: '请输入供应商商品名称（最多200字符）',
          qualityRating: '请选择质量评级',
          notes: '请输入备注信息（最多500字符）',
        },

        // 表单验证
        rules: {
          supplierIdRequired: '请选择供应商',
          inputIdRequired: '请选择投入品',
          supplierProductCodeLength: '供应商商品编码不能超过100字符',
          supplierProductNameLength: '供应商商品名称不能超过200字符',
          notesLength: '备注信息不能超过500字符',
        },

        // 列表列
        columns: {
          inputName: '商品名称',
          inputSpec: '商品规格',
          inputType: '类型',
          supplierName: '供应商名称',
          supplierProductCode: '供应商商品编码',
          currentPrice: '当前价格',
          qualityRating: '质量评级',
          certStatus: '认证状态',
          createTime: '创建时间',
          actions: '操作',
        },

        // 操作按钮
        actions: {
          view: '详情',
          edit: '编辑',
          delete: '删除',
        },

        // 提示信息
        messages: {
          selectItems: '请选择要删除的项目',
          relationExists: '该供应商与投入品的关联已存在',
          noData: '暂无数据',
        },

        // 详情弹窗区域
        detailSections: {
          basicInfo: '基础信息',
          supplyInfo: '供应关系属性',
          editSupplyInfo: '编辑供应信息',
        },
      },
    },

    // 库存管理
    inventory: {
      // 仓库管理
      warehouse: {
        title: '仓库管理',
        subtitle: '管理仓库基本信息、容量及使用情况',
        list: '仓库列表',
        detail: '仓库详情',
        add: '新增仓库',
        edit: '编辑仓库',
        delete: '删除仓库',
        deleteConfirm: '确定删除该仓库吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        searchPlaceholder: '搜索仓库名称',
        filterByType: '按仓库类型筛选',
        filterByStatus: '按状态筛选',
        allTypes: '全部类型',
        allStatus: '全部状态',

        // 仓库类型
        type: {
          normal: '普通仓库',
          cold: '冷藏仓库',
          dangerous: '危险品仓库',
        },

        // 表单字段
        form: {
          warehouseName: '仓库名称',
          warehouseType: '仓库类型',
          location: '仓库位置',
          capacity: '仓库容量',
          usedCapacity: '已用容量',
          availableCapacity: '可用容量',
          belongs: '所属单位',
          supplierId: '关联供应商',
          contactPerson: '联系人',
          contactPhone: '联系电话',
          status: '状态',
          createTime: '创建时间',
        },

        placeholder: {
          warehouseName: '请输入仓库名称',
          warehouseType: '请选择仓库类型',
          location: '请输入仓库位置',
          capacity: '请输入仓库容量',
          belongs: '请输入所属单位',
          supplierId: '请选择关联供应商',
          contactPerson: '请输入联系人',
          contactPhone: '请输入联系电话',
        },

        rules: {
          warehouseNameRequired: '请输入仓库名称',
          warehouseTypeRequired: '请选择仓库类型',
          locationRequired: '请输入仓库位置',
          capacityRequired: '请输入仓库容量',
          capacityPositive: '仓库容量必须大于0',
          belongsRequired: '请输入所属单位',
          contactPersonRequired: '请输入联系人',
          contactPhoneRequired: '请输入联系电话',
          contactPhoneFormat: '请输入正确的电话号码',
        },

        columns: {
          warehouseCode: '仓库编号',
          warehouseName: '仓库名称',
          warehouseType: '仓库类型',
          location: '仓库位置',
          capacity: '容量',
          usageRate: '使用率',
          contactPerson: '联系人',
          contactPhone: '联系电话',
          status: '状态',
          actions: '操作',
        },

        status: {
          enabled: '启用',
          disabled: '停用',
        },

        actions: {
          view: '查看',
          edit: '编辑',
          delete: '删除',
        },

        messages: {
          noData: '暂无数据',
        },
      },

      // 入库管理
      stockIn: {
        title: '入库管理',
        subtitle: '管理投入品入库登记及入库确认',
        list: '入库单列表',
        detail: '入库单详情',
        add: '新增入库单',
        edit: '编辑入库单',
        delete: '删除入库单',
        confirm: '确认入库',
        deleteConfirm: '确定删除该入库单吗？',
        confirmConfirm: '确认入库后将更新库存，确定要确认入库吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',
        confirmSuccess: '入库确认成功',

        searchPlaceholder: '搜索入库单号、批次号',
        filterByWarehouse: '按仓库筛选',
        filterBySupplier: '按供应商筛选',
        filterByType: '按入库类型筛选',
        filterByStatus: '按状态筛选',
        allWarehouses: '全部仓库',
        allSuppliers: '全部供应商',
        allTypes: '全部类型',
        allStatus: '全部状态',

        // 入库类型
        type: {
          purchase: '采购入库',
          return: '退货入库',
        },

        // 状态
        status: {
          pending: '未入库',
          confirmed: '已入库',
          cancelled: '作废',
        },

        // 表单字段
        form: {
          stockInId: '入库单号',
          warehouseId: '入库仓库',
          batchNo: '批次号',
          supplierId: '供应商',
          type: '入库类型',
          operator: '操作员',
          expiredTime: '过期日期',
          totalQuantity: '总数量',
          remarks: '备注',
          status: '状态',
          createTime: '创建时间',
          items: '入库商品明细',
          inputId: '投入品',
          quantity: '入库数量',
          expiryDate: '过期日期',
          inputSku: 'SKU编码',
          itemRemarks: '明细备注',
        },

        placeholder: {
          warehouseId: '请选择入库仓库',
          supplierId: '请选择供应商',
          type: '请选择入库类型',
          operator: '请输入操作员',
          expiredTime: '请选择过期日期',
          remarks: '请输入备注',
          inputId: '请选择投入品',
          quantity: '请输入入库数量',
          expiryDate: '请选择商品过期日期',
          itemRemarks: '请输入明细备注',
        },

        rules: {
          warehouseIdRequired: '请选择入库仓库',
          supplierIdRequired: '请选择供应商',
          typeRequired: '请选择入库类型',
          operatorRequired: '请输入操作员',
          expiredTimeRequired: '请选择过期日期',
          expiryDateRequired: '请选择商品过期日期',
          inputIdRequired: '请选择投入品',
          quantityRequired: '请输入入库数量',
          quantityPositive: '入库数量必须大于0',
          itemsRequired: '请至少添加一条入库商品明细',
        },

        columns: {
          stockInId: '入库单号',
          warehouseName: '仓库',
          supplierName: '供应商',
          type: '入库类型',
          batchNo: '批次号',
          totalQuantity: '总数量',
          operator: '操作员',
          expiredTime: '过期日期',
          status: '状态',
          createTime: '创建时间',
          actions: '操作',
        },

        actions: {
          view: '查看',
          edit: '编辑',
          delete: '删除',
          confirm: '确认入库',
          addItem: '添加商品',
          removeItem: '移除',
        },

        messages: {
          noData: '暂无数据',
          noItems: '暂无商品明细',
        },
      },

      // 出库管理
      stockOut: {
        title: '出库管理',
        subtitle: '管理投入品出库登记及出库确认',
        list: '出库单列表',
        detail: '出库单详情',
        add: '新增出库单',
        edit: '编辑出库单',
        delete: '删除出库单',
        confirm: '确认出库',
        deleteConfirm: '确定删除该出库单吗？',
        confirmConfirm: '确认出库后将扣减库存，确定要确认出库吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',
        confirmSuccess: '出库确认成功',

        searchPlaceholder: '搜索出库单号、批次号、客户',
        filterByWarehouse: '按仓库筛选',
        filterByType: '按出库类型筛选',
        filterByStatus: '按状态筛选',
        allWarehouses: '全部仓库',
        allTypes: '全部类型',
        allStatus: '全部状态',

        // 出库类型
        type: {
          sale: '销售出库',
        },

        // 状态
        status: {
          pending: '未出库',
          confirmed: '已出库',
          cancelled: '作废',
        },

        // 表单字段
        form: {
          stockOutId: '出库单号',
          warehouseId: '出库仓库',
          batchNo: '批次号',
          customer: '客户',
          type: '出库类型',
          operator: '操作员',
          totalQuantity: '总数量',
          remark: '备注',
          status: '状态',
          createTime: '创建时间',
          items: '出库商品明细',
          inputId: '投入品',
          quantity: '出库数量',
          availableQuantity: '可用库存',
          itemRemarks: '明细备注',
        },

        placeholder: {
          warehouseId: '请选择出库仓库',
          customer: '请输入客户名称',
          type: '请选择出库类型',
          operator: '请输入操作员',
          remark: '请输入备注',
          inputId: '请选择投入品',
          batchNo: '请选择批次号',
          quantity: '请输入出库数量',
          itemRemarks: '请输入明细备注',
        },

        rules: {
          warehouseIdRequired: '请选择出库仓库',
          customerRequired: '请输入客户名称',
          typeRequired: '请选择出库类型',
          operatorRequired: '请输入操作员',
          inputIdRequired: '请选择投入品',
          batchNoRequired: '请选择批次号',
          quantityRequired: '请输入出库数量',
          quantityPositive: '出库数量必须大于0',
          quantityExceeds: '出库数量不能超过可用库存',
          itemsRequired: '请至少添加一条出库商品明细',
        },

        columns: {
          stockOutId: '出库单号',
          warehouseName: '仓库',
          customer: '客户',
          type: '出库类型',
          batchNo: '批次号',
          totalQuantity: '总数量',
          operator: '操作员',
          status: '状态',
          createTime: '创建时间',
          actions: '操作',
        },

        actions: {
          view: '查看',
          edit: '编辑',
          delete: '删除',
          confirm: '确认出库',
          addItem: '添加商品',
          removeItem: '移除',
        },

        messages: {
          noData: '暂无数据',
          noItems: '暂无商品明细',
          insufficientStock: '库存不足，无法出库',
          noStockInWarehouse: '该仓库暂无可用库存',
        },
      },

      // 库存查询
      stock: {
        title: '库存查询',
        subtitle: '实时查询库存信息、预警及汇总统计',
        list: '库存列表',
        detail: '库存详情',
        warning: '库存预警',
        summary: '汇总统计',

        searchPlaceholder: '搜索投入品名称、批次号',
        filterByWarehouse: '按仓库筛选',
        filterByInput: '按投入品筛选',
        filterByStatus: '按库存状态筛选',
        allWarehouses: '全部仓库',
        allInputs: '全部投入品',
        allStatus: '全部状态',

        // 库存状态
        status: {
          normal: '正常',
          nearExpiry: '临期',
          expired: '过期',
        },

        // 预警类型
        warningType: {
          all: '全部预警',
          nearExpiry: '临期预警',
          expired: '过期预警',
        },

        // 表单字段
        form: {
          inventoryId: '库存记录ID',
          inputId: '投入品',
          inputName: '投入品名称',
          batchNo: '批次号',
          warehouseId: '仓库',
          warehouseName: '仓库名称',
          currentQuantity: '当前库存数量',
          inDate: '入库日期',
          expiredDate: '过期日期',
          stockStatus: '库存状态',
          daysToExpire: '距过期天数',
        },

        columns: {
          inputName: '投入品名称',
          batchNo: '批次号',
          warehouseName: '仓库',
          currentQuantity: '当前数量',
          inDate: '入库日期',
          expiredDate: '过期日期',
          stockStatus: '库存状态',
          actions: '操作',
        },

        summaryColumns: {
          inputName: '投入品名称',
          warehouseName: '仓库名称',
          totalQuantity: '总库存',
          normalQuantity: '正常库存',
          nearExpiryQuantity: '临期库存',
          expiredQuantity: '过期库存',
        },

        actions: {
          view: '查看',
          viewWarning: '查看预警',
          viewSummary: '查看汇总',
          exportData: '导出数据',
        },

        messages: {
          noData: '暂无数据',
          noWarning: '暂无预警信息',
        },

        tabs: {
          list: '库存列表',
          warning: '库存预警',
          summaryByInput: '按投入品汇总',
          summaryByWarehouse: '按仓库汇总',
        },
      },
    },

    // 数据大屏
    dashboard: {
      title: '农业投入品供应管理大屏',
      subtitle: '实时数据监控与可视化分析',
      lastUpdate: '最后更新',
      autoRefresh: '自动刷新',
      fullscreen: '全屏',
      exitFullscreen: '退出全屏',

      // 总览卡片
      overview: {
        totalSuppliers: '供应商总数',
        certifiedSuppliers: '已认证供应商',
        pendingSuppliers: '待审核供应商',
        rejectedSuppliers: '未通过供应商',
        totalInputs: '投入品总数',
        seedInputs: '种子类',
        fertilizerInputs: '化肥类',
        pesticideInputs: '农药类',
        totalWarehouses: '仓库总数',
        totalCapacity: '总库存容量',
        usedCapacity: '已用容量',
        capacityUsageRate: '库存使用率',
        totalStockQuantity: '当前总库存',
        normalStock: '正常库存',
        nearExpiryStock: '临期库存',
        expiredStock: '过期库存',
        todayStockIn: '今日入库',
        todayStockOut: '今日出库',
        monthStockIn: '本月入库量',
        monthStockOut: '本月出库量',
        pendingWarnings: '待处理预警',
        unit: '个',
        tons: '吨',
      },

      // 供应商TOP榜单
      topSuppliers: {
        title: 'TOP供应商榜单',
        subtitle: '本月表现最佳供应商',
        rank: '排名',
        supplierName: '供应商名称',
        monthStockIn: '本月入库量',
        productCount: '供应投入品数',
        cooperationDays: '合作天数',
        qualityRating: '质量评级',
        contactPerson: '联系人',
        contactPhone: '联系电话',
        viewMore: '查看更多',
        days: '天',
        items: '件',
      },

      // 仓库统计
      warehouse: {
        title: '仓库统计',
        subtitle: '仓库容量使用情况',
        warehouseName: '仓库名称',
        location: '位置',
        capacity: '容量',
        currentStock: '当前库存',
        usageRate: '使用率',
        productTypes: '商品种类',
        monthIn: '本月入库',
        monthOut: '本月出库',
        warning: '容量预警',
        normal: '正常',
        types: '种',
        times: '次',
      },

      // 入库出库趋势
      stockTrend: {
        title: '入库出库趋势',
        subtitle: '近期库存变化分析',
        stockIn: '入库数量',
        stockOut: '出库数量',
        netChange: '净增库存',
        last7Days: '近7天',
        last30Days: '近30天',
        date: '日期',
        quantity: '数量',
        count: '单数',
      },

      // 投入品类型分布
      inputDistribution: {
        title: '投入品类型分布',
        subtitle: '各类型投入品占比',
        seed: '种子',
        fertilizer: '化肥',
        pesticide: '农药',
        other: '其他',
        count: '数量',
        stockQuantity: '库存量',
        percentage: '占比',
      },

      // 预警信息
      warnings: {
        title: '预警信息',
        subtitle: '待处理预警列表',
        warningType: '预警类型',
        warningLevel: '级别',
        objectName: '对象',
        content: '内容',
        warningTime: '预警时间',
        warehouseName: '仓库',
        batchNo: '批次号',
        status: '状态',
        noWarnings: '暂无预警信息',

        types: {
          nearExpiry: '临期预警',
          expired: '过期预警',
          lowStock: '库存不足',
          overCapacity: '超容量',
        },

        levels: {
          low: '低',
          medium: '中',
          high: '高',
        },

        statusOptions: {
          pending: '未处理',
          processed: '已处理',
          ignored: '已忽略',
        },
      },

      // 实时动态
      activities: {
        title: '实时动态',
        subtitle: '最新业务活动',
        stockInActivity: '入库',
        stockOutActivity: '出库',
        supplierActivity: '供应商认证',
        warehouseActivity: '仓库',
        justNow: '刚刚',
        minutesAgo: '分钟前',
        hoursAgo: '小时前',
      },

      // 今日出入库
      todayStock: {
        title: '今日出入库',
        in: '入库',
        out: '出库',
        warehouse: '仓库',
        operator: '经办人',
        supplier: '供应商',
        customer: '客户',
        quantity: '数量',
        time: '时间',
        status: '状态',
        noData: '暂无数据',
        statusPending: '待处理',
        statusConfirmed: '已确认',
        statusCancelled: '已作废',
      },

      // 即将过期
      expiring: {
        title: '即将过期',
        daysLeft: '剩余',
        days: '天',
        urgent: '紧急',
        warehouse: '仓库',
        quantity: '库存',
        batchNo: '批次',
        noData: '暂无即将过期商品',
        expired: '已过期',
      },

      // 库存状态分布
      stockStatus: {
        title: '库存状态分布',
        normal: '正常',
        nearExpiry: '临期',
        expired: '过期',
        lowStock: '库存不足',
        productCount: '商品种类',
        totalQuantity: '库存总量',
        percentage: '占比',
      },

      // 刷新和系统状态
      autoRefreshOn: '自动刷新',
      autoRefreshOff: '已暂停',
      refreshInterval: '刷新间隔',
      systemStatus: '系统正常',
    },
  },

  // OAuth2回调页面
  callback: {
    processing: '正在处理登录...',
    pleaseWait: '请稍候，正在验证您的身份',
    noCode: '未获取到授权码，请重新登录',
    loginSuccess: '登录成功',
    loginFailed: '登录失败，请重试',
    loginError: '登录过程中发生错误',
  },

  // 农田管理系统
  farm: {
    // 系统通用
    systemName: '农田管理系统',
    systemDesc: '农民认证、土地信息管理及农田数据服务',
    backToHome: '返回首页',

    // 菜单导航
    menu: {
      dashboard: '数据概览',
      farmerManagement: '农民管理',
      farmerAuth: '农民认证申请',
      farmerAuthApproval: '农民认证审批',
      farmerInfo: '农民信息维护',
      landManagement: '土地信息管理',
      landList: '土地信息管理',
    },

    // 农民认证申请
    farmerAuth: {
      title: '农民认证申请',
      subtitle: '提交农民身份认证所需的详细资料',
      applySuccess: '申请提交成功',
      form: {
        realName: '真实姓名',
        idCard: '身份证号',
        phone: '手机号码',
        adCode: '行政区划',
        farmType: '种植类型',
        certDoc: '土地承包经营权证/其他证明文件',
        detailAddress: '详细住址',
        remark: '备注',
      },
      placeholder: {
        realName: '请输入真实姓名',
        idCard: '请输入身份证号',
        phone: '请输入手机号码',
        adCode: '请选择行政区划',
        farmType: '请输入种植类型',
        detailAddress: '请输入详细住址',
        remark: '备注信息（选填）',
      },
      rules: {
        realNameRequired: '请输入真实姓名',
        idCardRequired: '请输入身份证号',
        idCardFormat: '请输入正确的身份证号',
        phoneRequired: '请输入手机号码',
        phoneFormat: '请输入正确的手机号码',
        adCodeRequired: '请选择行政区划',
        farmTypeRequired: '请输入种植类型',
        certDocRequired: '请上传证明文件',
        detailAddressRequired: '请输入详细住址',
      },
      uploadTip: '支持 jpg/png/pdf，最多上传5个文件',
      status: {
        pending: '审核中',
        approved: '已通过',
        rejected: '已驳回',
      },
    },

    // 农民认证审批
    farmerApproval: {
      title: '农民认证审批',
      subtitle: '审核农民身份认证申请',
      pendingList: '待审批列表',
      approveSuccess: '审批通过',
      rejectSuccess: '已驳回',
      detail: '申请详情',
      applicantInfo: '申请人信息',
      approve: '通过',
      reject: '驳回',
      approveConfirm: '确认通过该申请吗？',
      rejectConfirm: '确认驳回该申请吗？',
      rejectReason: '驳回原因',
      rejectReasonRequired: '请输入驳回原因',
      rejectReasonPlaceholder: '请说明驳回原因',
      applyTime: '申请时间',
      approveTime: '审批时间',
      approver: '审批人',
      columns: {
        realName: '姓名',
        idCard: '身份证号',
        phone: '手机号',
        farmType: '种植类型',
        applyTime: '申请时间',
        status: '状态',
        actions: '操作',
      },
    },

    // 土地信息管理
    land: {
      title: '土地信息管理',
      subtitle: '管理地块信息、权属信息和当前状态',
      list: '土地列表',
      add: '新增土地',
      edit: '编辑土地',
      detail: '土地详情',
      delete: '删除土地',
      deleteConfirm: '确定删除该地块吗？',
      deleteSuccess: '删除成功',
      addSuccess: '新增成功',
      editSuccess: '编辑成功',
      searchPlaceholder: '搜索地块名称、行政区划',

      form: {
        landName: '地块名称',
        ownerType: '土地权属',
        adCode: '行政区划',
        detailAddress: '详细地址',
        areaSize: '地块面积',
        areaSizeUnit: '亩',
        landType: '地块类型',
        currentStatus: '当前状态',
        latitude: '纬度',
        longitude: '经度',
        farmerUser: '关联农民',
        remark: '备注',
        createTime: '创建时间',
      },

      placeholder: {
        landName: '请输入地块名称',
        ownerType: '请选择土地权属',
        adCode: '请选择行政区划',
        detailAddress: '请输入详细地址',
        areaSize: '请输入地块面积',
        landType: '请选择地块类型',
        currentStatus: '请选择当前状态',
        latitude: '请输入纬度',
        longitude: '请输入经度',
        farmerUser: '请选择关联农民',
        remark: '备注信息（选填）',
      },

      rules: {
        landNameRequired: '请输入地块名称',
        ownerTypeRequired: '请选择土地权属',
        adCodeRequired: '请选择行政区划',
        detailAddressRequired: '请输入详细地址',
        areaSizeRequired: '请输入地块面积',
        areaSizeFormat: '请输入正确的面积数值',
        landTypeRequired: '请选择地块类型',
        currentStatusRequired: '请选择当前状态',
        farmerUserRequired: '请选择关联农民',
      },

      ownerTypes: {
        collective: '集体所有',
        contract: '承包经营权',
        lease: '租赁',
        other: '其他',
      },

      landTypes: {
        paddyField: '水田',
        dryField: '旱地',
        orchard: '果园',
        vegetableField: '菜地',
        other: '其他',
      },

      statusOptions: {
        cultivating: '耕种中',
        idle: '闲置',
        fallow: '休耕',
        other: '其他',
      },

      columns: {
        landName: '地块名称',
        ownerType: '土地权属',
        adCode: '行政区划',
        areaSize: '面积',
        landType: '地块类型',
        currentStatus: '当前状态',
        farmerUser: '关联农民',
        createTime: '创建时间',
        actions: '操作',
      },
    },
  },
}
