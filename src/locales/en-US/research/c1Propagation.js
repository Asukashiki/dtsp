// C1种子繁殖申请国际化文件 - English
export default {
  // Page titles
  title: 'Seed Propagation Application',
  subtitle: 'Union/Cooperative applies for seed propagation',
  auditTitle: 'Seed Propagation Audit',
  auditSubtitle: 'OIA reviews seed propagation applications',

  // Actions
  add: 'Add Application',
  edit: 'Edit Application',
  delete: 'Delete Application',
  audit: 'Audit',
  detail: 'Application Details',
  auditDetail: 'Audit Details',
  searchPlaceholder: 'Search organization name, variety name',
  deleteConfirm: 'Are you sure to delete this application?',
  deleteSuccess: 'Deleted Successfully',
  addSuccess: 'Added Successfully',
  updateSuccess: 'Updated Successfully',
  auditSuccess: 'Audit Submitted Successfully',

  // Status
  status: {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected'
  },

  // Form sections
  form: {
    basicInfo: 'Basic Information',
    applicationInfo: 'Application Information',
    propagationInfo: 'Propagation Information',
    auditInfo: 'Audit Information',
    operatorInfo: 'Operator Information',

    // Fields
    applicantOrgType: 'Applicant Organization Type',
    applicantOrgName: 'Applicant Organization Name',
    applicantOrgId: 'Applicant Organization ID',
    propagationBatchId: 'Propagation Batch ID',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    varietyCode: 'Variety Code',
    species: 'Species',
    applyDate: 'Application Date',
    applyDescription: 'Application Description',
    applyStatus: 'Application Status',
    demandQuantity: 'Demand Quantity',
    fromSeedType: 'From Seed Type',
    toSeedType: 'To Seed Type',

    // Audit fields
    auditResult: 'Audit Result',
    auditOpinion: 'Audit Opinion',
    auditor: 'Auditor',
    auditOrg: 'Audit Organization',
    auditTime: 'Audit Time',

    // Operator fields
    operator: 'Operator',
    operationOrg: 'Operation Organization',
    operationTime: 'Operation Time',
    createdTime: 'Created Time'
  },

  // Placeholders
  placeholder: {
    applicantOrgType: 'Please select organization type',
    applicantOrgName: 'Please enter organization name',
    applicantOrgId: 'Please enter organization ID',
    propagationBatchId: 'Please enter propagation batch ID',
    cropType: 'Please select crop type',
    varietyName: 'Please enter variety name',
    varietyCode: 'Please enter variety code',
    species: 'Please enter species',
    applyDate: 'Please select application date',
    applyDescription: 'Please enter application description',
    auditResult: 'Please select audit result',
    auditOpinion: 'Please enter audit opinion',
    demandQuantity: 'Please enter demand quantity',
    fromSeedType: 'Please select from seed type',
    toSeedType: 'Please select to seed type'
  },

  // Validation rules
  rules: {
    applicantOrgTypeRequired: 'Please select organization type',
    applicantOrgNameRequired: 'Please enter organization name',
    applicantOrgIdRequired: 'Please enter organization ID',
    propagationBatchIdRequired: 'Please enter propagation batch ID',
    cropTypeRequired: 'Please select crop type',
    varietyNameRequired: 'Please enter variety name',
    auditResultRequired: 'Please select audit result',
    auditOpinionRequired: 'Please enter audit opinion',
    demandQuantityRequired: 'Please enter demand quantity',
    fromSeedTypeRequired: 'Please select from seed type',
    toSeedTypeRequired: 'Please select to seed type'
  },

  // Table columns
  columns: {
    applicantOrgName: 'Organization Name',
    authId: 'Auth ID',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    applyDate: 'Application Date',
    applyStatus: 'Status',
    auditResult: 'Audit Result',
    auditor: 'Auditor',
    auditTime: 'Audit Time',
    createdTime: 'Created Time',
    actions: 'Actions'
  },

  // Organization types
  orgType: {
    union: 'Union',
    cooperative: 'Cooperative'
  },

  // Audit results
  auditResult: {
    approved: 'Approved',
    rejected: 'Rejected'
  }
}
