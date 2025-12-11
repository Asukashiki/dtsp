export default {
  title: 'Town Demand Aggregation Audit',
  subtitle: 'Review village demand aggregation summary data',
  listTitle: 'Town Aggregation Audit List',

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
  },

  approveDialog: {
    confirmMessage: 'Are you sure to approve this record?',
  },

  actions: {
    viewDetail: 'View Detail',
    viewAggregate: 'Aggregation Summary',
  },
}
