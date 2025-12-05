export default {
  // DA农民需求录入
  title: 'DA农民需求录入',
  subtitle: 'DA负责录入全村农民的投入品需求数据',
  list: '农民需求列表',
  detail: '需求详情',
  add: '新增需求',
  edit: '编辑需求',
  delete: '删除需求',
  deleteConfirm: '确定删除该需求吗?',
  deleteSuccess: '删除成功',
  addSuccess: '新增成功',
  editSuccess: '编辑成功',

  // 搜索和筛选
  searchPlaceholder: '搜索农民姓名、身份证号、村庄',
  filterByBatch: '按批次筛选',
  filterByStatus: '按状态筛选',
  filterByKebele: '按Kebele筛选',
  filterByInputCategory: '按投入品类型筛选',
  allBatches: '全部批次',
  allStatus: '全部状态',
  allKebeles: '全部Kebele',
  allCategories: '全部类型',

  // 状态
  status: {
    draft: '草稿',
    submitted: '已提交',
    approved: '已通过',
    rejected: '已驳回',
    locked: '已锁定',
  },

  // 审核层级
  auditLevel: {
    village: '村级',
    town: '镇级',
    district: '区级',
    state: '州级',
    ministry: '农业部',
  },

  // 投入品大类
  inputCategory: {
    seed: '种子',
    fertilizer: '化肥',
    pesticide: '农药',
  },

  // 表单字段
  form: {
    basicInfo: '基本信息',
    farmerInfo: '农民信息',
    demandInfo: '需求信息',
    itemsInfo: '投入品明细',
    auditInfo: '审核信息',

    batchId: '采集批次',
    batchNo: '批次编号',
    farmerId: '农民ID',
    farmerName: '农民姓名',
    farmerIdNumber: '农民身份证号',
    region: '大区',
    zone: 'Zone',
    woreda: 'Woreda',
    kebele: 'Kebele',
    village: '村庄',
    landArea: '地块总面积(公顷)',
    maxSeedQuantity: '估算最大种子量(kg)',
    maxFertilizerQuantity: '估算最大肥料量(kg)',
    status: '状态',
    currentAuditLevel: '当前审核层级',
    daUserName: '录入DA',
    submitTime: '提交时间',
    remark: '备注',
    createdTime: '创建时间',
    version: '版本号',

    // 投入品明细
    inputItems: '投入品明细',
    inputCategory: '投入品大类',
    inputType: '农资类型',
    variety: '品种',
    specification: '规格',
    unit: '单位',
    quantity: '需求数量',
    addItem: '添加投入品',
    removeItem: '移除',
    noItems: '暂无投入品明细',
  },

  // 表单占位符
  placeholder: {
    batchId: '请选择采集批次',
    farmerId: '请输入农民ID',
    farmerName: '请输入农民姓名',
    farmerIdNumber: '请输入农民身份证号',
    region: '请输入大区',
    zone: '请输入Zone',
    woreda: '请输入Woreda',
    kebele: '请输入Kebele',
    village: '请输入村庄',
    landArea: '请输入地块总面积',
    remark: '请输入备注信息',
    inputCategory: '请选择投入品大类',
    inputType: '请输入农资类型',
    variety: '请输入品种',
    specification: '请输入规格',
    unit: '请输入单位',
    quantity: '请输入需求数量',
  },

  // 表单验证
  rules: {
    batchIdRequired: '请选择采集批次',
    farmerIdRequired: '请输入农民ID',
    farmerNameRequired: '请输入农民姓名',
    farmerNameLength: '农民姓名最多100个字符',
    farmerIdNumberRequired: '请输入农民身份证号',
    farmerIdNumberLength: '身份证号最多50个字符',
    woredaRequired: '请输入Woreda',
    kebeleRequired: '请输入Kebele',
    villageRequired: '请输入村庄',
    landAreaPositive: '地块总面积必须大于0',
    remarkLength: '备注最多500个字符',
    inputCategoryRequired: '请选择投入品大类',
    inputTypeRequired: '请输入农资类型',
    varietyRequired: '请输入品种',
    unitRequired: '请输入单位',
    quantityRequired: '请输入需求数量',
    quantityPositive: '需求数量必须大于0',
    itemsRequired: '请至少添加一条投入品明细',
  },

  // 列表列
  columns: {
    batchNo: '批次编号',
    farmerId: '农民ID',
    farmerName: '农民姓名',
    farmerIdNumber: '身份证号',
    kebele: 'Kebele',
    woreda: 'Woreda',
    village: '村庄',
    landArea: '地块面积',
    status: '状态',
    currentAuditLevel: '当前审核层级',
    daUserName: '录入DA',
    createdTime: '创建时间',
    actions: '操作',
  },

  // 操作按钮
  actions: {
    view: '查看',
    edit: '编辑',
    delete: '删除',
    submit: '提交',
  },
    submitForAudit: '提交审核',

  // 审核记录
  auditRecords: {
    title: '审核记录',
    noRecords: '暂无审核记录',
    auditLevel: '审核层级',
    auditUserName: '审核人',
    auditTime: '审核时间',
    auditAction: '审核动作',
    auditResult: '审核结果',
    auditOpinion: '审核意见',
  },

  // 审核动作
  auditAction: {
    submit: '提交',
    approve: '通过',
    reject: '驳回',
  },

  // 审核结果
  auditResult: {
    passed: '通过',
    rejected: '驳回',
  },

  // 提示信息
  messages: {
    batchNotFound: '批次不存在',
    batchNotCollecting: '批次不在采集中状态',
    demandNotFound: '需求不存在',
    canOnlyEditDraftOrRejected: '只能编辑草稿或已驳回状态的需求',
    onlyCreatorCanEdit: '只有创建者可以编辑',
    onlyCreatorCanDelete: '只有创建者可以删除',
    canOnlyDeleteDraft: '只能删除草稿状态的需求',
    saveFailed: '保存失败',
    updateFailed: '更新失败,请重试',
    deleteFailed: '删除失败',
    noData: '暂无数据',
  },

  // 详情页专用
  detailSections: {
    basicInfo: '基本信息',
    farmerInfo: '农民信息',
    submitConfirm: '确认提交该需求到村级审核吗?',
    batchSubmitConfirm: '确认提交选中的 {count} 条需求到村级审核吗?',
    submitSuccess: '提交成功',
    submitFailed: '提交失败',
    batchSubmitResult: '提交完成: 成功 {success} 条, 失败 {fail} 条',
    pleaseSelectData: '请选择要提交的数据',
    demandInfo: '需求信息',
    itemsInfo: '投入品明细',
    auditInfo: '审核记录',
  },
}
