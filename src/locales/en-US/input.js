export default {
    // System Common
    systemName: 'Agricultural Input Supply Management System',
    systemDesc: 'Input management, inventory management and supply chain traceability',
    backToHome: 'Back to Home',

    // Menu Navigation
    menu: {
      dashboard: 'Data Dashboard',
      registrationManagement: 'Registration Management',
      registration: 'Union/Cooperative Registration',
      registrationApproval: 'Union/Cooperative Approval',
      demandManagement: 'Input Demand Management',
      farmerDemand: 'DA Farmer Demand Entry',
      demandAudit: 'Input Demand Audit',
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
      stockQuery: 'Inventory Query',
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
          creditCode: 'Please enter unified social credit code',
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
          creditCodeLength: 'Unified social credit code',
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
          view: 'Details',
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

    // Inventory Management
    inventory: {
      // Warehouse Management
      warehouse: {
        title: 'Warehouse Management',
        subtitle: 'Manage warehouse basic information, capacity and usage',
        list: 'Warehouse List',
        detail: 'Warehouse Details',
        add: 'Add Warehouse',
        edit: 'Edit Warehouse',
        delete: 'Delete Warehouse',
        deleteConfirm: 'Are you sure to delete this warehouse?',
        deleteSuccess: 'Successfully deleted',
        addSuccess: 'Successfully added',
        editSuccess: 'Successfully updated',

        searchPlaceholder: 'Search warehouse name',
        filterByType: 'Filter by warehouse type',
        filterByStatus: 'Filter by status',
        allTypes: 'All Types',
        allStatus: 'All Status',

        // Warehouse Types
        type: {
          normal: 'Normal Warehouse',
          cold: 'Cold Storage',
          dangerous: 'Dangerous Goods Warehouse',
        },

        // Form Fields
        form: {
          warehouseName: 'Warehouse Name',
          warehouseType: 'Warehouse Type',
          location: 'Location',
          capacity: 'Capacity',
          usedCapacity: 'Used Capacity',
          availableCapacity: 'Available Capacity',
          belongs: 'Organization',
          supplierId: 'Supplier',
          contactPerson: 'Contact Person',
          contactPhone: 'Contact Phone',
          status: 'Status',
          createTime: 'Create Time',
        },

        placeholder: {
          warehouseName: 'Please enter warehouse name',
          warehouseType: 'Please select warehouse type',
          location: 'Please enter location',
          capacity: 'Please enter capacity',
          belongs: 'Please enter organization',
          supplierId: 'Please select supplier',
          contactPerson: 'Please enter contact person',
          contactPhone: 'Please enter contact phone',
        },

        rules: {
          warehouseNameRequired: 'Please enter warehouse name',
          warehouseTypeRequired: 'Please select warehouse type',
          locationRequired: 'Please enter location',
          capacityRequired: 'Please enter capacity',
          capacityPositive: 'Capacity must be greater than 0',
          belongsRequired: 'Please enter organization',
          contactPersonRequired: 'Please enter contact person',
          contactPhoneRequired: 'Please enter contact phone',
          contactPhoneFormat: 'Please enter valid phone number',
        },

        columns: {
          warehouseCode: 'Warehouse Code',
          warehouseName: 'Warehouse Name',
          warehouseType: 'Warehouse Type',
          location: 'Location',
          capacity: 'Capacity',
          usageRate: 'Usage Rate',
          contactPerson: 'Contact Person',
          contactPhone: 'Contact Phone',
          status: 'Status',
          actions: 'Actions',
        },

        status: {
          enabled: 'Enabled',
          disabled: 'Disabled',
        },

        actions: {
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
        },

        messages: {
          noData: 'No data available',
        },
      },

      // Stock In Management
      stockIn: {
        title: 'Stock In Management',
        subtitle: 'Manage stock in registration and confirmation',
        list: 'Stock In List',
        detail: 'Stock In Details',
        add: 'Add Stock In',
        edit: 'Edit Stock In',
        delete: 'Delete Stock In',
        confirm: 'Confirm Stock In',
        deleteConfirm: 'Are you sure to delete this stock in record?',
        confirmConfirm: 'Confirming will update inventory. Continue?',
        deleteSuccess: 'Successfully deleted',
        addSuccess: 'Successfully added',
        editSuccess: 'Successfully updated',
        confirmSuccess: 'Stock in confirmed successfully',

        searchPlaceholder: 'Search stock in ID, batch number',
        filterByWarehouse: 'Filter by warehouse',
        filterBySupplier: 'Filter by supplier',
        filterByType: 'Filter by type',
        filterByStatus: 'Filter by status',
        allWarehouses: 'All Warehouses',
        allSuppliers: 'All Suppliers',
        allTypes: 'All Types',
        allStatus: 'All Status',

        // Stock In Types
        type: {
          purchase: 'Purchase',
          return: 'Return',
        },

        // Status
        status: {
          pending: 'Pending',
          confirmed: 'Confirmed',
          cancelled: 'Cancelled',
        },

        // Form Fields
        form: {
          stockInId: 'Stock In ID',
          warehouseId: 'Warehouse',
          batchNo: 'Batch Number',
          supplierId: 'Supplier',
          type: 'Type',
          operator: 'Operator',
          expiredTime: 'Expiry Date',
          totalQuantity: 'Total Quantity',
          remarks: 'Remarks',
          status: 'Status',
          createTime: 'Create Time',
          items: 'Items',
          inputId: 'Input',
          quantity: 'Quantity',
          expiryDate: 'Expiry Date',
          inputSku: 'SKU Code',
          itemRemarks: 'Item Remarks',
        },

        placeholder: {
          warehouseId: 'Please select warehouse',
          supplierId: 'Please select supplier',
          type: 'Please select type',
          operator: 'Please enter operator',
          expiredTime: 'Please select expiry date',
          remarks: 'Please enter remarks',
          inputId: 'Please select input',
          quantity: 'Please enter quantity',
          expiryDate: 'Please select item expiry date',
          itemRemarks: 'Please enter item remarks',
        },

        rules: {
          warehouseIdRequired: 'Please select warehouse',
          supplierIdRequired: 'Please select supplier',
          typeRequired: 'Please select type',
          operatorRequired: 'Please enter operator',
          expiredTimeRequired: 'Please select expiry date',
          expiryDateRequired: 'Please select item expiry date',
          inputIdRequired: 'Please select input',
          quantityRequired: 'Please enter quantity',
          quantityPositive: 'Quantity must be greater than 0',
          itemsRequired: 'Please add at least one item',
        },

        columns: {
          stockInId: 'Stock In ID',
          warehouseName: 'Warehouse',
          supplierName: 'Supplier',
          type: 'Type',
          batchNo: 'Batch Number',
          totalQuantity: 'Total Quantity',
          operator: 'Operator',
          expiredTime: 'Expiry Date',
          status: 'Status',
          createTime: 'Create Time',
          actions: 'Actions',
        },

        actions: {
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
          confirm: 'Confirm',
          addItem: 'Add Item',
          removeItem: 'Remove',
        },

        messages: {
          noData: 'No data available',
          noItems: 'No items',
        },
      },

      // Stock Out Management
      stockOut: {
        title: 'Stock Out Management',
        subtitle: 'Manage stock out registration and confirmation',
        list: 'Stock Out List',
        detail: 'Stock Out Details',
        add: 'Add Stock Out',
        edit: 'Edit Stock Out',
        delete: 'Delete Stock Out',
        confirm: 'Confirm Stock Out',
        deleteConfirm: 'Are you sure to delete this stock out record?',
        confirmConfirm: 'Confirming will deduct inventory. Continue?',
        deleteSuccess: 'Successfully deleted',
        addSuccess: 'Successfully added',
        editSuccess: 'Successfully updated',
        confirmSuccess: 'Stock out confirmed successfully',

        searchPlaceholder: 'Search stock out ID, batch number, customer',
        filterByWarehouse: 'Filter by warehouse',
        filterByType: 'Filter by type',
        filterByStatus: 'Filter by status',
        allWarehouses: 'All Warehouses',
        allTypes: 'All Types',
        allStatus: 'All Status',

        // Stock Out Types
        type: {
          sale: 'Sale',
        },

        // Status
        status: {
          pending: 'Pending',
          confirmed: 'Confirmed',
          cancelled: 'Cancelled',
        },

        // Form Fields
        form: {
          stockOutId: 'Stock Out ID',
          warehouseId: 'Warehouse',
          batchNo: 'Batch Number',
          customer: 'Customer',
          type: 'Type',
          operator: 'Operator',
          totalQuantity: 'Total Quantity',
          remark: 'Remark',
          status: 'Status',
          createTime: 'Create Time',
          items: 'Items',
          inputId: 'Input',
          quantity: 'Quantity',
          availableQuantity: 'Available Stock',
          itemRemarks: 'Item Remarks',
        },

        placeholder: {
          warehouseId: 'Please select warehouse',
          customer: 'Please enter customer name',
          type: 'Please select type',
          operator: 'Please enter operator',
          remark: 'Please enter remark',
          inputId: 'Please select input',
          batchNo: 'Please select batch number',
          quantity: 'Please enter quantity',
          itemRemarks: 'Please enter item remarks',
        },

        rules: {
          warehouseIdRequired: 'Please select warehouse',
          customerRequired: 'Please enter customer name',
          typeRequired: 'Please select type',
          operatorRequired: 'Please enter operator',
          inputIdRequired: 'Please select input',
          batchNoRequired: 'Please select batch number',
          quantityRequired: 'Please enter quantity',
          quantityPositive: 'Quantity must be greater than 0',
          quantityExceeds: 'Quantity exceeds available stock',
          itemsRequired: 'Please add at least one item',
        },

        columns: {
          stockOutId: 'Stock Out ID',
          warehouseName: 'Warehouse',
          customer: 'Customer',
          type: 'Type',
          batchNo: 'Batch Number',
          totalQuantity: 'Total Quantity',
          operator: 'Operator',
          status: 'Status',
          createTime: 'Create Time',
          actions: 'Actions',
        },

        actions: {
          view: 'View',
          edit: 'Edit',
          delete: 'Delete',
          confirm: 'Confirm',
          addItem: 'Add Item',
          removeItem: 'Remove',
        },

        messages: {
          noData: 'No data available',
          noItems: 'No items',
          insufficientStock: 'Insufficient stock',
          noStockInWarehouse: 'No available stock in this warehouse',
        },
      },

      // Inventory Query
      stock: {
        title: 'Inventory Query',
        subtitle: 'Real-time inventory query, alerts and summary statistics',
        list: 'Inventory List',
        detail: 'Inventory Details',
        warning: 'Stock Alerts',
        summary: 'Summary Statistics',

        searchPlaceholder: 'Search input name, batch number',
        filterByWarehouse: 'Filter by warehouse',
        filterByInput: 'Filter by input',
        filterByStatus: 'Filter by status',
        allWarehouses: 'All Warehouses',
        allInputs: 'All Inputs',
        allStatus: 'All Status',

        // Stock Status
        status: {
          normal: 'Normal',
          nearExpiry: 'Near Expiry',
          expired: 'Expired',
        },

        // Warning Types
        warningType: {
          all: 'All Alerts',
          nearExpiry: 'Near Expiry',
          expired: 'Expired',
        },

        // Form Fields
        form: {
          inventoryId: 'Inventory ID',
          inputId: 'Input',
          inputName: 'Input Name',
          batchNo: 'Batch Number',
          warehouseId: 'Warehouse',
          warehouseName: 'Warehouse Name',
          currentQuantity: 'Current Quantity',
          inDate: 'In Date',
          expiredDate: 'Expiry Date',
          stockStatus: 'Stock Status',
          daysToExpire: 'Days to Expire',
        },

        columns: {
          inputName: 'Input Name',
          batchNo: 'Batch Number',
          warehouseName: 'Warehouse',
          currentQuantity: 'Current Quantity',
          inDate: 'In Date',
          expiredDate: 'Expiry Date',
          stockStatus: 'Status',
          actions: 'Actions',
        },

        summaryColumns: {
          inputName: 'Input Name',
          warehouseName: 'Warehouse Name',
          totalQuantity: 'Total Stock',
          normalQuantity: 'Normal Stock',
          nearExpiryQuantity: 'Near Expiry Stock',
          expiredQuantity: 'Expired Stock',
        },

        actions: {
          view: 'View',
          viewWarning: 'View Alerts',
          viewSummary: 'View Summary',
          exportData: 'Export Data',
        },

        messages: {
          noData: 'No data available',
          noWarning: 'No alerts',
        },

        tabs: {
          list: 'Inventory List',
          warning: 'Stock Alerts',
          summaryByInput: 'Summary by Input',
          summaryByWarehouse: 'Summary by Warehouse',
        },
      },
    },

    // Data Dashboard
    dashboard: {
      title: 'Agricultural Input Supply Management Dashboard',
      subtitle: 'Real-time Data Monitoring & Visualization',
      lastUpdate: 'Last Update',
      autoRefresh: 'Auto Refresh',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',

      // Overview Cards
      overview: {
        totalSuppliers: 'Total Suppliers',
        certifiedSuppliers: 'Certified Suppliers',
        pendingSuppliers: 'Pending Suppliers',
        rejectedSuppliers: 'Rejected Suppliers',
        totalInputs: 'Total Inputs',
        seedInputs: 'Seeds',
        fertilizerInputs: 'Fertilizers',
        pesticideInputs: 'Pesticides',
        totalWarehouses: 'Total Warehouses',
        totalCapacity: 'Total Capacity',
        usedCapacity: 'Used Capacity',
        capacityUsageRate: 'Capacity Usage Rate',
        totalStockQuantity: 'Total Stock Quantity',
        normalStock: 'Normal Stock',
        nearExpiryStock: 'Near Expiry Stock',
        expiredStock: 'Expired Stock',
        todayStockIn: 'Today Stock In',
        todayStockOut: 'Today Stock Out',
        monthStockIn: 'Monthly Stock In',
        monthStockOut: 'Monthly Stock Out',
        pendingWarnings: 'Pending Warnings',
        unit: '',
        tons: 'tons',
        todayBusiness: 'Today Business',
      },

      // Top Suppliers
      topSuppliers: {
        title: 'TOP Suppliers Ranking',
        subtitle: 'Best Performing Suppliers This Month',
        rank: 'Rank',
        supplierName: 'Supplier Name',
        monthStockIn: 'Monthly Stock In',
        productCount: 'Product Count',
        cooperationDays: 'Cooperation Days',
        qualityRating: 'Quality Rating',
        contactPerson: 'Contact Person',
        contactPhone: 'Contact Phone',
        viewMore: 'View More',
        days: 'days',
        items: 'items',
      },

      // Warehouse Statistics
      warehouse: {
        title: 'Warehouse Statistics',
        subtitle: 'Warehouse Capacity Utilization',
        warehouseName: 'Warehouse Name',
        location: 'Location',
        capacity: 'Capacity',
        currentStock: 'Current Stock',
        usageRate: 'Usage Rate',
        productTypes: 'Product Types',
        monthIn: 'Monthly In',
        monthOut: 'Monthly Out',
        warning: 'Capacity Warning',
        normal: 'Normal',
        types: 'types',
        times: 'times',
      },

      // Stock Trend
      stockTrend: {
        title: 'Stock In/Out Trend',
        subtitle: 'Recent Inventory Changes Analysis',
        stockIn: 'Stock In Quantity',
        stockOut: 'Stock Out Quantity',
        netChange: 'Net Stock Change',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        date: 'Date',
        quantity: 'Quantity',
        count: 'Count',
      },

      // Input Distribution
      inputDistribution: {
        title: 'Input Type Distribution',
        subtitle: 'Distribution by Input Type',
        seed: 'Seed',
        fertilizer: 'Fertilizer',
        pesticide: 'Pesticide',
        other: 'Other',
        count: 'Count',
        stockQuantity: 'Stock Quantity',
        percentage: 'Percentage',
      },

      // Warnings
      warnings: {
        title: 'Warning Information',
        subtitle: 'Pending Warnings List',
        warningType: 'Warning Type',
        warningLevel: 'Level',
        objectName: 'Object',
        content: 'Content',
        warningTime: 'Warning Time',
        warehouseName: 'Warehouse',
        batchNo: 'Batch Number',
        status: 'Status',
        noWarnings: 'No warnings',

        types: {
          nearExpiry: 'Near Expiry Warning',
          expired: 'Expired Warning',
          lowStock: 'Low Stock',
          overCapacity: 'Over Capacity',
        },

        levels: {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
        },

        statusOptions: {
          pending: 'Pending',
          processed: 'Processed',
          ignored: 'Ignored',
        },
      },

      // Real-time Activities
      activities: {
        title: 'Real-time Activities',
        subtitle: 'Latest Business Activities',
        stockInActivity: 'Stock In',
        stockOutActivity: 'Stock Out',
        supplierActivity: 'Supplier Authentication',
        warehouseActivity: 'Warehouse',
        justNow: 'Just now',
        minutesAgo: 'minutes ago',
        hoursAgo: 'hours ago',
      },

      // Today Stock
      todayStock: {
        title: 'Today Stock',
        in: 'In',
        out: 'Out',
        warehouse: 'Warehouse',
        operator: 'Operator',
        supplier: 'Supplier',
        customer: 'Customer',
        quantity: 'Quantity',
        time: 'Time',
        status: 'Status',
        noData: 'No data',
        statusPending: 'Pending',
        statusConfirmed: 'Confirmed',
        statusCancelled: 'Cancelled',
      },

      // Expiring Soon
      expiring: {
        title: 'Expiring Soon',
        daysLeft: 'Left',
        days: 'days',
        urgent: 'Urgent',
        warehouse: 'Warehouse',
        quantity: 'Stock',
        batchNo: 'Batch',
        noData: 'No expiring items',
        expired: 'Expired',
      },

      // Stock Status Distribution
      stockStatus: {
        title: 'Stock Status Distribution',
        normal: 'Normal',
        nearExpiry: 'Near Expiry',
        expired: 'Expired',
        lowStock: 'Low Stock',
        productCount: 'Product Count',
        totalQuantity: 'Total Quantity',
        percentage: 'Percentage',
      },

      // Refresh and System Status
      autoRefreshOn: 'Auto Refresh',
      autoRefreshOff: 'Paused',
      refreshInterval: 'Refresh Interval',
      systemStatus: 'System Normal',
    },

    // Feedback Management
    feedback: {
      title: 'Feedback Management',
      subtitle: 'Collect and process feedback related to agricultural input supply',
      list: 'Feedback List',
      detail: 'Feedback Details',
      add: 'Submit Feedback',
      edit: 'Edit Feedback',
      delete: 'Delete Feedback',
      deleteConfirm: 'Are you sure to delete this feedback?',
      deleteSuccess: 'Delete Successful',
      addSuccess: 'Feedback Submitted Successfully',
      editSuccess: 'Edit Successful',
      batchDelete: 'Batch Delete',
      batchDeleteConfirm: 'Are you sure to delete {count} selected feedback(s)?',

      // Search and Filter
      searchPlaceholder: 'Search by title, content, or feedback number',
      filterByType: 'Filter by Type',
      filterByStatus: 'Filter by Status',
      filterByPriority: 'Filter by Priority',
      allTypes: 'All Types',
      allStatus: 'All Status',
      allPriority: 'All Priority',
      filterByTime: 'Filter by Time',

      // Feedback Type
      type: {
        complaint: 'Complaint',
        suggestion: 'Suggestion',
        inquiry: 'Inquiry',
        fault: 'Fault Report',
        other: 'Other',
      },

      // Status
      status: {
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        closed: 'Closed',
      },

      // Priority
      priority: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        urgent: 'Urgent',
      },

      // Table Columns
      columns: {
        feedbackNo: 'Feedback No.',
        feedbackType: 'Type',
        title: 'Title',
        inputName: 'Input Name',
        supplierName: 'Supplier',
        contactName: 'Contact',
        contactPhone: 'Phone',
        priority: 'Priority',
        status: 'Status',
        createTime: 'Submit Time',
        handlerName: 'Handler',
        handleTime: 'Handle Time',
        processingHours: 'Processing Hours',
        satisfaction: 'Satisfaction',
        actions: 'Actions',
      },

      // Form Fields
      form: {
        basicInfo: 'Basic Information',
        contactInfo: 'Contact Information',
        processingInfo: 'Processing Information',
        evaluationInfo: 'Evaluation Information',

        feedbackType: 'Feedback Type',
        title: 'Title',
        content: 'Content',
        inputName: 'Input Name',
        supplierName: 'Supplier Name',
        contactName: 'Contact Name',
        contactPhone: 'Contact Phone',
        contactEmail: 'Contact Email',
        priority: 'Priority',
        attachments: 'Attachments',
        remark: 'Remark',

        handlerName: 'Handler',
        handleTime: 'Handle Time',
        handleResult: 'Handle Result',
        handleRemark: 'Handle Remark',
        processingHours: 'Processing Hours',

        satisfaction: 'Satisfaction',
        evaluation: 'Evaluation',
        evaluationTime: 'Evaluation Time',

        replyContent: 'Reply Content',
        replyTime: 'Reply Time',
        replyUser: 'Reply User',
        noReplies: 'No replies yet',
      },

      // Form Placeholders
      placeholder: {
        feedbackType: 'Please select feedback type',
        title: 'Please enter title (max 200 characters)',
        content: 'Please describe your feedback in detail...',
        inputName: 'Please enter input name',
        supplierName: 'Please enter supplier name',
        contactName: 'Please enter contact name',
        contactPhone: 'Please enter contact phone',
        contactEmail: 'Please enter contact email',
        priority: 'Please select priority',
        remark: 'Please enter remark (max 500 characters)',
        handleResult: 'Please enter handle result',
        handleRemark: 'Please enter handle remark',
        evaluation: 'Please enter your evaluation...',
        replyContent: 'Please enter reply content...',
      },

      // Form Validation Rules
      rules: {
        feedbackTypeRequired: 'Please select feedback type',
        titleRequired: 'Please enter title',
        titleLength: 'Title max 200 characters',
        contentRequired: 'Please enter content',
        contactNameLength: 'Contact name max 100 characters',
        contactPhoneLength: 'Contact phone max 20 characters',
        contactPhoneFormat: 'Please enter valid phone number',
        contactEmailFormat: 'Please enter valid email address',
        contactEmailLength: 'Email address max 100 characters',
        remarkLength: 'Remark max 500 characters',
        handleResultRequired: 'Please enter handle result',
        replyContentRequired: 'Please enter reply content',
      },

      // Action Buttons
      actions: {
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
        reply: 'Reply',
        handle: 'Handle',
        close: 'Close',
        reopen: 'Reopen',
        evaluate: 'Evaluate',
        submitEvaluation: 'Submit Evaluation',
      },

      // Satisfaction Levels
      satisfactionLevel: {
        1: 'Very Dissatisfied',
        2: 'Dissatisfied',
        3: 'Neutral',
        4: 'Satisfied',
        5: 'Very Satisfied',
      },

      // Messages
      messages: {
        deleteConfirm: 'Are you sure to delete this feedback? This action cannot be undone.',
        closeConfirm: 'Are you sure to close this feedback?',
        handleSuccess: 'Handle Successful',
        replySuccess: 'Reply Successful',
        evaluationSuccess: 'Evaluation Submitted Successfully',
        onlyPendingCanEdit: 'Only pending feedback can be edited',
        onlyPendingCanDelete: 'Only pending feedback can be deleted',
      },

      // Statistics
      statistics: {
        totalCount: 'Total',
        pendingCount: 'Pending',
        processingCount: 'Processing',
        completedCount: 'Completed',
        closedCount: 'Closed',
        avgProcessingHours: 'Avg Processing Hours',
        avgSatisfaction: 'Avg Satisfaction',
        todayCount: 'Today New',
      },

      // Detail page specific
      replies: 'Replies',
      handler: 'Handler',
      user: 'User',
      hours: 'hours',
    },
  }