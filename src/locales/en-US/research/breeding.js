// 育种管理国际化文件
export default {
  title: 'Seed Multiplication Batch Info',
  subtitle: 'Integrated management of seed multiplication batches, tracking records, and testing information',
  relatedRecords: 'Related Records',

  // Shared crop types
  cropType: {
    wheat: 'Wheat',
    corn: 'Corn',
    rice: 'Rice',
    soybean: 'Soybean',
    cotton: 'Cotton',
  },

  // Shared breeding levels
  breedingLevel: {
    parentPrep: 'Parent Preparation',
    original: 'Breeder Seed',
    foundation: 'Foundation Seed',
    certified: 'Certified Seed',
  },

  // Shared status
  status: {
    ongoing: 'Ongoing',
    completed: 'Completed',
    terminated: 'Terminated',
  },

  // Batch related
  batch: {
    title: 'Breeding Batch Information',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    searchPlaceholder: 'Search batch ID, variety name',
    filterByCrop: 'Filter by crop type',
    filterByStatus: 'Filter by status',
    allCrops: 'All Crops',
    allStatus: 'All Status',
    deleteConfirm: 'Are you sure you want to delete this breeding batch?',
    columns: {
      batchId: 'Batch ID',
      varietyName: 'Variety Name',
      cropType: 'Crop Type',
      breedingLevel: 'Breeding Level',
      startDate: 'Start Date',
      status: 'Status',
      trackingCount: 'Tracking Records',
      testCount: 'Test Records',
    },
    form: {
      batchId: 'Batch ID',
      varietyName: 'Variety Name',
      cropType: 'Crop Type',
      breedingLevel: 'Breeding Level',
      parentSeedSource: 'Parent Seed Source',
      status: 'Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      expectedYield: 'Expected Yield',
      actualYield: 'Actual Yield',
      toMultiplyQuantity: 'To Multiply Quantity',
      orgId: 'Organization ID',
      orgName: 'Organization Name',
    },
  },

  // Tracking related
  tracking: {
    title: 'Breeding Tracking Information',
    add: 'Add Tracking',
    edit: 'Edit Tracking',
    delete: 'Delete Tracking',
    detail: 'Tracking Details',
    deleteConfirm: 'Are you sure you want to delete this tracking record?',
    stage: {
      parentPrep: 'Parent Preparation',
      original: 'Breeder Seed',
      foundation: 'Foundation Seed',
      certified: 'Certified Seed',
    },
    result: {
      normal: 'Normal',
      abnormal: 'Abnormal',
      observing: 'Under Observation',
    },
    form: {
      trackingId: 'Tracking ID',
      batchId: 'Batch ID',
      cropType: 'Crop Type',
      stageName: 'Stage Name',
      trackingResult: 'Tracking Result',
      location: 'Location',
      startDate: 'Start Date',
      completeDate: 'Completion Date',
      expectedYield: 'Expected Yield',
      actualYield: 'Actual Yield',
      toMultiplyQuantity: 'To Multiply Quantity',
      fieldInspectionScore: 'Field Inspection Score',
      gpsLongitude: 'GPS Longitude',
      gpsLatitude: 'GPS Latitude',
      diseaseObservation: 'Disease Observation',
      orgId: 'Organization ID',
      orgName: 'Organization Name',
      cropTypePlaceholder: 'Please select crop type',
      stageNamePlaceholder: 'Please select stage name',
      trackingResultPlaceholder: 'Please select tracking result',
      locationPlaceholder: 'Please enter location',
      startDatePlaceholder: 'Please select start date',
    },
    validation: {
      cropTypeRequired: 'Please select crop type',
      stageNameRequired: 'Please select stage name',
      locationRequired: 'Please enter location',
      startDateRequired: 'Please select start date',
    },
  },

  // Test related
  test: {
    title: 'Breeding Test Information',
    add: 'Add Test',
    edit: 'Edit Test',
    delete: 'Delete Test',
    detail: 'Test Details',
    deleteConfirm: 'Are you sure you want to delete this test record?',
    result: {
      qualified: 'Qualified',
      unqualified: 'Unqualified',
      toBeRetested: 'Pending Retest',
    },
    form: {
      testId: 'Test ID',
      trackingId: 'Tracking ID',
      batchId: 'Batch ID',
      cropType: 'Crop Type',
      testDate: 'Test Date',
      testResult: 'Test Result',
      sampleLocation: 'Sample Location',
      sampleWeight: 'Sample Weight',
      germinationRate: 'Germination Rate',
      purity: 'Purity',
      moistureContent: 'Moisture Content',
      pestDetection: 'Pest Detection',
      cropTypePlaceholder: 'Please select crop type',
      testResultPlaceholder: 'Please select test result',
    },
    validation: {
      cropTypeRequired: 'Please select crop type',
      testDateRequired: 'Please select test date',
      testResultRequired: 'Please select test result',
    },
  },

  // Detail page
  detail: {
    title: 'Breeding Batch Details',
    tabs: {
      basicInfo: 'Basic Information',
      trackingRecords: 'Tracking Records',
      testRecords: 'Test Records',
    },
    trackingCount: 'Tracking Records',
    testCount: 'Test Records',
    relatedTests: 'Related Test Records',
    basicInfo: 'Basic Information',
    testData: 'Test Data',
    timeline: 'Timeline',
    yieldData: 'Yield Data',
    gpsLocation: 'GPS Location',
    orgInfo: 'Organization Info',
  },

  // Common messages
  messages: {
    queryError: 'Query failed',
    loadError: 'Failed to load data',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',
    deleteSuccess: 'Deleted successfully',
    deleteError: 'Delete failed',
    operationError: 'Operation failed',
  },
  // Breeder Seed Module
  seed: {
    // Production Data Collection
    production: {
      title: 'Seed Production Data',
      subtitle: 'Record Seed production data to ensure seed propagation process is traceable',
      list: 'Production Data List',
      add: 'Add Production Data',
      detail: 'Production Data Details',
      delete: 'Delete Production Data',
      deleteConfirm: 'Are you sure to delete this production data?',
      deleteSuccess: 'Deleted Successfully',
      addSuccess: 'Added Successfully',

      searchPlaceholder: 'Search variety name',
      filterByVariety: 'Filter by Variety',
      filterByDate: 'Filter by Production Time',
      allVarieties: 'All Varieties',

      form: {
        basicInfo: 'Basic Information',
        productionInfo: 'Production Information',
        produceBatchId: 'Production Batch ID',
        produceBatchName: 'Production Batch Name',
        breedBatchName: 'Breeding Batch Name',
        trialName: 'Trial Name',
        varietyId: 'Variety ID',
        varietyName: 'Variety Name',
        cropType: 'Crop Type',
        time: 'Production Time',
        landId: 'Land ID',
        landName: 'Land Name',
        inputSeedQuantity: 'Input Seed Quantity',
        produceSeedQuantrity: 'Output Seed Quantity',
        fromSeedLevel: 'From Seed Level',
        toSeedLevel: 'To Seed Level',
        operatorId: 'Operator ID',
        operatorName: 'Operator Name',
        produceStatus: 'Production Status',
        createTime: 'Created Time',
        updateTime: 'Updated Time',
      },

      placeholder: {
        produceBatchId: 'Please select production batch ID',
        produceBatchName: 'Please select production batch name',
        breedBatchId: 'Please select breeding batch ID',
        breedBatchName: 'Please select breeding batch name',
        trialName: 'Please select trial name',
        varietyName: 'Please select variety name',
        fromSeedLevel: 'Please select from seed level',
        toSeedLevel: 'Please select to seed level',
        time: 'Please select production time',
        landName: 'Please select land name',
        inputSeedQuantity: 'Please enter input seed quantity (kg)',
        produceSeedQuantrity: 'Please enter output seed quantity (kg)',
      },

      rules: {
        breedBatchIdRequired: 'Please select breeding batch ID',
        varietyNameRequired: 'Please select variety name',
        fromSeedLevelRequired: 'Please select from seed level',
        toSeedLevelRequired: 'Please select to seed level',
        timeRequired: 'Please select production time',
        landNameRequired: 'Please select land name',
        inputSeedQuantityRequired: 'Please enter input seed quantity',
        inputSeedQuantityMin: 'Input seed quantity must be greater than 0',
        produceSeedQuantrityRequired: 'Please enter output seed quantity',
        produceSeedQuantrityMin: 'Output seed quantity must be greater than or equal to input seed quantity',
      },

      columns: {
        produceBatchId: 'Production Batch ID',
        produceBatchName: 'Production Batch Name',
        breedBatchName: 'Breeding Batch Name',
        varietyName: 'Variety Name',
        cropType: 'Crop Type',
        time: 'Production Time',
        landName: 'Land Name',
        inputSeedQuantity: 'Input Quantity (kg)',
        produceSeedQuantrity: 'Output Quantity (kg)',
        fromSeedLevel: 'From Seed Level',
        toSeedLevel: 'To Seed Level',
        operatorName: 'Operator',
        produceStatus: 'Production Status',
        createTime: 'Created Time',
        actions: 'Actions',
      },

      status: {
        FINISHED: 'Finished',
      },

      result: {
        // title: 'PRODUCTION DATA COLLECTION',
        title: 'Production Data Collection',
        selection: 'Production Batch Selection',
        productionBatchSelection: 'Production Batch Selection',
        collectionData: 'Collection Data',
        section: {
          productionBatchSelection: 'Production Batch Selection',
          collectionData: 'Collection Data',
        },
      },
    },

    // Distribution Management
    distribution: {
      title: 'Seed Distribution Data',
      subtitle: 'Manage Seed distribution records, track seed flow to OSE',
      list: 'Distribution Data List',
      add: 'Add Distribution Data',
      detail: 'Distribution Data Details',
      delete: 'Delete Distribution Data',
      deleteConfirm: 'Are you sure to delete this distribution data?',
      deleteSuccess: 'Deleted Successfully',
      addSuccess: 'Added Successfully',

      searchPlaceholder: 'Search OSE name',
      filterByCrop: 'Filter by Crop Type',
      filterByVariety: 'Filter by Variety',
      filterByDate: 'Filter by Distribution Time',
      allCrops: 'All Crops',
      allVarieties: 'All Varieties',

      form: {
        basicInfo: 'Basic Information',
        distributionInfo: 'Distribution Information',
        detailList: 'Distribution Details',
        distributeId: 'Distribution ID',
        oseId: 'OSE Name',
        oseName: 'OSE Name',
        time: 'Distribution Time',
        people: 'Distribution Operator',
        organ: 'Seed Organization Name',
        distributeName: 'Distribution Name',
        fromSeedLevel: 'From Seed Level',
        toSeedLevel: 'To Seed Level',
        remark: 'Remark',
        totalDistributeQuantity: 'Total Distribution Quantity',
        distributeStatus: 'Distribution Status',
        createTime: 'Created Time',
        updateTime: 'Updated Time',

        produceBatchId: 'Production Batch ID',
        breedBatchName: 'Breeding Batch Name',
        parentalSeedSource: 'Parental Seed Source',
        varietyName: 'Variety Name',
        cropType: 'Crop Type',
        distributeQuantity: 'Distribution Quantity',
        produceBatchRemaining: 'Production Batch Remaining Quantity',
      },

      placeholder: {
        oseId: 'Please select OSE Name',
        time: 'Please select distribution time',
        people: 'Please enter distribution operator name',
        organ: 'Please enter seed organization name',
        distributeName: 'Please enter distribution name',
        fromSeedLevel: 'Please select from seed level',
        toSeedLevel: 'Please select to seed level',
        remark: 'Remark (optional)',
        produceBatchId: 'Please select production batch',
        breedBatchName: 'Please select breeding batch name',
        parentalSeedSource: 'Please select parental seed source',
        varietyName: 'Please select variety name',
        distributeQuantity: 'Please enter distribution quantity (kg)',
      },

      rules: {
        distributeName: 'Please enter distribution name',
        oseId: 'Please select OSE Name',
        time: 'Please select distribution time',
        people: 'Please enter distribution operator name',
        organ: 'Please enter seed organization name',
        fromSeedLevelRequired: 'Please select from seed level',
        toSeedLevelRequired: 'Please select to seed level',
        detailListRequired: 'Please add at least one distribution detail',
        produceBatchId: 'Please select production batch',
        distributeQuantity: 'Please enter distribution quantity',
        distributeQuantityMin: 'Distribution quantity must be greater than 0',
        distributeQuantityMax: 'Distribution quantity cannot exceed production batch remaining quantity',
      },

      // Detail related
      addDetail: 'Add Detail',
      detailIndex: 'Detail {index}',
      remaining: 'Remaining',
      maxQuantity: 'Maximum Distributable Quantity',
      noDetail: 'No distribution details available',

      // Detail table columns
      detailColumns: {
        varietyName: 'Variety Name',
        cropType: 'Crop Type',
        produceBatchId: 'Production Batch ID',
        produceBatchName: 'Production Batch Name',
        breedBatchName: 'Breeding Batch Name',
        parentalSeedSource: 'Parental Seed Source',
        distributeQuantity: 'Distribution Quantity (kg)',
        produceBatchRemaining: 'Batch Remaining Quantity (kg)',
        createTime: 'Created Time',
      },

      columns: {
        distributeId: 'Distribution ID',
        oseName: 'OSE Name',
        time: 'Distribution Time',
        people: 'Distribution Operator',
        organ: 'Seed Organization',
        distributeName: 'Distribution Name',
        fromSeedLevel: 'From Seed Level',
        toSeedLevel: 'To Seed Level',
        totalDistributeQuantity: 'Total Distribution Quantity (kg)',
        distributeStatus: 'Distribution Status',
        createTime: 'Created Time',
        actions: 'Actions',
      },

      status: {
        distributed: 'Distributed',
        已分发: 'Distributed',
        DISTRIBUTED: 'Distributed',
        Distributed: 'Distributed',
        received: 'Received',
        Received: 'Received',
      },

      actions: {
        addDetail: 'Add Distribution Detail',
        removeDetail: 'Remove',
      },
    },

    // OSE Maintenance
    ose: {
      title: 'OSE Maintenance Management',
      subtitle: 'Manage OSE basic information to ensure accurate seed recipient information',
      list: 'OSE List',
      add: 'Add OSE',
      edit: 'Edit OSE',
      detail: 'OSE Details',
      delete: 'Delete OSE',
      deleteConfirm: 'Are you sure to delete this OSE?',
      deleteSuccess: 'Deleted Successfully',
      addSuccess: 'Added Successfully',
      updateSuccess: 'Updated Successfully',
      editSuccess: 'Edited Successfully',

      searchPlaceholder: 'Search OSE name',
      filterByStatus: 'Filter by Status',
      filterByDate: 'Filter by Created Time',
      allStatus: 'All Status',

      form: {
        basicInfo: 'Basic Information',
        contactInfo: 'Contact Information',
        oseId: 'OSE ID',
        oseCode: 'OSE Administrative Code',
        oseName: 'OSE Name',
        location: 'Detailed Address',
        regionCode: 'Region Code',
        regionName: 'Region Name',
        contactName: 'Contact Person Name',
        contactNumber: 'Contact Phone',
        oseStatus: 'Status',
        createTime: 'Created Time',
        updateTime: 'Updated Time',
      },

      placeholder: {
        oseCode: 'Please enter OSE administrative code',
        oseName: 'Please enter OSE name',
        location: 'Please enter detailed address',
        regionCode: 'Please select region',
        contactName: 'Please enter contact person name',
        contactNumber: 'Please enter contact phone (12 digits starting with 251)',
      },

      rules: {
        oseCodeRequired: 'Please enter OSE administrative code',
        oseCodeUnique: 'OSE administrative code already exists',
        oseNameRequired: 'Please enter OSE name',
        oseNameUnique: 'OSE name already exists',
        locationRequired: 'Please enter detailed address',
        regionCodeRequired: 'Please select region',
        contactNameRequired: 'Please enter contact person name',
        contactNumberRequired: 'Please enter contact phone',
        contactNumberFormat: 'Please enter correct contact phone format (12 digits starting with 251)',
        contactNumberUnique: 'Contact phone already exists',
      },

      columns: {
        oseCode: 'OSE Administrative Code',
        oseName: 'OSE Name',
        location: 'Detailed Address',
        regionName: 'Region',
        contactName: 'Contact Person',
        contactNumber: 'Contact Phone',
        oseStatus: 'Status',
        createTime: 'Created Time',
        actions: 'Actions',
      },

      status: {
        ENABLED: 'Enabled',
        DISABLED: 'Disabled',
      },
    },

    // OSE Receive Confirmation
    receiveConfirm: {
      title: 'OSE Receive Confirmation',
      subtitle: 'OSE confirms receipt of breeder seed',
      list: 'Receive Confirmation List',
      confirm: 'Confirm Receipt',
      detail: 'Receive Confirmation Details',
      confirmSuccess: 'Confirmed Successfully',

      searchPlaceholder: 'Search OSE name, variety name',
      filterByStatus: 'Filter by Receive Status',
      filterByCrop: 'Filter by Crop Type',
      filterByDate: 'Filter by Time',
      allStatus: 'All Status',
      allCrops: 'All Crops',

      form: {
        basicInfo: 'Basic Information',
        distributionDetail: 'Distribution Details',
        breedSeedDetail: 'Breeder Seed Information',
        confirmInfo: 'Confirmation Information',
        systemInfo: 'System Information',
        receiveConfirmId: 'Receive Confirmation ID',
        distributeId: 'Distribution ID',
        oseId: 'OSE ID',
        oseName: 'OSE Name',
        confirmTime: 'Confirmation Time',
        confirmPeople: 'Operator Name',
        receiveStatus: 'Receive Status',
        remark: 'Additional Notes',
        createTime: 'Created Time',
        updateTime: 'Updated Time',
        breedSeedProduceBatchId: 'Production Batch ID',
        seedType: 'Seed Type',

        totalDistributeQuantity: 'Total Distribution Quantity',
        produceBatchId: 'Production Batch ID',
        // Add alias key used by pages
        breedSeedProduceBatchId: 'Batch ID',
        varietyName: 'Variety Name',
        cropType: 'Crop Type',
        distributeQuantity: 'Distribution Quantity',
      },

      placeholder: {
        confirmTime: 'Please select confirmation time',
        confirmPeople: 'Please enter operator name',
        remark: 'Additional notes (optional)',
      },

      rules: {
        confirmTime: 'Please select confirmation time',
        confirmPeople: 'Please enter operator name',
      },

      columns: {
        receiveConfirmId: 'Receive Confirmation ID',
        distributeId: 'Distribution ID',
        oseName: 'OSE Name',
        seedId: 'Seed ID',
        breedSeedProduceBatchId: 'Production Batch ID',
        varietyName: 'Variety Name',
        seedType: 'Seed Type',
        totalDistributeQuantity: 'Total Distribution Quantity (kg)',
        confirmTime: 'Confirmation Time',
        confirmPeople: 'Operator Name',
        receiveStatus: 'Receive Status',
        createTime: 'Created Time',
        // Add missing columns used by list views
        breedSeedProduceBatchId: 'Batch ID',
        seedType: 'Seed Type',
        varietyName: 'Variety Name',
        actions: 'Actions',
      },

      status: {
        PENDING: 'Pending',
        CONFIRMED: 'Confirmed',
      },

      stats: {
        totalRecords: 'Total Records',
        pendingCount: 'Pending',
        confirmedCount: 'Confirmed',
        totalQuantity: 'Total Quantity',
      },

      messages: {
        noSeedData: 'No breeder seed distribution data available',
      },
    },
  },

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
    searchPlaceholder: 'Search Objective, batch ID',
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

    // Crop Types (common, better in common.js, but keep here as well)
    cropTypes: {
      wheat: 'Wheat',
      maize: 'Maize',
      sorghum: 'Sorghum',
      teff: 'Teff',
      barley: 'Barley',
      pulses: 'Pulses',
    },

    // Form Fields
    form: {
      basicInfo: 'Plan Basic Information',
      planName: 'Objective',
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
      planName: 'Please enter Objective',
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
      planNameRequired: 'Please enter Objective',
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
      planName: 'Objective',
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

  // Seed Multiplication Batch Info Collection
  breedingBatch: {
    title: 'Seed Multiplication Batch Info',
    subtitle: 'Record seed multiplication batch basic information and yield data',
    list: 'Seed Multiplication Batch Info List',
    add: 'Add Seed Multiplication Batch Info',
    edit: 'Edit Seed Multiplication Batch Info',
    detail: 'Seed Multiplication Batch Info Details',
    delete: 'Delete Batch',
    deleteConfirm: 'Are you sure to delete this?',
    deleteSuccess: 'Deleted successfully',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',

    // Search and Filter
    searchPlaceholder: 'Search batch ID',
    filterByCropType: 'Filter by crop type',
    filterByStatus: 'Filter by status',
    allTypes: 'All Types',
    allStatus: 'All Status',

    // Crop Type
    cropType: {
      wheat: 'Wheat',
      corn: 'Corn',
      rice: 'Rice',
      soybean: 'Soybean',
      cotton: 'Cotton',
    },

    // Breeding Level
    breedingLevel: {
      parentPrep: 'Parent Preparation',
      original: 'Original Seed',
      foundation: 'Foundation Seed',
      certified: 'Certified Seed',
    },

    // Batch Status
    status: {
      ongoing: 'Ongoing',
      completed: 'Completed',
      terminated: 'Terminated',
    },

    // Form Fields
    form: {
      basicInfo: 'Basic Information',
      yieldInfo: 'Yield Information',
      orgInfo: 'Organization Information',
      remarks: 'Remarks',
      batchId: 'Batch ID',
      varietyName: 'Variety Name',
      cropType: 'Crop Type',
      breedingLevel: 'Multiplication  Level',
      parentalSeedSource: 'Parental Seed Source',
      parentalSeedSourcePlaceholder: 'Please select parental seed source',
      distributionId: 'Distribution ID',
      distributionIdPlaceholder: 'Please select distribution ID',
      startDate: 'Start Date',
      endDate: 'Completion Date',
      expectedYield: 'Expected Yield',
      toMultiplyQuantity: 'Quantity to Multiply',
      orgId: 'Organization ID',
      orgName: 'Organization Name',
      remark: 'Remark',
      status: 'Status',
      batchIdPlaceholder: 'Please enter batch ID',
      varietyNamePlaceholder: 'Please enter variety name',
      cropTypePlaceholder: 'Please select crop type',
      breedingLevelPlaceholder: 'Please select breeding level',
      parentSeedSourcePlaceholder: 'Please enter parent seed source',
      startDatePlaceholder: 'Please select start date',
      endDatePlaceholder: 'Please select completion date',
      expectedYieldPlaceholder: 'Please enter expected yield',
      toMultiplyQuantityPlaceholder: 'Please enter quantity to multiply',
      orgIdPlaceholder: 'Please enter organization ID',
      orgNamePlaceholder: 'Please enter organization name',
      remarkPlaceholder: 'Please enter remark information',
    },
  },

  // Breeding Tracking Information Collection
  breedingTracking: {
    title: 'Multiplication  Tracking Information',
    subtitle: 'Track and record growth status and yield data at each stage of the breeding process',
    list: 'Breeding Tracking List',
    add: 'Add Breeding Tracking',
    edit: 'Edit Breeding Tracking',
    detail: 'Breeding Tracking Details',
    delete: 'Delete Tracking',
    deleteConfirm: 'Are you sure to delete this tracking record?',
    deleteSuccess: 'Deleted successfully',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',
    loadError: 'Failed to load data',
    operationError: 'Operation failed',
    queryError: 'Query failed',
    deleteError: 'Delete failed',

    // Search and Filter
    searchPlaceholder: 'Search tracking ID',
    filterByStage: 'Filter by stage',
    filterByResult: 'Filter by tracking result',
    allStages: 'All Stages',
    allResults: 'All Results',

    // Stage Names
    stage: {
      parentPrep: 'Parent Preparation',
      original: 'Original Seed',
      foundation: 'Foundation Seed',
      certified: 'Certified Seed',
    },

    // Tracking Results
    result: {
      normal: 'Normal',
      abnormal: 'Abnormal',
      observing: 'Observing',
    },

    // Crop Types
    cropType: {
      wheat: 'Wheat',
      corn: 'Corn',
      rice: 'Rice',
      soybean: 'Soybean',
      cotton: 'Cotton',
    },

    // Table Columns
    columns: {
      trackingId: 'Tracking ID',
      batchId: 'Batch ID',
      stageName: 'Stage Name',
      location: 'Location',
      result: 'Tracking Result',
      startDate: 'Start Date',
    },

    // Form Fields
    form: {
      basicInfo: 'Basic Information',
      yieldInfo: 'Yield Information',
      gpsInfo: 'GPS Coordinates',
      diseaseInfo: 'Disease Observation',
      orgInfo: 'Organization Information',
      trackingId: 'Tracking ID',
      batchId: 'Breeding Batch ID',
      cropType: 'Crop Type',
      stageName: 'Stage Name',
      trackingResult: 'Tracking Result',
      location: 'Location Description',
      startDate: 'Start Date',
      completeDate: 'Complete Date',
      expectedYield: 'Expected Yield (kg)',
      actualYield: 'Actual Yield (kg)',
      fieldInspectionScore: 'Field Inspection Score',
      gpsLongitude: 'GPS Longitude',
      gpsLatitude: 'GPS Latitude',
      diseaseObservation: 'Disease Observation Record',
      orgId: 'Organization ID',
      orgName: 'Organization Name',
      remark: 'Remark',
      batchIdPlaceholder: 'Please enter breeding batch ID',
      cropTypePlaceholder: 'Please select crop type',
      stageNamePlaceholder: 'Please select stage name',
      trackingResultPlaceholder: 'Please select tracking result',
      locationPlaceholder: 'Please enter location description',
      startDatePlaceholder: 'Please select start date',
      completeDatePlaceholder: 'Please select complete date',
      expectedYieldPlaceholder: 'Please enter expected yield',
      actualYieldPlaceholder: 'Please enter actual yield',
      fieldInspectionScorePlaceholder: 'Please enter field inspection score',
      gpsLongitudePlaceholder: 'Please enter GPS longitude',
      gpsLatitudePlaceholder: 'Please enter GPS latitude',
      diseaseObservationPlaceholder: 'Please enter disease observation record',
      orgIdPlaceholder: 'Please enter organization ID',
      orgNamePlaceholder: 'Please enter organization name',
      remarkPlaceholder: 'Please enter remark information',
    },

    // Form Validation Messages
    validation: {
      batchIdRequired: 'Please enter breeding batch ID',
      cropTypeRequired: 'Please select crop type',
      stageNameRequired: 'Please select stage name',
      locationRequired: 'Please enter location description',
      startDateRequired: 'Please select start date',
    },
  },

  // Breeding Test Information Collection
  breedingTest: {
    title: 'Breeding Test Information Collection',
    subtitle: 'Record breeding test data including germination rate, purity and other test indicators',
    list: 'Breeding Test List',
    add: 'Add Breeding Test',
    edit: 'Edit Breeding Test',
    detail: 'Breeding Test Details',
    delete: 'Delete Test',
    deleteConfirm: 'Are you sure to delete this breeding test?',
    deleteSuccess: 'Deleted successfully',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',

    // Search and Filter
    searchPlaceholder: 'Search test ID',
    filterByCropType: 'Filter by crop type',
    filterByResult: 'Filter by test result',
    allTypes: 'All Types',
    allResults: 'All Results',

    // Crop Type
    cropType: {
      wheat: 'Wheat',
      corn: 'Corn',
      rice: 'Rice',
      soybean: 'Soybean',
      cotton: 'Cotton',
    },

    // Test Result
    result: {
      qualified: 'Qualified',
      unqualified: 'Unqualified',
      recheck: 'Requires Recheck',
    },

    // Form Fields
    form: {
      basicInfo: 'Basic Information',
      testIndicators: 'Test Indicators',
      trackingId: 'Tracking ID',
      batchId: 'Batch ID',
      cropType: 'Crop Type',
      testDate: 'Test Date',
      testOrg: 'Test Organization',
      testId: 'Test ID',
      testPerson: 'Test Person',
      testResult: 'Test Result',
      testReportUrl: 'Test Report URL',
      germinationRate: 'Germination Rate (%)',
      purity: 'Purity (%)',
      moistureContent: 'Moisture Content (%)',
      pestDetection: 'Pest Detection',
      remark: 'Remark',
      testIdPlaceholder: 'Auto-generated by system',
      trackingIdPlaceholder: 'Please enter tracking ID',
      batchIdPlaceholder: 'Please enter batch ID',
      cropTypePlaceholder: 'Please select crop type',
      testDatePlaceholder: 'Please select test date',
      testOrgPlaceholder: 'Please enter test organization',
      testPersonPlaceholder: 'Please enter test person',
      testResultPlaceholder: 'Please select test result',
      testReportUrlPlaceholder: 'Please enter test report URL',
      germinationRatePlaceholder: 'Please enter germination rate',
      purityPlaceholder: 'Please enter purity',
      moistureContentPlaceholder: 'Please enter moisture content',
      pestDetectionPlaceholder: 'Please enter pest detection result',
      remarkPlaceholder: 'Please enter remark information',
    },

  },
}
