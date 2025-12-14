export default {
  // DA Farmer Demand Entry
  title: 'DA Farmer Demand Entry',
  subtitle: 'DA is responsible for entering farmers input demand data in the village',
  list: 'Farmer Demand List',
  detail: 'Demand Details',
  add: 'Add Demand',
  edit: 'Edit Demand',
  delete: 'Delete Demand',
  deleteConfirm: 'Are you sure to delete this demand?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Updated successfully',
  submit:'Submit',
  submitSuccess:'Submit Success',
  submitConfirm: 'Confirm to submit this demand for village-level audit?',
  submitFailed: 'Submission failed',
  batchSubmitConfirm: 'Confirm to submit {count} selected demands for village-level audit?',
  batchSubmitResult: 'Submission completed: {success} succeeded, {fail} failed',
  pleaseSelectData: 'Please select data to submit',
  // Search and Filter
  searchPlaceholder: 'Search farmer name, ID number, village',
  filterByBatch: 'Filter by Batch',
  filterByStatus: 'Filter by Status',
  filterByKebele: 'Filter by Kebele',
  filterByInputCategory: 'Filter by Input Type',
  allBatches: 'All Batches',
  allStatus: 'All Status',
  allKebeles: 'All Kebeles',
  allCategories: 'All Types',

  // Status
  status: {
    draft: 'Draft',
    submitted: 'Submitted',
    approved: 'Approved',
    rejected: 'Rejected',
    locked: 'Locked',
  },

  // Audit Level
  auditLevel: {
    village: 'Village',
    town: 'Town',
    district: 'District',
    state: 'State',
    ministry: 'Ministry',
  },

  // Input Category
  inputCategory: {
    seed: 'Seed',
    fertilizer: 'Fertilizer',
    pesticide: 'Pesticide',
  },

  // Form Fields
  form: {
    year: 'Current Year',
    basicInfo: 'Basic Information',
    farmerInfo: 'Farmer Information',
    demandInfo: 'Demand Information',
    itemsInfo: 'Input Items',
    auditInfo: 'Audit Information',

    batchId: 'Collection Batch',
    batchNo: 'Batch Number',
    farmerId: 'Farmer ID',
    farmerName: 'Farmer Name',
    farmerIdNumber: 'Farmer ID Number',
    region: 'Region',
    zone: 'Zone',
    woreda: 'Woreda',
    kebele: 'Kebele',
    village: 'Village',
    landArea: 'Total Land Area (hectares)',
    maxSeedQuantity: 'Estimated Max Seed Quantity (kg)',
    maxFertilizerQuantity: 'Estimated Max Fertilizer Quantity (kg)',
    status: 'Status',
    currentAuditLevel: 'Current Audit Level',
    daUserName: 'Entered by DA',
    submitTime: 'Submit Time',
    remark: 'Remark',
    createdTime: 'Created Time',
    version: 'Version',

    // Input Items
    inputItems: 'Input Items',
    inputCategory: 'Category',
    inputType: 'Input Type',
    variety: 'Variety',
    specification: 'Specification',
    unit: 'measurement',
    quantity: 'Demand Quantity',
    addItem: 'Add Input',
    removeItem: 'Remove',
    noItems: 'No input items',
  },

  // Form Placeholders
  placeholder: {
    year: 'Current Year',
    batchId: 'Please select collection batch',
    farmerId: '',
    farmerName: 'Please select farmer name',
    farmerIdNumber: '',
    region: 'Please enter region',
    zone: '',
    woreda: '',
    kebele: '',
    village: 'Please enter village',
    landArea: 'Please enter total land area',
    remark: 'Please enter remark',
    inputCategory: 'Please select Category',
    inputType: 'Please enter input type',
    variety: 'Please enter variety',
    specification: 'Please enter specification',
    unit: 'Please enter measurement',
    quantity: 'Please enter demand quantity',
  },

  cascader: {
    pesticide: 'Pesticide',
    insecticide: 'Insecticide',
    fungicide: 'Fungicide',
    herbicide: 'Herbicide',
    seed: 'Seed',
    coffee: 'Coffee',
    apple: 'Apple',
    wheat: 'Wheat',
    fertilizer: 'Fertilizer',
    nitrogen: 'Nitrogen Fertilizer',
    phosphorus: 'Phosphorus Fertilizer',
    potassium: 'Potassium Fertilizer'
  },

  // Form Validation Rules
  rules: {
    batchIdRequired: 'Please select collection batch',
    farmerIdRequired: 'Please enter farmer ID',
    farmerNameRequired: 'Please select farmer name',
    farmerNameLength: 'Farmer name max 100 characters',
    farmerIdNumberRequired: 'Please enter farmer ID number',
    farmerIdNumberLength: 'ID number max 50 characters',
    woredaRequired: 'Please enter woreda',
    kebeleRequired: 'Please enter kebele',
    villageRequired: 'Please enter village',
    landAreaPositive: 'Land area must be greater than 0',
    remarkLength: 'Remark max 500 characters',
    inputCategoryRequired: 'Please select Category',
    inputTypeRequired: 'Please enter input type',
    varietyRequired: 'Please enter variety',
    unitRequired: 'Please enter measurement',
    quantityRequired: 'Please enter demand quantity',
    quantityPositive: 'Demand quantity must be greater than 0',
    itemsRequired: 'Please add at least one input item',
  },

  // Table Columns
  columns: {
    batchNo: 'Batch No.',
    farmerId: 'Farmer ID',
    farmerName: 'Farmer Name',
    farmerIdNumber: 'ID Number',
    kebele: 'Kebele',
    woreda: 'Woreda',
    village: 'Village',
    landArea: 'Land Area',
    status: 'Status',
    currentAuditLevel: 'Current Audit Level',
    daUserName: 'Entered by DA',
    createdTime: 'Created Time',
    actions: 'Actions',
  },

  // Action Buttons
  actions: {
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    submit: 'Submit',
  },
    submitForAudit: 'Submit for Audit',

  // Audit Records
  auditRecords: {
    title: 'Audit Records',
    noRecords: 'No audit records',
    auditLevel: 'Audit Level',
    auditUserName: 'Auditor',
    auditTime: 'Audit Time',
    auditAction: 'Audit Action',
    auditResult: 'Audit Result',
    auditOpinion: 'Audit Opinion',
  },

  // Audit Action
  auditAction: {
    submit: 'Submit',
    approve: 'Approve',
    reject: 'Reject',
  },

  // Audit Result
  auditResult: {
    passed: 'Passed',
    rejected: 'Rejected',
  },

  // Messages
  messages: {
    batchNotFound: 'Batch not found',
    batchNotCollecting: 'Batch is not in collecting status',
    demandNotFound: 'Demand not found',
    canOnlyEditDraftOrRejected: 'Can only edit demand in draft or rejected status',
    onlyCreatorCanEdit: 'Only the creator can edit this demand',
    onlyCreatorCanDelete: 'Only the creator can delete this demand',
    canOnlyDeleteDraft: 'Can only delete demand in draft status',
    saveFailed: 'Save failed',
    updateFailed: 'Update failed, please retry',
    deleteFailed: 'Delete failed',
    noData: 'No data available',
  },

  // Detail Page Sections
  detailSections: {
    basicInfo: 'Basic Information',
    farmerInfo: 'Farmer Information',
    submitConfirm: 'Confirm to submit this demand for village-level audit?',
    batchSubmitConfirm: 'Confirm to submit {count} selected demands for village-level audit?',
    submitSuccess: 'Submitted successfully',
    submitFailed: 'Submission failed',
    batchSubmitResult: 'Submission completed: {success} succeeded, {fail} failed',
    pleaseSelectData: 'Please select data to submit',
    demandInfo: 'Demand Information',
    itemsInfo: 'Input Items',
    auditInfo: 'Audit Records',
  },
}
