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
