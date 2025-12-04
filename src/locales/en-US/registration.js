export default {
  // Registration Management Module
  title: 'Registration Management',
  subtitle: 'Union/Cooperative Registration Application and Approval Management',

  // Menu Navigation
  menu: {
    registrationManagement: 'Registration Management',
    registration: 'Union/Cooperative Registration',
    registrationApproval: 'Union/Cooperative Approval',
  },

  // Union/Cooperative Registration Application
  application: {
    title: 'Union/Cooperative Registration',
    subtitle: 'Apply for Union or Cooperative Organization Registration',
    list: 'Registration Application List',
    add: 'Add Registration',
    edit: 'Edit Registration',
    detail: 'Registration Details',
    submit: 'Submit for Review',
    delete: 'Delete Application',
    deleteConfirm: 'Are you sure to delete this registration application?',
    deleteSuccess: 'Deleted successfully',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',
    submitSuccess: 'Submitted successfully',

    // Search and Filter
    searchPlaceholder: 'Search organization name, license number',
    filterByOrgType: 'Filter by Organization Type',
    filterByStatus: 'Filter by Status',
    filterByInputType: 'Filter by Input Type',
    allOrgTypes: 'All Types',
    allStatus: 'All Status',
    allInputTypes: 'All Input Types',
    dateRange: 'Created Date Range',

    // Organization Types
    orgType: {
      union: 'Union',
      cooperative: 'Cooperative',
    },

    // Application Status
    status: {
      draft: 'Draft',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
    },

    // Input Types
    inputType: {
      seed: 'Seed',
      fertilizer: 'Fertilizer',
      pesticide: 'Pesticide',
    },

    // Form Fields
    form: {
      basicInfo: 'Basic Information',
      locationInfo: 'Location & Operation Information',
      licenseInfo: 'License Information',

      enterpriseName: 'Organization Name',
      enterpriseRegistrationId: 'Enterprise Registration ID',
      unifiedSocialCreditCode: 'Unified Social Credit Code',
      seedEnterpriseLicenseNumber: 'Seed Enterprise License Number',
      licenseValidityStart: 'License Validity Start',
      licenseValidityEnd: 'License Validity End',
      enterpriseType: 'Enterprise Type',
      orgType: 'Organization Type',
      inputTypes: 'Input Types',
      salesRegions: 'Sales Regions',
      applicationStatus: 'Application Status',
      remark: 'Remark',
      version: 'Version',

      // Location & Operation
      region: 'Region',
      zone: 'Zone',
      woreda: 'Woreda',
      kebele: 'Kebele',
      fullAddress: 'Full Address',
      gpsLatitude: 'GPS Latitude',
      gpsLongitude: 'GPS Longitude',
      businessScope: 'Business Scope',
      annualProductionCapacity: 'Annual Production Capacity',

      // Licenses
      licenses: 'Licenses',
      licenseType: 'License Type',
      licenseNumber: 'License Number',
      licenseFile: 'License File',
      issueDate: 'Issue Date',
      expiryDate: 'Expiry Date',

      addLicense: 'Add License',
      removeLicense: 'Remove',

      createdBy: 'Created By',
      createdTime: 'Created Time',
      updatedBy: 'Updated By',
      updatedTime: 'Updated Time',
    },

    // License Types
    licenseType: {
      businessLicense: 'Business License',
      seedLicense: 'Seed License',
      taxCertificate: 'Tax Certificate',
      factoryPermit: 'Factory Permit',
      // Backend uses snake_case format
      business_license: 'Business License',
      seed_license: 'Seed License',
      tax_certificate: 'Tax Certificate',
      factory_permit: 'Factory Permit',
    },

    // Form Placeholders
    placeholder: {
      enterpriseName: 'Enter organization name (2-200 characters)',
      enterpriseRegistrationId: 'Enter enterprise registration ID',
      unifiedSocialCreditCode: 'Enter unified social credit code',
      seedEnterpriseLicenseNumber: 'Enter seed enterprise license number',
      licenseValidityStart: 'Select license validity start date',
      licenseValidityEnd: 'Select license validity end date',
      enterpriseType: 'Enter enterprise type',
      orgType: 'Select organization type',
      inputTypes: 'Select input types (multiple)',
      salesRegions: 'Select sales regions (multiple)',
      remark: 'Enter remark',

      region: 'Enter region',
      zone: 'Enter zone',
      woreda: 'Enter woreda',
      kebele: 'Enter kebele',
      fullAddress: 'Enter full address (5-500 characters)',
      gpsLatitude: 'Enter GPS latitude',
      gpsLongitude: 'Enter GPS longitude',
      businessScope: 'Enter business scope',
      annualProductionCapacity: 'Enter annual production capacity',

      licenseType: 'Select license type',
      licenseNumber: 'Enter license number',
      issueDate: 'Select issue date',
      expiryDate: 'Select expiry date',
    },

    // Form Validation Rules
    rules: {
      enterpriseNameRequired: 'Please enter organization name',
      enterpriseNameLength: 'Organization name should be 2-200 characters',
      seedEnterpriseLicenseNumberRequired: 'Please enter seed enterprise license number',
      licenseValidityStartRequired: 'Please select license validity start date',
      licenseValidityEndRequired: 'Please select license validity end date',
      licenseValidityInvalid: 'License end date cannot be earlier than start date',
      licenseExpired: 'License end date cannot be earlier than current date',
      enterpriseTypeRequired: 'Please enter enterprise type',
      orgTypeRequired: 'Please select organization type',
      inputTypesRequired: 'Please select input types',
      salesRegionsRequired: 'Please select sales regions',

      woredaRequired: 'Please enter woreda',
      kebeleRequired: 'Please enter kebele',
      fullAddressRequired: 'Please enter full address',
      fullAddressLength: 'Full address should be 5-500 characters',
      gpsLatitudeInvalid: 'Invalid GPS latitude format',
      gpsLongitudeInvalid: 'Invalid GPS longitude format',

      licenseTypeRequired: 'Please select license type',
      licenseFileRequired: 'Please upload license file',
      issueDateInvalid: 'Issue date cannot be later than expiry date',
      licenseItemsRequired: 'Please add at least one license',
    },

    // Table Columns
    columns: {
      enterpriseName: 'Organization Name',
      orgType: 'Organization Type',
      inputTypes: 'Input Types',
      seedEnterpriseLicenseNumber: 'License Number',
      woreda: 'Woreda',
      zone: 'Zone',
      applicationStatus: 'Status',
      createdTime: 'Created Time',
      actions: 'Actions',
    },

    // Action Buttons
    actions: {
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      submit: 'Submit',
      add: 'Add Application',
    },

    // Messages
    messages: {
      noData: 'No data available',
      onlyDraftCanEdit: 'Only draft applications can be edited',
      onlyDraftCanDelete: 'Only draft applications can be deleted',
      onlyDraftCanSubmit: 'Only draft applications can be submitted',
      submitConfirm: 'Are you sure to submit this application for review? You cannot modify it after submission.',
      uploadTip: 'Supports jpg/png/pdf format, max 5MB per file',
    },

    // Audit Records
    auditRecords: 'Audit Records',
    auditRecord: {
      auditUserName: 'Auditor',
      auditTime: 'Audit Time',
      auditResult: 'Audit Result',
      auditOpinion: 'Audit Opinion',
      noRecords: 'No audit records',
    },
  },

  // Union/Cooperative Registration Approval
  approval: {
    title: 'Union/Cooperative Approval',
    subtitle: 'Review Union or Cooperative Organization Registration Applications',
    list: 'Pending Approval List',
    detail: 'Approval Details',
    approve: 'Approve',
    reject: 'Reject',
    approveSuccess: 'Approved successfully',
    rejectSuccess: 'Rejected successfully',

    searchPlaceholder: 'Search organization name, license number',
    filterByOrgType: 'Filter by Organization Type',

    // Form Fields
    form: {
      applicationInfo: 'Application Information',
      auditInfo: 'Audit Operation',
      auditResult: 'Audit Result',
      auditOpinion: 'Audit Opinion',
      remark: 'Remark',
    },

    placeholder: {
      auditOpinion: 'Enter audit opinion (required when rejecting)',
      remark: 'Enter remark',
    },

    rules: {
      auditOpinionRequired: 'Audit opinion is required when rejecting',
    },

    actions: {
      audit: 'Audit',
      view: 'View',
      approve: 'Approve',
      reject: 'Reject',
    },

    messages: {
      approveConfirm: 'Are you sure to approve this registration application?',
      rejectConfirm: 'Are you sure to reject this registration application?',
      onlyPendingCanAudit: 'Only pending applications can be audited',
    },
  },
}
