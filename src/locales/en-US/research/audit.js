// 企业审核国际化文件
export default {
  title: 'Seed Enterprise Audit',
  subtitle: 'Review enterprise registration application materials',
  taskList: 'Audit Task List',
  taskDetail: 'Audit Task Details',
  detailTitle: 'Audit Details',
  detailSubtitle: 'View enterprise information and conduct audit',

  // Search and Filter
  search: {
    placeholder: 'Search enterprise name, credit code',
  },
  filter: {
    enterpriseType: 'Filter by enterprise type',
    urgency: 'Filter by urgency',
  },

  // Urgency
  urgency: {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  },

  // Table Columns
  columns: {
    enterpriseName: 'Enterprise Name',
    unifiedSocialCreditCode: 'Unified Social Credit Code',
    enterpriseType: 'Enterprise Type',
    seedLicenseNo: 'Seed License No.',
    applicationDate: 'Application Date',
    currentStage: 'Current Stage',
    assignedAuditor: 'Assigned Auditor',
    auditStatus: 'Audit Status',
    submissionTime: 'Submission Time',
    urgency: 'Urgency',
    actions: 'Actions',
  },

  // Table Messages
  table: {
    noData: 'No data available',
  },

  // Audit Status
  status: {
    pending: 'In Review',
    approved: 'Approved',
    rejected: 'Rejected',
    published: 'Published',
  },

  // Audit Stage
  stage: {
    initial: 'Initial Review',
    recheck: 'Re-review',
    final: 'Final Review',
  },

  // Audit Result
  result: {
    pass: 'Approve',
    reject: 'Reject',
  },

  // Detail Page Section Titles
  sections: {
    basicInfo: 'Enterprise Basic Information',
    extraInfo: 'Enterprise Additional Information',
    documents: 'Required Documents',
    auditOperation: 'Audit Operation',
  },

  // Enterprise Extra Information
  extraInfo: {
    establishmentDate: 'Establishment Date',
    legalPersonName: 'Legal Person Name',
    legalPersonId: 'Legal Person ID',
    contactPersonName: 'Contact Person Name',
    contactPhone: 'Contact Phone',
    email: 'Email',
  },

  // Required Documents
  documents: {
    businessLicense: 'Business License',
    seedLicense: 'Seed License',
    taxRegistration: 'Tax Registration Certificate',
    factoryPermit: 'Factory Permit',
    otherDocuments: 'Other Documents',
    viewDocument: 'View Document',
    download: 'Download',
  },

  // Form Fields
  form: {
    auditResult: 'Audit Result',
    auditOpinion: 'Audit Opinion',
    auditor: 'Auditor',
    auditTime: 'Audit Time',
    rejectReason: 'Rejection Reason',
  },

  // Form Placeholders
  placeholder: {
    auditOpinion: 'Please enter audit opinion',
    rejectReason: 'Please enter rejection reason',
  },

  // Form Rules
  rules: {
    auditResultRequired: 'Please select audit result',
    auditOpinionRequired: 'Please enter audit opinion',
    rejectReasonRequired: 'Rejection reason is required when rejecting',
  },

  // Action Buttons
  actions: {
    submit: 'Submit Audit',
    back: 'Back to List',
    backToList: 'Back to List',
    audit: 'Audit',
    search: 'Search',
    reset: 'Reset',
  },

  // Messages
  messages: {
    submitSuccess: 'Audit submitted successfully',
    submitFailed: 'Failed to submit audit',
    confirmSubmit: 'Are you sure to submit the audit result?',
  },
}