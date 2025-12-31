// 育种管理国际化文件
export default {
    // 种子扩繁批次信息管理（统一模块）
  title: '种子扩繁批次信息管理',
  subtitle: '种子扩繁批次、跟踪记录、检测信息一体化管理',
  // 育种家种子模块 Breeder Seed Module
  seed: {
    // 生产数据采集
    production: {
      title: '种子生产数据采集',
      subtitle: '记录Seed生产数据,确保种子繁育过程可追溯',
      list: '生产数据列表',
      add: '新增生产数据',
      detail: '生产数据详情',
      delete: '删除生产数据',
      deleteConfirm: '确定删除该生产数据吗?',
      deleteSuccess: '删除成功',
      addSuccess: '新增成功',

      // 搜索筛选
      searchPlaceholder: '搜索品种名称',
      filterByVariety: '按品种筛选',
      filterByDate: '按生产时间筛选',
      allVarieties: '全部品种',

      // 表单字段
      form: {
        basicInfo: '基础信息',
        productionInfo: '生产信息',
        produceBatchId: '种子生产批次ID',
        breedBatchId: '育种批次ID',
        trialName: '试验名称',
        varietyId: '品种ID',
        varietyName: '品种名称',
        cropType: '作物类型',
        time: '生产时间',
        landId: '地块ID',
        landName: '地块名称',
        inputSeedQuantity: '投入种子数量',
        produceSeedQuantrity: '产出种子数量',
        fromSeedLevel: '种子等级来源',
        toSeedLevel: '种子等级去向',
        operatorId: '操作人ID',
        operatorName: '操作人姓名',
        produceStatus: '生产状态',
        createTime: '创建时间',
        updateTime: '更新时间',
      },

      // 表单占位符
      placeholder: {
        breedBatchId: '请选择育种批次ID',
        trialName: '请选择试验名称',
        varietyName: '请选择品种名称',
        fromSeedLevel: '请选择种子等级来源',
        toSeedLevel: '请选择种子等级去向',
        time: '请选择生产时间',
        landName: '请选择地块名称',
        inputSeedQuantity: '请输入投入种子数量(kg)',
        produceSeedQuantrity: '请输入产出种子数量(kg)',
      },

      // 表单验证
      rules: {
        breedBatchIdRequired: '请选择育种批次ID',
        varietyNameRequired: '请选择品种名称',
        fromSeedLevelRequired: '请选择种子等级来源',
        toSeedLevelRequired: '请选择种子等级去向',
        timeRequired: '请选择生产时间',
        landNameRequired: '请选择地块名称',
        inputSeedQuantityRequired: '请输入投入种子数量',
        inputSeedQuantityMin: '投入种子数量必须大于0',
        produceSeedQuantrityRequired: '请输入产出种子数量',
        produceSeedQuantrityMin: '产出种子数量必须大于等于投入种子数量',
      },

      // 列表列
      columns: {
        produceBatchId: '生产批次ID',
        produceBatchName: '生产批次名称',
        breedBatchName: '育种批次名称',
        varietyName: '品种名称',
        cropType: '作物类型',
        time: '生产时间',
        landName: '地块名称',
        inputSeedQuantity: '投入数量(kg)',
        produceSeedQuantrity: '产出数量(kg)',
        fromSeedLevel: '种子等级来源',
        toSeedLevel: '种子等级去向',
        operatorName: '操作人',
        produceStatus: '生产状态',
        createTime: '创建时间',
        actions: '操作',
      },

      // 生产状态
      status: {
        FINISHED: '已完成',
      },

      result: {
        title: '生产数据采集详情',
        selection: '生产批次选择',
        section: {
          productionBatchSelection: '生产批次选择',
          collectionData: '采集数据',
        },
      },
    },

    // 分发数据管理
    distribution: {
      title: '育种家种子分发数据管理',
      subtitle: '管理Breeder Seed分发记录,追踪种子流向OSE',
      list: '分发数据列表',
      add: '新增分发数据',
      detail: '分发数据详情',
      delete: '删除分发数据',
      deleteConfirm: '确定删除该分发数据吗?',
      deleteSuccess: '删除成功',
      addSuccess: '新增成功',

      // 搜索筛选
      searchPlaceholder: '搜索OSE名称',
      filterByCrop: '按作物类型筛选',
      filterByVariety: '按品种筛选',
      filterByDate: '按分发时间筛选',
      allCrops: '全部作物',
      allVarieties: '全部品种',

      // 表单字段
      form: {
        basicInfo: '基础信息',
        distributionInfo: '分发信息',
        detailList: '分发明细',
        distributeId: '分发ID',
        oseId: 'OSE名称',
        oseName: 'OSE名称',
        time: '分发时间',
        people: '分发操作人',
        organ: '种子机构名称',
        distributeName: '分发名称',
        fromSeedLevel: '种子等级来源',
        toSeedLevel: '种子等级去向',
        remark: '备注',
        totalDistributeQuantity: '分发总数量',
        distributeStatus: '分发状态',
        createTime: '创建时间',
        updateTime: '更新时间',

        // 分发明细
        produceBatchId: '生产批次ID',
        breedBatchName: '育种批次名称',
        parentalSeedSource: '亲本种子来源',
        varietyName: '品种名称',
        cropType: '作物类型',
        distributeQuantity: '分发数量',
        produceBatchRemaining: '生产批次剩余可分发量',
      },

      // 表单占位符
      placeholder: {
        oseId: '请选择OSE名称',
        time: '请选择分发时间',
        people: '请输入分发操作人姓名',
        organ: '请输入种子机构名称',
        distributeName: '请输入分发名称',
        fromSeedLevel: '请选择种子等级来源',
        toSeedLevel: '请选择种子等级去向',
        remark: '备注信息(选填)',
        produceBatchId: '请选择生产批次',
        breedBatchName: '请选择育种批次名称',
        parentalSeedSource: '请选择亲本种子来源',
        varietyName: '请选择品种名称',
        distributeQuantity: '请输入分发数量(kg)',
      },

      // 表单验证
      rules: {
        distributeName: '请输入分发名称',
        oseId: '请选择OSE名称',
        time: '请选择分发时间',
        people: '请输入分发操作人姓名',
        organ: '请输入种子机构名称',
        fromSeedLevelRequired: '请选择种子等级来源',
        toSeedLevelRequired: '请选择种子等级去向',
        detailListRequired: '请至少添加一条分发明细',
        produceBatchId: '请选择生产批次',
        distributeQuantity: '请输入分发数量',
        distributeQuantityMin: '分发数量必须大于0',
        distributeQuantityMax: '分发数量不能超过生产批次剩余可分发量',
      },

      // 明细相关
      addDetail: '添加明细',
      detailIndex: '明细 {index}',
      remaining: '剩余',
      maxQuantity: '最大可分发量',
      noDetail: '暂无分发明细',

      // 明细表格列
      detailColumns: {
        varietyName: '品种名称',
        cropType: '作物类型',
        produceBatchId: '生产批次ID',
        produceBatchName: '生产批次名称',
        breedBatchName: '育种批次名称',
        parentalSeedSource: '亲本种子来源',
        distributeQuantity: '分发数量(kg)',
        produceBatchRemaining: '批次剩余量(kg)',
        createTime: '创建时间',
      },

      // 列表列
      columns: {
        distributeId: '分发ID',
        oseName: 'OSE名称',
        time: '分发时间',
        people: '分发操作人',
        organ: '种子机构',
        distributeName: '分发名称',
        fromSeedLevel: '种子等级来源',
        toSeedLevel: '种子等级去向',
        totalDistributeQuantity: '分发总数量(kg)',
        distributeStatus: '分发状态',
        createTime: '创建时间',
        actions: '操作',
      },

      // 分发状态
      status: {
        distributed: '已分发',
        已分发: '已分发',
        DISTRIBUTED: '已分发',
        received: '已接收',
        Received: '已接收',
      },

      // 操作
      actions: {
        addDetail: '添加分发明细',
        removeDetail: '移除',
      },
    },

    // OSE维护
    ose: {
      title: 'OSE维护管理',
      subtitle: '管理OSE基础信息,确保种子接收方信息准确',
      list: 'OSE列表',
      add: '新增OSE',
      edit: '编辑OSE',
      detail: 'OSE详情',
      delete: '删除OSE',
      deleteConfirm: '确定删除该OSE吗?',
      deleteSuccess: '删除成功',
      addSuccess: '新增成功',
      updateSuccess: '更新成功',
      editSuccess: '编辑成功',

      // 搜索筛选
      searchPlaceholder: '搜索OSE名称',
      filterByStatus: '按状态筛选',
      filterByDate: '按创建时间筛选',
      allStatus: '全部状态',

      // 表单字段
      form: {
        basicInfo: '基础信息',
        contactInfo: '联系信息',
        oseId: 'OSE ID',
        oseCode: 'OSE行政编码',
        oseName: 'OSE名称',
        location: '详细地址',
        regionCode: '行政区划编码',
        regionName: '行政区划名称',
        contactName: '联系人姓名',
        contactNumber: '联系人电话',
        oseStatus: '状态',
        createTime: '创建时间',
        updateTime: '更新时间',
      },

      // 表单占位符
      placeholder: {
        oseCode: '请输入OSE行政编码',
        oseName: '请输入OSE名称',
        location: '请输入详细地址',
        regionCode: '请选择行政区划',
        contactName: '请输入联系人姓名',
        contactNumber: '请输入联系人电话(251开头12位)',
      },

      // 表单验证
      rules: {
        oseCode: '请输入OSE行政编码',
        oseCodeUnique: 'OSE行政编码已存在',
        oseName: '请输入OSE名称',
        oseNameUnique: 'OSE名称已存在',
        location: '请输入详细地址',
        regionCode: '请选择行政区划',
        contactName: '请输入联系人姓名',
        contactNumber: '请输入联系人电话',
        contactNumberFormat: '请输入正确的联系人电话格式(251开头12位)',
        contactNumberUnique: '联系人电话已存在',
      },

      // 帮助文本
      help: {
        oseCode: '行政编码应与行政区划表的regionCode相匹配',
        regionCode: '请选择OSE所在的行政区划',
        contactNumber: '格式: 251XXXXXXXXX (251开头,共12位数字)',
      },

      // 列表列
      columns: {
        oseCode: 'OSE行政编码',
        oseName: 'OSE名称',
        location: '详细地址',
        regionName: '行政区划',
        contactName: '联系人',
        contactNumber: '联系电话',
        oseStatus: '状态',
        createTime: '创建时间',
        actions: '操作',
      },

      // OSE状态
      status: {
        ENABLED: '启用',
        DISABLED: '禁用',
      },
    },

    // OSE接收确认
    receiveConfirm: {
      title: 'OSE接收确认',
      subtitle: 'OSE确认接收育种家种子',
      list: '接收确认列表',
      confirm: '确认接收',
      detail: '接收确认详情',
      confirmSuccess: '确认成功',

      // 搜索筛选
      searchPlaceholder: '搜索OSE名称、品种名称、种子ID、种子类型',
      filterByStatus: '按接收状态筛选',
      filterByCrop: '按作物类型筛选',
      filterByDate: '按时间筛选',
      allStatus: '全部状态',
      allCrops: '全部作物',

      // 表单字段
      form: {
        basicInfo: '基础信息',
        distributionDetail: '分发明细',
        breedSeedDetail: '育种家种子信息',
        confirmInfo: '确认信息',
        systemInfo: '系统信息',
        receiveConfirmId: '接收确认ID',
        distributeId: '分发ID',
        oseId: 'OSE ID',
        oseName: 'OSE名称',
        confirmTime: '确认时间',
        confirmPeople: '操作人姓名',
        receiveStatus: '接收状态',
        remark: '补充说明',
        createTime: '创建时间',
        updateTime: '更新时间',

        // 分发明细
        totalDistributeQuantity: '分发总数量',
        produceBatchId: '生产批次ID',
        breedSeedProduceBatchId: '种子ID',
        seedType: '种子类型',
        varietyName: '品种名称',
        cropType: '作物类型',
        distributeQuantity: '分发数量',
      },

      // 表单占位符
      placeholder: {
        confirmTime: '请选择确认时间',
        confirmPeople: '请输入操作人姓名',
        remark: '补充说明(选填)',
      },

      // 表单验证
      rules: {
        confirmTime: '请选择确认时间',
        confirmPeople: '请输入操作人姓名',
      },

      // 列表列
      columns: {
        receiveConfirmId: '接收确认ID',
        distributeId: '分发ID',
        oseName: 'OSE名称',
        breedSeedProduceBatchId: '种子ID',
        seedType: '种子类型',
        varietyName: '品种名称',
        totalDistributeQuantity: '分发总数量(kg)',
        confirmTime: '确认时间',
        confirmPeople: '操作人姓名',
        receiveStatus: '接收状态',
        createTime: '创建时间',
        actions: '操作',
      },

      // 接收状态
      status: {
        PENDING: '待确认',
        CONFIRMED: '已确认',
      },

      // 统计标签
      stats: {
        totalRecords: '总接收记录',
        pendingCount: '待确认',
        confirmedCount: '已确认',
        totalQuantity: '总接收数量',
      },

      // 提示信息
      messages: {
        noSeedData: '暂无育种家种子分发数据',
      },
    },
  },

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

    // 作物类型(通用,移到common.js更好,但这里也保留一份)
    cropTypes: {
      wheat: '小麦',
      maize: '玉米',
      sorghum: '高粱',
      teff: '苔麸',
      barley: '大麦',
      pulses: '豆类',
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



  // 共用作物类型
  cropType: {
    wheat: '小麦',
    corn: '玉米',
    rice: '水稻',
    soybean: '大豆',
    cotton: '棉花',
  },

  // 共用繁殖级别
  breedingLevel: {
    parentPrep: '亲本准备',
    original: '原始种',
    foundation: '基础种',
    certified: '认证种',
  },

  // 共用状态
  status: {
    ongoing: '进行中',
    completed: '已完成',
    terminated: '已中止',
  },

  // 批次相关
  batch: {
    title: '繁殖批次信息',
    add: '新增批次',
    edit: '编辑批次',
    delete: '删除批次',
    searchPlaceholder: '搜索批次编号、品种名称',
    filterByCrop: '按作物类型筛选',
    filterByStatus: '按状态筛选',
    allCrops: '全部作物',
    allStatus: '全部状态',
    deleteConfirm: '确定删除该繁殖批次吗？',
    columns: {
      batchId: '批次编号',
      varietyName: '品种名称',
      cropType: '作物类型',
      breedingLevel: '繁殖级别',
      startDate: '开始日期',
      status: '状态',
      trackingCount: '跟踪记录数',
      testCount: '检测记录数',
    },
    form: {
      batchId: '批次编号',
      varietyName: '品种名称',
      cropType: '作物类型',
      breedingLevel: '繁殖级别',
      parentSeedSource: '亲本种子来源',
      status: '状态',
      startDate: '开始日期',
      endDate: '完成日期',
      expectedYield: '预期产量',
      actualYield: '实际产量',
      toMultiplyQuantity: '待扩繁数量',
      orgId: '机构ID',
      orgName: '机构名称',
    },
  },

  // 跟踪相关
  tracking: {
    title: '繁殖跟踪信息',
    add: '新增跟踪',
    edit: '编辑跟踪',
    delete: '删除跟踪',
    detail: '跟踪详情',
    deleteConfirm: '确定删除该跟踪记录吗？',
    stage: {
      parentPrep: '亲本准备',
      original: '原始种',
      foundation: '基础种',
      certified: '认证种',
    },
    result: {
      normal: '正常',
      abnormal: '异常',
      observing: '观察中',
    },
    form: {
      trackingId: '跟踪编号',
      batchId: '批次编号',
      cropType: '作物类型',
      stageName: '阶段名称',
      trackingResult: '跟踪结论',
      location: '位置描述',
      startDate: '开始日期',
      completeDate: '完成日期',
      expectedYield: '预期产量',
      actualYield: '实际产量',
      toMultiplyQuantity: '待扩繁数量',
      fieldInspectionScore: '田间检验得分',
      gpsLongitude: 'GPS经度',
      gpsLatitude: 'GPS纬度',
      diseaseObservation: '病害观察',
      orgId: '机构ID',
      orgName: '机构名称',
      cropTypePlaceholder: '请选择作物类型',
      stageNamePlaceholder: '请选择阶段名称',
      trackingResultPlaceholder: '请选择跟踪结论',
      locationPlaceholder: '请输入位置描述',
      startDatePlaceholder: '请选择开始日期',
    },
    validation: {
      cropTypeRequired: '请选择作物类型',
      stageNameRequired: '请选择阶段名称',
      locationRequired: '请输入位置描述',
      startDateRequired: '请选择开始日期',
    },
  },

  // 检测相关
  test: {
    title: '繁殖检测信息',
    add: '新增检测',
    edit: '编辑检测',
    delete: '删除检测',
    detail: '检测详情',
    deleteConfirm: '确定删除该检测记录吗？',
    result: {
      qualified: '合格',
      unqualified: '不合格',
      toBeRetested: '待复检',
    },
    form: {
      testId: '检测编号',
      trackingId: '跟踪编号',
      batchId: '批次编号',
      cropType: '作物类型',
      testDate: '检测日期',
      testResult: '检测结论',
      sampleLocation: '取样位置',
      sampleWeight: '样品重量',
      germinationRate: '发芽率',
      purity: '纯度',
      moistureContent: '水分含量',
      pestDetection: '病虫害检测',
      cropTypePlaceholder: '请选择作物类型',
      testResultPlaceholder: '请选择检测结论',
    },
    validation: {
      cropTypeRequired: '请选择作物类型',
      testDateRequired: '请选择检测日期',
      testResultRequired: '请选择检测结论',
    },
  },

  // 详情页
  detail: {
    title: '繁殖批次详情',
    tabs: {
      basicInfo: '基本信息',
      trackingRecords: '跟踪记录',
      testRecords: '检测记录',
    },
    trackingCount: '跟踪记录数',
    testCount: '检测记录数',
    relatedTests: '关联的检测记录',
    basicInfo: '基本信息',
    testData: '检测数据',
    timeline: '时间节点',
    yieldData: '产量数据',
    gpsLocation: 'GPS位置',
    orgInfo: '机构信息',
  },

  // 通用消息
  messages: {
    queryError: '查询失败',
    loadError: '加载数据失败',
    addSuccess: '新增成功',
    editSuccess: '更新成功',
    deleteSuccess: '删除成功',
    deleteError: '删除失败',
    operationError: '操作失败',
  },

  // 种子扩繁批次信息采集
  breedingBatch: {
    title: '种子扩繁批次信息采集',
    subtitle: '记录种子扩繁批次基本信息和产量数据',
    list: '繁殖批次列表',
    add: '新增繁殖批次',
    edit: '编辑繁殖批次',
    detail: '繁殖批次详情',
    delete: '删除批次',
    deleteConfirm: '确定删除该繁殖批次吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索批次编号',
    filterByCropType: '按作物类型筛选',
    filterByStatus: '按状态筛选',
    allTypes: '全部类型',
    allStatus: '全部状态',

    // 作物类型
    cropType: {
      wheat: '小麦',
      corn: '玉米',
      rice: '水稻',
      soybean: '大豆',
      cotton: '棉花',
    },

    // 繁殖级别
    breedingLevel: {
      parentPrep: '亲本准备',
      original: '原始种',
      foundation: '基础种',
      certified: '认证种',
    },

    // 批次状态
    status: {
      ongoing: '进行中',
      completed: '已完成',
      terminated: '已中止',
    },

    // 表单字段
    form: {
      basicInfo: '基本信息',
      yieldInfo: '产量信息',
      orgInfo: '机构信息',
      remarks: '备注',
      batchId: '批次编号',
      varietyName: '品种名称',
      cropType: '作物类型',
      breedingLevel: '繁殖级别',
      parentalSeedSource: '亲本种子来源',
      parentalSeedSourcePlaceholder: '请选择亲本种子来源',
      distributionId: '分发ID',
      distributionIdPlaceholder: '请选择分发ID',
      startDate: '开始日期',
      endDate: '完成日期',
      expectedYield: '预期产量',
      toMultiplyQuantity: '待扩繁数量',
      orgId: '机构ID',
      orgName: '机构名称',
      remark: '备注',
      status: '状态',
      batchIdPlaceholder: '请输入批次编号',
      varietyNamePlaceholder: '请输入品种名称',
      cropTypePlaceholder: '请选择作物类型',
      breedingLevelPlaceholder: '请选择繁殖级别',
      parentSeedSourcePlaceholder: '请输入亲本种子来源',
      startDatePlaceholder: '请选择开始日期',
      endDatePlaceholder: '请选择完成日期',
      expectedYieldPlaceholder: '请输入预期产量',
      toMultiplyQuantityPlaceholder: '请输入待扩繁数量',
      orgIdPlaceholder: '请输入机构ID',
      orgNamePlaceholder: '请输入机构名称',
      remarkPlaceholder: '请输入备注信息',
    },
  },

  // 繁殖跟踪信息采集
  breedingTracking: {
    title: '繁殖跟踪信息采集',
    subtitle: '跟踪记录繁殖过程各阶段的生长情况和产量数据',
    list: '繁殖跟踪列表',
    add: '新增繁殖跟踪',
    edit: '编辑繁殖跟踪',
    detail: '繁殖跟踪详情',
    delete: '删除跟踪',
    deleteConfirm: '确定删除该跟踪记录吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '更新成功',
    loadError: '加载数据失败',
    operationError: '操作失败',
    queryError: '查询失败',
    deleteError: '删除失败',

    // 搜索筛选
    searchPlaceholder: '搜索跟踪编号',
    filterByStage: '按阶段筛选',
    filterByResult: '按跟踪结论筛选',
    allStages: '全部阶段',
    allResults: '全部结论',

    // 阶段名称
    stage: {
      parentPrep: '亲本准备',
      original: '原始种',
      foundation: '基础种',
      certified: '认证种',
    },

    // 跟踪结论
    result: {
      normal: '正常',
      abnormal: '异常',
      observing: '观察中',
    },

    // 作物类型
    cropType: {
      wheat: '小麦',
      corn: '玉米',
      rice: '水稻',
      soybean: '大豆',
      cotton: '棉花',
    },

    // 列表列
    columns: {
      trackingId: '跟踪编号',
      batchId: '批次编号',
      stageName: '阶段名称',
      location: '位置描述',
      result: '跟踪结论',
      startDate: '开始日期',
    },

    // 表单字段
    form: {
      basicInfo: '基本信息',
      yieldInfo: '产量信息',
      gpsInfo: 'GPS坐标',
      diseaseInfo: '病害观察',
      orgInfo: '机构信息',
      trackingId: '跟踪编号',
      batchId: '繁殖批次编号',
      cropType: '作物类型',
      stageName: '阶段名称',
      trackingResult: '跟踪结论',
      location: '位置描述',
      startDate: '开始日期',
      completeDate: '完成日期',
      expectedYield: '预期产量(kg)',
      actualYield: '实际产量(kg)',
      fieldInspectionScore: '田间检验得分',
      gpsLongitude: 'GPS经度',
      gpsLatitude: 'GPS纬度',
      diseaseObservation: '病害观察记录',
      orgId: '机构ID',
      orgName: '机构名称',
      remark: '备注',
      batchIdPlaceholder: '请输入繁殖批次编号',
      cropTypePlaceholder: '请选择作物类型',
      stageNamePlaceholder: '请选择阶段名称',
      trackingResultPlaceholder: '请选择跟踪结论',
      locationPlaceholder: '请输入位置描述',
      startDatePlaceholder: '请选择开始日期',
      completeDatePlaceholder: '请选择完成日期',
      expectedYieldPlaceholder: '请输入预期产量',
      actualYieldPlaceholder: '请输入实际产量',
      fieldInspectionScorePlaceholder: '请输入田间检验得分',
      gpsLongitudePlaceholder: '请输入GPS经度',
      gpsLatitudePlaceholder: '请输入GPS纬度',
      diseaseObservationPlaceholder: '请输入病害观察记录',
      orgIdPlaceholder: '请输入机构ID',
      orgNamePlaceholder: '请输入机构名称',
      remarkPlaceholder: '请输入备注信息',
    },

    // 表单验证消息
    validation: {
      batchIdRequired: '请输入繁殖批次编号',
      cropTypeRequired: '请选择作物类型',
      stageNameRequired: '请选择阶段名称',
      locationRequired: '请输入位置描述',
      startDateRequired: '请选择开始日期',
    },
  },

  // 繁殖检测信息采集
  breedingTest: {
    title: '繁殖检测信息采集',
    subtitle: '记录繁殖检测数据，包括发芽率、纯度等检测指标',
    list: '繁殖检测列表',
    add: '新增繁殖检测',
    edit: '编辑繁殖检测',
    detail: '繁殖检测详情',
    delete: '删除检测',
    deleteConfirm: '确定删除该繁殖检测吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索检测编号',
    filterByCropType: '按作物类型筛选',
    filterByResult: '按检测结论筛选',
    allTypes: '全部类型',
    allResults: '全部结论',

    // 作物类型
    cropType: {
      wheat: '小麦',
      corn: '玉米',
      rice: '水稻',
      soybean: '大豆',
      cotton: '棉花',
    },

    // 检测结论
    result: {
      qualified: '合格',
      unqualified: '不合格',
      recheck: '待复检',
    },

    // 表单字段
    form: {
      basicInfo: '基本信息',
      testIndicators: '检测指标',
      trackingId: '跟踪编号',
      batchId: '批次编号',
      testId: '检测编号',
      cropType: '作物类型',
      testDate: '检测日期',
      testOrg: '检测机构',
      testPerson: '检测人员',
      testResult: '检测结论',
      testReportUrl: '检测报告地址',
      germinationRate: '发芽率(%)',
      purity: '纯度(%)',
      moistureContent: '含水量(%)',
      pestDetection: '病虫害检测',
      remark: '备注',
      testIdPlaceholder: '系统自动生成',
      trackingIdPlaceholder: '请输入跟踪编号',
      batchIdPlaceholder: '请输入批次编号',
      cropTypePlaceholder: '请选择作物类型',
      testDatePlaceholder: '请选择检测日期',
      testOrgPlaceholder: '请输入检测机构',
      testPersonPlaceholder: '请输入检测人员',
      testResultPlaceholder: '请选择检测结论',
      testReportUrlPlaceholder: '请输入检测报告地址',
      germinationRatePlaceholder: '请输入发芽率',
      purityPlaceholder: '请输入纯度',
      moistureContentPlaceholder: '请输入含水量',
      pestDetectionPlaceholder: '请输入病虫害检测结果',
      remarkPlaceholder: '请输入备注信息',
    },
  },
}
