export default {
  // District Demand Aggregation Audit
  title: 'Zone Demand Aggregation Audit',
  subtitle: 'Review woreda-level submitted demand aggregation data',
  listTitle: 'woreda-level Aggregation Records List',

  // Actions
  actions: {
    viewDetail: 'View Detail',
    approve: 'Approve',
    reject: 'Reject',
  },

  // Table Columns
  columns: {
    sourceCode: 'Source Code',
    sourceName: 'Source Name',
    targetCode: 'Target Code',
    targetName: 'Target Name',
    status: 'Status',
    actions: 'Actions',
  },

  // Status
  status: {
    draft: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  // Approve Dialog
  approveDialog: {
    confirmMessage: 'Are you sure to approve this record?',
  },

  // Reject Dialog
  rejectDialog: {
    confirmMessage: 'Are you sure to reject this record?',
  },

  // Detail Dialog
  detailDialog: {
    title: 'Aggregation Detail',
    noData: 'No detail data available',
  },

  adjustment: {
    title: 'ZONE LEVEL - Adjust Demand Received from Woreda',
    index: '#',
    emptyTitle: 'Select a detail row',
    emptyTip: 'Use Adjust or View History to review and manage one demand item.',
    woredaName: 'Woreda Name',
    inputType: 'Input Type',
    category: 'Category',
    variety: 'Variety',
    season: 'Season',
    receivedDemand: 'Received Demand from Woreda',
    adjustedDemand: 'Adjusted Demand by Zone',
    currentAdjustedDemand: 'Current Adjusted Demand by Zone',
    newAdjustedDemand: 'New Adjusted Demand by Zone',
    adjustmentRemark: 'Adjustment Remark',
    status: 'Status',
    adjust: 'Adjust',
    adjustPanelTitle: 'Adjust Demand',
    submitToZone: 'Submit',
    alreadySubmitted: 'Already Submitted',
    viewHistory: 'View History',
    historyTitle: 'Adjustment History',
    saveAdjustment: 'Save Adjustment',
    cancel: 'Cancel',
    originalQuantity: 'Original Quantity',
    beforeQuantity: 'Before',
    afterQuantity: 'After',
    operator: 'Operator',
    operationType: 'Operation Type',
    operationTime: 'Operation Time',
    remark: 'Remark',
    noHistory: 'No adjustment history',
    saveSuccess: 'Adjustment saved successfully',
    saveFailed: 'Failed to save adjustment',
    historyLoadFailed: 'Failed to load adjustment history',
    submitConfirm: 'Are you sure to submit this detail?',
    submitSuccess: 'Submitted successfully',
    submitFailed: 'Failed to submit',
    requiredAdjustedQuantity: 'Please enter the adjusted quantity',
    requiredAdjustmentRemark: 'Please enter the adjustment remark',
  },

  adjustmentStatus: {
    pending: 'Pending',
    adjusted: 'Adjusted',
    submitted: 'Submitted',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  // Messages
  messages: {
    noData: 'No data available',
    loadFailed: 'Failed to load data',
    detailLoadFailed: 'Failed to load detail data',
    approveSuccess: 'Approved successfully',
    approveFailed: 'Failed to approve',
    rejectSuccess: 'Rejected successfully',
    rejectFailed: 'Failed to reject',
  },
}
