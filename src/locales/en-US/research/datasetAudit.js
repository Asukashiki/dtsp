export default {
  title: 'Breeding Dataset Audit',
  subtitle: 'Review submitted datasets',
  list: 'Audit List',
  detail: 'Audit Details',
  history: 'Audit History',
  auditSuccess: 'Audit successful',
  approveConfirm: 'Are you sure to approve this dataset?',
  rejectConfirm: 'Are you sure to reject this dataset? Please provide rejection reason',

  // Search and Filter
  searchPlaceholder: 'Search dataset code, batch name, variety name',
  filterByAuditStatus: 'Filter by audit status',
  filterByDatasetStatus: 'Filter by dataset status',
  allAuditStatus: 'All Audit Status',
  allDatasetStatus: 'All Dataset Status',

  // Audit Status
  auditStatus: {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  // Dataset Status
  datasetStatus: {
    submitted: 'Submitted',
    reviewing: 'Reviewing',
    approved: 'Approved',
    rejected: 'Rejected',
  },

  // Form Fields
  form: {
    basicInfo: 'Dataset Basic Information',
    dataStatistics: 'Data Statistics',
    auditInfo: 'Audit Information',
    submitInfo: 'Submit Information',
    auditOpinion: 'Audit Opinion',
    auditTime: 'Audit Time',
    auditorName: 'Auditor',
    auditorOrgName: 'Audit Organization',
    submitTime: 'Submit Time',
    submitterName: 'Submitter',
    submitterOrgName: 'Submit Organization',
    datasetCode: 'Dataset Code',
    batchId: 'Breeding Batch ID',
    batchName: 'Breeding Batch Name',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    datasetStatus: 'Dataset Status',
    auditStatus: 'Audit Status',
    createdTime: 'Created Time',
    updatedTime: 'Updated Time',
    createdBy: 'Created By',
    submitBy: 'Submitted By',
    submitOrg: 'Submit Organization',
    auditBy: 'Audited By',
    creationInfo: 'Creation Information',
  },

  // Form Placeholders
  placeholder: {
    auditOpinion: 'Please enter audit opinion (required for rejection)',
    selectAuditStatus: 'Please select audit status',
    selectDatasetStatus: 'Please select dataset status',
  },

  // Form Validation
  rules: {
    auditOpinionRequired: 'Audit opinion is required for rejection',
    auditStatusRequired: 'Please select audit status',
  },

  // List Columns
  columns: {
    datasetCode: 'Dataset Code',
    batchName: 'Batch Name',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    trialCount: 'Trials',
    fieldDataCount: 'Field Data',
    envDataCount: 'Env Data',
    labTestCount: 'Tests',
    yieldDataCount: 'Yields',
    datasetStatus: 'Dataset Status',
    auditStatus: 'Audit Status',
    submitTime: 'Submit Time',
    submitterName: 'Submitter',
    auditTime: 'Audit Time',
    auditorName: 'Auditor',
    createdTime: 'Created Time',
    updatedTime: 'Updated Time',
    actions: 'Actions',
  },

  // Action Buttons
  actions: {
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    audit: 'Audit',
    viewHistory: 'View History',
  },

  // Messages
  message: {
    approveSuccess: 'Approved successfully',
    rejectSuccess: 'Rejected successfully',
    datasetCodeGenerated: 'Dataset code generated',
    onlySubmittedCanAudit: 'Only submitted or reviewing datasets can be audited',
    rejectOpinionRequired: 'Rejection reason is required when rejecting',
    auditOpinionLabel: 'Audit Opinion',
  },
}