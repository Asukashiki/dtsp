// File name: trait-audit-i18n-en.js (English configuration)
export default {
  // ==================== Trait Audit List Page ====================
  // Page basic copy
  title: "Agronomic Trait Data Audit",
  subtitle: "Review and manage submitted trait data",
  listName: "Trait Audit List",

  // Search area
  auditStatusLabel: "Audit Status",
  pleaseSelect: "Please Select",
  queryBtn: "Query",
  resetBtn: "Reset",

  // Table/mobile column names
  plotId: "Plot ID",
  trialId: "Trial ID",
  batchId: "Batch ID",
  observationDate: "Observation Date",
  growthStage: "Growth Stage",
  traitCount: "Trait Count",
  auditStatus: "Audit Status",
  submitter: "Submitter",
  submitTime: "Submit Time",
  operations: "Operations",

  // Button copy
  viewBtn: "View",
  auditBtn: "Audit",
  backBtn: "Back",

  // Status copy
  emptyData: "No Data Available",
  status: {
    pending: "Pending Audit",
    approved: "Approved",
    rejected: "Rejected"
  },

  // Tabs
  tabs: {
    pendingApproval: "Pending Approval",
    approved: "Approved",
    voided: "Voided"
  },

  // Mobile label copy
  mobileLabels: {
    plotId: "Plot ID",
    observationDate: "Observation Date",
    growthStage: "Growth Stage",
    traitCount: "Trait Count"
  },

  // ==================== Trait Audit Detail Page ====================
  // Page basic
  detailTitle: "Trait Audit Detail",

  // Detail section titles
  cards: {
    basicInfo: "Basic Information",
    traitDetails: "Trait Details",
    photoInfo: "Photo Information",
    systemInfo: "System Information",
    auditInfo: "Audit Information"
  },

  // Trait detail related
  traitName: "Trait Name",
  traitCode: "Trait Code",
  traitValue: "Trait Value",
  unit: "Unit",
  noTraits: "No Trait Data Available",

  // Audit form related
  auditOpinion: "Audit Opinion",
  auditOpinionPlaceholder: "Please enter audit opinion (Required when rejecting)",
  approveBtn: "Approve",
  rejectBtn: "Reject",

  // Audit validation rules
  rules: {
    opinionRequired: "Audit opinion is required when rejecting"
  },

  // Audit prompt information
  confirm: {
    approve: "Are you sure to approve this trait record?",
    reject: "Are you sure to reject this trait record?",
    submit: "Are you sure to submit this trait record for audit?"
  },

  // Operation result prompts
  message: {
    approveSuccess: "Trait record approved successfully",
    rejectSuccess: "Trait record rejected successfully",
    submitSuccess: "Trait record submitted for audit successfully",
    loadFailed: "Failed to load data",
    operationFailed: "Operation failed",
    missingTraitId: "Trait record ID is missing"
  },

  // Log prompts
  log: {
    noAuditRecord: "No audit information found for this trait record",
    loadDetailFailed: "Failed to load trait audit detail",
    approveFailed: "Approval operation failed",
    rejectFailed: "Rejection operation failed",
    submitFailed: "Submission for audit failed"
  },

  // System information
  createBy: "Creator",
  createTime: "Creation Time",
  updateBy: "Updater",
  updateTime: "Update Time",
  auditorName: "Auditor",
  auditTime: "Audit Time"
}