export default {
  // 页面标题
  title: 'Multiplier Registration Application',
  subtitle: 'Manage Union and Cooperative registration applications and approvals',

  // 列表页
  list: {
    title: 'Registration Application List',
    searchPlaceholder: 'Organization Name',
    filterByStatus: 'Status',
    filterByType: 'Type',
    allStatus: 'All Status',
    allTypes: 'All Types',
    noData: 'No registration applications found'
  },

  // 审核列表页
  audit: {
    title: 'Multiplier Registration Application Audit',
    subtitle: 'Review Union and Cooperative registration applications',
    listTitle: 'Pending Applications',
    noData: 'No pending applications'
  },

  // 机构类型
  orgType: {
    UNION: 'Union',
    COOPERATIVE: 'Cooperative',
    PRIVATE: 'Private'
  },

  // 审核状态
  status: {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected'
  },

  // 表格列
  columns: {
    orgName: 'Organization Name',
    orgType: 'Organization Type',
    licenseNumber: 'License Number',
    regionCode: 'Region',
    applyUsername: 'Login Account',
    auditStatus: 'Status',
    createTime: 'Application Time',
    actions: 'Actions'
  },

  // 操作按钮
  actions: {
    view: 'View',
    edit: 'Edit',
    audit: 'Audit',
    approve: 'Approve',
    reject: 'Reject',
    resubmit: 'Resubmit'
  },

  // 表单
  form: {
    title: {
      add: 'New Registration Application',
      edit: 'Edit Registration Application',
      view: 'Registration Details',
      audit: 'Audit Registration'
    },
    // 基础信息
    basicInfo: 'Basic Information',
    orgType: 'Organization Type',
    orgName: 'Organization Name',
    unifiedCode: 'Unified Social Credit Code',
    licenseNumber: 'TIN Number',
    licenseStart: 'License Valid From',
    licenseEnd: 'License Valid To',
    inputTypes: 'Input Types',
    salesAreaCodes: 'Sales Area Codes',

    // 位置信息
    locationInfo: 'Location Information',
    regionCode: 'Region',
    fullAddress: 'Full Address',
    gpsLat: 'GPS Latitude',
    gpsLng: 'GPS Longitude',

    // 业务信息
    businessInfo: 'Business Information',
    annualCapacity: 'Annual Capacity',

    // 证照信息
    certificateInfo: 'Certificate Information',
    businessLicenseUrl: 'Business License Image',
    taxCertUrl: 'Tax Certificate Image',
    otherCertsJson: 'Other Certificates',

    // 账号信息
    accountInfo: 'Account Information',
    applyUsername: 'Login Account',
    applyPassword: 'Login Password',
    confirmPassword: 'Confirm Password',

    // 联系信息
    contactInfo: 'Contact Information',
    contactName: 'Contact Name',
    contactMobile: 'Contact Mobile',
    contactEmail: 'Contact Email',

    // 审核信息
    auditInfo: 'Audit Information',
    auditResult: 'Audit Result',
    auditComment: 'Audit Comment',
    auditHistory: 'Audit History',
    auditorName: 'Auditor',
    auditTime: 'Audit Time'
  },

  // 占位符
  placeholder: {
    orgType: 'Select organization type',
    orgName: 'Enter organization name',
    unifiedCode: 'Enter unified social credit code',
    licenseNumber: 'Enter TIN Number',
    licenseStart: 'Select start date',
    licenseEnd: 'Select end date',
    inputTypes: 'Select input types',
    regionCode: 'Select region',
    fullAddress: 'Enter full address',
    gpsLat: 'Enter latitude',
    gpsLng: 'Enter longitude',
    annualCapacity: 'Enter annual capacity',
    businessLicenseUrl: 'Upload business license',
    taxCertUrl: 'Upload tax certificate',
    applyUsername: 'Enter login account',
    applyPassword: 'Enter login password',
    confirmPassword: 'Confirm password',
    contactName: 'Enter contact name',
    contactMobile: 'Enter contact mobile',
    contactEmail: 'Enter contact email',
    auditComment: 'Enter audit comment',
    orgName: 'Please enter organization name',
    orgType: 'Please select organization type',
    status: 'Please select status',
  },

  // 验证规则
  rules: {
    orgTypeRequired: 'Please select organization type',
    orgNameRequired: 'Please enter organization name',
    licenseNumberRequired: 'Please enter license number',
    regionCodeRequired: 'Please select region',
    businessLicenseRequired: 'Please upload business license',
    applyUsernameRequired: 'Please enter login account',
    applyPasswordRequired: 'Please enter login password',
    confirmPasswordRequired: 'Please confirm password',
    passwordMismatch: 'Passwords do not match',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordStrength: 'Password must contain uppercase, lowercase letters and numbers',
    usernameExists: 'This username already exists',
    auditResultRequired: 'Please select audit result',
    inputTypesRequired: 'Please select input types',
    licenseStartRequired: 'Please select license start date',
    licenseEndRequired: 'Please select license end date'
  },

  // 提示消息
  messages: {
    submitSuccess: 'Registration application submitted successfully',
    submitFailed: 'Failed to submit registration application',
    auditSuccess: 'Audit completed successfully',
    auditFailed: 'Audit operation failed',
    loadFailed: 'Failed to load data',
    confirmApprove: 'Are you sure to approve this application?',
    confirmReject: 'Are you sure to reject this application?',
    usernameAvailable: 'Username is available',
    usernameUnavailable: 'Username is not available'
  },

  // 投入品类型选项
  inputTypeOptions: {
    SEED: 'Seed',
    FERTILIZER: 'Fertilizer',
    PESTICIDE: 'Pesticide'
  },

  // 审核结果选项
  auditResultOptions: {
    approve: 'Approve',
    reject: 'Reject'
  },

  // 上传提示
  uploadTip: 'Supports JPG, PNG formats, max 2MB',
  uploadSizeLimit: 'File size cannot exceed 2MB'
}
