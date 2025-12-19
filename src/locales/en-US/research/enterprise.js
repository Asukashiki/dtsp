// 企业注册备案国际化文件
export default {
  title: 'Seed Enterprise Authentication',
  subtitle: 'Fill in enterprise basic information and submit authentication application',
  list: 'Enterprise List',
  add: 'Add Enterprise Authentication',
  edit: 'Edit Enterprise Information',
  detail: 'Enterprise Details',
  apply: 'Apply for Authentication',
  viewDetail: 'View Details',

  // Search and Filter
  searchPlaceholder: 'Search enterprise name, credit code, license number',
  filterByType: 'Filter by enterprise type',
  filterByStatus: 'Filter by authentication status',
  allTypes: 'All Types',
  allStatus: 'All Status',

  // Enterprise Type
  type: {
    production: 'Production-oriented',
    trade: 'Trade-oriented',
    integrated: 'Integrated',
  },

  // Authentication Status
  status: {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    draft: 'Draft',
  },

  // Form Fields - Enterprise Identity Information
  form: {
    identityInfo: 'Enterprise Identity Information',
    locationInfo: 'Location & Operation Information',
    extraInfo: 'Additional Enterprise Information',
    documentsInfo: 'Required Documents',
    operationInfo: 'Operation Information',

    enterpriseName: 'Enterprise Name',
    enterpriseId: 'Enterprise Registration ID',
    unifiedSocialCreditCode: 'Unified Social Credit Code',
    enterpriseType: 'Enterprise Type',
    seedLicenseNo: 'Seed TIN Number',
    licenseStartDate: 'License Start Date',
    licenseEndDate: 'License Expiration Date',

    region: 'Region',
    zone: 'Zone',
    county: 'County',
    township: 'Township',
    detailedAddress: 'Detailed Address',
    businessScope: 'Business Scope',
    annualProductionCapacity: 'Annual Production Capacity (tons/year)',

    establishmentDate: 'Establishment Date',
    legalPersonName: 'Legal Person Name',
    legalPersonId: 'Legal Person ID',
    contactPerson: 'Contact Person',
    contactPhone: 'Contact Phone',
    contactEmail: 'Email',

    businessLicense: 'Business License',
    seedLicense: 'Seed License',
    taxRegistration: 'Tax Registration Certificate',
    factoryLicense: 'Factory License',

    operator: 'Operator',
    operationOrg: 'Operation Organization',
    operationTime: 'Operation Time',
    certificationStatus: 'Authentication Status',
  },

  // Form Placeholders
  placeholder: {
    enterpriseName: 'Please enter enterprise name',
    unifiedSocialCreditCode: 'Please enter unified social credit code',
    enterpriseType: 'Please select enterprise type',
    seedLicenseNo: 'Please enter seed TIN Number',
    licenseStartDate: 'Please select license start date',
    licenseEndDate: 'Please select license expiration date',
    region: 'Please select region',
    zone: 'Please select zone',
    county: 'Please select county',
    township: 'Please select township',
    detailedAddress: 'Please enter detailed address',
    businessScope: 'Please enter business scope',
    annualProductionCapacity: 'Please enter annual production capacity',
    establishmentDate: 'Please select establishment date',
    legalPersonName: 'Please enter legal person name',
    legalPersonId: 'Please enter legal person ID',
    contactPerson: 'Please enter contact person',
    contactPhone: 'Please enter contact phone',
    contactEmail: 'Please enter email (optional)',
  },

  // Form Rules
  rules: {
    enterpriseNameRequired: 'Please enter enterprise name',
    unifiedSocialCreditCodeRequired: 'Please enter unified social credit code',
    unifiedSocialCreditCodeLength: 'Unified social credit code',
    enterpriseTypeRequired: 'Please select enterprise type',
    seedLicenseNoRequired: 'Please enter seed TIN Number',
    licenseStartDateRequired: 'Please select license start date',
    licenseEndDateRequired: 'Please select license expiration date',
    regionRequired: 'Please select region',
    zoneRequired: 'Please select zone',
    countyRequired: 'Please select county',
    townshipRequired: 'Please select township',
    detailedAddressRequired: 'Please enter detailed address',
    businessScopeRequired: 'Please enter business scope',
    annualProductionCapacityRequired: 'Please enter annual production capacity',
    establishmentDateRequired: 'Please select establishment date',
    legalPersonNameRequired: 'Please enter legal person name',
    legalPersonIdRequired: 'Please enter legal person ID',
    contactPersonRequired: 'Please enter contact person',
    contactPhoneRequired: 'Please enter contact phone',
    contactPhoneFormat: 'Please enter a valid phone number',
    contactEmailFormat: 'Please enter a valid email format',
    businessLicenseRequired: 'Please upload business license',
    seedLicenseRequired: 'Please upload seed license',
    taxRegistrationRequired: 'Please upload tax registration certificate',
    factoryLicenseRequired: 'Please upload factory license',
  },

  // Table Columns
  columns: {
    enterpriseName: 'Enterprise Name',
    unifiedSocialCreditCode: 'Unified Social Credit Code',
    enterpriseType: 'Enterprise Type',
    seedLicenseNo: 'License Number',
    licenseEndDate: 'License Expiration Date',
    certificationStatus: 'Authentication Status',
    applicationDate: 'Application Date',
    auditStage: 'Audit Stage',
    auditor: 'Auditor',
    createTime: 'Created Time',
    actions: 'Actions',
  },

  // Action Buttons
  actions: {
    submit: 'Submit Application',
    saveDraft: 'Save as Draft',
    edit: 'Edit',
    view: 'View',
    audit: 'Audit',
    delete: 'Delete',
    approve: 'Approve',
    reject: 'Reject',
  },

  // Messages
  messages: {
    submitSuccess: 'Submitted successfully',
    saveDraftSuccess: 'Draft saved successfully',
    deleteConfirm: 'Are you sure to delete this enterprise authentication application?',
    deleteSuccess: 'Deleted successfully',
    uploadTip: 'Supports PDF, JPG formats, single file size less than 2MB',
    rejectedTitle: 'Audit Failed',
    notApplied: 'Not Applied',
    tonsPerYear: 'tons/year',
  },
}