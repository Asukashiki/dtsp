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
          publishDept: 'Publishing Department',
          decisionExplanation: 'Decision Explanation',
          publicDescription: 'Public Description',
          recommendedRegion: 'Recommended Region',
          sowingGuide: 'Sowing Guide',
          photos: 'Photos',
        },

        // Form Placeholders
        placeholder: {
          decisionExplanation: 'Please enter decision explanation',
          publicDescription: 'Please enter public description',
          recommendedRegion: 'Please enter recommended region',
          sowingGuide: 'Please enter sowing guide',
        },

        // Action Buttons
        actions: {
          preview: 'Preview Publication Info',
          publish: 'Publish Now',
          offline: 'Take Offline',
          view: 'View',
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
