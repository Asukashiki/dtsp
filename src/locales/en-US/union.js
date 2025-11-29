export default {
  // Page Title
  title: 'Breeding Institution Registration',
  subtitle: 'Fill in breeding institution information and submit registration application',
  list: 'Breeding Institution List',
  add: 'Add Breeding Institution Registration',
  edit: 'Edit Breeding Institution Information',
  detail: 'Breeding Institution Details',
  apply: 'Apply for Registration',
  viewDetail: 'View Details',

  // Search and Filter
  searchPlaceholder: 'Search enterprise name, registration ID, license number',
  filterByType: 'Filter by enterprise type',
  filterByStatus: 'Filter by certification status',
  allTypes: 'All Types',
  allStatus: 'All Status',

  // Buttons
  submit: 'Submit Application',
  saveDraft: 'Save Draft',
  cancel: 'Cancel',
  reset: 'Reset',
  search: 'Search',
  delete: 'Delete',
  batchDelete: 'Batch Delete',
  export: 'Export',
  back: 'Back',

  // Tabs
  tabs: {
    identityInfo: 'Identity Information',
    operationInfo: 'Operation Information',
    licenseInfo: 'License Information',
    operatorInfo: 'Operator Information'
  },

  // Form Fields - Identity Information
  form: {
    identityInfo: 'Enterprise Identity Information',
    operationInfo: 'Location & Operation Information',
    licenseInfo: 'License Information',
    operatorInfo: 'Operator Information',

    enterpriseName: 'Enterprise Name',
    enterpriseRegistrationId: 'Enterprise Registration ID',
    unifiedSocialCreditCode: 'Unified Social Credit Code',
    seedEnterpriseLicenseNumber: 'Seed Enterprise License Number',
    enterpriseType: 'Enterprise Type',
    licenseValidityStart: 'License Validity Start',
    licenseValidityEnd: 'License Validity End',

    // Operation Information
    region: 'Region',
    zone: 'Zone',
    woreda: 'Woreda',
    kebele: 'Kebele',
    fullAddress: 'Full Address',
    gpsLatitude: 'GPS Latitude',
    gpsLongitude: 'GPS Longitude',
    businessScope: 'Business Scope',
    annualProductionCapacity: 'Annual Production Capacity',

    // License Information
    businessLicense: 'Business License',
    seedLicense: 'Seed License',
    taxCertificate: 'Tax Certificate',
    factoryPermit: 'Factory Permit',

    // Operator Information
    operator: 'Operator',
    operationOrg: 'Operation Organization',
    operationTime: 'Operation Time',
    certificationStatus: 'Certification Status',
    rejectReason: 'Reject Reason',
    remark: 'Remark'
  },

  // Placeholders
  placeholder: {
    enterpriseName: 'Please enter enterprise name',
    enterpriseRegistrationId: 'Please enter enterprise registration ID',
    unifiedSocialCreditCode: 'Please enter unified social credit code',
    seedEnterpriseLicenseNumber: 'Please enter seed enterprise license number',
    enterpriseType: 'Please select enterprise type',
    licenseValidityStart: 'Please select license validity start date',
    licenseValidityEnd: 'Please select license validity end date',
    region: 'Please select region',
    zone: 'Please select zone',
    woreda: 'Please select woreda',
    kebele: 'Please select kebele',
    fullAddress: 'Please enter full address',
    gpsLatitude: 'Please enter GPS latitude',
    gpsLongitude: 'Please enter GPS longitude',
    businessScope: 'Please enter business scope',
    annualProductionCapacity: 'Please enter annual production capacity (tons)',
    operator: 'Please enter operator',
    operationOrg: 'Please enter operation organization',
    businessLicense: 'Please upload business license',
    seedLicense: 'Please upload seed license',
    taxCertificate: 'Please upload tax certificate',
    factoryPermit: 'Please upload factory permit',
    remark: 'Please enter remark'
  },

  // Enterprise Type
  type: {
    production: 'Production',
    trade: 'Trade',
    integrated: 'Integrated'
  },

  // Certification Status
  status: {
    notApplied: 'Not Applied',
    draft: 'Draft',
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected'
  },

  // Table Columns
  table: {
    enterpriseName: 'Enterprise Name',
    enterpriseRegistrationId: 'Registration ID',
    seedEnterpriseLicenseNumber: 'License Number',
    enterpriseType: 'Enterprise Type',
    certificationStatus: 'Status',
    operator: 'Operator',
    operationTime: 'Operation Time',
    actions: 'Actions'
  },

  // Actions
  actions: {
    submit: 'Submit Application',
    saveDraft: 'Save Draft',
    cancel: 'Cancel',
    uploadFile: 'Upload File'
  },

  // Messages
  messages: {
    submitSuccess: 'Registration successful',
    submitFailed: 'Registration failed',
    saveDraftSuccess: 'Draft saved successfully',
    saveDraftFailed: 'Draft save failed',
    deleteSuccess: 'Deleted successfully',
    deleteFailed: 'Delete failed',
    deleteConfirm: 'Are you sure to delete the selected breeding institution registration(s)?',
    deleteWarning: 'This operation cannot be undone',
    noDataSelected: 'Please select at least one record',
    loadFailed: 'Failed to load data',
    uploadSuccess: 'File uploaded successfully',
    uploadFailed: 'File upload failed',
    fileSizeLimit: 'File size cannot exceed 10MB',
    fileTypeError: 'Only PDF, JPG, PNG formats are allowed',
    requiredField: 'This field is required',
    invalidFormat: 'Invalid format',
    dateRangeError: 'End date must be later than start date',
    rejectedTitle: 'Application Rejected',
    rejectReason: 'Reject Reason'
  },

  // Status Tips
  statusTips: {
    draft: 'Your application is saved as draft. Please complete and submit it.',
    pending: 'Your application is under review. Please wait patiently.',
    approved: 'Congratulations! Your application has been approved.',
    rejected: 'Your application has been rejected. Please check the reason and resubmit.'
  },

  // Upload Tips
  uploadTips: {
    title: 'Upload Requirements',
    format: 'Supported formats: PDF, JPG, PNG',
    size: 'Maximum file size: 10MB',
    required: 'Required documents are marked with *'
  },

  // Validation Rules
  rules: {
    enterpriseNameRequired: 'Enterprise name cannot be empty',
    seedEnterpriseLicenseNumberRequired: 'Seed enterprise license number cannot be empty',
    enterpriseTypeRequired: 'Enterprise type cannot be empty',
    licenseValidityStartRequired: 'License validity start date cannot be empty',
    licenseValidityEndRequired: 'License validity end date cannot be empty',
    woredaRequired: 'Woreda cannot be empty',
    kebeleRequired: 'Kebele cannot be empty',
    fullAddressRequired: 'Full address cannot be empty',
    gpsLatitudeRequired: 'GPS latitude cannot be empty',
    businessLicenseRequired: 'Business license cannot be empty',
    factoryPermitRequired: 'Factory permit cannot be empty',
    operatorRequired: 'Operator cannot be empty'
  }
}
