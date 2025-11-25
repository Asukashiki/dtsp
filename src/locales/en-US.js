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
    upload: 'Upload File',
    uploadSuccess: 'Uploaded successfully',
    add: 'Add',
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

  // Agricultural Input Supply Management System
  input: {
    // System Common
    systemName: 'Agricultural Input Supply Management System',
    systemDesc: 'Input management, inventory management and supply chain traceability',
    backToHome: 'Back to Home',

    // Menu Navigation
    menu: {
      dashboard: 'Data Dashboard',
      supplierManagement: 'Supplier Management',
      supplierAuth: 'Supplier Authentication',
      supplierAuthApproval: 'Supplier Auth Approval',
      supplierInfo: 'Supplier Information',
      inputManagement: 'Input Management',
      inputCatalog: 'Input Catalog Management',
      supplierInput: 'Supplier Input Information',
      inputSupply: 'Input Supply Management',
      inventoryManagement: 'Inventory Management',
      warehouse: 'Warehouse Management',
      stockIn: 'Stock In Management',
      stockOut: 'Stock Out Management',
      storage: 'Storage Management',
      dashboard: 'Dashboard Management',
      feedback: 'Information Feedback',
    },

    // Input Catalog Management
    catalog: {
      title: 'Input Catalog Management',
      subtitle: 'Manage agricultural input basic information, specifications and qualification requirements',
      list: 'Input List',
      add: 'Add Input',
      edit: 'Edit Input',
      detail: 'Input Details',
      delete: 'Delete Input',
      deleteConfirm: 'Are you sure to delete this input?',
      deleteSuccess: 'Deleted successfully',
      addSuccess: 'Added successfully',
      editSuccess: 'Updated successfully',

      // Search and Filter
      searchPlaceholder: 'Search product name, registration number, batch number',
      filterByType: 'Filter by input type',
      allTypes: 'All Types',

      // Input Types
      type: {
        all: 'All',
        pesticide: 'Pesticide',
        fertilizer: 'Fertilizer',
        seed: 'Seed',
        other: 'Other',
      },

      // Form Fields - Basic Info
      form: {
        basicInfo: 'Basic Information',
        productionInfo: 'Production & Responsibility',
        regulatoryInfo: 'Regulatory & Licensing',
        ingredientsInfo: 'Ingredients & Usage',

        inputName: 'Input Name',
        inputType: 'Input Type',
        inputSku: 'Product SKU',
        trademark: 'Trademark',
        registerCode: 'Registration Number',
        productionLicense: 'Production License',
        productionStandard: 'Product Standard',
        producerName: 'Producer Name',
        producerAddress: 'Producer Address',
        createTime: 'Created Time',
        createPeople: 'Creator',
        status: 'Status',
      },

      // Form Placeholders
      placeholder: {
        inputName: 'Enter input name (2-100 characters)',
        inputType: 'Select input type',
        inputSku: 'Enter product SKU (8-50 characters)',
        trademark: 'Enter trademark',
        registerCode: 'Enter registration number',
        productionLicense: 'Enter production license',
        productionStandard: 'Enter product standard',
        producerName: 'Enter producer name (2-200 characters)',
        producerAddress: 'Enter producer address (5-255 characters)',
      },

      // Form Rules
      rules: {
        inputNameRequired: 'Please enter input name',
        inputNameLength: 'Input name should be 2-100 characters',
        inputTypeRequired: 'Please select input type',
        inputSkuRequired: 'Please enter product SKU',
        inputSkuLength: 'Product SKU should be 8-50 characters',
        trademarkRequired: 'Please enter trademark',
        registerCodeRequired: 'Please enter registration number',
        productionLicenseRequired: 'Please enter production license',
        productionStandardRequired: 'Please enter product standard',
        producerNameRequired: 'Please enter producer name',
        producerNameLength: 'Producer name should be 2-200 characters',
        producerAddressRequired: 'Please enter producer address',
        producerAddressLength: 'Producer address should be 5-255 characters',
      },

      // Pesticide Properties
      pesticide: {
        title: 'Pesticide Properties',
        totalIngredientContent: 'Total Active Ingredient',
        toxicityLevel: 'Toxicity Level',
        targetCrops: 'Target Crops',
        controlTargets: 'Control Targets',
        applicationMethod: 'Application Method',
        dosage: 'Dosage',
        dilutionRatio: 'Dilution Ratio',
        safetyInterval: 'Safety Interval (days)',
        precautions: 'Precautions',
        firstAid: 'First Aid',
        storageRequirements: 'Storage Requirements',

        toxicity: {
          micro: 'Micro-toxic',
          low: 'Low Toxic',
          medium: 'Medium Toxic',
          high: 'High Toxic',
          severe: 'Severe Toxic',
        },
      },

      // Fertilizer Properties
      fertilizer: {
        title: 'Fertilizer Properties',
        fertilizerType: 'Fertilizer Type',
        totalNutrientContent: 'Total Nutrient',
        nitrogenContent: 'Nitrogen Content',
        phosphorusContent: 'Phosphorus (P₂O₅)',
        potassiumContent: 'Potassium (K₂O)',
        organicMatterContent: 'Organic Matter',
        mediumTraceElements: 'Trace Elements',
        phValue: 'pH Value',
        suitableCrops: 'Suitable Crops',
        applicationPeriod: 'Application Period',
        applicationMethod: 'Application Method',
        recommendedDosage: 'Recommended Dosage',
      },

      // Seed Properties
      seed: {
        title: 'Seed Properties',
        cropType: 'Crop Type',
        varietyName: 'Variety Name',
        varietyApprovalCode: 'Approval Code',
        varietySource: 'Variety Source',
        purity: 'Purity (%)',
        cleanliness: 'Cleanliness (%)',
        germinationRate: 'Germination Rate (%)',
        moistureContent: 'Moisture Content (%)',
      },

      // Table Columns
      columns: {
        inputName: 'Input Name',
        inputType: 'Type',
        inputSku: 'SKU',
        trademark: 'Trademark',
        registerCode: 'Reg. Number',
        producerName: 'Producer',
        createTime: 'Created',
        status: 'Status',
        actions: 'Actions',
      },

      // Status Options
      statusOptions: {
        active: 'Active',
        inactive: 'Inactive',
      },
    },
  },

  // OAuth2 Callback Page
  callback: {
    processing: 'Processing Login...',
    pleaseWait: 'Please wait while we verify your identity',
    noCode: 'Authorization code not found, please login again',
    loginSuccess: 'Login Successful',
    loginFailed: 'Login Failed, please try again',
    loginError: 'An error occurred during login',
  },

  // Farm Management System
  farm: {
    // System Common
    systemName: 'Farm Management System',
    systemDesc: 'Farmer authentication, land information management and farm data services',
    backToHome: 'Back to Home',

    // Menu Navigation
    menu: {
      dashboard: 'Data Dashboard',
      farmerManagement: 'Farmer Management',
      farmerAuth: 'Farmer Authentication',
      farmerAuthApproval: 'Farmer Auth Approval',
      farmerInfo: 'Farmer Information',
      landManagement: 'Land Management',
      landList: 'Land Information Management',
    },

    // Farmer Authentication Application
    farmerAuth: {
      title: 'Farmer Authentication Application',
      subtitle: 'Submit detailed information for farmer identity verification',
      applySuccess: 'Application submitted successfully',
      form: {
        realName: 'Full Name',
        idCard: 'ID Number',
        phone: 'Phone Number',
        adCode: 'Administrative Region',
        farmType: 'Crop Types',
        certDoc: 'Land Contract Certificate/Other Proof Documents',
        detailAddress: 'Detailed Address',
        remark: 'Remarks',
      },
      placeholder: {
        realName: 'Please enter full name',
        idCard: 'Please enter ID number',
        phone: 'Please enter phone number',
        adCode: 'Please select administrative region',
        farmType: 'Please enter crop types',
        detailAddress: 'Please enter detailed address',
        remark: 'Remarks (optional)',
      },
      rules: {
        realNameRequired: 'Please enter full name',
        idCardRequired: 'Please enter ID number',
        idCardFormat: 'Please enter a valid ID number',
        phoneRequired: 'Please enter phone number',
        phoneFormat: 'Please enter a valid phone number',
        adCodeRequired: 'Please select administrative region',
        farmTypeRequired: 'Please enter crop types',
        certDocRequired: 'Please upload proof documents',
        detailAddressRequired: 'Please enter detailed address',
      },
      uploadTip: 'Supports jpg/png/pdf, up to 5 files',
      status: {
        pending: 'Under Review',
        approved: 'Approved',
        rejected: 'Rejected',
      },
    },

    // Farmer Authentication Approval
    farmerApproval: {
      title: 'Farmer Authentication Approval',
      subtitle: 'Review farmer identity verification applications',
      pendingList: 'Pending Approval List',
      approveSuccess: 'Approved successfully',
      rejectSuccess: 'Rejected',
      detail: 'Application Details',
      applicantInfo: 'Applicant Information',
      approve: 'Approve',
      reject: 'Reject',
      approveConfirm: 'Confirm to approve this application?',
      rejectConfirm: 'Confirm to reject this application?',
      rejectReason: 'Rejection Reason',
      rejectReasonRequired: 'Please enter rejection reason',
      rejectReasonPlaceholder: 'Please explain the reason for rejection',
      applyTime: 'Application Time',
      approveTime: 'Approval Time',
      approver: 'Approver',
      columns: {
        realName: 'Name',
        idCard: 'ID Number',
        phone: 'Phone',
        farmType: 'Crop Types',
        applyTime: 'Application Time',
        status: 'Status',
        actions: 'Actions',
      },
    },

    // Land Information Management
    land: {
      title: 'Land Information Management',
      subtitle: 'Manage land plot information, ownership and current status',
      list: 'Land List',
      add: 'Add Land',
      edit: 'Edit Land',
      detail: 'Land Details',
      delete: 'Delete Land',
      deleteConfirm: 'Are you sure to delete this land plot?',
      deleteSuccess: 'Deleted successfully',
      addSuccess: 'Added successfully',
      editSuccess: 'Updated successfully',
      searchPlaceholder: 'Search land name, region',

      form: {
        landName: 'Land Name',
        ownerType: 'Ownership Type',
        adCode: 'Administrative Region',
        detailAddress: 'Detailed Address',
        areaSize: 'Area Size',
        areaSizeUnit: 'Mu',
        landType: 'Land Type',
        currentStatus: 'Current Status',
        latitude: 'Latitude',
        longitude: 'Longitude',
        farmerUser: 'Associated Farmer',
        remark: 'Remarks',
        createTime: 'Created Time',
      },

      placeholder: {
        landName: 'Please enter land name',
        ownerType: 'Please select ownership type',
        adCode: 'Please select administrative region',
        detailAddress: 'Please enter detailed address',
        areaSize: 'Please enter area size',
        landType: 'Please select land type',
        currentStatus: 'Please select current status',
        latitude: 'Please enter latitude',
        longitude: 'Please enter longitude',
        farmerUser: 'Please select associated farmer',
        remark: 'Remarks (optional)',
      },

      rules: {
        landNameRequired: 'Please enter land name',
        ownerTypeRequired: 'Please select ownership type',
        adCodeRequired: 'Please select administrative region',
        detailAddressRequired: 'Please enter detailed address',
        areaSizeRequired: 'Please enter area size',
        areaSizeFormat: 'Please enter a valid area size',
        landTypeRequired: 'Please select land type',
        currentStatusRequired: 'Please select current status',
        farmerUserRequired: 'Please select associated farmer',
      },

      ownerTypes: {
        collective: 'Collective Ownership',
        contract: 'Contract Management',
        lease: 'Lease',
        other: 'Other',
      },

      landTypes: {
        paddyField: 'Paddy Field',
        dryField: 'Dry Field',
        orchard: 'Orchard',
        vegetableField: 'Vegetable Field',
        other: 'Other',
      },

      statusOptions: {
        cultivating: 'Cultivating',
        idle: 'Idle',
        fallow: 'Fallow',
        other: 'Other',
      },

      columns: {
        landName: 'Land Name',
        ownerType: 'Ownership',
        adCode: 'Region',
        areaSize: 'Area',
        landType: 'Land Type',
        currentStatus: 'Status',
        farmerUser: 'Farmer',
        createTime: 'Created',
        actions: 'Actions',
      },
    },
  },
}
