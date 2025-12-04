// 农田管理模块国际化 - 中文
export default {
  // 系统名称
  systemName: '农田管理系统',
  backToHome: '返回首页',

  // 模块通用
  moduleName: '农田管理',
  moduleDesc: '管理农业发展代理人、农民信息和土地数据',
  backToList: '返回列表',

  // 通用字段
  common: {
    all: '全部',
    male: '男',
    female: '女',
    noData: '暂无数据',
    actions: '操作',
    operationSuccess: '操作成功',
    deleteSuccess: '删除成功',
    zoneCode: '所属区',
    zoneName: '所属区',
    woredaCode: '所属镇',
    woredaName: '所属镇',
    kebeleCode: '所属村',
    kebeleName: '所属村',
    selectZone: '请选择所属区',
    selectWoreda: '请选择所属镇',
    selectKebele: '请选择所属村',
    systemInfo: '系统信息',
    createBy: '创建人',
    createTime: '创建时间',
    updateBy: '更新人',
    updateTime: '更新时间',
    remark: '备注',
  },

  // 菜单
  menu: {
    dashboard: '数据概览',
    daManagement: 'DA管理',
    daList: 'DA列表',
    farmerManagement: '农民管理',
    farmerList: '农民列表',
    landManagement: '土地管理',
    landList: '土地列表',
  },

  // 统计卡片
  stats: {
    totalDa: 'DA总数',
    activeDa: '在岗DA',
    totalFarmer: '农民总数',
    totalLand: '土地总数',
    totalArea: '总面积(公顷)',
    cultivating: '耕种中',
    idle: '闲置',
  },

  // DA管理
  da: {
    title: 'DA管理',
    subtitle: '管理农业发展代理人信息和账号',
    list: 'DA列表',
    add: '新增DA',
    edit: '编辑DA',
    detail: 'DA详情',
    delete: '删除DA',
    deleteConfirm: '确定删除该DA吗？删除后账号将被禁用。',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',
    searchPlaceholder: '搜索DA姓名、编码、电话',
    noData: '暂无DA数据',

    // 状态
    status: {
      enabled: '启用',
      disabled: '禁用',
    },
    statusAction: {
      enable: '启用账号',
      disable: '禁用账号',
      enableConfirm: '确定启用该DA账号吗？',
      disableConfirm: '确定禁用该DA账号吗？',
      enableSuccess: '账号已启用',
      disableSuccess: '账号已禁用',
    },
    resetPassword: {
      title: '重置密码',
      confirm: '确定重置该DA的登录密码吗？',
      success: '密码重置成功',
      newPassword: '新密码',
      passwordRule: '密码至少8位，包含大小写字母和数字',
    },

    // 表单
    form: {
      daId: 'DA编码',
      daName: 'DA姓名',
      idCard: '身份证号',
      gender: '性别',
      birthday: '出生日期',
      phone: '联系电话',
      email: '邮箱',
      regionCode: '所属州',
      zoneCode: '所属区',
      woredaCode: '所属镇',
      kebeleCodes: '负责村庄',
      address: '详细地址',
      account: '登录账号',
      password: '登录密码',
      accountStatus: '账号状态',
      remark: '备注',
      createTime: '创建时间',
    },
    placeholder: {
      daName: '请输入DA姓名',
      idCard: '请输入身份证号',
      gender: '请选择性别',
      birthday: '请选择出生日期',
      phone: '请输入联系电话',
      email: '请输入邮箱',
      regionCode: '请选择所属州',
      zoneCode: '请选择所属区',
      woredaCode: '请选择所属镇',
      kebeleCodes: '请选择负责的村庄',
      address: '请输入详细地址',
      account: '请输入登录账号',
      password: '请输入登录密码',
      remark: '备注信息（选填）',
    },
    rules: {
      daNameRequired: '请输入DA姓名',
      idCardRequired: '请输入身份证号',
      idCardExists: '身份证号已存在',
      genderRequired: '请选择性别',
      phoneRequired: '请输入联系电话',
      phoneFormat: '请输入正确的电话号码',
      woredaCodeRequired: '请选择所属镇',
      kebeleCodesRequired: '请选择负责的村庄',
      accountRequired: '请输入登录账号',
      accountExists: '登录账号已存在',
      accountFormat: '账号长度为4-50个字符',
      passwordRequired: '请输入登录密码',
      passwordFormat: '密码至少8位，包含大小写字母和数字',
    },
    columns: {
      daId: 'DA编码',
      daName: '姓名',
      phone: '电话',
      woredaCode: '所属镇',
      kebeleCodes: '负责村庄',
      accountStatus: '账号状态',
      createTime: '创建时间',
      actions: '操作',
    },

    // 详情页分区
    sections: {
      basicInfo: '基本信息',
      accountInfo: '账号信息',
      regionInfo: '区域信息',
      statistics: '统计信息',
    },
    stats: {
      farmerCount: '负责农民数',
      landCount: '土地数量',
      totalLandArea: '土地总面积',
    },
    // 操作
    actions: {
      enable: '启用',
      disable: '禁用',
      resetPassword: '重置密码',
    },
    // 确认提示
    confirmDelete: '确定删除该DA吗？删除后账号将被禁用。',
    confirmToggleStatus: '确定{action}该DA账号吗？',
    // 消息
    messages: {
      addSuccess: '新增成功',
      editSuccess: '编辑成功',
      deleteSuccess: '删除成功',
      resetPasswordSuccess: '密码重置成功',
    },
    // 提示
    tips: {
      kebeleCodes: '多个村庄代码用逗号分隔',
    },
  },

  // 农民管理
  farmer: {
    title: '农民管理',
    subtitle: '管理农民基础信息和土地关联',
    list: '农民列表',
    add: '新增农民',
    edit: '编辑农民',
    detail: '农民详情',
    delete: '删除农民',
    deleteConfirm: '确定删除该农民吗？关联的土地将自动解除关联。',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',
    searchPlaceholder: '搜索农民姓名、身份证号、电话',
    noData: '暂无农民数据',
    batchDelete: '批量删除',
    batchDeleteConfirm: '确定删除选中的 {count} 个农民吗？',
    batchDeleteSuccess: '成功删除 {success} 个，失败 {fail} 个',

    // 表单
    form: {
      farmerId: '农民编码',
      farmerName: '农民姓名',
      idCard: '身份证号',
      gender: '性别',
      birthday: '出生日期',
      phone: '手机号',
      email: '邮箱',
      youthCategory: '青年类别',
      unionId: '所属Union',
      cooperativeId: '所属Cooperative',
      regionCode: '所属州',
      zoneCode: '所属区',
      woredaCode: '所属镇',
      kebeleCode: '所属村',
      address: '详细地址',
      totalLandArea: '总土地面积',
      landCount: '地块数量',
      daId: '负责DA',
      remark: '备注',
      createTime: '创建时间',
    },
    placeholder: {
      farmerName: '请输入农民姓名',
      idCard: '请输入身份证号',
      gender: '请选择性别',
      birthday: '请选择出生日期',
      phone: '请输入手机号',
      email: '请输入邮箱',
      youthCategory: '请选择青年类别',
      unionId: '请选择所属Union',
      cooperativeId: '请选择所属Cooperative',
      kebeleCode: '请选择所属村',
      address: '请输入详细地址',
      daId: '请选择负责DA',
      remark: '备注信息（选填）',
    },
    rules: {
      farmerNameRequired: '请输入农民姓名',
      idCardRequired: '请输入身份证号',
      idCardExists: '身份证号已存在',
      genderRequired: '请选择性别',
      kebeleCodeRequired: '请选择所属村',
      daIdRequired: '请选择负责DA',
    },
    columns: {
      farmerId: '农民编码',
      farmerName: '姓名',
      idCard: '身份证号',
      phone: '电话',
      kebeleName: '所属村',
      totalLandArea: '土地面积(公顷)',
      landCount: '地块数',
      daName: '负责DA',
      createTime: '创建时间',
      actions: '操作',
    },
    youthOptions: {
      yes: '是',
      no: '否',
    },

    // 详情页分区
    sections: {
      basicInfo: '基本信息',
      orgInfo: '组织信息',
      regionInfo: '区域信息',
      landStatistics: '土地统计',
      landList: '关联土地',
    },
    stats: {
      landCount: '土地数量',
      totalLandArea: '土地总面积',
    },
    // 青年类别
    youthCategory: {
      YOUTH: '青年',
      ADULT: '成年',
      SENIOR: '老年',
    },
    // 操作
    actions: {
      batchDelete: '批量删除',
      viewDetail: '查看详情',
      import: '导入',
    },
    // 导入
    import: {
      dragText: '将文件拖到此处，或',
      clickText: '点击上传',
      tip: '仅支持 .xlsx, .xls 格式的Excel文件',
      updateSupport: '更新已存在的数据（根据身份证号匹配）',
      downloadTemplate: '下载导入模板',
      selectFile: '请选择要导入的文件',
      exceedLimit: '只能上传一个文件',
      success: '导入完成：新增 {success} 条，更新 {update} 条，失败 {fail} 条',
    },
    // 确认提示
    confirmDelete: '确定删除该农民吗？关联的土地将自动解除关联。',
    confirmBatchDelete: '确定删除选中的 {count} 个农民吗？',
    // 消息
    messages: {
      addSuccess: '新增成功',
      editSuccess: '编辑成功',
      deleteSuccess: '删除成功',
    },
  },

  // 土地管理
  land: {
    title: '土地管理',
    subtitle: '管理地块信息、权属和耕种状态',
    list: '土地列表',
    add: '新增土地',
    edit: '编辑土地',
    detail: '土地详情',
    delete: '删除土地',
    deleteConfirm: '确定删除该地块吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',
    searchPlaceholder: '搜索地块名称、编号',
    noData: '暂无土地数据',
    batchDelete: '批量删除',
    batchDeleteConfirm: '确定删除选中的 {count} 个地块吗？',
    batchDeleteSuccess: '成功删除 {success} 个，失败 {fail} 个',
    bindFarmer: '关联农民',
    unbindFarmer: '解除关联',
    bindSuccess: '关联成功',
    unbindSuccess: '解除关联成功',
    unbindConfirm: '确定解除该地块与农民的关联吗？',
    statistics: '土地统计',

    // 表单
    form: {
      landId: '土地编码',
      landName: '地块名称',
      landNo: '地块编号',
      ownerType: '权属类型',
      ownerName: '权属人',
      ownerIdCard: '权属人身份证',
      landType: '地块类型',
      landGraphic: '地形',
      areaSize: '地块面积',
      areaUnit: '面积单位',
      latitude: '纬度',
      longitude: '经度',
      regionCode: '所属州',
      zoneCode: '所属区',
      woredaCode: '所属镇',
      kebeleCode: '所属村',
      address: '详细地址',
      farmerId: '关联农民',
      currentStatus: '当前状态',
      maxSeedAmount: '最大种子量(kg)',
      maxFertilizerAmount: '最大肥料量(kg)',
      daId: '负责DA',
      remark: '备注',
      createTime: '创建时间',
    },
    placeholder: {
      landName: '请输入地块名称',
      landNo: '请输入地块编号',
      ownerType: '请选择权属类型',
      ownerName: '请输入权属人',
      ownerIdCard: '请输入权属人身份证',
      landType: '请选择地块类型',
      landGraphic: '请选择地形',
      areaSize: '请输入地块面积',
      latitude: '请输入纬度',
      longitude: '请输入经度',
      kebeleCode: '请选择所属村',
      address: '请输入详细地址',
      farmerId: '请选择关联农民',
      currentStatus: '请选择当前状态',
      daId: '请选择负责DA',
      remark: '备注信息（选填）',
    },
    rules: {
      landNameRequired: '请输入地块名称',
      ownerTypeRequired: '请选择权属类型',
      landTypeRequired: '请选择地块类型',
      areaSizeRequired: '请输入地块面积',
      areaSizeFormat: '请输入正确的面积数值',
      kebeleCodeRequired: '请选择所属村',
      addressRequired: '请输入详细地址',
      daIdRequired: '请选择负责DA',
    },
    columns: {
      landId: '土地编码',
      landName: '地块名称',
      landType: '地块类型',
      areaSize: '面积(公顷)',
      ownerType: '权属类型',
      currentStatus: '状态',
      farmerName: '关联农民',
      kebeleName: '所属村',
      daName: '负责DA',
      createTime: '创建时间',
      actions: '操作',
    },

    // 权属类型
    ownerTypes: {
      CONTRACT: '集体所有',
      CONTRACT: '承包经营权',
      PRIVATE: '私有',
    },
    // 地块类型
    landTypes: {
      PADDY: '水田',
      DRY: '旱地',
      GARDEN: '园地',
      FOREST: '林地',
      OTHER: '其他',
    },
    // 地形
    landGraphics: {
      FLAT: '平坦',
      GENTLE_SLOPE: '缓坡',
      STEEP_SLOPE: '陡坡',
    },
    // 状态
    status: {
      CULTIVATING: '耕种中',
      IDLE: '闲置',
      FALLOW: '休耕',
    },
    // 面积单位
    areaUnits: {
      HECTARE: '公顷',
      MU: '亩',
      SQM: '平方米',
    },
    // 权属类型
    ownerType: {
      PRIVATE: '私有',
      CONTRACT: '集体',
      STATE: '国有',
      LEASED: '租赁',
    },
    // 地块类型
    landType: {
      PADDY: '水田',
      DRY: '旱地',
      ORCHARD: '园地',
      FOREST: '林地',
      OTHER: '其他',
    },

    // 详情页分区
    sections: {
      basicInfo: '基本信息',
      locationInfo: '位置信息',
      farmerInfo: '关联农民',
      estimatedUsage: '估算用量',
    },
    stats: {
      totalCount: '地块总数',
      totalArea: '总面积',
      maxSeedAmount: '最大种子量',
      maxFertilizerAmount: '最大肥料量',
    },
    // 操作
    actions: {
      bindFarmer: '关联农民',
      unbindFarmer: '解除关联',
      batchDelete: '批量删除',
      viewDetail: '查看详情',
      removeFarmer: '移除关联',
    },
    // 未关联
    unbound: '未关联农民',
    // 确认提示
    confirmDelete: '确定删除该地块吗？',
    confirmBatchDelete: '确定删除选中的 {count} 个地块吗？',
    confirmUnbind: '确定解除该地块与农民的关联吗？',
    confirmRemove: '确定从该农民的土地中移除此地块吗？',
    // 消息
    messages: {
      addSuccess: '新增成功',
      editSuccess: '编辑成功',
      deleteSuccess: '删除成功',
      bindSuccess: '关联成功',
      unbindSuccess: '解除关联成功',
      removeSuccess: '移除关联成功',
    },
    // 提示
    tips: {
      areaUnit: '单位：公顷(ha)',
      farmerOptional: '可选，也可稍后关联',
      usageCalculation: '种子用量按30kg/公顷计算，肥料用量按100kg/公顷计算',
    },
  },

  // 性别选项
  gender: {
    M: '男',
    F: '女',
  },
}
