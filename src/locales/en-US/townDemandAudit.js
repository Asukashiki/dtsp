export default {
  title: 'Town Input Demand Audit',
  subtitle: 'Town-level hierarchical audit of farmer input demand applications',
  list: 'Pending Audit List',
  detail: 'Audit Details',

  tabs: {
    pending: 'Pending',
    summary: 'Data Aggregation',
  },

  searchPlaceholder: 'Search farmer name',

  actions: {
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    batchApprove: 'Batch Approve',
    batchReject: 'Batch Reject',
    summarySubmit: 'Submit Aggregated Data',
  },

  // Pending list columns (town level)
  columns: {
    source: 'Source',
    inputCategory: 'Category',
    inputType: 'Input Type',
    totalQuantity: 'Total Demand Quantity',
    submitTime: 'Submit Time',
    actions: 'Actions',
  },

  // Summary table (same structure as village)
  summary: {
    title: 'Approved Demand Aggregation',
    description: 'Aggregated statistics of approved input demand in current town',
    list: 'Aggregation List',
    inputCategory: 'Category',
    inputType: 'Input Type',
    totalQuantity: 'Total Demand Quantity',
  },

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

  messages: {
    selectItems: 'Please select demands to operate',
    noData: 'No data available',
    loadFailed: 'Failed to load data',
    operationFailed: 'Operation failed',
  },
}
