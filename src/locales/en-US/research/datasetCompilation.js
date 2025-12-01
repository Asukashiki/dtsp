// 育种数据集编制国际化文件
export default {
  title: 'Breeding Dataset Compilation',
  subtitle: 'Aggregate breeding batch data and submit for review',
  list: 'Dataset List',
  add: 'Add Dataset',
  edit: 'Edit Dataset',
  detail: 'Dataset Details',
  delete: 'Delete Dataset',
  deleteConfirm: 'Are you sure to delete this dataset?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Edited successfully',
  submitSuccess: 'Submitted successfully',
  submitConfirm: 'Are you sure to submit this dataset?',

  // Search and Filter
  searchPlaceholder: 'Search batch ID, batch name, variety name',
  filterByCrop: 'Filter by crop type',
  filterByStatus: 'Filter by dataset status',
  allCrops: 'All Crops',
  allStatus: 'All Status',

  // Dataset Status
  status: {
    draft: 'Draft',
    submitted: 'Submitted',
    reviewing: 'Reviewing',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  // Form Fields
  form: {
    basicInfo: 'Basic Information',
    datasetCode: 'Dataset Code',
    batchId: 'Breeding Batch ID',
    batchName: 'Breeding Batch Name',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    statisticsInfo: 'Data Statistics',
    trialCount: 'Trial Records',
    fieldDataCount: 'Field Data Records',
    envDataCount: 'Environment Data Records',
    labTestCount: 'Lab Test Records',
    yieldDataCount: 'Yield Data Records',
    datasetStatus: 'Dataset Status',
    submitInfo: 'Submission Information',
    submitTime: 'Submit Time',
    submitBy: 'Submitted By',
    submitByName: 'Submitter Name',
    submitOrgName: 'Submit Organization',
    operatorInfo: 'Operator Information',
    createTime: 'Create Time',
    createBy: 'Created By',
    remark: 'Remark',
  },

  // Form Placeholders
  placeholder: {
    batchId: 'Please enter breeding batch ID',
    batchName: 'Please enter breeding batch name',
    cropType: 'Please select crop type',
    varietyName: 'Please enter variety name',
    remark: 'Please enter remark (optional)',
  },

  // Form Validation
  rules: {
    batchIdRequired: 'Breeding batch ID is required',
    batchNameRequired: 'Breeding batch name is required',
    cropTypeRequired: 'Crop type is required',
    varietyNameRequired: 'Variety name is required',
  },

  // List Columns
  columns: {
    datasetCode: 'Dataset Code',
    batchId: 'Batch ID',
    batchName: 'Batch Name',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    trialCount: 'Trials',
    labTestCount: 'Tests',
    yieldDataCount: 'Yields',
    datasetStatus: 'Status',
    submitTime: 'Submit Time',
    createTime: 'Create Time',
    actions: 'Actions',
  },

  // Action Buttons
  actions: {
    submit: 'Submit for Review',
    statistics: 'Data Statistics',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
  },

  // Messages
  message: {
    noLabTest: 'At least one lab test record is required to submit',
    noYieldData: 'At least one yield data record is required to submit',
    onlyDraftCanEdit: 'Only draft datasets can be edited',
    onlyDraftCanDelete: 'Only draft datasets can be deleted',
    onlyDraftCanSubmit: 'Only draft datasets can be submitted',
    submitRequirement: 'Note: At least 1 lab test record and 1 yield data record are required to submit',
    cannotEditApproved: 'This dataset has been approved and cannot be modified',
  },
}
