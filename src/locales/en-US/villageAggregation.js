export default {
  // Village Demand Aggregation
  title: 'Village Demand Aggregation',
  subtitle: 'Manage and aggregate village-level farmer demand data',

  // Actions
  actions: {
    addYear: 'Add Year',
    approve: 'Approve',
    submit: 'Submit',
    detail: 'Detail',
    view: 'View',
    delete: 'Delete',
  },

  // Table Columns
  columns: {
    year: 'Year',
    sourceCode: 'Source Code',
    sourceName: 'Source Name',
    targetCode: 'Target Code',
    targetName: 'Target Name',
    status: 'Status',
    creator: 'Creator',
    createTime: 'Create Time',
    subQuantity: 'Sub Quantity',
    actions: 'Actions',
  },

  // Status
  status: {
    draft: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  // Add Year Dialog
  addYearDialog: {
    title: 'Add New Year Record',
    year: 'Select Year',
    yearPlaceholder: 'Please select year',
    confirm: 'Confirm',
    cancel: 'Cancel',
    success: 'Year record created successfully',
    failed: 'Failed to create year record',
    yearRequired: 'Please select a year',
  },

  // Submit Dialog
  submitDialog: {
    confirmMessage: 'Are you sure to submit aggregation data?',
    success: 'Aggregation data submitted successfully',
    failed: 'Failed to submit aggregation data',
  },

  // Detail Dialog
  detailDialog: {
    title: 'Aggregation Data Detail',
    columns: {
      inputCategory: 'Input Category',
      inputType: 'Input Type',
      totalQuantity: 'Total Quantity',
      totalCount: 'Total Count',
    },
    noData: 'No detail data available',
    loadFailed: 'Failed to load detail data',
  },

  // Messages
  messages: {
    noData: 'No data available',
    loadFailed: 'Failed to load data',
    deleteConfirm: 'Are you sure to delete this record?',
    deleteSuccess: 'Deleted successfully',
    deleteFailed: 'Failed to delete',
  },
}
