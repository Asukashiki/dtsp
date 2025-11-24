export default {
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    reset: 'Reset',
    submit: 'Submit',
    back: 'Back',
    loading: 'Loading...',
    more: 'View More',
    viewDetails: 'View Details',
    pleaseSelect: 'Please Select',
    pleaseInput: 'Please Input',
    success: 'Success',
    failed: 'Failed',
    tips: 'Tips',
  },

  header: {
    home: 'Home',
    identity: 'Identity Verification',
    knowledge: 'Knowledge Center',
    userInfo: 'User Info',
    logout: 'Logout',
    modifyPassword: 'Change Password',
    modifyContact: 'Update Contact',
    language: 'Language',
  },

  footer: {
    platformName: 'Oromia Smart Agriculture Value Chain Big Data Platform',
    platformNameShort: 'Smart Agri Platform',
    copyright: '© 2025 Inspur Software Co., Ltd. All Rights Reserved',
    contact: 'Contact',
    serviceTime: 'Service Hours: Weekdays 08:30-17:30',
    address: 'Address: Oromia State, Ethiopia',
    phone: 'Tel: +251-XXX-XXXX',
    email: 'Email: support@oromia-agri.et',
  },

  home: {
    // Hero Section
    heroTitle: 'Oromia Smart Agriculture Value Chain Big Data Platform',
    heroSubtitle: 'Empowering Agricultural Modernization, Building Smart Agriculture Ecosystem',
    heroDescription: 'Enhance agricultural production efficiency, optimize supply chain management, and promote sustainable agriculture through digital technology',

    // Announcement Section
    announcement: 'Announcements',
    latestNews: 'Latest News',
    viewAll: 'View All',
    noData: 'No Data',

    // System Entry Section
    systemEntries: 'System Entries',
    systemModules: 'System Modules',
    quickAccess: 'Quick Access',

    // System Modules
    modules: {
      portal: {
        name: 'System Portal',
        desc: 'User registration, login, identity verification and information management',
      },
      research: {
        name: 'Research & Development',
        desc: 'Variety management, breeding management and seed information services',
      },
      input: {
        name: 'Agricultural Input Supply',
        desc: 'Input management, inventory management and supply chain traceability',
      },
      production: {
        name: 'Production Management',
        desc: 'Farm records, production planning and crop monitoring',
      },
      procurement: {
        name: 'Procurement Management',
        desc: 'Purchase orders, supplier management and contract management',
      },
      traceability: {
        name: 'Product Traceability',
        desc: 'Full traceability, quality testing and traceability query',
      },
      data: {
        name: 'Data Services',
        desc: 'Data collection, analysis display and decision support',
      },
    },

    // Operation Guide Section
    operationGuide: 'Operation Guide',
    documents: 'Document Center',

    guides: {
      userManual: {
        title: 'User Manual',
        desc: 'System features, operation procedures and FAQs',
      },
      farmerGuide: {
        title: 'Farmer Guide',
        desc: 'Planting techniques, input usage and pest control',
      },
      supplierGuide: {
        title: 'Supplier Guide',
        desc: 'Product registration, inventory management and order processing',
      },
      apiDocs: {
        title: 'API Documentation',
        desc: 'API reference, development guide and integration examples',
      },
    },

    // Statistics
    statistics: {
      users: 'Registered Users',
      farmers: 'Certified Farmers',
      suppliers: 'Certified Suppliers',
      products: 'Product Categories',
    },

    myTodo: 'My Todo',
    myDone: 'My Done',
    systemVisits: 'System Visits',
    recentTrends: 'Recent Trends',

    columns: {
      taskName: 'Task Name',
      date: 'Date',
      system: 'System',
    },
  },

  identity: {
    title: 'Identity Verification',
    subtitle: 'Select verification type',
    description: 'Complete identity verification to access corresponding system functions',

    farmer: 'Farmer Verification',
    supplier: 'Supplier Verification',
    buyer: 'Buyer Verification',

    farmerTitle: 'Farmer Verification Application',
    farmerDesc: 'Identity verification for individual farmers to access related services',
    farmerSubtitle: 'Please fill in the following information to complete farmer identity verification',

    supplierTitle: 'Supplier Verification Application',
    supplierDesc: 'Identity verification for suppliers to access supply-side business',
    supplierSubtitle: 'Please fill in the following information to complete supplier verification',

    buyerTitle: 'Buyer Verification Application',
    buyerDesc: 'Identity verification for buyers to facilitate transactions and collaboration',
    buyerSubtitle: 'Please fill in the following information to complete buyer verification',

    applyNow: 'Apply Now',
    viewStatus: 'View Status',
    goApply: 'Apply',

    status: {
      notCertified: 'Not Certified',
      underReview: 'Under Review',
      certified: 'Certified',
      rejected: 'Rejected',
    },

    form: {
      // Common fields
      name: 'Full Name',
      idNo: 'ID Number',
      mobile: 'Phone Number',
      region: 'Region',
      address: 'Detailed Address',
      remark: 'Remarks',
      contactName: 'Contact Name',
      contactMobile: 'Contact Phone',

      // Farmer fields
      cropTypes: 'Crop Types',
      attachments: 'Supporting Documents',

      // Supplier/Buyer fields
      entityType: 'Entity Type',
      entityName: 'Name',
      uscc: 'Unified Social Credit Code',
      legalPerson: 'Legal Representative',
      legalIdNo: 'Legal Representative ID',
      scope: 'Business Scope/Main Products',
      license: 'Business License',
      principalName: 'Principal Name',
      principalIdNo: 'Principal ID Number',
      productTypes: 'Main Procurement Product Types',

      // Review fields
      auditOpinion: 'Review Comments',
      auditResult: 'Review Result',
      pass: 'Approve',
      reject: 'Reject',
    },

    placeholder: {
      name: 'Please enter full name',
      idNo: 'Please enter ID number',
      mobile: 'Please enter phone number',
      region: 'Please select region',
      address: 'Please enter detailed address',
      remark: 'Remarks (optional)',
      cropTypes: 'Please select crop types',
      entityName: 'Please enter entity name',
      uscc: 'Please enter Unified Social Credit Code (18 digits)',
      legalPerson: 'Please enter legal representative',
      legalIdNo: 'Please enter ID number',
      scope: 'Please enter business scope or main products',
      contactName: 'Please enter contact name',
      contactMobile: 'Please enter contact phone',
      principalName: 'Please enter principal name',
      principalIdNo: 'Please enter principal ID number',
      productTypes: 'Please select product types',
      auditOpinion: 'Please enter review comments',
    },

    uploadTip: 'Supports jpg/png/pdf, up to {count} files',
  },

  user: {
    name: 'Name',
    employeeId: 'Employee ID',
    department: 'Department',
    phone: 'Phone',
    email: 'Email',
    lastPasswordChange: 'Last Password Change',
  },

  dataList: {
    systemAnnouncement: 'System Announcements',
    myDone: 'My Completed',
    myTodo: 'My Todo',
    totalCount: 'Total {count} items',
    noData: 'No {type} data',
    unread: 'Unread',
    read: 'Read',
    clickToView: 'Click to view details',
    // Detail dialog
    systemTime: 'System Time',
    doneTime: 'Completed Time',
    publishTime: 'Published Time',
    publisher: 'Publisher',
  },

  userInfo: {
    title: 'User Profile',
    subtitle: 'Manage your personal information and account settings',
    basicInfo: 'Basic Information',
    contactInfo: 'Contact Information',
    accountSecurity: 'Account Security',

    // Basic Info
    name: 'Name',
    employeeId: 'Employee ID',
    department: 'Department',

    // Contact Info
    phone: 'Phone',
    email: 'Email',
    modifyPhone: 'Modify Phone',
    modifyEmail: 'Modify Email',
    enterNewPhone: 'Please enter new phone number',
    enterNewEmail: 'Please enter new email',
    phoneFormat: 'Please enter a valid phone number',
    emailFormat: 'Please enter a valid email format',

    // Security
    password: 'Login Password',
    passwordSet: 'Set',
    modifyPassword: 'Change Password',
    securityLevel: 'Security Level',
    securityHigh: 'High',
    securityMedium: 'Medium',
    securityLow: 'Low',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    enterCurrentPassword: 'Please enter current password',
    enterNewPassword: 'Please enter new password',
    enterConfirmPassword: 'Please enter password again',
    passwordRule: 'Password must contain at least one number and one letter, and be at least 8 characters',
    passwordNotSame: 'New password cannot be the same as current password',
    passwordNotMatch: 'Passwords do not match',
    modifySuccess: 'Modified successfully',
    confirmLogout: 'Are you sure you want to logout?',
  },
}
