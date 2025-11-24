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
      storage: '存储管理',
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
  },
}
