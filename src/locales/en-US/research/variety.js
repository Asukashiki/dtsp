// 品种管理国际化文件
export default {
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
      published: 'Published',
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
      registerNo: 'Registration No.',
      varietyName: 'Variety Name',
      cropType: 'Crop Type',
      publishDate: 'Publication Date',
      publishDept: 'Publishing Department',
      enterprise: 'Enterprise',
      actions: 'Actions',
    },

    // Detail Page
    detail: {
      basicInfo: 'Variety Basic Information',
      description: 'Variety Description',
      photo: 'Variety Photo',
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

    // Messages
    messages: {
      loadFailed: 'Failed to load variety list',
      loadDetailFailed: 'Failed to load variety details',
    },
  },
}