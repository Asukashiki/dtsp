export default {
  // 页面标题
  title: 'C1 Breeding Batch Management',
  subtitle: 'Manage C1 seed propagation batch information',

  // 操作
  add: 'Add Batch',
  edit: 'Edit Batch',
  delete: 'Delete',
  view: 'View Details',

  // 搜索
  searchPlaceholder: 'Search by batch ID, variety name...',
  filterByCrop: 'Filter by crop',
  filterByStatus: 'Filter by status',
  allCrops: 'All Crops',
  allStatus: 'All Status',

  // 表单
  form: {
    basicInfo: 'Basic Information',
    breedingInfo: 'Breeding Information',
    orgInfo: 'Organization Information',
    batchId: 'Batch ID',
    linkedBatchNo: 'Linked Batch No.',
    propagationId: 'Related Application ID',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    varietyCode: 'Variety Code',
    breedingLevel: 'Breeding Level',
    breedingMethod: 'Breeding Method',
    parentSeedSource: 'Parent Seed Source',
    startDate: 'Start Date',
    endDate: 'End Date',
    expectedYield: 'Expected Yield (kg)',
    actualYield: 'Actual Yield (kg)',
    plantingArea: 'Planting Area (ha)',
    batchStatus: 'Batch Status',
    orgId: 'Organization ID',
    orgName: 'Organization Name',
    orgType: 'Organization Type',
    location: 'Location',
    remark: 'Remarks'
  },

  // 占位符
  placeholder: {
    linkedBatchNo: 'Please select an approved propagation application',
    cropType: 'Please select crop type',
    varietyName: 'Please enter variety name',
    varietyCode: 'Please enter variety code',
    breedingLevel: 'Please select breeding level',
    breedingMethod: 'Please select breeding method',
    parentSeedSource: 'Please enter parent seed source',
    startDate: 'Please select start date',
    endDate: 'Please select end date',
    expectedYield: 'Please enter expected yield',
    actualYield: 'Please enter actual yield',
    plantingArea: 'Please enter planting area',
    orgId: 'Organization ID',
    orgName: 'Organization Name',
    location: 'Please enter location',
    remark: 'Please enter remarks'
  },

  // 表格列
  columns: {
    batchId: 'Batch ID',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    breedingLevel: 'Breeding Level',
    startDate: 'Start Date',
    status: 'Status',
    trackingCount: 'Tracking Records',
    testCount: 'Test Records',
    actions: 'Actions'
  },

  // 繁殖级别
  breedingLevel: {
    parentPrep: 'Parent Preparation',
    original: 'Pre-basic/Breeder Seed',
    foundation: 'Basic/Foundation Seed',
    certified: 'Certified Seed'
  },

  // 状态
  status: {
    ongoing: 'Ongoing',
    completed: 'Completed',
    terminated: 'Terminated'
  },

  // 详情页
  detail: {
    title: 'Batch Details',
    tabs: {
      basicInfo: 'Basic Info',
      trackingRecords: 'Tracking Records',
      testRecords: 'Test Records'
    },
    basicInfo: 'Basic Information',
    timeline: 'Timeline',
    yieldData: 'Yield Data',
    relatedRecords: 'Related Records',
    orgInfo: 'Organization Information',
    trackingCount: 'Tracking Records',
    testCount: 'Test Records'
  },

  // 验证规则
  rules: {
    cropTypeRequired: 'Please select crop type',
    varietyNameRequired: 'Please enter variety name',
    breedingLevelRequired: 'Please select breeding level',
    startDateRequired: 'Please select start date'
  },

  // 消息
  messages: {
    addSuccess: 'Batch added successfully',
    updateSuccess: 'Batch updated successfully',
    deleteSuccess: 'Batch deleted successfully',
    deleteConfirm: 'Are you sure to delete this batch?',
    loadError: 'Failed to load data'
  },

  // 跟踪记录
  tracking: {
    add: 'Add Tracking',
    edit: 'Edit Tracking',
    detail: 'Tracking Details',
    deleteConfirm: 'Are you sure to delete this tracking record?',
    trackingId: 'Tracking ID',
    location: 'Location',
    result: 'Tracking Result',
    startDate: 'Start Date',
    endDate: 'End Date',
    operator: 'Operator',
    description: 'Description',
    resultNormal: 'Normal',
    resultAbnormal: 'Abnormal',
    resultObserving: 'Observing'
  },

  // 检测记录
  test: {
    add: 'Add Test',
    edit: 'Edit Test',
    detail: 'Test Details',
    deleteConfirm: 'Are you sure to delete this test record?',
    testId: 'Test ID',
    testItem: 'Test Item',
    testDate: 'Test Date',
    testValue: 'Test Value',
    testResult: 'Test Result',
    tester: 'Tester',
    testOrg: 'Test Organization',
    description: 'Description',
    resultPass: 'Pass',
    resultFail: 'Fail',
    resultRetest: 'Pending Retest'
  }
}
