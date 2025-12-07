export default {
  title: 'Breeding Dataset Audit',
  subtitle: 'Review submitted datasets',
  list: 'Audit List',
  detail: 'Audit Details',
  history: 'Audit History',
  auditSuccess: 'Audit successful',
  approveConfirm: 'Are you sure to approve this dataset?',
  rejectConfirm: 'Are you sure to reject this dataset? Please provide rejection reason',
  needsRevisionConfirm: 'Are you sure to mark this dataset as needs revision? Please provide revision comments',

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
    needs_revision: 'Needs Revision',
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
    compilationInfo: 'Compilation Information',
    auditOpinion: 'Audit Opinion',
    auditTime: 'Audit Time',
    auditorName: 'Auditor',
    auditorOrgName: 'Audit Organization',
    submitTime: 'Submit Time',
    submitterName: 'Submitter',
    submitterOrgName: 'Submit Organization',
    datasetCode: 'Dataset Code',
    trialId: 'Trial ID',
    batchId: 'Breeding Batch ID',
    batchName: 'Breeding Batch Name',
    versionNo: 'Version Number',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    recordCount: 'Record Count',
    compiledBy: 'Compiled By',
    compiledByName: 'Compiler Name',
    compiledAt: 'Compiled At',
    datasetStatus: 'Dataset Status',
    auditStatus: 'Audit Status',
    createdTime: 'Created Time',
    updatedTime: 'Updated Time',
    createdBy: 'Created By',
    submitBy: 'Submitted By',
    submitOrg: 'Submit Organization',
    auditBy: 'Audited By',
    creationInfo: 'Creation Information',
    lockedFlag: 'Locked Status',
    locked: 'Locked',
    unlocked: 'Unlocked',
    lockDataset: 'Lock Dataset',
    lockDatasetTip: 'Lock dataset after approval, making it read-only',
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
    auditId: 'Audit ID',
    datasetId: 'Dataset ID',
    datasetCode: 'Dataset Code',
    reviewerId: 'Reviewer ID',
    trialId: 'Trial ID',
    batchId: 'Batch ID',
    batchName: 'Batch Name',
    versionNo: 'Version',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    recordCount: 'Records',
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
    auditOpinion: 'Audit Opinion',
    lockedFlag: 'Locked Status',
    createdTime: 'Created Time',
    updatedTime: 'Updated Time',
    actions: 'Actions',
  },

  // Action Buttons
  actions: {
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    needsRevision: 'Needs Revision',
    audit: 'Audit',
    viewHistory: 'View History',
  },

  // Messages
  message: {
    approveSuccess: 'Approved successfully',
    rejectSuccess: 'Rejected successfully',
    needsRevisionSuccess: 'Marked as needs revision successfully',
    datasetCodeGenerated: 'Dataset code generated',
    onlySubmittedCanAudit: 'Only submitted or reviewing datasets can be audited',
    rejectOpinionRequired: 'Rejection reason is required when rejecting',
    needsRevisionOpinionRequired: 'Revision comments are required when marking as needs revision',
    auditOpinionLabel: 'Audit Opinion',
    datasetLocked: 'Dataset is locked and cannot be modified',
    datasetUnlocked: 'Dataset is unlocked and can be modified',
  },
}