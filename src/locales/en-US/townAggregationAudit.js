export default {
  title: 'Woreda Demand Aggregation Audit',
  subtitle: 'Review kebele demand aggregation summary data',
  listTitle: 'Woreda Aggregation Audit List',

  columns: {
    sourceCode: 'Source Code',
    sourceName: 'Source Name',
    targetCode: 'Target Code',
    targetName: 'Target Name',
    status: 'Status',
  },

  status: {
    draft: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  detailDialog: {
    title: 'Aggregation Detail Data',
    noData: 'No detail data',
  },

  adjustment: {
    title: 'WOREDA LEVEL - Adjust Demand Received from Kebele',
    index: '#',
    emptyTitle: 'Select a detail row',
    emptyTip: 'Use Adjust or View History to review and manage one demand item.',
    kebeleName: 'Kebele Name',
    inputType: 'Input Type',
    category: 'Category',
    variety: 'Variety',
    season: 'Season',
    receivedDemand: 'Received Demand from Kebele',
    adjustedDemand: 'Adjusted Demand by Woreda',
    currentAdjustedDemand: 'Current Adjusted Demand by Woreda',
    newAdjustedDemand: 'New Adjusted Demand by Woreda',
    adjustmentRemark: 'Adjustment Remark',
    status: 'Status',
    adjust: 'Adjust',
    adjustPanelTitle: 'Adjust Demand',
    submitToZone: 'Submit to Zone',
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
    submitConfirm: 'Are you sure to submit this detail to Zone?',
    submitSuccess: 'Submitted to Zone successfully',
    submitFailed: 'Failed to submit to Zone',
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

  aggregateDialog: {
    title: 'Aggregation Summary Data',
    noData: 'No summary data',
  },

  messages: {
    noData: 'No data',
    loadFailed: 'Failed to load data',
    detailLoadFailed: 'Failed to load detail data',
    aggregateLoadFailed: 'Failed to load aggregation data',
    approveSuccess: 'Approved successfully',
    approveFailed: 'Approval failed',
    rejectSuccess: 'Rejected successfully',
    rejectFailed: 'Rejection failed',
  },

  approveDialog: {
    confirmMessage: 'Are you sure to approve this record?',
  },

  rejectDialog: {
    confirmMessage: 'Are you sure to reject this record?',
  },

  actions: {
    viewDetail: 'View Detail',
    viewAggregate: 'Aggregation Summary',
  },
}
