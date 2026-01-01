export default {
  title: 'Basic Seed Batch Info',
  subtitle: 'Manage Basic Seed batches',
  searchPlaceholder: 'Search by batch ID or name',
  add: 'Add Batch',
  detail: 'Batch Detail',
  
  columns: {
    produceBatchId: 'Batch ID',
    produceBatchName: 'Batch Name',
    prebasicSeedBatchName: 'Source Pre-basic Batch',
    breedBatchName: 'Breed Batch',
    trialName: 'Trial Name',
    varietyName: 'Variety',
    cropType: 'Crop Type',
    time: 'Production Time',
    landName: 'Land',
    inputSeedQuantity: 'Input Quantity (kg)',
    produceSeedQuantity: 'Output Quantity (kg)',
    fromSeedLevel: 'From Level',
    toSeedLevel: 'To Level',
    operatorName: 'Operator',
    flowStatus: 'Flow Status',
    produceStatus: 'Status',
    createTime: 'Create Time',
    updateTime: 'Update Time',
    actions: 'Actions'
  },
  
  form: {
    basicInfo: 'Basic Information',
    productionInfo: 'Production Information',
    produceBatchName: 'Batch Name',
    prebasicSeedBatchName: 'Source Pre-basic Batch',
    varietyName: 'Variety',
    cropType: 'Crop Type',
    time: 'Production Time',
    landName: 'Land',
    operatorName: 'Operator',
    inputSeedQuantity: 'Input Quantity (kg)',
    remainingQuantity: 'Remaining Quantity'
  },
  
  placeholder: {
    produceBatchName: 'Please enter batch name',
    prebasicSeedBatchName: 'Please select source pre-basic batch',
    time: 'Please select production time',
    landName: 'Please select land',
    inputSeedQuantity: 'Please enter input quantity'
  },
  
  rules: {
    produceBatchNameRequired: 'Batch name is required',
    prebasicSeedBatchIdRequired: 'Source pre-basic batch is required',
    timeRequired: 'Production time is required',
    landIdRequired: 'Land is required',
    operatorNameRequired: 'Operator name is required',
    inputSeedQuantityRequired: 'Input quantity is required',
    inputSeedQuantityMin: 'Input quantity must be greater than 0'
  },
  
  flowStatus: {
    S1: 'Pending',
    S2: 'Approved',
    S3: 'Rejected',
    S10: 'Voided'
  },
  
  status: {
    Ongoing: 'Ongoing',
    Finished: 'Finished',
    Void: 'Voided'
  },
  
  voidSuccess: 'Batch voided successfully',
  voidConfirm: 'Are you sure to void this batch?'
}
