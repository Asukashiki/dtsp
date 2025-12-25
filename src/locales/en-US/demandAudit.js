export default {
  // Input Demand Audit
  title: 'Input Demand Audit',
  subtitle: 'Hierarchical audit of farmer input demand applications',
  list: 'Pending Audit List',
  detail: 'Audit Details',

  // Tabs
  tabs: {
    pending: 'Pending',
    approved: 'Approved',
  },

  // Search and Filter
  searchPlaceholder: 'Search farmer name',
  filterByBatch: 'Filter by Batch',
  filterByKebele: 'Filter by Kebele',
  filterByWoreda: 'Filter by Woreda',
  allBatches: 'All Batches',
  allKebeles: 'All Kebeles',
  allWoredas: 'All Woredas',

  // Action Buttons
  actions: {
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    batchApprove: 'Batch Approve',
    batchReject: 'Batch Reject',
    submit: 'Submit',
    lockBatch: 'Lock Batch',
    aggregationSubmit: 'Submit Aggregation',
    aggregationDetail: 'Aggregation Detail',
    back: 'Back',
  },

  // Table Columns
  columns: {
    batchNo: 'Batch No.',
    farmerName: 'Farmer Name',
    farmerIdNumber: 'ID Number',
    kebele: 'Kebele',
    woreda: 'Woreda',
    village: 'Village',
    landArea: 'Land Area',
    currentAuditLevel: 'Current Audit Level',
    submitTime: 'Submit Time',
    actions: 'Actions',
  },

  // Audit Level
  auditLevel: {
    village: 'Village',
    town: 'Town',
    district: 'District',
    state: 'State',
    ministry: 'Ministry',
  },

  // Approve Dialog
  approveDialog: {
    title: 'Approve Audit',
    remark: 'Audit Remark',
    remarkPlaceholder: 'Please enter audit remark (optional)',
    confirmMessage: 'Are you sure to approve {count} selected demand(s)?',
    success: 'Approved successfully',
  },

  rejectDialog: {
    title: 'Reject Audit',
    auditOpinion: 'Rejection Reason',
    auditOpinionPlaceholder: 'Please enter rejection reason (required)',
    remark: 'Audit Remark',
    remarkPlaceholder: 'Please enter audit remark (optional)',
    confirmMessage: 'Are you sure to reject {count} selected demand(s)?',
    success: 'Rejected successfully',
    auditOpinionRequired: 'Please enter rejection reason',
  },

  // Unified Audit Dialog
  auditDialog: {
    title: 'Audit',
    auditOpinion: 'Audit Opinion',
    auditOpinionPlaceholder: 'Please enter audit opinion (optional)',
  },

  lockBatchDialog: {
    title: 'Lock Batch',
    message: 'Once locked, batch data cannot be modified. Are you sure to lock this batch?',
    success: 'Batch locked successfully',
    notAllApproved: 'Cannot lock batch with unapproved demands',
  },

  submitDialog: {
    title: 'Submit for Audit',
    confirmMessage: 'Are you sure to submit {count} selected demand(s)?',
    success: 'Submitted successfully',
  },

  // Detail Page Sections
  detailSections: {
    basicInfo: 'Basic Information',
    farmerInfo: 'Farmer Information',
    itemsInfo: 'Input Items',
    auditInfo: 'Audit Records',
  },

  // Form Fields (reference farmer demand fields)
  form: {
    batchNo: 'Batch Number',
    farmerId: 'Farmer ID',
    farmerName: 'Farmer Name',
    farmerIdNumber: 'Farmer ID Number',
    zone: 'Zone',
    woreda: 'Woreda',
    kebele: 'Kebele',
    village: 'Village',
    landArea: 'Total Land Area (hectares)',
    maxSeedQuantity: 'Estimated Max Seed Quantity (kg)',
    maxFertilizerQuantity: 'Estimated Max Fertilizer Quantity (kg)',
    status: 'Status',
    currentAuditLevel: 'Current Audit Level',
    daUserName: 'Entered by DA',
    submitTime: 'Submit Time',
    remark: 'Remark',
    createdTime: 'Created Time',

    // Input Items
    inputCategory: 'Category',
    inputType: 'Input Type',
    variety: 'Variety',
    specification: 'Specification',
    unit: 'Unit',
    quantity: 'Demand Quantity',
    noItems: 'No input items',
  },

  // Audit Records
  auditRecords: {
    title: 'Audit Records',
    noRecords: 'No audit records',
    auditLevel: 'Audit Level',
    auditUserName: 'Auditor',
    auditTime: 'Audit Time',
    auditAction: 'Audit Action',
    auditResult: 'Audit Result',
    auditOpinion: 'Audit Opinion',
  },

  // Audit Action
  auditAction: {
    submit: 'Submit',
    approve: 'Approve',
    reject: 'Reject',
  },

  // Audit Result
  auditResult: {
    passed: 'Passed',
    rejected: 'Rejected',
  },

  // Status
  status: {
    draft: 'Draft',
    submitted: 'Submitted',
    approved: 'Approved',
    rejected: 'Rejected',
    locked: 'Locked',
  },

  // Input Category
  inputCategory: {
    seed: 'Seed',
    fertilizer: 'Fertilizer',
    pesticide: 'Pesticide',
  },

  // Aggregation
  aggregation: {
    title: 'Input Aggregation Detail',
    dialogTitle: 'Aggregation Statistics',
    submitConfirm: 'Are you sure to submit aggregation data?',
    submitSuccess: 'Aggregation submitted successfully',
    submitFailed: 'Aggregation submission failed',
    inputCategory: 'Category',
    inputType: 'Input Type',
    totalQuantity: 'Total Quantity',
    totalCount: 'Total Items',
    demandCount: 'Demand Count',
    sourceName: 'Source',
    targetName: 'Target',
    status: 'Status',
    createdTime: 'Created Time',
    noData: 'No aggregation data',
  },

  // Aggregation Status
  aggregationStatus: {
    pending: 'Pending',
    success: 'Success',
    rejected: 'Rejected',
  },

  // Messages
  messages: {
    selectItems: 'Please select demands to operate',
    noData: 'No data available',
    loadFailed: 'Failed to load data',
    operationSuccess: 'Operation successful',
    operationFailed: 'Operation failed',
    auditLevelMismatch: 'Audit level mismatch',
    demandNotFound: 'Demand not found',
    invalidStatus: 'Invalid status',
  },
}
