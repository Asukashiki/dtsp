export default {
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
        submitFailed: '审核提交失败',
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
    },

    // 育种管理
    breeding: {
      // 育种计划管理
      plan: {
        title: '育种计划管理',
        subtitle: '设置育种计划,包括育种年度、育种批次、种植基地等信息',
        list: '育种计划列表',
        add: '新增育种计划',
        edit: '编辑育种计划',
        detail: '育种计划详情',
        delete: '删除计划',
        deleteConfirm: '确定删除该育种计划吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索计划名称、批次ID',
        filterByYear: '按育种年度筛选',
        filterByCrop: '按作物类型筛选',
        filterByStatus: '按计划状态筛选',
        allYears: '全部年度',
        allCrops: '全部作物',
        allStatus: '全部状态',

        // 计划状态
        status: {
          planning: '计划中',
          ongoing: '进行中',
          completed: '已完成',
          cancelled: '已取消',
        },

        // 繁殖级别
        propagationLevel: {
          breeder: '育种家种子',
          preBasic: '原原种',
          basic: '原种',
          certified: '良种',
        },

        // 表单字段
        form: {
          basicInfo: '计划基本信息',
          planName: '计划名称',
          breedingYear: '育种年度',
          batchId: '育种批次ID',
          plantingBase: '种植基地',
          cropType: '作物类型',
          varietyName: '品种名称',
          propagationLevel: '繁殖级别',
          parentSeedSource: '亲本种子来源',
          personInCharge: '负责人',
          startDate: '计划起始时间',
          endDate: '计划结束时间',
          breedingGoal: '育种目标',
          remarks: '备注',
          createTime: '创建时间',
          updateTime: '更新时间',
        },

        // 表单占位符
        placeholder: {
          planName: '请输入计划名称',
          breedingYear: '请选择育种年度',
          batchId: '请输入育种批次ID',
          plantingBase: '请输入种植基地',
          cropType: '请选择作物类型',
          varietyName: '请输入品种名称',
          propagationLevel: '请选择繁殖级别',
          parentSeedSource: '请输入亲本种子来源',
          personInCharge: '请输入负责人',
          startDate: '请选择计划起始时间',
          endDate: '请选择计划结束时间',
          breedingGoal: '请输入育种目标',
          remarks: '备注信息（选填）',
        },

        // 表单验证
        rules: {
          planNameRequired: '请输入计划名称',
          breedingYearRequired: '请选择育种年度',
          batchIdRequired: '请输入育种批次ID',
          plantingBaseRequired: '请输入种植基地',
          cropTypeRequired: '请选择作物类型',
          varietyNameRequired: '请输入品种名称',
          propagationLevelRequired: '请选择繁殖级别',
          parentSeedSourceRequired: '请输入亲本种子来源',
          personInChargeRequired: '请输入负责人',
          startDateRequired: '请选择计划起始时间',
          endDateRequired: '请选择计划结束时间',
          breedingGoalRequired: '请输入育种目标',
          endDateAfterStart: '结束时间必须晚于开始时间',
        },

        // 列表列
        columns: {
          planName: '计划名称',
          batchId: '批次ID',
          breedingYear: '育种年度',
          cropType: '作物类型',
          varietyName: '品种名称',
          propagationLevel: '繁殖级别',
          personInCharge: '负责人',
          startDate: '开始时间',
          endDate: '结束时间',
          status: '计划状态',
          createTime: '创建时间',
          actions: '操作',
        },

        // 操作按钮
        actions: {
          submit: '提交',
          saveDraft: '保存草稿',
          view: '查看',
          edit: '编辑',
          delete: '删除',
        },
      },

      // 育种材料登记
      material: {
        title: '育种材料登记',
        subtitle: '记录育种过程中的育种资源,确保材料可查、可用',
        list: '育种材料登记列表',
        add: '新增材料登记',
        edit: '编辑材料登记',
        detail: '材料登记详情',
        delete: '删除登记',
        deleteConfirm: '确定删除该材料登记吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索登记编码、批次ID',
        filterByBatch: '按育种批次筛选',
        filterBySeedType: '按种子类别筛选',
        allBatches: '全部批次',
        allSeedTypes: '全部类别',

        // 表单字段
        form: {
          basicInfo: '基础关联信息',
          materialInfo: '材料信息',
          registrationCode: '登记编码',
          batchId: '育种批次ID',
          warehouseInId: '入库ID',
          seedType: '种子类别',
          quantity: '数量（千克）',
          sourceEntity: '来源实体',
          receiveDate: '接收日期',
          labTestReport: '实验室检测报告',
          operator: '操作人',
          operationOrg: '操作机构',
          operationTime: '操作时间',
        },

        // 表单占位符
        placeholder: {
          registrationCode: '系统自动生成',
          batchId: '请选择育种批次ID',
          warehouseInId: '请输入入库ID',
          seedType: '请输入种子类别',
          quantity: '请输入数量',
          sourceEntity: '请输入来源实体',
          receiveDate: '请选择接收日期',
        },

        // 表单验证
        rules: {
          batchIdRequired: '请选择育种批次ID',
          warehouseInIdRequired: '请输入入库ID',
          seedTypeRequired: '请输入种子类别',
          quantityRequired: '请输入数量',
          quantityFormat: '请输入正确的数量',
          sourceEntityRequired: '请输入来源实体',
          receiveDateRequired: '请选择接收日期',
        },

        // 列表列
        columns: {
          registrationCode: '登记编码',
          batchId: '批次ID',
          warehouseInId: '入库ID',
          seedType: '种子类别',
          quantity: '数量(kg)',
          sourceEntity: '来源实体',
          receiveDate: '接收日期',
          operationTime: '操作时间',
          actions: '操作',
        },

        // 操作按钮
        actions: {
          submit: '提交',
          view: '查看',
          edit: '编辑',
          delete: '删除',
        },

        // 提示信息
        messages: {
          uploadTip: '支持 PDF、JPG 格式，单个文件不超过2MB',
        },
      },

      // 育种跟踪管理
      tracking: {
        title: '育种跟踪管理',
        subtitle: '对育种繁殖跟踪阶段进行记录,确保育种过程规范可控',
        list: '育种跟踪记录列表',
        add: '新增跟踪记录',
        edit: '编辑跟踪记录',
        detail: '跟踪记录详情',
        delete: '删除记录',
        deleteConfirm: '确定删除该跟踪记录吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索跟踪ID、批次ID',
        filterByBatch: '按育种批次筛选',
        filterByStage: '按阶段名称筛选',
        allBatches: '全部批次',
        allStages: '全部阶段',

        // 阶段名称
        stageName: {
          parentLinePreparation: '亲本系准备',
          breederSeed: '育种家种子',
          preBasicSeedPropagation: '原原种繁殖',
          basicSeedPropagation: '原种繁殖',
        },

        // 表单字段
        form: {
          basicInfo: '基础信息',
          trackingInfo: '跟踪信息',
          yieldInfo: '产量信息',
          qualityInfo: '质量信息',
          trackingId: '跟踪ID',
          batchId: '育种批次ID',
          stageName: '阶段名称',
          location: '位置',
          coordinates: '坐标（经纬度）',
          expectedYield: '预期产量',
          actualYield: '实际产量',
          fieldInspectionScore: '田间检查评分',
          diseaseObservation: '病害观察',
          stageCompletionDate: '阶段完成日期',
          recorder: '记录人',
          recordTime: '记录时间',
          updateTime: '更新时间',
        },

        // 表单占位符
        placeholder: {
          trackingId: '系统自动生成',
          batchId: '请选择育种批次ID',
          stageName: '请选择阶段名称',
          location: '请输入位置',
          coordinates: '格式：纬度,经度',
          expectedYield: '请输入预期产量',
          actualYield: '请输入实际产量',
          fieldInspectionScore: '0-5分制',
          diseaseObservation: '请输入病害观察',
          stageCompletionDate: '请选择阶段完成日期',
        },

        // 表单验证
        rules: {
          batchIdRequired: '请选择育种批次ID',
          stageNameRequired: '请选择阶段名称',
          locationRequired: '请输入位置',
          expectedYieldRequired: '请输入预期产量',
          expectedYieldFormat: '请输入正确的产量',
          actualYieldFormat: '请输入正确的产量',
          fieldInspectionScoreFormat: '评分范围为0-5',
        },

        // 列表列
        columns: {
          trackingId: '跟踪ID',
          batchId: '批次ID',
          stageName: '阶段名称',
          location: '位置',
          expectedYield: '预期产量',
          actualYield: '实际产量',
          fieldInspectionScore: '田间评分',
          stageCompletionDate: '完成日期',
          recordTime: '记录时间',
          actions: '操作',
        },

        // 操作按钮
        actions: {
          submit: '提交',
          view: '查看',
          edit: '编辑',
          delete: '删除',
        },
      },
    },

    // 种子信息服务
    seedService: {
      // 种子推广信息管理
      promotion: {
        title: '种子推广信息管理',
        subtitle: '管理种子推广内容,向农户、合作社提供本地化研究成果和农业建议',
        list: '推广内容列表',
        add: '新增推广内容',
        edit: '编辑推广内容',
        detail: '推广内容详情',
        delete: '删除推广内容',
        deleteConfirm: '确定删除该推广内容吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索标题、推荐品种',
        filterByStatus: '按发布状态筛选',
        allStatus: '全部状态',

        // 发布状态
        status: {
          draft: '草稿',
          published: '已发布',
          expired: '已过期',
        },

        // 表单字段
        form: {
          basicInfo: '基础信息',
          promotionId: '推广内容ID',
          title: '推广标题',
          video: '宣传视频',
          promotionSummary: '推广摘要',
          recommendedVarieties: '推荐品种',
          publishTime: '发布时间',
          validPeriod: '有效期（天）',
          shareLink: '分享链接',
          visitCount: '访问次数',
          createTime: '创建时间',
          updateTime: '更新时间',
        },

        // 表单占位符
        placeholder: {
          title: '请输入推广标题（2-100个字符）',
          promotionSummary: '请输入推广摘要（200-1000个字符）',
          recommendedVarieties: '请输入推荐品种,多个品种用逗号分隔',
          validPeriod: '请输入有效期',
        },

        // 表单验证
        rules: {
          titleRequired: '请输入推广标题',
          titleLength: '推广标题应为2-100个字符',
          videoRequired: '请上传宣传视频',
          promotionSummaryLength: '推广摘要应为200-1000个字符',
          recommendedVarietiesRequired: '请输入推荐品种',
          validPeriodRequired: '请输入有效期',
          validPeriodFormat: '有效期必须为正整数',
        },

        // 列表列
        columns: {
          promotionId: '内容ID',
          title: '推广标题',
          recommendedVarieties: '推荐品种',
          publishTime: '发布时间',
          validPeriod: '有效期',
          visitCount: '访问次数',
          status: '发布状态',
          actions: '操作',
        },

        // 操作按钮
        actions: {
          submit: '发布',
          saveDraft: '保存草稿',
          view: '查看',
          edit: '编辑',
          delete: '删除',
          share: '生成分享链接',
          copyLink: '复制链接',
          preview: '预览视频',
        },

        // 提示信息
        messages: {
          uploadTip: '支持 MP4 格式，单个文件不超过50MB',
          shareSuccess: '分享链接已生成',
          copySuccess: '链接已复制到剪贴板',
          publishConfirm: '确定发布该推广内容吗？',
          expiryWarning: '该推广内容即将过期',
          expired: '该推广内容已过期',
        },
      },
    },

    // 种子推广信息管理
    seedPromotion: {
      title: '种子推广信息管理',
      subtitle: '管理种子品种推广内容、上传宣传视频、生成分享链接',

      // 按钮和操作
      uploadContent: '上传推广内容',
      generateLink: '生成分享链接',
      copyLink: '复制链接',
      shareLink: '分享链接',
      linkCopied: '链接已复制到剪贴板',

      // 搜索和筛选
      searchPlaceholder: '搜索推广标题',
      filterByStatus: '按状态筛选',
      allStatus: '全部状态',

      // 状态
      status: {
        active: '公示中',
        expired: '已过期',
      },

      // 列表列
      columns: {
        promotionId: '推广ID',
        title: '推广标题',
        recommendedVarieties: '推荐品种',
        publishTime: '发布时间',
        validPeriod: '有效期（天）',
        visitCount: '访问次数',
        shareLink: '分享链接',
        actions: '操作',
      },

      // 表单字段
      form: {
        enterpriseId: '企业ID',
        title: '推广标题',
        videoFile: '宣传视频',
        promotionSummary: '推广摘要',
        recommendedVarieties: '推荐品种',
        validPeriod: '有效期（天）',
        selectVideo: '选择视频文件',
        videoTips: '仅支持MP4格式，文件大小不超过100MB',
        varietiesTips: '多个品种用英文逗号分隔',
      },

      // 表单占位符
      placeholder: {
        title: '请输入推广标题',
        promotionSummary: '请输入推广摘要（选填）',
        recommendedVarieties: '请输入推荐品种，多个品种用英文逗号分隔',
        validPeriod: '请输入有效期天数',
      },

      // 表单验证
      rules: {
        titleRequired: '请输入推广标题',
        videoRequired: '请上传宣传视频',
        varietiesRequired: '请输入推荐品种',
        validPeriodRequired: '请输入有效期',
        validPeriodFormat: '有效期必须为正整数',
      },

      // 消息提示
      messages: {
        uploadSuccess: '推广内容上传成功',
        uploadFailed: '推广内容上传失败',
        deleteConfirm: '确认删除该推广内容吗？',
        deleteSuccess: '删除成功',
        deleteFailed: '删除失败',
        loadFailed: '加载推广内容失败',
        videoSizeExceeded: '视频文件大小不能超过100MB',
        videoFormatError: '只能上传MP4格式的视频文件',
      },

      // 详情页
      detail: {
        basicInfo: '基础信息',
        videoPreview: '视频预览',
        statistics: '统计信息',
      },

      // 卡片展示（移动端）
      card: {
        validUntil: '有效期至',
        views: '访问',
        times: '次',
      },
    },

    // 数据采集
    dataCollection: {
      // 试验基础数据采集
      trialBase: {
        title: '试验基础数据采集',
        subtitle: '采集育种试验基础信息,确保育种数据标准化',
        list: '试验基础数据列表',
        add: '新增试验数据',
        edit: '编辑试验数据',
        detail: '试验数据详情',
        delete: '删除试验数据',
        deleteConfirm: '确定删除该试验数据吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索试验ID、作物类型、品种名称',
        filterByCrop: '按作物类型筛选',
        filterByDate: '按开始日期筛选',
        allCrops: '全部作物',

        // 表单字段
        form: {
          basicInfo: '试验基础信息',
          locationInfo: '位置信息',
          trialId: '试验ID',
          cropType: '作物类型',
          varietyName: '品种名称',
          researchCenterId: '研究中心ID',
          programId: '程序ID',
          subProgramId: '子程序ID',
          thematicResearchAreaId: '主题研究领域ID',
          region: '地区',
          zone: '区域',
          woreda: '县',
          kebele: '乡',
          agroEcologicalZone: '农业生态区',
          gpsLocation: 'GPS位置',
          startDate: '开始日期',
          activityCode: '活动代码',
          kpiCode: 'KPI代码',
          season: '季节',
          createTime: '创建时间',
          createBy: '创建人',
        },

        // 表单占位符
        placeholder: {
          trialId: '系统自动生成',
          cropType: '请选择作物类型',
          varietyName: '请输入品种名称',
          researchCenterId: '请输入研究中心ID',
          programId: '请输入程序ID',
          subProgramId: '请输入子程序ID',
          thematicResearchAreaId: '请输入主题研究领域ID',
          region: '请选择地区',
          zone: '请选择区域',
          woreda: '请选择县',
          kebele: '请选择乡',
          agroEcologicalZone: '请输入农业生态区(选填)',
          gpsLocation: '格式：经度,纬度',
          startDate: '请选择开始日期',
          activityCode: '请输入活动代码(选填)',
          kpiCode: '请输入KPI代码(选填)',
          season: '请选择季节',
        },

        // 表单验证
        rules: {
          cropTypeRequired: '请选择作物类型',
          varietyNameRequired: '请输入品种名称',
          researchCenterIdRequired: '请输入研究中心ID',
          programIdRequired: '请输入程序ID',
          subProgramIdRequired: '请输入子程序ID',
          thematicResearchAreaIdRequired: '请输入主题研究领域ID',
          regionRequired: '请选择地区',
          zoneRequired: '请选择区域',
          woredaRequired: '请选择县',
          kebeleRequired: '请选择乡',
          gpsLocationRequired: '请输入GPS位置',
          gpsLocationFormat: '请输入正确的GPS位置格式',
          startDateRequired: '请选择开始日期',
          seasonRequired: '请选择季节',
        },

        // 列表列
        columns: {
          trialId: '试验ID',
          cropType: '作物类型',
          varietyName: '品种名称',
          region: '地区',
          zone: '区域',
          startDate: '开始日期',
          season: '季节',
          createTime: '创建时间',
          actions: '操作',
        },
      },

      // 农民与地块属性数据采集
      farmerPlot: {
        title: '农民与地块属性数据采集',
        subtitle: '采集农民及地块信息,确保试验信息完整准确',
        list: '农民地块数据列表',
        add: '新增农民地块数据',
        edit: '编辑农民地块数据',
        detail: '农民地块数据详情',
        delete: '删除数据',
        deleteConfirm: '确定删除该数据吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索农民姓名、联系电话',
        filterByGender: '按性别筛选',
        allGender: '全部性别',

        // 性别选项
        gender: {
          male: '男',
          female: '女',
        },

        // 青年类别
        youthCategory: {
          youth: '青年',
          adult: '成年',
          elderly: '老年',
        },

        // 表单字段
        form: {
          farmerInfo: '农民基本信息',
          plotInfo: '地块信息',
          operatorInfo: '操作信息',
          dataId: '数据ID',
          farmerName: '农民姓名',
          gender: '性别',
          youthCategory: '青年类别',
          cooperativeMembership: '合作社成员资格',
          plotSizeM2: '地块面积(平方米)',
          householdId: '家庭ID',
          contactPhone: '联系电话',
          createTime: '创建时间',
          createBy: '创建人',
        },

        // 表单占位符
        placeholder: {
          farmerName: '请输入农民姓名',
          gender: '请选择性别',
          youthCategory: '请选择青年类别',
          cooperativeMembership: '请输入合作社成员资格',
          plotSizeM2: '请输入地块面积',
          householdId: '请输入家庭ID(选填)',
          contactPhone: '请输入联系电话',
        },

        // 表单验证
        rules: {
          farmerNameRequired: '请输入农民姓名',
          farmerNameLength: '农民姓名长度应在2-100个字符之间',
          genderRequired: '请选择性别',
          youthCategoryRequired: '请选择青年类别',
          cooperativeMembershipRequired: '请输入合作社成员资格',
          plotSizeM2Required: '请输入地块面积',
          plotSizeM2Min: '地块面积必须大于0',
          plotSizeM2Format: '请输入正确的面积数值',
          contactPhoneRequired: '请输入联系电话',
          contactPhoneFormat: '请输入正确的手机号码',
        },

        // 列表列
        columns: {
          farmerName: '农民姓名',
          gender: '性别',
          youthCategory: '青年类别',
          plotSizeM2: '地块面积(m²)',
          contactPhone: '联系电话',
          createTime: '创建时间',
          createBy: '创建人',
          actions: '操作',
        },
      },

      // 农事记录数据采集
      farmingRecord: {
        title: '农事记录数据采集',
        subtitle: '记录灌溉、施肥、除草等农事管理措施',
        list: '农事记录列表',
        add: '新增农事记录',
        edit: '编辑农事记录',
        detail: '农事记录详情',
        delete: '删除记录',
        deleteConfirm: '确定删除该记录吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索管理措施',
        filterByPractice: '按管理措施筛选',
        allPractices: '全部措施',

        // 管理措施选项
        managementPractice: {
          irrigation: '灌溉',
          fertilization: '施肥',
          weeding: '除草',
          pestControl: '病虫害防治',
          other: '其他',
        },

        // 表单字段
        form: {
          basicInfo: '基础信息',
          managementInfo: '管理信息',
          dataId: '数据ID',
          managementPractice: '管理措施',
          fertilizerType: '肥料类型',
          fertilizerRateKg: '肥料施用量(公斤)',
          ureaRateKg: '尿素施用量(公斤)',
          pesticideType: '农药类型',
          irrigationType: '灌溉类型',
          irrigationFrequency: '灌溉频率',
          weedingDate: '除草日期',
          herbicideUsed: '除草剂使用',
          seedSource: '种子来源',
          createTime: '创建时间',
          createBy: '创建人',
        },

        // 表单占位符
        placeholder: {
          managementPractice: '请选择管理措施',
          fertilizerType: '请输入肥料类型(选填)',
          fertilizerRateKg: '请输入肥料施用量(选填)',
          ureaRateKg: '请输入尿素施用量(选填)',
          pesticideType: '请输入农药类型(选填)',
          irrigationType: '请输入灌溉类型(选填)',
          irrigationFrequency: '请输入灌溉频率(选填)',
          weedingDate: '请选择除草日期(选填)',
          herbicideUsed: '请输入除草剂使用情况(选填)',
          seedSource: '请输入种子来源(选填)',
        },

        // 表单验证
        rules: {
          managementPracticeRequired: '请选择管理措施',
          fertilizerRateKgFormat: '请输入正确的施用量',
          ureaRateKgFormat: '请输入正确的施用量',
          irrigationFrequencyFormat: '请输入正确的频率',
        },

        // 列表列
        columns: {
          managementPractice: '管理措施',
          fertilizerType: '肥料类型',
          irrigationType: '灌溉类型',
          weedingDate: '除草日期',
          createTime: '创建时间',
          actions: '操作',
        },
      },

      // 农艺性状数据采集
      agronomicTrait: {
        title: '农艺性状数据采集',
        subtitle: '记录植物高度、花期、产量等农艺性状信息',
        list: '农艺性状数据列表',
        add: '新增农艺性状数据',
        edit: '编辑农艺性状数据',
        detail: '农艺性状数据详情',
        delete: '删除数据',
        deleteConfirm: '确定删除该数据吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索数据ID',

        // 表单字段
        form: {
          growthInfo: '生长信息',
          phenologyInfo: '物候期信息',
          yieldInfo: '产量信息',
          healthInfo: '健康状况',
          dataId: '数据ID',
          plantHeightCm: '植物高度(CM)',
          tillerCount: '分蘖数',
          spikeLengthCm: '穗长(CM)',
          daysToEmergence: '天数至出苗期',
          daysToTillering: '天数至分蘖期',
          daysToHeading: '天数至抽穗期',
          daysToFlowering: '天数至开花期',
          daysToGrainFilling: '天数至灌浆期',
          daysToMaturity: '天数至成熟期',
          lodgingScore: '倒伏评分',
          biomassWeightKg: '生物量重量(KG)',
          spikeDensity: '穗密度',
          grainWeightPerSpike: '每穗粒重',
          diseaseScore: '疾病评分',
          stressIndicators: '压力指标',
          pestObservation: '害虫观察',
          photoEvidence: '照片证据',
          createTime: '创建时间',
        },

        // 表单占位符
        placeholder: {
          plantHeightCm: '请输入植物高度',
          tillerCount: '请输入分蘖数',
          spikeLengthCm: '请输入穗长',
          daysToEmergence: '请输入天数',
          daysToTillering: '请输入天数',
          daysToHeading: '请输入天数',
          daysToFlowering: '请输入天数',
          daysToGrainFilling: '请输入天数',
          daysToMaturity: '请输入天数',
          lodgingScore: '请输入倒伏评分',
          biomassWeightKg: '请输入生物量重量',
          spikeDensity: '请输入穗密度',
          grainWeightPerSpike: '请输入每穗粒重',
          diseaseScore: '请输入疾病评分(JSON格式)',
          stressIndicators: '请输入压力指标(JSON格式)',
          pestObservation: '请输入害虫观察',
        },

        // 表单验证
        rules: {
          plantHeightCmRequired: '请输入植物高度',
          tillerCountRequired: '请输入分蘖数',
          spikeLengthCmRequired: '请输入穗长',
          daysToEmergenceRequired: '请输入天数至出苗期',
          daysToTilleringRequired: '请输入天数至分蘖期',
          daysToHeadingRequired: '请输入天数至抽穗期',
          daysToFloweringRequired: '请输入天数至开花期',
          daysToGrainFillingRequired: '请输入天数至灌浆期',
          daysToMaturityRequired: '请输入天数至成熟期',
          lodgingScoreRequired: '请输入倒伏评分',
          biomassWeightKgRequired: '请输入生物量重量',
          spikeDensityRequired: '请输入穗密度',
          grainWeightPerSpikeRequired: '请输入每穗粒重',
          diseaseScoreRequired: '请输入疾病评分',
          stressIndicatorsRequired: '请输入压力指标',
          pestObservationRequired: '请输入害虫观察',
        },

        // 列表列
        columns: {
          plantHeightCm: '植物高度(CM)',
          tillerCount: '分蘖数',
          daysToMaturity: '成熟天数',
          lodgingScore: '倒伏评分',
          biomassWeightKg: '生物量(KG)',
          createTime: '创建时间',
          actions: '操作',
        },
      },

      // 环境与土壤属性数据采集
      environmentSoil: {
        title: '环境与土壤属性数据采集',
        subtitle: '采集土壤属性和环境监测数据',
        list: '环境土壤数据列表',
        add: '新增环境土壤数据',
        edit: '编辑环境土壤数据',
        detail: '环境土壤数据详情',
        delete: '删除数据',
        deleteConfirm: '确定删除该数据吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索地貌、水源',
        filterByTopography: '按地貌筛选',
        allTopography: '全部地貌',

        // 表单字段
        form: {
          soilInfo: '土壤属性信息',
          environmentInfo: '环境监测信息',
          dataId: '数据ID',
          soilPh: '土壤pH值',
          soilEc: '土壤电导率',
          soilNitrogenPercent: '土壤氮含量(百分比)',
          soilPhosphorusPpm: '土壤磷含量(PPM)',
          soilPotassiumPpm: '土壤钾含量(PPM)',
          previousCrop: '前茬作物',
          waterSource: '水源',
          topography: '地貌',
          slopePercent: '坡度(百分比)',
          soilMoisturePercent: '土壤湿度(百分比)',
          soilTemperatureC: '土壤温度(摄氏度)',
          rainfallMm: '降雨量(MM)',
          airTemperatureC: '空气温度(摄氏度)',
          humidityPercent: '湿度(百分比)',
          windSpeedMs: '风速(M/S)',
          solarRadiationWm2: '太阳辐射(W/m²)',
          timestamp: '时间戳',
          createTime: '创建时间',
        },

        // 表单占位符
        placeholder: {
          soilPh: '请输入土壤pH值',
          soilEc: '请输入土壤电导率',
          soilNitrogenPercent: '请输入土壤氮含量',
          soilPhosphorusPpm: '请输入土壤磷含量',
          soilPotassiumPpm: '请输入土壤钾含量',
          previousCrop: '请输入前茬作物(选填)',
          waterSource: '请输入水源',
          topography: '请输入地貌',
          slopePercent: '请输入坡度(选填)',
          soilMoisturePercent: '请输入土壤湿度',
          soilTemperatureC: '请输入土壤温度',
          rainfallMm: '请输入降雨量(选填)',
          airTemperatureC: '请输入空气温度(选填)',
          humidityPercent: '请输入湿度',
          windSpeedMs: '请输入风速',
          solarRadiationWm2: '请输入太阳辐射',
          timestamp: '请选择时间戳',
        },

        // 表单验证
        rules: {
          soilPhRequired: '请输入土壤pH值',
          soilEcRequired: '请输入土壤电导率',
          soilNitrogenPercentRequired: '请输入土壤氮含量',
          soilPhosphorusPpmRequired: '请输入土壤磷含量',
          soilPotassiumPpmRequired: '请输入土壤钾含量',
          waterSourceRequired: '请输入水源',
          topographyRequired: '请输入地貌',
          soilMoisturePercentRequired: '请输入土壤湿度',
          soilTemperatureCRequired: '请输入土壤温度',
          humidityPercentRequired: '请输入湿度',
          windSpeedMsRequired: '请输入风速',
          solarRadiationWm2Required: '请输入太阳辐射',
        },

        // 列表列
        columns: {
          soilPh: '土壤pH',
          waterSource: '水源',
          topography: '地貌',
          soilMoisturePercent: '土壤湿度(%)',
          airTemperatureC: '空气温度(°C)',
          timestamp: '时间戳',
          actions: '操作',
        },
      },

      // 品种评估数据采集
      varietyEvaluation: {
        title: '品种评估数据采集',
        subtitle: '采集种子产量数据及审批决策信息',
        list: '品种评估数据列表',
        add: '新增品种评估数据',
        edit: '编辑品种评估数据',
        detail: '品种评估数据详情',
        delete: '删除数据',
        deleteConfirm: '确定删除该数据吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索地块ID',

        // 表单字段
        form: {
          basicInfo: '基础信息',
          yieldInfo: '产量信息',
          dataId: '数据ID',
          plotId: '地块ID',
          plotAreaM2: '地块面积(平方米)',
          grainWeightKg: '籽粒重量(KG)',
          yieldQtPerHa: '产量(公担/公顷)',
          moistureContent: '含水量(百分比)',
          createTime: '创建时间',
        },

        // 表单占位符
        placeholder: {
          plotId: '请输入地块ID',
          plotAreaM2: '请输入地块面积',
          grainWeightKg: '请输入籽粒重量',
          yieldQtPerHa: '请输入产量',
          moistureContent: '请输入含水量',
        },

        // 表单验证
        rules: {
          plotIdRequired: '请输入地块ID',
          plotAreaM2Required: '请输入地块面积',
          grainWeightKgRequired: '请输入籽粒重量',
          yieldQtPerHaRequired: '请输入产量',
          moistureContentRequired: '请输入含水量',
        },

        // 列表列
        columns: {
          plotId: '地块ID',
          plotAreaM2: '地块面积(m²)',
          grainWeightKg: '籽粒重量(KG)',
          yieldQtPerHa: '产量(公担/公顷)',
          moistureContent: '含水量(%)',
          createTime: '创建时间',
          actions: '操作',
        },
      },

      // 实验室测试数据采集
      laboratoryTest: {
        title: '实验室测试数据采集',
        subtitle: '记录样本数据、发芽率等实验室测试信息',
        list: '实验室测试数据列表',
        add: '新增实验室测试数据',
        edit: '编辑实验室测试数据',
        detail: '实验室测试数据详情',
        delete: '删除数据',
        deleteConfirm: '确定删除该数据吗？',
        deleteSuccess: '删除成功',
        addSuccess: '新增成功',
        editSuccess: '编辑成功',

        // 搜索筛选
        searchPlaceholder: '搜索样本ID',

        // 表单字段
        form: {
          sampleInfo: '样本信息',
          testInfo: '测试信息',
          dataId: '数据ID',
          sampleId: '样本ID',
          sampleCondition: '样本状态',
          germinationRate: '发芽率(百分比)',
          purityPercent: '纯度(百分比)',
          moistureContentPercent: '含水量(百分比)',
          proteinPercent: '蛋白质(百分比)',
          toxinLevelPpm: '毒素水平(PPM)',
          seedHealthFindings: '种子健康发现',
          traceabilityLink: '链路责任',
          labReportFile: '实验室报告文件',
          createTime: '创建时间',
        },

        // 表单占位符
        placeholder: {
          sampleId: '请输入样本ID',
          sampleCondition: '请输入样本状态',
          germinationRate: '请输入发芽率',
          purityPercent: '请输入纯度',
          moistureContentPercent: '请输入含水量',
          proteinPercent: '请输入蛋白质含量',
          toxinLevelPpm: '请输入毒素水平(选填)',
          seedHealthFindings: '请输入种子健康发现',
          traceabilityLink: '请输入链路责任',
        },

        // 表单验证
        rules: {
          sampleIdRequired: '请输入样本ID',
          sampleConditionRequired: '请输入样本状态',
          germinationRateRequired: '请输入发芽率',
          purityPercentRequired: '请输入纯度',
          moistureContentPercentRequired: '请输入含水量',
          proteinPercentRequired: '请输入蛋白质含量',
          seedHealthFindingsRequired: '请输入种子健康发现',
          traceabilityLinkRequired: '请输入链路责任',
        },

        // 列表列
        columns: {
          sampleId: '样本ID',
          sampleCondition: '样本状态',
          germinationRate: '发芽率(%)',
          purityPercent: '纯度(%)',
          proteinPercent: '蛋白质(%)',
          createTime: '创建时间',
          actions: '操作',
        },
      },
    },
  }