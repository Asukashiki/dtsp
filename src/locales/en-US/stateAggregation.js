export default {
  // State Demand Aggregation
  title: 'State Demand Aggregation',
  subtitle: 'Manage and aggregate state-level district demand data',

  // Actions
  actions: {
    addYear: 'Add Year',
    detail: 'Detail',
    view: 'View',
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

  // Detail Dialog
  detailDialog: {
    title: 'Aggregation Data Detail',
    columns: {
      inputCategory: 'Category',
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
  },
}
