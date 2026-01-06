export default {
  // Menu
  menu: {
    quotaAllocation: 'Input Allocation Quota Management',
    zoneAllocation: 'Zone Allocation Quota Management',
    woredaAllocation: 'Woreda Allocation Quota Management',
    kebeleAllocation: 'Kebele Allocation Quota Management',
    farmerAllocation: 'Farmer Allocation Management'
  },

  // Basic Information
  basicInfo: 'Basic Information',
  allocationName: 'Allocation Name',
  year: 'Year',
  zone: 'Zone',
  woreda: 'Woreda',
  kebele: 'Kebele',
  
  // Demand and Quota
  demand: 'Demand',
  quota: 'Quota',
  inputType: 'Input Type',
  inputCategory: 'Input Category',
  totalQuantity: 'Total Quantity',
  
  // Actions
  addAllocation: 'Add Allocation Quota',
  editAllocation: 'Edit Allocation Quota',
  allocationDetail: 'Allocation Quota Details',
  addWoredaAllocation: 'Add Woreda Allocation Quota',
  editWoredaAllocation: 'Edit Woreda Allocation Quota',
  woredaAllocationDetail: 'Woreda Allocation Quota Details',
  addKebeleAllocation: 'Add Kebele Allocation Quota',
  editKebeleAllocation: 'Edit Kebele Allocation Quota',
  kebeleAllocationDetail: 'Kebele Allocation Quota Details',
  
  // Messages
  saveSuccess: 'Saved successfully',
  deleteSuccess: 'Deleted successfully',
  deleteConfirm: 'Are you sure you want to delete this allocation quota?',
  batchDeleteConfirm: 'Are you sure you want to delete the selected allocation quotas?',
  demandAndQuotaMismatch: 'Demand and quota data mismatch',
  quotaExceedsDemand: 'Quota quantity cannot exceed demand quantity:',
  
  // Validation
  allocationNameRequired: 'Please enter allocation name',
  yearRequired: 'Please select year',
  zoneRequired: 'Please select zone',
  
  // Placeholders
  pleaseInputAllocationName: 'Please enter allocation name',
  pleaseSelectYear: 'Please select year',
  pleaseSelectZone: 'Please select zone',

  // Farmer Allocation
  farmerAllocation: {
    title: 'Farmer Allocation Management',
    subtitle: 'Manage farmer allocation records',
    list: 'Allocation List',
    searchPlaceholder: 'Search by farmer name or ID number',
    
    // Table Columns
    columns: {
      traceabilityId: 'Traceability ID',
      farmerName: 'Farmer Name',
      farmerIdNumber: 'ID Number',
      zone: 'Zone',
      woreda: 'Woreda',
      kebele: 'Kebele',
      inputType: 'Input Type',
      inputCategory: 'Input Category',
      unit: 'Unit',
      quantityAllocated: 'Allocated Quantity',
      smsStatus: 'SMS Status',
      createTime: 'Create Time'
    },
    
    // Detail Sections
    detail: 'Allocation Details',
    detailSections: {
      basicInfo: 'Basic Information',
      farmerInfo: 'Farmer Information',
      itemsInfo: 'Allocation Items'
    },
    
    // SMS Status
    smsStatus: {
      pending: 'Pending',
      sent: 'Sent',
      failed: 'Failed'
    },
    
    // Form
    form: {
      noItems: 'No allocation items'
    }
  }
}