export default {
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
      breedingModule: 'Breeding Information Management',
      breedingBatch: 'Breeding Batch Information Collection',
      breedingTracking: 'Breeding Tracking Information Collection',
      breedingTest: 'Breeding Test Information Collection',
      breedingTracking: 'Breeding Tracking Management',
      breedingSeed: 'Breeding Seed Management',
      breedingCertification: 'Breeding Seed Certification Application',
      breedingAudit: 'Breeding Seed Audit',
      breedingCertificate: 'Seed Certificate Issuance',
      breedingDataManagement: 'Breeding Data Management',
      fieldInspection: 'Field Inspection Data Collection',
      laboratoryTest: 'Laboratory Test Data Collection',
      breederSeed: 'Breeder Seed Management',
      seedProduction: 'Breeder Seed Production Data Collection',
      seedDistribution: 'Breeder Seed Distribution Management',
      oseManagement: 'OSE Maintenance Management',
      oseReceiveConfirm: 'OSE Receive Confirmation',
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
        unifiedSocialCreditCode: 'Please enter unified social credit code',
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
        unifiedSocialCreditCodeLength: 'Unified social credit code',
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
        rejectedTitle: 'Audit Failed',
        notApplied: 'Not Applied',
        tonsPerYear: 'tons/year',
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
        published: 'Published',
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
    },

    // Breeding Management
    breeding: {
        title: 'Breeding Information Management',
        subtitle: 'Integrated management of breeding batches, tracking records, and testing information',

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
          add: 'Add Batch',
          edit: 'Edit Batch',
          delete: 'Delete Batch',
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
          title: 'Breeder Seed Production Data Collection',
          subtitle: 'Record Breeder Seed production data to ensure seed propagation process is traceable',
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
            breedSeedProduceBatchId: 'Seed Production Batch ID',
            breedBatchId: 'Breeding Batch ID',
            varietyId: 'Variety ID',
            varietyName: 'Variety Name',
            cropType: 'Crop Type',
            time: 'Production Time',
            landId: 'Land ID',
            landName: 'Land Name',
            inputSeedQuantity: 'Input Seed Quantity',
            produceSeedQuantrity: 'Output Seed Quantity',
            operatorId: 'Operator ID',
            operatorName: 'Operator Name',
            produceStatus: 'Production Status',
            createTime: 'Created Time',
            updateTime: 'Updated Time',
          },

          placeholder: {
            breedBatchId: 'Please select breeding batch ID',
            varietyName: 'Please select variety name',
            time: 'Please select production time',
            landName: 'Please select land name',
            inputSeedQuantity: 'Please enter input seed quantity (kg)',
            produceSeedQuantrity: 'Please enter output seed quantity (kg)',
          },

          rules: {
            breedBatchIdRequired: 'Please select breeding batch ID',
            varietyNameRequired: 'Please select variety name',
            timeRequired: 'Please select production time',
            landNameRequired: 'Please select land name',
            inputSeedQuantityRequired: 'Please enter input seed quantity',
            inputSeedQuantityMin: 'Input seed quantity must be greater than 0',
            produceSeedQuantrityRequired: 'Please enter output seed quantity',
            produceSeedQuantrityMin: 'Output seed quantity must be greater than or equal to input seed quantity',
          },

          columns: {
            breedSeedProduceBatchId: 'Production Batch ID',
            varietyName: 'Variety Name',
            cropType: 'Crop Type',
            time: 'Production Time',
            landName: 'Land Name',
            inputSeedQuantity: 'Input Quantity (kg)',
            produceSeedQuantrity: 'Output Quantity (kg)',
            operatorName: 'Operator',
            produceStatus: 'Production Status',
            createTime: 'Created Time',
            actions: 'Actions',
          },

          status: {
            FINISHED: 'Finished',
          },
        },

        // Distribution Management
        distribution: {
          title: 'Breeder Seed Distribution Data Management',
          subtitle: 'Manage Breeder Seed distribution records, track seed flow to OSE',
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
            oseId: 'OSE ID',
            oseName: 'OSE Name',
            time: 'Distribution Time',
            people: 'Distribution Operator',
            organ: 'Seed Organization Name',
            remark: 'Remark',
            totalDistributeQuantity: 'Total Distribution Quantity',
            distributeStatus: 'Distribution Status',
            createTime: 'Created Time',
            updateTime: 'Updated Time',

            breedSeedProduceBatchId: 'Production Batch ID',
            varietyName: 'Variety Name',
            cropType: 'Crop Type',
            distributeQuantity: 'Distribution Quantity',
            produceBatchRemaining: 'Production Batch Remaining Quantity',
          },

          placeholder: {
            oseId: 'Please select OSE',
            time: 'Please select distribution time',
            people: 'Please enter distribution operator name',
            organ: 'Please enter seed organization name',
            remark: 'Remark (optional)',
            breedSeedProduceBatchId: 'Please select production batch',
            distributeQuantity: 'Please enter distribution quantity (kg)',
          },

          rules: {
            oseIdRequired: 'Please select OSE',
            timeRequired: 'Please select distribution time',
            peopleRequired: 'Please enter distribution operator name',
            organRequired: 'Please enter seed organization name',
            detailListRequired: 'Please add at least one distribution detail',
            breedSeedProduceBatchIdRequired: 'Please select production batch',
            distributeQuantityRequired: 'Please enter distribution quantity',
            distributeQuantityMin: 'Distribution quantity must be greater than 0',
            distributeQuantityMax: 'Distribution quantity cannot exceed production batch remaining quantity',
          },

          columns: {
            distributeId: 'Distribution ID',
            oseName: 'OSE Name',
            time: 'Distribution Time',
            people: 'Distribution Operator',
            organ: 'Seed Organization',
            totalDistributeQuantity: 'Total Distribution Quantity (kg)',
            distributeStatus: 'Distribution Status',
            createTime: 'Created Time',
            actions: 'Actions',
          },

          status: {
            distributed: 'Distributed',
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
            confirmPeople: 'Confirmation Operator',
            receiveStatus: 'Receive Status',
            remark: 'Additional Notes',
            createTime: 'Created Time',
            updateTime: 'Updated Time',

            totalDistributeQuantity: 'Total Distribution Quantity',
            breedSeedProduceBatchId: 'Production Batch ID',
            varietyName: 'Variety Name',
            cropType: 'Crop Type',
            distributeQuantity: 'Distribution Quantity',
          },

          placeholder: {
            confirmTime: 'Please select confirmation time',
            confirmPeople: 'Please enter confirmation operator name',
            remark: 'Additional notes (optional)',
          },

          rules: {
            confirmTime: 'Please select confirmation time',
            confirmPeople: 'Please enter confirmation operator name',
          },

          columns: {
            receiveConfirmId: 'Receive Confirmation ID',
            oseName: 'OSE Name',
            totalDistributeQuantity: 'Total Distribution Quantity (kg)',
            confirmTime: 'Confirmation Time',
            confirmPeople: 'Confirmation Operator',
            receiveStatus: 'Receive Status',
            createTime: 'Created Time',
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

      // Breeding Batch Information Collection
      breedingBatch: {
        title: 'Breeding Batch Information Collection',
        subtitle: 'Record breeding batch basic information and yield data',
        list: 'Breeding Batch List',
        add: 'Add Breeding Batch',
        edit: 'Edit Breeding Batch',
        detail: 'Breeding Batch Details',
        delete: 'Delete Batch',
        deleteConfirm: 'Are you sure to delete this breeding batch?',
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
          breedingLevel: 'Breeding Level',
          parentSeedSource: 'Parent Seed Source',
          startDate: 'Start Date',
          endDate: 'Completion Date',
          expectedYield: 'Expected Yield',
          actualYield: 'Actual Yield',
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
          actualYieldPlaceholder: 'Please enter actual yield',
          orgIdPlaceholder: 'Please enter organization ID',
          orgNamePlaceholder: 'Please enter organization name',
          remarkPlaceholder: 'Please enter remark information',
        },
      },

      // Breeding Tracking Information Collection
      breedingTracking: {
        title: 'Breeding Tracking Information Collection',
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
    },

    // Seed Information Service
    seedService: {
      // Seed Promotion Information Management
      promotion: {
        title: 'Seed Promotion Information Management',
        subtitle: 'Manage seed promotion content to provide localized research results and agricultural advice to farmers and cooperatives',
        list: 'Promotion Content List',
        add: 'Add Promotion Content',
        edit: 'Edit Promotion Content',
        detail: 'Promotion Content Detail',
        delete: 'Delete Promotion Content',
        deleteConfirm: 'Are you sure to delete this promotion content?',
        deleteSuccess: 'Deleted Successfully',
        addSuccess: 'Added Successfully',
        editSuccess: 'Edited Successfully',

        // Search Filter
        searchPlaceholder: 'Search title, recommended varieties',
        filterByStatus: 'Filter by Publication Status',
        allStatus: 'All Status',

        // Publication Status
        status: {
          draft: 'Draft',
          published: 'Published',
          expired: 'Expired',
        },

        // Form Fields
        form: {
          basicInfo: 'Basic Information',
          promotionId: 'Promotion Content ID',
          title: 'Promotion Title',
          video: 'Promotional Video',
          promotionSummary: 'Promotion Summary',
          recommendedVarieties: 'Recommended Varieties',
          publishTime: 'Publish Time',
          validPeriod: 'Valid Period (Days)',
          shareLink: 'Share Link',
          visitCount: 'Visit Count',
          createTime: 'Create Time',
          updateTime: 'Update Time',
        },

        // Form Placeholders
        placeholder: {
          title: 'Please enter promotion title (2-100 characters)',
          promotionSummary: 'Please enter promotion summary (200-1000 characters)',
          recommendedVarieties: 'Please enter recommended varieties, separated by commas',
          validPeriod: 'Please enter valid period',
        },

        // Form Validation
        rules: {
          titleRequired: 'Please enter promotion title',
          titleLength: 'Promotion title should be 2-100 characters',
          videoRequired: 'Please upload promotional video',
          promotionSummaryLength: 'Promotion summary should be 200-1000 characters',
          recommendedVarietiesRequired: 'Please enter recommended varieties',
          validPeriodRequired: 'Please enter valid period',
          validPeriodFormat: 'Valid period must be a positive integer',
        },

        // List Columns
        columns: {
          promotionId: 'Content ID',
          title: 'Promotion Title',
          recommendedVarieties: 'Recommended Varieties',
          publishTime: 'Publish Time',
          validPeriod: 'Valid Period',
          visitCount: 'Visit Count',
          status: 'Publication Status',
          actions: 'Actions',
        },

        // Action Buttons
        actions: {
          submit: 'Publish',
          saveDraft: 'Save Draft',
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
          share: 'Generate Share Link',
          copyLink: 'Copy Link',
          preview: 'Preview Video',
        },

        // Prompt Messages
        messages: {
          uploadTip: 'Support MP4 format, single file no more than 50MB',
          shareSuccess: 'Share link generated successfully',
          copySuccess: 'Link copied to clipboard',
          publishConfirm: 'Are you sure to publish this promotion content?',
          expiryWarning: 'This promotion content is about to expire',
          expired: 'This promotion content has expired',
        },
      },
    },

    // Seed Promotion Information Management
    seedPromotion: {
      title: 'Seed Promotion Management',
      subtitle: 'Manage seed variety promotion content, upload promotional videos, generate sharing links',

      // Buttons and Actions
      uploadContent: 'Upload Promotion Content',
      generateLink: 'Generate Share Link',
      copyLink: 'Copy Link',
      shareLink: 'Share Link',
      linkCopied: 'Link copied to clipboard',

      // Search and Filter
      searchPlaceholder: 'Search promotion title',
      filterByStatus: 'Filter by status',
      allStatus: 'All Status',

      // Status
      status: {
        active: 'Active',
        expired: 'Expired',
      },

      // List Columns
      columns: {
        promotionId: 'Promotion ID',
        title: 'Title',
        recommendedVarieties: 'Recommended Varieties',
        publishTime: 'Publish Time',
        validPeriod: 'Valid Period (Days)',
        visitCount: 'Visits',
        shareLink: 'Share Link',
        actions: 'Actions',
      },

      // Form Fields
      form: {
        enterpriseId: 'Enterprise ID',
        title: 'Title',
        videoFile: 'Promotional Video',
        promotionSummary: 'Promotion Summary',
        recommendedVarieties: 'Recommended Varieties',
        validPeriod: 'Valid Period (Days)',
        selectVideo: 'Select Video File',
        videoTips: 'Only MP4 format supported, file size ≤ 100MB',
        varietiesTips: 'Separate multiple varieties with commas',
      },

      // Form Placeholders
      placeholder: {
        title: 'Please enter promotion title',
        promotionSummary: 'Please enter promotion summary (optional)',
        recommendedVarieties: 'Please enter recommended varieties, separated by commas',
        validPeriod: 'Please enter valid period in days',
      },

      // Form Validation
      rules: {
        titleRequired: 'Please enter promotion title',
        videoRequired: 'Please upload promotional video',
        varietiesRequired: 'Please enter recommended varieties',
        validPeriodRequired: 'Please enter valid period',
        validPeriodFormat: 'Valid period must be a positive integer',
      },

      // Messages
      messages: {
        uploadSuccess: 'Promotion content uploaded successfully',
        uploadFailed: 'Failed to upload promotion content',
        deleteConfirm: 'Are you sure to delete this promotion content?',
        deleteSuccess: 'Deleted successfully',
        deleteFailed: 'Failed to delete',
        loadFailed: 'Failed to load promotion content',
        videoSizeExceeded: 'Video file size cannot exceed 100MB',
        videoFormatError: 'Only MP4 format video files are allowed',
      },

      // Detail Page
      detail: {
        basicInfo: 'Basic Information',
        videoPreview: 'Video Preview',
        statistics: 'Statistics',
      },

      // Card Display (Mobile)
      card: {
        validUntil: 'Valid Until',
        views: 'Views',
        times: 'Times',
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

        searchPlaceholder: 'Search batch ID, sample ID',
        filterByBatch: 'Filter by breeding batch',
        allBatches: 'All Batches',

        form: {
          basicInfo: 'Basic Information',
          sampleInfo: 'Sample Information',
          testInfo: 'Test Information',
          testData: 'Test Data',
          qualityInfo: 'Quality Information',
          healthTraceability: 'Health & Traceability',
          testingInfo: 'Testing Information',
          operatorInfo: 'Operator Information',

          batchId: 'Breeding Batch ID',
          trialId: 'Trial ID',
          testDate: 'Test Date',
          sampleId: 'Sample ID',
          sampleCondition: 'Sample Condition',
          sampleStatus: 'Sample Status',
          germinationRate: 'Germination Rate',
          purityPercent: 'Purity',
          moistureContentPercent: 'Moisture Content',
          proteinPercent: 'Protein Content',
          toxinLevelPpm: 'Toxin Level',
          seedHealthFindings: 'Seed Health Findings',
          chainResponsibility: 'Chain Responsibility',
          traceabilityLink: 'Traceability Link',
          labReportFile: 'Lab Report File',
          testOrganization: 'Test Organization',
          testerName: 'Tester Name',
          remark: 'Remark',
          createTime: 'Created Time',
          createBy: 'Created By',
        },

        placeholder: {
          batchId: 'Please select breeding batch',
          trialId: 'Please select trial',
          testDate: 'Please select test date',
          sampleId: 'Please enter sample ID',
          sampleStatus: 'Please enter sample status',
          germinationRate: 'Please enter germination rate (0-100)',
          purityPercent: 'Please enter purity (0-100)',
          moistureContentPercent: 'Please enter moisture content (0-100)',
          proteinPercent: 'Please enter protein content (0-100)',
          toxinLevelPpm: 'Please enter toxin level (optional)',
          seedHealthFindings: 'Please enter seed health findings',
          chainResponsibility: 'Please enter traceability link',
          testOrganization: 'Please enter test organization (optional)',
          testerName: 'Please enter tester name (optional)',
          remark: 'Please enter remark (optional)',
        },

        rules: {
          batchIdRequired: 'Please select breeding batch',
          trialIdRequired: 'Please select trial',
          testDateRequired: 'Please select test date',
          testOrganizationRequired: 'Please enter test organization',
          testerNameRequired: 'Please enter tester name',
          sampleIdRequired: 'Please enter sample ID',
          sampleConditionRequired: 'Please enter sample condition',
          sampleStatusRequired: 'Please enter sample status',
          germinationRateRequired: 'Please enter germination rate',
          germinationRateRange: 'Germination rate must be between 0-100',
          purityPercentRequired: 'Please enter purity',
          purityPercentRange: 'Purity must be between 0-100',
          moistureContentPercentRequired: 'Please enter moisture content',
          moistureContentPercentRange: 'Moisture content must be between 0-100',
          proteinPercentRequired: 'Please enter protein content',
          proteinPercentRange: 'Protein content must be between 0-100',
          seedHealthFindingsRequired: 'Please enter seed health findings',
          traceabilityLinkRequired: 'Please enter traceability link',
          chainResponsibilityRequired: 'Please enter traceability link',
        },

        columns: {
          batchId: 'Batch ID',
          trialId: 'Trial ID',
          sampleId: 'Sample ID',
          sampleStatus: 'Sample Status',
          germinationRate: 'Germination Rate (%)',
          purityPercent: 'Purity (%)',
          moistureContentPercent: 'Moisture Content (%)',
          proteinPercent: 'Protein (%)',
          testDate: 'Test Date',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },

      // Yield Data Collection
      yieldData: {
        title: 'Yield Data Collection',
        subtitle: 'Record field yield verification data',
        list: 'Yield Data List',
        add: 'Add Yield Data',
        edit: 'Edit Yield Data',
        detail: 'Yield Data Details',
        delete: 'Delete Data',
        deleteConfirm: 'Are you sure to delete this data?',
        deleteSuccess: 'Deleted successfully',
        addSuccess: 'Added successfully',
        editSuccess: 'Updated successfully',

        searchPlaceholder: 'Search batch ID, plot ID',
        filterByBatch: 'Filter by breeding batch',
        allBatches: 'All Batches',

        form: {
          basicInfo: 'Basic Information',
          plotInfo: 'Plot Information',
          yieldInfo: 'Yield Information',
          operatorInfo: 'Operator Information',

          batchId: 'Breeding Batch ID',
          trialId: 'Trial ID',
          harvestDate: 'Harvest Date',
          plotId: 'Plot ID',
          plotAreaM2: 'Plot Area (m²)',
          grainWeightKg: 'Grain Weight (kg)',
          yieldQtPerHa: 'Yield (qt/ha)',
          moistureContent: 'Moisture Content (%)',
          recorderName: 'Recorder Name',
          remark: 'Remark',
          createTime: 'Created Time',
          createBy: 'Created By',
        },

        placeholder: {
          batchId: 'Please select breeding batch',
          trialId: 'Please select trial',
          harvestDate: 'Please select harvest date',
          plotId: 'Please enter plot ID',
          plotAreaM2: 'Please enter plot area',
          grainWeightKg: 'Please enter grain weight',
          yieldQtPerHa: 'Please enter yield',
          moistureContent: 'Please enter moisture content (optional)',
          recorderName: 'Please enter recorder name (optional)',
          remark: 'Please enter remark (optional)',
        },

        rules: {
          batchIdRequired: 'Please select breeding batch',
          trialIdRequired: 'Please select trial',
          harvestDateRequired: 'Please select harvest date',
          plotIdRequired: 'Please enter plot ID',
          plotAreaM2Required: 'Please enter plot area',
          plotAreaM2Min: 'Plot area must be greater than 0',
          grainWeightKgRequired: 'Please enter grain weight',
          grainWeightKgMin: 'Grain weight must be greater than 0',
          yieldQtPerHaRequired: 'Please enter yield',
          yieldQtPerHaMin: 'Yield must be greater than 0',
          moistureContentRange: 'Moisture content must be between 0-100',
        },

        columns: {
          batchId: 'Batch ID',
          trialId: 'Trial ID',
          plotId: 'Plot ID',
          plotAreaM2: 'Plot Area (m²)',
          grainWeightKg: 'Grain Weight (kg)',
          yieldQtPerHa: 'Yield (qt/ha)',
          moistureContent: 'Moisture Content (%)',
          harvestDate: 'Harvest Date',
          createTime: 'Created Time',
          actions: 'Actions',
        },
      },
    },

  // IoT Sensor Maintenance Module
  iotSensor: {
    title: 'IoT Sensor Maintenance',
    subtitle: 'Manage IoT sensor devices, track sensor status and calibration information',
    list: 'Sensor List',
    add: 'Add Sensor',
    edit: 'Edit Sensor',
    detail: 'Sensor Details',
    delete: 'Delete Sensor',
    deleteConfirm: 'Are you sure you want to delete this sensor?',
    deleteSuccess: 'Deleted successfully',
    addSuccess: 'Added successfully',
    editSuccess: 'Updated successfully',
    registrationInfo: 'Registration Information',

    // Search & Filter
    searchPlaceholder: 'Search sensor name, ID',
    filterByType: 'Filter by sensor type',
    allTypes: 'All Types',

    // Sensor Types
    type: {
      temperature: 'Temperature Sensor',
      humidity: 'Humidity Sensor',
      light: 'Light Sensor',
      soil: 'Soil Sensor',
      gas: 'Gas Sensor',
      other: 'Other',
    },

    // Form Fields
    form: {
      iotId: 'Sensor ID',
      iotName: 'Sensor Name',
      iotType: 'Sensor Type',
      manufacturer: 'Manufacturer',
      firmwareVersion: 'Firmware Version',
      calibrationDate: 'Calibration Date',
      batteryStatus: 'Battery Status',
      remark: 'Remarks',
    },

    // Form Placeholders
    placeholder: {
      iotId: 'Please enter sensor ID',
      iotName: 'Please enter sensor name',
      iotType: 'Please select sensor type',
      manufacturer: 'Please enter manufacturer',
      firmwareVersion: 'Please enter firmware version',
      calibrationDate: 'Please select calibration date',
      batteryStatus: 'Please enter battery status, e.g., 80%',
      remark: 'Please enter remarks',
    },

    // Form Validation Rules
    rules: {
      iotIdRequired: 'Sensor ID is required',
      iotIdLength: 'Sensor ID cannot exceed 32 characters',
      iotNameRequired: 'Sensor name is required',
      iotNameLength: 'Sensor name cannot exceed 100 characters',
      iotTypeRequired: 'Please select sensor type',
      manufacturerRequired: 'Manufacturer is required',
      manufacturerLength: 'Manufacturer cannot exceed 32 characters',
      firmwareVersionRequired: 'Firmware version is required',
      firmwareVersionLength: 'Firmware version cannot exceed 32 characters',
      calibrationDateRequired: 'Please select calibration date',
      batteryStatusLength: 'Battery status cannot exceed 64 characters',
      remarkLength: 'Remarks cannot exceed 500 characters',
    },

    // Table Columns
    columns: {
      iotId: 'Sensor ID',
      iotName: 'Sensor Name',
      iotType: 'Sensor Type',
      manufacturer: 'Manufacturer',
      firmwareVersion: 'Firmware Version',
      calibrationDate: 'Calibration Date',
      batteryStatus: 'Battery Status',
      createBy: 'Registered By',
      orgName: 'Registration Organization',
      createTime: 'Registration Time',
      updateTime: 'Update Time',
      actions: 'Actions',
    },
  },
}
  