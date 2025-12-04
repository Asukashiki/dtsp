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
    allocate: '分配',
    allocateTitle: '配额分配',
    allocateSubtitle: '将配额分配给下级区划',
    quotaSummary: '配额概览',
    deleteConfirm: '确定删除该配额吗?删除后无法恢复',
    batchDeleteConfirm: '确定批量删除选中的配额吗?删除后无法恢复',
    cannotDeleteWithAllocations: '该配额已有分配记录，无法删除。请先删除相关分配记录。',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 列表列
    columns: {
      quotaName: '配额名称',
      year: '年度',
      category: '投入品类别',
      totalQuota: '总配额量',
      allocationProgress: '分配进度',
      allocationStatus: '分配状态',
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
    allocateToZones: '分配到区',
    addZone: '添加区',
    existingAllocations: '已分配记录',
    totalNewAllocation: '本次新增分配总量',
    remainingAfterAllocation: '分配后剩余量',
    confirmAllocation: '确认分配',
    confirmAllocationMsg: '确定要向 {count} 个区划分配共计 {total} 的配额吗？',
    allocateSuccess: '分配成功',
    invalidAllocation: '请填写有效的分配数据',
    noValidItems: '没有有效的分配项',
    duplicateDivision: '该区划已添加',
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
      toDivisionName: '区划名称',
      parentDivision: '父级区划',
      quotaName: '关联州级配额',
      totalReceived: '本级接收总量',
      allocatedQuota: '分配量',
      existingAllocation: '已分配量',
      newAllocation: '新增分配量',
      totalAllocated: '累计已分配量',
      remainingQuota: '剩余配额量',
      status: '分配状态',
      subProgress: '下级分配进度',
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
      toDivisionName: '请输入区划名称',
      toFarmerId: '请输入接收方农民ID',
      allocatedQuota: '请输入本次分配量',
      totalReceivedQuota: '请输入本级接收总量',
      quotaId: '请输入关联州级配额ID',
      status: '请选择分配状态'
    }
  },

  // 我的配额分配（非州级区划）
  myAllocation: {
    title: '配额分配管理',
    subtitle: '查看已接收配额并向下级分配',
    myDivision: '我的区划',
    divisionName: '区划名称',
    divisionLevel: '区划层级',
    parentDivision: '上级区划',
    receivedQuotas: '已接收配额',
    noReceivedQuotas: '暂未接收到配额',
    noReceivedQuotasHint: '您的区划尚未收到上级区划分配的配额',
    receivedFrom: '配额来源',
    receivedAmount: '接收量',
    allocatedAmount: '已分配',
    remainingAmount: '剩余量',
    viewAllocations: '查看分配',
    allocateToChildren: '分配',
    allocationHistory: '我的分配记录',
    allocateTitle: '分配配额',
    allocateSubtitle: '将配额分配给下级区划',
    allocateToChildDivisions: '分配到下级区划',
    addChildDivision: '添加下级区划',
    farmer: '农民',
    missingQuotaInfo: '缺少配额信息',
    allocationsTitle: '分配详情',
    allocationSummary: '分配概览',
    totalReceived: '总接收量',
    totalAllocated: '已分配总量',
    totalRemaining: '剩余总量',
    childDivisions: '下级区划数',
    allocated: '已分配',
    allocationsList: '分配列表',
    noAllocations: '暂无分配记录',
    startAllocating: '开始分配',
    allocateMore: '继续分配',
    subAllocationProgress: '下级分配进度'
  }
}
