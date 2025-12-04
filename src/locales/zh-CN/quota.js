export default {
  // 投入品类别
  category: {
    seed: '种子',
    fertilizer: '化肥',
    pesticide: '农药',
    other: '其他'
  },

  menu: {
    inputQuota: '投入品配额分配管理',
  },

  // 州级年度配额管理
  stateQuota: {
    title: '年度配额管理',
    subtitle: '年度配额管理',
    list: '配额列表',
    add: '新增配额',
    edit: '编辑配额',
    detail: '配额详情',
    delete: '删除配额',
    deleteConfirm: '确定删除该配额吗?删除后无法恢复',
    batchDeleteConfirm: '确定批量删除选中的配额吗?删除后无法恢复',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 列表列
    columns: {
      quotaName: '配额名称',
      year: '年度',
      category: '投入品类别',
      totalQuota: '总配额量',
      operator: '操作员',
      operatorDivision: '所属区划',
      operateTime: '操作时间',
      createTime: '创建时间',
      updateTime: '更新时间',
      modifier: '修改人',
      actions: '操作'
    },

    // 表单
    form: {
      basicInfo: '基本信息',
      operatorInfo: '操作信息',
      year: '配额年度',
      category: '投入品类别',
      totalQuota: '年度总配额量',
      quotaName: '配额名称'
    },

    // 占位符
    placeholder: {
      year: '请选择配额年度',
      category: '请选择投入品类别',
      totalQuota: '请输入年度总配额量',
      quotaName: '系统自动生成'
    }
  },

  // 配额逐级分配管理
  allocation: {
    title: '配额逐级分配管理',
    subtitle: '按照州-区-镇-村-农民逐级分配投入品配额',
    list: '分配记录列表',
    add: '新增分配',
    edit: '编辑分配',
    detail: '分配详情',
    delete: '删除分配',
    deleteConfirm: '确定删除该分配记录吗?删除后无法恢复',
    batchDeleteConfirm: '确定批量删除选中的分配记录吗?删除后无法恢复',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 列表列
    columns: {
      allocationName: '分配记录名称',
      year: '年度',
      category: '投入品类别',
      fromDivision: '分配方',
      fromLevel: '分配方层级',
      toDivision: '接收方',
      parentDivision: '父级区划',
      quotaName: '关联州级配额',
      totalReceived: '本级接收总量',
      allocatedQuota: '本次分配量',
      totalAllocated: '累计已分配量',
      remainingQuota: '剩余配额量',
      status: '分配状态',
      operator: '操作员',
      operatorDivision: '操作员区划',
      operateTime: '操作时间',
      progressUpdateTime: '进度更新时间',
      createTime: '创建时间',
      updateTime: '更新时间',
      modifier: '修改人',
      modifierDivision: '修改人区划',
      actions: '操作'
    },

    // 层级
    level: {
      region: '州(Region)',
      zone: '区(Zone)',
      worede: '镇(Worede)',
      kebele: '村(Kebele)'
    },

    // 分配状态
    status: {
      notAllocated: '未分配',
      partiallyAllocated: '部分分配',
      completed: '已完成'
    },

    // 表单
    form: {
      basicInfo: '基本信息',
      quotaDetails: '配额详情',
      operatorInfo: '操作信息',
      year: '分配年度',
      category: '投入品类别',
      fromDivisionLevel: '分配方层级',
      fromDivisionId: '分配方区划ID',
      toDivisionId: '接收方区划ID',
      toFarmerId: '接收方农民ID',
      allocatedQuota: '本次分配量',
      totalReceivedQuota: '本级接收总量',
      quotaId: '关联州级配额ID'
    },

    // 占位符
    placeholder: {
      year: '请选择分配年度',
      category: '请选择投入品类别',
      level: '请选择分配方层级',
      fromDivisionId: '请输入分配方区划ID',
      toDivisionId: '请输入接收方区划ID',
      toFarmerId: '请输入接收方农民ID',
      allocatedQuota: '请输入本次分配量',
      totalReceivedQuota: '请输入本级接收总量',
      quotaId: '请输入关联州级配额ID',
      status: '请选择分配状态'
    }
  }
}
