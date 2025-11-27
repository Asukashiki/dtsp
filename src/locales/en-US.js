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
    view: 'View',
    viewDetails: 'View Details',
    pleaseSelect: 'Please Select',
    pleaseInput: 'Please Input',
    success: 'Success',
    failed: 'Failed',
    tips: 'Tips',
    upload: 'Upload File',
    uploadSuccess: 'Uploaded successfully',
    uploadFailed: 'Upload failed',
    add: 'Add',
    close: 'Close',
    startDate: 'Start Date',
    endDate: 'End Date',
    preview: 'Preview',
    download: 'Download',
    noFile: 'File not found',
    loadFailed: 'Load failed',
    saveFailed: 'Save failed',
    submitFailed: 'Submit failed'
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
      farm: {
        name: 'Farm Management System',
        desc: 'Farmer authentication, land information management and farm data services',
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

  // Research & Development Management System
  research: {
    // System Common
    systemName: 'Research & Development Management System',
    systemDesc: 'Variety management, breeding management and seed information services',
    backToHome: 'Back to Home',

    // Menu Navigation
    menu: {
      enterpriseRegistration: 'Enterprise Registration',
      enterpriseAuth: 'Seed Enterprise Authentication',
      enterpriseAudit: 'Seed Enterprise Audit',
      enterpriseList: 'Enterprise List',
      varietyManagement: 'Variety Management',
      varietyRegistration: 'Variety Registration',
      varietyAudit: 'Variety Audit',
      varietyPublish: 'Variety Publication',
      breedingManagement: 'Breeding Management',
      breedingPlan: 'Breeding Plan Management',
      breedingMaterial: 'Breeding Material Registration',
      breedingTracking: 'Breeding Tracking Management',
      dataCollection: 'Data Collection',
      trialData: 'Trial Basic Data Collection',
      agronomicData: 'Agronomic Data Collection',
      farmingRecord: 'Farming Record Collection',
      environmentData: 'Environment & Soil Data Collection',
      farmerData: 'Farmer & Plot Data Collection',
      labData: 'Laboratory Test Data Collection',
      yieldData: 'Yield Data Collection',
      iotData: 'IOT Sensor Data Collection',
      seedService: 'Seed Information Service',
      promotionManagement: 'Seed Promotion Management',
      seedInfo: 'Seed Information Publicity',
    },

    // Enterprise Registration
    enterprise: {
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
        seedLicenseNo: 'Seed Business License Number',
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
        unifiedSocialCreditCode: 'Please enter unified social credit code (18 digits)',
        enterpriseType: 'Please select enterprise type',
        seedLicenseNo: 'Please enter seed business license number',
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
        unifiedSocialCreditCodeLength: 'Unified social credit code should be 18 digits',
        enterpriseTypeRequired: 'Please select enterprise type',
        seedLicenseNoRequired: 'Please enter seed business license number',
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
      },
    },

    // Enterprise Audit
    audit: {
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
    },

    // Variety Management
    variety: {
      // Variety Registration
      registration: {
        title: 'Variety Registration',
        subtitle: 'Record seed variety basic information and submit registration application',
        list: 'Variety Registration List',
        add: 'Add Variety Registration',
        edit: 'Edit Variety Information',
        detail: 'Variety Details',
        apply: 'Apply for Registration',

        // Search and Filter
        searchPlaceholder: 'Search variety name, variety code, crop type',
        filterByCrop: 'Filter by crop type',
        filterByStatus: 'Filter by registration status',
        allCrops: 'All Crops',
        allStatus: 'All Status',

        // Registration Status
        status: {
          draft: 'Draft',
          pending: 'In Review',
          approved: 'Pending Publication',
          published: 'Published',
          rejected: 'Rejected',
        },

        // Form Sections
        sections: {
          enterpriseInfo: 'Registration Entity Information',
          registrationInfo: 'Registration Basic Information',
          identificationInfo: 'Variety Identification Information',
          technicalInfo: 'Technical Characteristics Information',
          trialInfo: 'Trial and Performance Information',
          regulatoryInfo: 'Regulatory Information',
        },

        // Form Fields - Registration Basic Information
        form: {
          registrationType: 'Registration Type',
          registrationDate: 'Registration Date',
          registrationStatus: 'Registration Status',

          // Variety Identification Information
          varietyName: 'Variety Name',
          varietyCode: 'Variety Code',
          cropType: 'Crop Type',
          species: 'Species',
          genus: 'Genus',
          family: 'Family',
          breedingMethod: 'Breeding Method',
          methodPedigree: 'Method Pedigree',
          cultivationYear: 'Cultivation Year',

          // Technical Characteristics Information
          minYieldPotential: 'Minimum Yield Potential (qt/ha)',
          maxYieldPotential: 'Maximum Yield Potential (qt/ha)',
          diseaseResistance: 'Disease Resistance',
          stressResistance: 'Stress Resistance',
          growthPeriod: 'Growth Period (days)',
          plantHeight: 'Plant Height (cm)',
          grainQuality: 'Grain Quality Characteristics',

          // Trial and Performance Information
          trialLocation: 'Trial Location',
          trialYear: 'Trial Year',
          averageYield: 'Average Yield',
          stabilityScore: 'Stability Score',
          trialReport: 'Trial Report',
          photos: 'Photos',

          // Regulatory Information
          approvalDocumentNo: 'Approval Document No.',
          approvalAgency: 'Approval Agency',
          approvalDate: 'Approval Date',
          certificationDocument: 'Certification Document',
        },

        // Form Placeholders
        placeholder: {
          varietyName: 'Please enter variety name',
          varietyCode: 'Please enter variety code',
          cropType: 'Please select crop type',
          species: 'Please enter species',
          genus: 'Please enter genus',
          family: 'Please enter family',
          breedingMethod: 'Please select breeding method',
          methodPedigree: 'Please enter method pedigree',
          cultivationYear: 'Please select cultivation year',
          minYieldPotential: 'Please enter minimum yield potential',
          maxYieldPotential: 'Please enter maximum yield potential',
          diseaseResistance: 'Please enter disease resistance description',
          stressResistance: 'Please enter stress resistance description',
          growthPeriod: 'Please enter growth period',
          plantHeight: 'Please enter plant height',
          grainQuality: 'Please enter grain quality characteristics',
          trialLocation: 'Please enter trial location',
          trialYear: 'Please select trial year',
          averageYield: 'Please enter average yield',
          stabilityScore: 'Please enter stability score',
          approvalDocumentNo: 'Please enter approval document number',
          approvalAgency: 'Please enter approval agency',
          approvalDate: 'Please select approval date',
          days: 'days',
        },

        // Form Rules
        rules: {
          varietyNameRequired: 'Please enter variety name',
          varietyCodeRequired: 'Please enter variety code',
          cropTypeRequired: 'Please select crop type',
          speciesRequired: 'Please enter species',
          breedingMethodRequired: 'Please select breeding method',
          cultivationYearRequired: 'Please select cultivation year',
        },

        // List Columns
        columns: {
          registrationNo: 'Registration No.',
          varietyName: 'Variety Name',
          varietyCode: 'Variety Code',
          cropType: 'Crop Type',
          submittingUnit: 'Submitting Unit',
          submitDate: 'Submit Date',
          registrationStatus: 'Registration Status',
          actions: 'Actions',
        },

        // Action Buttons
        actions: {
          submit: 'Submit Application',
          saveDraft: 'Save Draft',
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
        },

        // Messages
        messages: {
          submitSuccess: 'Submitted successfully',
          saveDraftSuccess: 'Draft saved successfully',
          deleteConfirm: 'Are you sure to delete this variety registration application?',
          deleteSuccess: 'Deleted successfully',
          uploadTip: 'Support PDF, JPG format, single file size less than 2MB',
        },
      },

      // Variety Audit
      audit: {
        title: 'Variety Audit',
        subtitle: 'Review the completeness, authenticity and compliance of variety registration applications',
        taskList: 'Audit Task List',
        taskDetail: 'Audit Task Details',

        // Search and Filter
        searchPlaceholder: 'Search variety name, submitting unit',
        filterByStatus: 'Filter by audit status',
        allStatus: 'All Status',

        // Audit Status
        status: {
          pending: 'In Review',
          approved: 'Approved',
          rejected: 'Rejected',
        },

        // List Columns
        columns: {
          applicationNo: 'Application No.',
          varietyName: 'Variety Name',
          cropType: 'Crop Type',
          submittingUnit: 'Submitting Unit',
          submitDate: 'Submit Date',
          auditStatus: 'Audit Status',
          auditor: 'Auditor',
          actions: 'Actions',
        },

        // Detail Page Section Titles
        sections: {
          basicInfo: 'Variety Basic Information',
          identificationInfo: 'Variety Identification Information',
          technicalInfo: 'Technical Characteristics Information',
          trialInfo: 'Trial and Performance Data',
          regulatoryInfo: 'Regulatory Data',
          auditOperation: 'Audit Operation',
          auditResult: 'Audit Result',
        },

        // Form Fields
        form: {
          auditResult: 'Audit Result',
          auditOpinion: 'Audit Opinion',
          auditor: 'Auditor',
          auditTime: 'Audit Time',
        },

        // Form Placeholders
        placeholder: {
          auditOpinion: 'Please enter audit opinion',
        },

        // Audit Result
        result: {
          pass: 'Approve',
          reject: 'Reject',
        },

        // Form Rules
        rules: {
          auditResultRequired: 'Please select audit result',
          auditOpinionRequired: 'Please enter audit opinion',
        },

        // Action Buttons
        actions: {
          submit: 'Submit Audit',
          backToList: 'Back to List',
          audit: 'Audit',
          view: 'View',
        },

        // Messages
        messages: {
          submitSuccess: 'Audit submitted successfully',
          confirmSubmit: 'Are you sure to submit the audit result?',
        },
      },

      // Variety Publication
      publish: {
        title: 'Variety Publication Management',
        subtitle: 'Register approved seed variety information into the variety registration database and publish',
        list: 'Variety Publication List',
        publishQueue: 'Pending Publication',
        published: 'Published Varieties',

        // Search and Filter
        searchPlaceholder: 'Search variety name, crop type',
        filterByCrop: 'Filter by crop type',
        filterByStatus: 'Filter by publication status',
        allCrops: 'All Crops',
        allStatus: 'All Status',

        // Publication Status
        status: {
          pending: 'Pending Publication',
          published: 'Published',
          offline: 'Offline',
        },

        // Detail Page Section Titles
        sections: {
          basicInfo: 'Basic Information',
          identificationInfo: 'Identification Information',
          publishInfo: 'Publication Information',
        },

        // List Columns
        columns: {
          publishNo: 'Publication No.',
          varietyName: 'Variety Name',
          cropType: 'Crop Type',
          approvalDate: 'Approval Date',
          publishDate: 'Publication Date',
          publishDept: 'Publishing Department',
          publishStatus: 'Publication Status',
          actions: 'Actions',
        },

        // Form Fields
        form: {
          publishNo: 'Publication No.',
          publishDate: 'Publication Date',
          publisher: 'Publisher',
          publishTime: 'Publish Time',
          publishDept: 'Publishing Department',
          decisionExplanation: 'Decision Explanation',
          publicDescription: 'Public Description',
          recommendedRegion: 'Recommended Region',
          sowingGuide: 'Sowing Guide',
          photos: 'Photos',
        },

        // Form Placeholders
        placeholder: {
          publishDept: 'Enter publication department',
          decisionExplanation: 'Please enter decision explanation',
          publicDescription: 'Please enter public description',
          recommendedRegion: 'Please enter recommended region',
          sowingGuide: 'Please enter sowing guide',
        },

        // Form Rules
        rules: {
          publishDeptRequired: 'Please enter publication department',
          publicDescriptionRequired: 'Please enter public description',
          decisionExplanationRequired: 'Please enter decision explanation',
        },

        // Action Buttons
        actions: {
          preview: 'Preview Publication Info',
          publish: 'Publish Now',
          offline: 'Take Offline',
          view: 'View',
          backToList: 'Back to List',
        },

        // Messages
        messages: {
          publishSuccess: 'Published successfully',
          offlineSuccess: 'Taken offline successfully',
          confirmPublish: 'Are you sure to publish this variety information?',
          confirmOffline: 'Are you sure to take this variety information offline?',
        },
      },

      // Variety Query
      query: {
        title: 'Seed Information Publicity',
        subtitle: 'Query published seed variety information',
        searchTitle: 'Variety Query',

        // Search
        searchPlaceholder: 'Search variety name',
        filterByYear: 'Filter by year',
        filterByCrop: 'Filter by crop type',
        allYears: 'All Years',
        allCrops: 'All Crops',

        // List Columns
        columns: {
          publishNo: 'Publication No.',
          varietyName: 'Variety Name',
          cropType: 'Crop Type',
          publishDate: 'Publication Date',
          publishDept: 'Publishing Department',
          actions: 'Actions',
        },

        // Detail Page
        detail: {
          basicInfo: 'Variety Basic Information',
          technicalInfo: 'Technical Characteristics Information',
          trialInfo: 'Trial Information',
          publishInfo: 'Publication Information',
          decisionExplanation: 'Decision Explanation',
          publicDescription: 'Public Description',
          recommendedRegion: 'Recommended Region',
          sowingGuide: 'Sowing Guide',
          photos: 'Photos',
        },

        // Action Buttons
        actions: {
          viewDetail: 'View Details',
          back: 'Back',
        },
      },
    },

    // Breeding Management
    breeding: {
      // Breeding Plan Management
      plan: {
        title: 'Breeding Plan Management',
        subtitle: 'Set up breeding plans, including breeding year, batch, planting base and other information',
        list: 'Breeding Plan List',
        add: 'Add Breeding Plan',
        edit: 'Edit Breeding Plan',
        detail: 'Breeding Plan Details',
        delete: 'Delete Plan',
        deleteConfirm: 'Are you sure to delete this breeding plan?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        // Search and Filter
        searchPlaceholder: 'Search plan name, batch ID',
        filterByYear: 'Filter by breeding year',
        filterByCrop: 'Filter by crop type',
        filterByStatus: 'Filter by plan status',
        allYears: 'All Years',
        allCrops: 'All Crops',
        allStatus: 'All Status',

        // Plan Status
        status: {
          planning: 'Planning',
          ongoing: 'Ongoing',
          completed: 'Completed',
          cancelled: 'Cancelled',
        },

        // Propagation Level
        propagationLevel: {
          breeder: 'Breeder Seed',
          preBasic: 'Pre-basic Seed',
          basic: 'Basic Seed',
          certified: 'Certified Seed',
        },

        // Form Fields
        form: {
          basicInfo: 'Plan Basic Information',
          planName: 'Plan Name',
          breedingYear: 'Breeding Year',
          batchId: 'Breeding Batch ID',
          plantingBase: 'Planting Base',
          cropType: 'Crop Type',
          varietyName: 'Variety Name',
          propagationLevel: 'Propagation Level',
          parentSeedSource: 'Parent Seed Source',
          personInCharge: 'Person in Charge',
          startDate: 'Plan Start Date',
          endDate: 'Plan End Date',
          breedingGoal: 'Breeding Goal',
          remarks: 'Remarks',
          createTime: 'Created Time',
          updateTime: 'Updated Time',
        },

        // Form Placeholders
        placeholder: {
          planName: 'Please enter plan name',
          breedingYear: 'Please select breeding year',
          batchId: 'Please enter breeding batch ID',
          plantingBase: 'Please enter planting base',
          cropType: 'Please select crop type',
          varietyName: 'Please enter variety name',
          propagationLevel: 'Please select propagation level',
          parentSeedSource: 'Please enter parent seed source',
          personInCharge: 'Please enter person in charge',
          startDate: 'Please select plan start date',
          endDate: 'Please select plan end date',
          breedingGoal: 'Please enter breeding goal',
          remarks: 'Remarks (optional)',
        },

        // Form Validation
        rules: {
          planNameRequired: 'Please enter plan name',
          breedingYearRequired: 'Please select breeding year',
          batchIdRequired: 'Please enter breeding batch ID',
          plantingBaseRequired: 'Please enter planting base',
          cropTypeRequired: 'Please select crop type',
          varietyNameRequired: 'Please enter variety name',
          propagationLevelRequired: 'Please select propagation level',
          parentSeedSourceRequired: 'Please enter parent seed source',
          personInChargeRequired: 'Please enter person in charge',
          startDateRequired: 'Please select plan start date',
          endDateRequired: 'Please select plan end date',
          breedingGoalRequired: 'Please enter breeding goal',
          endDateAfterStart: 'End date must be later than start date',
        },

        // Table Columns
        columns: {
          planName: 'Plan Name',
          batchId: 'Batch ID',
          breedingYear: 'Breeding Year',
          cropType: 'Crop Type',
          varietyName: 'Variety Name',
          propagationLevel: 'Propagation Level',
          personInCharge: 'Person in Charge',
          startDate: 'Start Date',
          endDate: 'End Date',
          status: 'Plan Status',
          createTime: 'Created Time',
          actions: 'Actions',
        },

        // Action Buttons
        actions: {
          submit: 'Submit',
          saveDraft: 'Save Draft',
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
        },
      },

      // Breeding Material Registration
      material: {
        title: 'Breeding Material Registration',
        subtitle: 'Record breeding resources during the breeding process to ensure materials are traceable and usable',
        list: 'Breeding Material Registration List',
        add: 'Add Material Registration',
        edit: 'Edit Material Registration',
        detail: 'Material Registration Details',
        delete: 'Delete Registration',
        deleteConfirm: 'Are you sure to delete this material registration?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        // Search and Filter
        searchPlaceholder: 'Search registration code, batch ID',
        filterByBatch: 'Filter by breeding batch',
        filterBySeedType: 'Filter by seed type',
        allBatches: 'All Batches',
        allSeedTypes: 'All Types',

        // Form Fields
        form: {
          basicInfo: 'Basic Association Information',
          materialInfo: 'Material Information',
          registrationCode: 'Registration Code',
          batchId: 'Breeding Batch ID',
          warehouseInId: 'Warehouse In ID',
          seedType: 'Seed Type',
          quantity: 'Quantity (kg)',
          sourceEntity: 'Source Entity',
          receiveDate: 'Receive Date',
          labTestReport: 'Laboratory Test Report',
          operator: 'Operator',
          operationOrg: 'Operation Organization',
          operationTime: 'Operation Time',
        },

        // Form Placeholders
        placeholder: {
          registrationCode: 'Auto-generated by system',
          batchId: 'Please select breeding batch ID',
          warehouseInId: 'Please enter warehouse in ID',
          seedType: 'Please enter seed type',
          quantity: 'Please enter quantity',
          sourceEntity: 'Please enter source entity',
          receiveDate: 'Please select receive date',
        },

        // Form Validation
        rules: {
          batchIdRequired: 'Please select breeding batch ID',
          warehouseInIdRequired: 'Please enter warehouse in ID',
          seedTypeRequired: 'Please enter seed type',
          quantityRequired: 'Please enter quantity',
          quantityFormat: 'Please enter valid quantity',
          sourceEntityRequired: 'Please enter source entity',
          receiveDateRequired: 'Please select receive date',
        },

        // Table Columns
        columns: {
          registrationCode: 'Registration Code',
          batchId: 'Batch ID',
          warehouseInId: 'Warehouse In ID',
          seedType: 'Seed Type',
          quantity: 'Quantity (kg)',
          sourceEntity: 'Source Entity',
          receiveDate: 'Receive Date',
          operationTime: 'Operation Time',
          actions: 'Actions',
        },

        // Action Buttons
        actions: {
          submit: 'Submit',
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
        },

        // Messages
        messages: {
          uploadTip: 'Supports PDF, JPG format, single file size less than 2MB',
        },
      },

      // Breeding Tracking Management
      tracking: {
        title: 'Breeding Tracking Management',
        subtitle: 'Record breeding propagation tracking stages to ensure the breeding process is standardized and controllable',
        list: 'Breeding Tracking Record List',
        add: 'Add Tracking Record',
        edit: 'Edit Tracking Record',
        detail: 'Tracking Record Details',
        delete: 'Delete Record',
        deleteConfirm: 'Are you sure to delete this tracking record?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        // Search and Filter
        searchPlaceholder: 'Search tracking ID, batch ID',
        filterByBatch: 'Filter by breeding batch',
        filterByStage: 'Filter by stage name',
        allBatches: 'All Batches',
        allStages: 'All Stages',

        // Stage Name
        stageName: {
          parentLinePreparation: 'Parent Line Preparation',
          breederSeed: 'Breeder Seed',
          preBasicSeedPropagation: 'Pre-basic Seed Propagation',
          basicSeedPropagation: 'Basic Seed Propagation',
        },

        // Form Fields
        form: {
          basicInfo: 'Basic Information',
          trackingInfo: 'Tracking Information',
          yieldInfo: 'Yield Information',
          qualityInfo: 'Quality Information',
          trackingId: 'Tracking ID',
          batchId: 'Breeding Batch ID',
          stageName: 'Stage Name',
          location: 'Location',
          coordinates: 'Coordinates (Latitude, Longitude)',
          expectedYield: 'Expected Yield',
          actualYield: 'Actual Yield',
          fieldInspectionScore: 'Field Inspection Score',
          diseaseObservation: 'Disease Observation',
          stageCompletionDate: 'Stage Completion Date',
          recorder: 'Recorder',
          recordTime: 'Record Time',
          updateTime: 'Update Time',
        },

        // Form Placeholders
        placeholder: {
          trackingId: 'Auto-generated by system',
          batchId: 'Please select breeding batch ID',
          stageName: 'Please select stage name',
          location: 'Please enter location',
          coordinates: 'Format: Latitude, Longitude',
          expectedYield: 'Please enter expected yield',
          actualYield: 'Please enter actual yield',
          fieldInspectionScore: '0-5 score scale',
          diseaseObservation: 'Please enter disease observation',
          stageCompletionDate: 'Please select stage completion date',
        },

        // Form Validation
        rules: {
          batchIdRequired: 'Please select breeding batch ID',
          stageNameRequired: 'Please select stage name',
          locationRequired: 'Please enter location',
          expectedYieldRequired: 'Please enter expected yield',
          expectedYieldFormat: 'Please enter valid yield',
          actualYieldFormat: 'Please enter valid yield',
          fieldInspectionScoreFormat: 'Score range is 0-5',
        },

        // Table Columns
        columns: {
          trackingId: 'Tracking ID',
          batchId: 'Batch ID',
          stageName: 'Stage Name',
          location: 'Location',
          expectedYield: 'Expected Yield',
          actualYield: 'Actual Yield',
          fieldInspectionScore: 'Field Score',
          stageCompletionDate: 'Completion Date',
          recordTime: 'Record Time',
          actions: 'Actions',
        },

        // Action Buttons
        actions: {
          submit: 'Submit',
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
        },
      },
    },

    // Data Collection
    dataCollection: {
      // Trial Base Data Collection
      trialBase: {
        title: 'Trial Base Data Collection',
        subtitle: 'Collect breeding trial basic information to ensure standardized breeding data',
        list: 'Trial Base Data List',
        add: 'Add Trial Data',
        edit: 'Edit Trial Data',
        detail: 'Trial Data Details',
        delete: 'Delete Trial Data',
        deleteConfirm: 'Are you sure to delete this trial data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search trial ID, crop type, variety name',
        filterByCrop: 'Filter by crop type',
        filterByDate: 'Filter by start date',
        allCrops: 'All Crops',

        form: {
          basicInfo: 'Trial Basic Information',
          locationInfo: 'Location Information',
          trialId: 'Trial ID',
          cropType: 'Crop Type',
          varietyName: 'Variety Name',
          researchCenterId: 'Research Center ID',
          programId: 'Program ID',
          subProgramId: 'Sub-program ID',
          thematicResearchAreaId: 'Thematic Research Area ID',
          region: 'Region',
          zone: 'Zone',
          woreda: 'Woreda',
          kebele: 'Kebele',
          agroEcologicalZone: 'Agro-ecological Zone',
          gpsLocation: 'GPS Location',
          startDate: 'Start Date',
          activityCode: 'Activity Code',
          kpiCode: 'KPI Code',
          season: 'Season',
          createTime: 'Created Time',
          createBy: 'Created By',
        },

        placeholder: {
          trialId: 'Auto-generated by system',
          cropType: 'Please select crop type',
          varietyName: 'Please enter variety name',
          researchCenterId: 'Please enter research center ID',
          programId: 'Please enter program ID',
          subProgramId: 'Please enter sub-program ID',
          thematicResearchAreaId: 'Please enter thematic research area ID',
          region: 'Please select region',
          zone: 'Please select zone',
          woreda: 'Please select woreda',
          kebele: 'Please select kebele',
          agroEcologicalZone: 'Please enter agro-ecological zone (optional)',
          gpsLocation: 'Format: longitude, latitude',
          startDate: 'Please select start date',
          activityCode: 'Please enter activity code (optional)',
          kpiCode: 'Please enter KPI code (optional)',
          season: 'Please select season',
        },

        rules: {
          cropTypeRequired: 'Please select crop type',
          varietyNameRequired: 'Please enter variety name',
          researchCenterIdRequired: 'Please enter research center ID',
          programIdRequired: 'Please enter program ID',
          subProgramIdRequired: 'Please enter sub-program ID',
          thematicResearchAreaIdRequired: 'Please enter thematic research area ID',
          regionRequired: 'Please select region',
          zoneRequired: 'Please select zone',
          woredaRequired: 'Please select woreda',
          kebeleRequired: 'Please select kebele',
          gpsLocationRequired: 'Please enter GPS location',
          gpsLocationFormat: 'Please enter valid GPS location format',
          startDateRequired: 'Please select start date',
          seasonRequired: 'Please select season',
        },

        columns: {
          trialId: 'Trial ID',
          cropType: 'Crop Type',
          varietyName: 'Variety Name',
          region: 'Region',
          zone: 'Zone',
          startDate: 'Start Date',
          season: 'Season',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },

      // Farmer & Plot Data Collection
      farmerPlot: {
        title: 'Farmer & Plot Data Collection',
        subtitle: 'Collect farmer and plot information to ensure complete and accurate trial data',
        list: 'Farmer Plot Data List',
        add: 'Add Farmer Plot Data',
        edit: 'Edit Farmer Plot Data',
        detail: 'Farmer Plot Data Details',
        delete: 'Delete Data',
        deleteConfirm: 'Are you sure to delete this data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search farmer name, contact phone',
        filterByGender: 'Filter by gender',
        allGender: 'All Genders',

        gender: {
          male: 'Male',
          female: 'Female',
        },

        youthCategory: {
          youth: 'Youth',
          adult: 'Adult',
          elderly: 'Elderly',
        },

        form: {
          farmerInfo: 'Farmer Basic Information',
          plotInfo: 'Plot Information',
          operatorInfo: 'Operator Information',
          dataId: 'Data ID',
          farmerName: 'Farmer Name',
          gender: 'Gender',
          youthCategory: 'Youth Category',
          cooperativeMembership: 'Cooperative Membership',
          plotSizeM2: 'Plot Size (m²)',
          householdId: 'Household ID',
          contactPhone: 'Contact Phone',
          createTime: 'Created Time',
          createBy: 'Created By',
        },

        placeholder: {
          farmerName: 'Please enter farmer name',
          gender: 'Please select gender',
          youthCategory: 'Please select youth category',
          cooperativeMembership: 'Please enter cooperative membership',
          plotSizeM2: 'Please enter plot size',
          householdId: 'Please enter household ID (optional)',
          contactPhone: 'Please enter contact phone',
        },

        rules: {
          farmerNameRequired: 'Please enter farmer name',
          farmerNameLength: 'Farmer name length should be between 2-100 characters',
          genderRequired: 'Please select gender',
          youthCategoryRequired: 'Please select youth category',
          cooperativeMembershipRequired: 'Please enter cooperative membership',
          plotSizeM2Required: 'Please enter plot size',
          plotSizeM2Min: 'Plot size must be greater than 0',
          plotSizeM2Format: 'Please enter valid area value',
          contactPhoneRequired: 'Please enter contact phone',
          contactPhoneFormat: 'Please enter valid phone number',
        },

        columns: {
          farmerName: 'Farmer Name',
          gender: 'Gender',
          youthCategory: 'Youth Category',
          plotSizeM2: 'Plot Size (m²)',
          contactPhone: 'Contact Phone',
          createTime: 'Created Time',
          createBy: 'Created By',
          actions: 'Actions',
        },
      },

      // Farming Record Data Collection
      farmingRecord: {
        title: 'Farming Record Data Collection',
        subtitle: 'Record irrigation, fertilization, weeding and other farming management practices',
        list: 'Farming Record List',
        add: 'Add Farming Record',
        edit: 'Edit Farming Record',
        detail: 'Farming Record Details',
        delete: 'Delete Record',
        deleteConfirm: 'Are you sure to delete this record?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search management practice',
        filterByPractice: 'Filter by management practice',
        allPractices: 'All Practices',

        managementPractice: {
          irrigation: 'Irrigation',
          fertilization: 'Fertilization',
          weeding: 'Weeding',
          pestControl: 'Pest Control',
          other: 'Other',
        },

        form: {
          basicInfo: 'Basic Information',
          managementInfo: 'Management Information',
          dataId: 'Data ID',
          managementPractice: 'Management Practice',
          fertilizerType: 'Fertilizer Type',
          fertilizerRateKg: 'Fertilizer Rate (kg)',
          ureaRateKg: 'Urea Rate (kg)',
          pesticideType: 'Pesticide Type',
          irrigationType: 'Irrigation Type',
          irrigationFrequency: 'Irrigation Frequency',
          weedingDate: 'Weeding Date',
          herbicideUsed: 'Herbicide Used',
          seedSource: 'Seed Source',
          createTime: 'Created Time',
          createBy: 'Created By',
        },

        placeholder: {
          managementPractice: 'Please select management practice',
          fertilizerType: 'Please enter fertilizer type (optional)',
          fertilizerRateKg: 'Please enter fertilizer rate (optional)',
          ureaRateKg: 'Please enter urea rate (optional)',
          pesticideType: 'Please enter pesticide type (optional)',
          irrigationType: 'Please enter irrigation type (optional)',
          irrigationFrequency: 'Please enter irrigation frequency (optional)',
          weedingDate: 'Please select weeding date (optional)',
          herbicideUsed: 'Please enter herbicide used (optional)',
          seedSource: 'Please enter seed source (optional)',
        },

        rules: {
          managementPracticeRequired: 'Please select management practice',
          fertilizerRateKgFormat: 'Please enter valid rate',
          ureaRateKgFormat: 'Please enter valid rate',
          irrigationFrequencyFormat: 'Please enter valid frequency',
        },

        columns: {
          managementPractice: 'Management Practice',
          fertilizerType: 'Fertilizer Type',
          irrigationType: 'Irrigation Type',
          weedingDate: 'Weeding Date',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },

      // Agronomic Trait Data Collection
      agronomicTrait: {
        title: 'Agronomic Trait Data Collection',
        subtitle: 'Record plant height, flowering period, yield and other agronomic traits',
        list: 'Agronomic Trait Data List',
        add: 'Add Agronomic Trait Data',
        edit: 'Edit Agronomic Trait Data',
        detail: 'Agronomic Trait Data Details',
        delete: 'Delete Data',
        deleteConfirm: 'Are you sure to delete this data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search data ID',

        form: {
          growthInfo: 'Growth Information',
          phenologyInfo: 'Phenology Information',
          yieldInfo: 'Yield Information',
          healthInfo: 'Health Status',
          dataId: 'Data ID',
          plantHeightCm: 'Plant Height (cm)',
          tillerCount: 'Tiller Count',
          spikeLengthCm: 'Spike Length (cm)',
          daysToEmergence: 'Days to Emergence',
          daysToTillering: 'Days to Tillering',
          daysToHeading: 'Days to Heading',
          daysToFlowering: 'Days to Flowering',
          daysToGrainFilling: 'Days to Grain Filling',
          daysToMaturity: 'Days to Maturity',
          lodgingScore: 'Lodging Score',
          biomassWeightKg: 'Biomass Weight (kg)',
          spikeDensity: 'Spike Density',
          grainWeightPerSpike: 'Grain Weight per Spike',
          diseaseScore: 'Disease Score',
          stressIndicators: 'Stress Indicators',
          pestObservation: 'Pest Observation',
          photoEvidence: 'Photo Evidence',
          createTime: 'Created Time',
        },

        placeholder: {
          plantHeightCm: 'Please enter plant height',
          tillerCount: 'Please enter tiller count',
          spikeLengthCm: 'Please enter spike length',
          daysToEmergence: 'Please enter days',
          daysToTillering: 'Please enter days',
          daysToHeading: 'Please enter days',
          daysToFlowering: 'Please enter days',
          daysToGrainFilling: 'Please enter days',
          daysToMaturity: 'Please enter days',
          lodgingScore: 'Please enter lodging score',
          biomassWeightKg: 'Please enter biomass weight',
          spikeDensity: 'Please enter spike density',
          grainWeightPerSpike: 'Please enter grain weight per spike',
          diseaseScore: 'Please enter disease score (JSON format)',
          stressIndicators: 'Please enter stress indicators (JSON format)',
          pestObservation: 'Please enter pest observation',
        },

        rules: {
          plantHeightCmRequired: 'Please enter plant height',
          tillerCountRequired: 'Please enter tiller count',
          spikeLengthCmRequired: 'Please enter spike length',
          daysToEmergenceRequired: 'Please enter days to emergence',
          daysToTilleringRequired: 'Please enter days to tillering',
          daysToHeadingRequired: 'Please enter days to heading',
          daysToFloweringRequired: 'Please enter days to flowering',
          daysToGrainFillingRequired: 'Please enter days to grain filling',
          daysToMaturityRequired: 'Please enter days to maturity',
          lodgingScoreRequired: 'Please enter lodging score',
          biomassWeightKgRequired: 'Please enter biomass weight',
          spikeDensityRequired: 'Please enter spike density',
          grainWeightPerSpikeRequired: 'Please enter grain weight per spike',
          diseaseScoreRequired: 'Please enter disease score',
          stressIndicatorsRequired: 'Please enter stress indicators',
          pestObservationRequired: 'Please enter pest observation',
        },

        columns: {
          plantHeightCm: 'Plant Height (cm)',
          tillerCount: 'Tiller Count',
          daysToMaturity: 'Days to Maturity',
          lodgingScore: 'Lodging Score',
          biomassWeightKg: 'Biomass (kg)',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },

      // Environment & Soil Data Collection
      environmentSoil: {
        title: 'Environment & Soil Data Collection',
        subtitle: 'Collect soil properties and environmental monitoring data',
        list: 'Environment Soil Data List',
        add: 'Add Environment Soil Data',
        edit: 'Edit Environment Soil Data',
        detail: 'Environment Soil Data Details',
        delete: 'Delete Data',
        deleteConfirm: 'Are you sure to delete this data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search topography, water source',
        filterByTopography: 'Filter by topography',
        allTopography: 'All Topography',

        form: {
          soilInfo: 'Soil Properties',
          environmentInfo: 'Environmental Monitoring',
          dataId: 'Data ID',
          soilPh: 'Soil pH',
          soilEc: 'Soil EC',
          soilNitrogenPercent: 'Soil Nitrogen (%)',
          soilPhosphorusPpm: 'Soil Phosphorus (PPM)',
          soilPotassiumPpm: 'Soil Potassium (PPM)',
          previousCrop: 'Previous Crop',
          waterSource: 'Water Source',
          topography: 'Topography',
          slopePercent: 'Slope (%)',
          soilMoisturePercent: 'Soil Moisture (%)',
          soilTemperatureC: 'Soil Temperature (°C)',
          rainfallMm: 'Rainfall (mm)',
          airTemperatureC: 'Air Temperature (°C)',
          humidityPercent: 'Humidity (%)',
          windSpeedMs: 'Wind Speed (m/s)',
          solarRadiationWm2: 'Solar Radiation (W/m²)',
          timestamp: 'Timestamp',
          createTime: 'Created Time',
        },

        placeholder: {
          soilPh: 'Please enter soil pH',
          soilEc: 'Please enter soil EC',
          soilNitrogenPercent: 'Please enter soil nitrogen',
          soilPhosphorusPpm: 'Please enter soil phosphorus',
          soilPotassiumPpm: 'Please enter soil potassium',
          previousCrop: 'Please enter previous crop (optional)',
          waterSource: 'Please enter water source',
          topography: 'Please enter topography',
          slopePercent: 'Please enter slope (optional)',
          soilMoisturePercent: 'Please enter soil moisture',
          soilTemperatureC: 'Please enter soil temperature',
          rainfallMm: 'Please enter rainfall (optional)',
          airTemperatureC: 'Please enter air temperature (optional)',
          humidityPercent: 'Please enter humidity',
          windSpeedMs: 'Please enter wind speed',
          solarRadiationWm2: 'Please enter solar radiation',
          timestamp: 'Please select timestamp',
        },

        rules: {
          soilPhRequired: 'Please enter soil pH',
          soilEcRequired: 'Please enter soil EC',
          soilNitrogenPercentRequired: 'Please enter soil nitrogen',
          soilPhosphorusPpmRequired: 'Please enter soil phosphorus',
          soilPotassiumPpmRequired: 'Please enter soil potassium',
          waterSourceRequired: 'Please enter water source',
          topographyRequired: 'Please enter topography',
          soilMoisturePercentRequired: 'Please enter soil moisture',
          soilTemperatureCRequired: 'Please enter soil temperature',
          humidityPercentRequired: 'Please enter humidity',
          windSpeedMsRequired: 'Please enter wind speed',
          solarRadiationWm2Required: 'Please enter solar radiation',
        },

        columns: {
          soilPh: 'Soil pH',
          waterSource: 'Water Source',
          topography: 'Topography',
          soilMoisturePercent: 'Soil Moisture (%)',
          airTemperatureC: 'Air Temp (°C)',
          timestamp: 'Timestamp',
          actions: 'Actions',
        },
      },

      // Variety Evaluation Data Collection
      varietyEvaluation: {
        title: 'Variety Evaluation Data Collection',
        subtitle: 'Collect seed yield data and approval decision information',
        list: 'Variety Evaluation Data List',
        add: 'Add Variety Evaluation Data',
        edit: 'Edit Variety Evaluation Data',
        detail: 'Variety Evaluation Data Details',
        delete: 'Delete Data',
        deleteConfirm: 'Are you sure to delete this data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search plot ID',

        form: {
          basicInfo: 'Basic Information',
          yieldInfo: 'Yield Information',
          dataId: 'Data ID',
          plotId: 'Plot ID',
          plotAreaM2: 'Plot Area (m²)',
          grainWeightKg: 'Grain Weight (kg)',
          yieldQtPerHa: 'Yield (qt/ha)',
          moistureContent: 'Moisture Content (%)',
          createTime: 'Created Time',
        },

        placeholder: {
          plotId: 'Please enter plot ID',
          plotAreaM2: 'Please enter plot area',
          grainWeightKg: 'Please enter grain weight',
          yieldQtPerHa: 'Please enter yield',
          moistureContent: 'Please enter moisture content',
        },

        rules: {
          plotIdRequired: 'Please enter plot ID',
          plotAreaM2Required: 'Please enter plot area',
          grainWeightKgRequired: 'Please enter grain weight',
          yieldQtPerHaRequired: 'Please enter yield',
          moistureContentRequired: 'Please enter moisture content',
        },

        columns: {
          plotId: 'Plot ID',
          plotAreaM2: 'Plot Area (m²)',
          grainWeightKg: 'Grain Weight (kg)',
          yieldQtPerHa: 'Yield (qt/ha)',
          moistureContent: 'Moisture (%)',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },

      // Laboratory Test Data Collection
      laboratoryTest: {
        title: 'Laboratory Test Data Collection',
        subtitle: 'Record sample data, germination rate and other laboratory test information',
        list: 'Laboratory Test Data List',
        add: 'Add Laboratory Test Data',
        edit: 'Edit Laboratory Test Data',
        detail: 'Laboratory Test Data Details',
        delete: 'Delete Data',
        deleteConfirm: 'Are you sure to delete this data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search sample ID',

        form: {
          sampleInfo: 'Sample Information',
          testInfo: 'Test Information',
          dataId: 'Data ID',
          sampleId: 'Sample ID',
          sampleCondition: 'Sample Condition',
          germinationRate: 'Germination Rate (%)',
          purityPercent: 'Purity (%)',
          moistureContentPercent: 'Moisture Content (%)',
          proteinPercent: 'Protein (%)',
          toxinLevelPpm: 'Toxin Level (PPM)',
          seedHealthFindings: 'Seed Health Findings',
          traceabilityLink: 'Traceability Link',
          labReportFile: 'Lab Report File',
          createTime: 'Created Time',
        },

        placeholder: {
          sampleId: 'Please enter sample ID',
          sampleCondition: 'Please enter sample condition',
          germinationRate: 'Please enter germination rate',
          purityPercent: 'Please enter purity',
          moistureContentPercent: 'Please enter moisture content',
          proteinPercent: 'Please enter protein content',
          toxinLevelPpm: 'Please enter toxin level (optional)',
          seedHealthFindings: 'Please enter seed health findings',
          traceabilityLink: 'Please enter traceability link',
        },

        rules: {
          sampleIdRequired: 'Please enter sample ID',
          sampleConditionRequired: 'Please enter sample condition',
          germinationRateRequired: 'Please enter germination rate',
          purityPercentRequired: 'Please enter purity',
          moistureContentPercentRequired: 'Please enter moisture content',
          proteinPercentRequired: 'Please enter protein content',
          seedHealthFindingsRequired: 'Please enter seed health findings',
          traceabilityLinkRequired: 'Please enter traceability link',
        },

        columns: {
          sampleId: 'Sample ID',
          sampleCondition: 'Sample Condition',
          germinationRate: 'Germination Rate (%)',
          purityPercent: 'Purity (%)',
          proteinPercent: 'Protein (%)',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },
    },
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

    // Supplier Management
    supplier: {
      // Supplier Authentication
      auth: {
        title: 'Supplier Authentication Application',
        subtitle: 'Submit detailed information for supplier identity verification',
        applySuccess: 'Authentication application submitted successfully',
        applyFailed: 'Failed to submit authentication application',

        form: {
          orgName: 'Enterprise/Organization Name',
          creditCode: 'Unified Social Credit Code',
          legalPerson: 'Legal Representative/Person in Charge',
          legalId: 'Legal Representative ID Number',
          adCode: 'Administrative Region',
          businessScope: 'Business Scope/Main Products',
          licensePath: 'Business License',
          contactName: 'Contact Person Name',
          contactPhone: 'Contact Phone',
        },

        placeholder: {
          orgName: 'Please enter enterprise/organization name',
          creditCode: 'Please enter unified social credit code (18 digits)',
          legalPerson: 'Please enter legal representative/person in charge',
          legalId: 'Please enter ID number',
          adCode: 'Please select administrative region',
          businessScope: 'Please enter business scope or main products',
          contactName: 'Please enter contact person name',
          contactPhone: 'Please enter contact phone',
        },

        rules: {
          orgNameRequired: 'Please enter enterprise/organization name',
          creditCodeRequired: 'Please enter unified social credit code',
          creditCodeLength: 'Unified social credit code should be 18 digits',
          legalPersonRequired: 'Please enter legal representative/person in charge',
          legalIdRequired: 'Please enter legal representative ID number',
          legalIdFormat: 'Please enter a valid ID number',
          adCodeRequired: 'Please select administrative region',
          businessScopeRequired: 'Please enter business scope or main products',
          licensePathRequired: 'Please upload business license',
          contactNameRequired: 'Please enter contact person name',
          contactPhoneRequired: 'Please enter contact phone',
          contactPhoneFormat: 'Please enter a valid phone number',
        },

        uploadTip: 'Supports jpg/png/pdf, single file size less than 2MB',
      },

      // Supplier Authentication Approval
      approval: {
        title: 'Supplier Authentication Approval',
        subtitle: 'Review supplier identity authentication application materials',
        list: 'Pending Approval List',
        detail: 'Approval Details',
        approveSuccess: 'Approved successfully',
        rejectSuccess: 'Rejected',

        searchPlaceholder: 'Search enterprise name, credit code, contact',
        advancedSearch: 'Advanced Filters',
        showAdvanced: 'Show Advanced Filters',
        hideAdvanced: 'Hide Advanced Filters',
        resetFilters: 'Reset Filters',
        applyFilters: 'Apply Filters',

        filter: {
          keyword: 'Keyword',
          status: 'Status',
          allStatus: 'All Status',
          adCode: 'Region',
          allRegion: 'All Regions',
          applyTime: 'Apply Time',
          approveTime: 'Approve Time',
          timeTo: 'to',
        },

        status: {
          pending: 'Under Review',
          approved: 'Approved',
          rejected: 'Rejected',
        },

        columns: {
          orgName: 'Enterprise/Organization Name',
          creditCode: 'Unified Social Credit Code',
          legalPerson: 'Legal Representative',
          contactName: 'Contact Person',
          contactPhone: 'Contact Phone',
          applyTime: 'Application Time',
          status: 'Authentication Status',
          actions: 'Actions',
        },

        form: {
          applicantInfo: 'Applicant Information',
          certInfo: 'Authentication Information',
          auditInfo: 'Audit Operation',
          auditResult: 'Audit Result',
          auditOpinion: 'Audit Opinion',
          pass: 'Approve',
          reject: 'Reject',
        },

        placeholder: {
          auditOpinion: 'Please enter audit opinion',
        },

        rules: {
          auditResultRequired: 'Please select audit result',
          auditOpinionRequired: 'Please enter audit opinion',
        },

        actions: {
          submit: 'Submit Audit',
          audit: 'Audit',
          view: 'View',
        },

        messages: {
          submitSuccess: 'Audit submitted successfully',
          confirmSubmit: 'Are you sure to submit the audit result?',
        },
      },

      // Supplier Information Maintenance
      info: {
        title: 'Supplier Information Maintenance',
        subtitle: 'View and manage all supplier certification information',
        list: 'Supplier List',
        detail: 'Supplier Details',

        searchPlaceholder: 'Search enterprise name, credit code, contact',
        showAdvanced: 'Show Advanced Filters',
        hideAdvanced: 'Hide Advanced Filters',
        resetFilters: 'Reset Filters',
        applyFilters: 'Apply Filters',

        filter: {
          keyword: 'Keyword',
          status: 'Status',
          allStatus: 'All Status',
          adCode: 'Region',
          allRegion: 'All Regions',
          applyTime: 'Apply Time',
          approveTime: 'Approve Time',
        },

        columns: {
          orgName: 'Enterprise/Organization Name',
          creditCode: 'Unified Social Credit Code',
          legalPerson: 'Legal Representative',
          contactName: 'Contact Person',
          contactPhone: 'Contact Phone',
          adCode: 'Administrative Region',
          applyTime: 'Application Time',
          approveTime: 'Approval Time',
          status: 'Authentication Status',
          actions: 'Actions',
        },

        actions: {
          view: 'View Details',
          edit: 'Edit',
          delete: 'Delete',
        },

        status: {
          pending: 'Under Review',
          approved: 'Approved',
          rejected: 'Rejected',
        },
      },

      // Supplier Product Management
      product: {
        title: 'Supplier Product Management',
        subtitle: 'Manage the relationship between suppliers and agricultural inputs',
        list: 'Product Supply List',
        detail: 'Supply Details',
        add: 'Add Supply Relationship',
        edit: 'Edit Supply Relationship',
        delete: 'Delete Supply Relationship',
        batchDelete: 'Batch Delete',
        deleteConfirm: 'Are you sure to delete this supply relationship?',
        batchDeleteConfirm: 'Are you sure to delete the selected supply relationships?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        // Search and Filter
        searchPlaceholder: 'Search product name, code, supplier',
        filterBySupplier: 'Filter by Supplier',
        filterByType: 'Filter by Input Type',
        filterByQuality: 'Filter by Quality Rating',
        allSuppliers: 'All Suppliers',
        allTypes: 'All Types',
        allQuality: 'All Ratings',
        keyword: 'Keyword',

        // Input Type
        inputType: {
          all: 'All',
          pesticide: 'Pesticide',
          fertilizer: 'Fertilizer',
          seed: 'Seed',
          other: 'Other',
        },

        // Quality Rating
        qualityRating: {
          all: 'All',
          A: 'Grade A (Excellent)',
          B: 'Grade B (Good)',
          C: 'Grade C (Fair)',
          D: 'Grade D (Poor)',
        },

        // Certification Status
        certStatus: {
          notPassed: 'Not Passed',
          pending: 'Under Review',
          passed: 'Passed',
        },

        // Form Fields
        form: {
          basicInfo: 'Basic Information',
          supplyInfo: 'Supply Information',
          productInfo: 'Product Details',
          qualityInfo: 'Quality Information',

          supplierId: 'Supplier',
          supplierName: 'Supplier Name',
          inputId: 'Input',
          inputName: 'Input Name',
          inputType: 'Input Type',
          inputSku: 'Input Code',
          inputSpec: 'Product Specification',
          supplierProductCode: 'Supplier Product Code',
          supplierProductName: 'Supplier Product Name',
          currentPrice: 'Current Price',
          qualityRating: 'Quality Rating',
          certStatus: 'Certification Status',
          notes: 'Notes',
          createTime: 'Create Time',
          updateTime: 'Update Time',
        },

        // Form Placeholders
        placeholder: {
          supplierId: 'Please select supplier',
          inputId: 'Please select input',
          inputName: 'Please enter input name',
          inputSku: 'Please enter input code',
          supplierProductCode: 'Please enter supplier product code (max 100 chars)',
          supplierProductName: 'Please enter supplier product name (max 200 chars)',
          qualityRating: 'Please select quality rating',
          notes: 'Please enter notes (max 500 chars)',
        },

        // Form Validation
        rules: {
          supplierIdRequired: 'Please select supplier',
          inputIdRequired: 'Please select input',
          supplierProductCodeLength: 'Supplier product code cannot exceed 100 characters',
          supplierProductNameLength: 'Supplier product name cannot exceed 200 characters',
          notesLength: 'Notes cannot exceed 500 characters',
        },

        // Table Columns
        columns: {
          inputName: 'Product Name',
          inputSpec: 'Specification',
          inputType: 'Type',
          supplierName: 'Supplier Name',
          supplierProductCode: 'Supplier Product Code',
          currentPrice: 'Current Price',
          qualityRating: 'Quality Rating',
          certStatus: 'Certification Status',
          createTime: 'Create Time',
          actions: 'Actions',
        },

        // Actions
        actions: {
          view: 'View Details',
          edit: 'Edit',
          delete: 'Delete',
        },

        // Messages
        messages: {
          selectItems: 'Please select items to delete',
          relationExists: 'The relationship between this supplier and input already exists',
          noData: 'No data',
        },

        // Detail Dialog Sections
        detailSections: {
          basicInfo: 'Basic Information',
          supplyInfo: 'Supply Relationship Attributes',
          editSupplyInfo: 'Edit Supply Information',
        },
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
