export default {
  title: 'Basic Seed Batch Data',
  subtitle: 'Manage Basic Seed batch data',
  searchPlaceholder: 'Search by batch ID or name',
  add: 'Submit',

  columns: {
    resultId: 'Result ID',
    produceBatchId: 'Batch ID',
    produceBatchName: 'Batch Name',
    varietyName: 'Variety',
    collectionDate: 'Collection Date',
    outputQuantity: 'Output Quantity (kg)',
    actions: 'Actions'
  },

  form: {
    batchInfo: 'Batch Information',
    resultInfo: 'Result Information',
    produceBatchId: 'Production Batch',
    varietyName: 'Variety',
    breedBatchName: 'Breed Batch',
    trialName: 'Trial Name',
    fromSeedLevel: 'From Level',
    toSeedLevel: 'To Level',
    breedBatchId: 'Breed Batch ID',
    varietyId: 'Variety ID',
    cropType: 'Crop Type',
    outputQuantity: 'Output Quantity (kg)',
    collectionDate: 'Collection Date',
    operator: 'Operator'
  },

  placeholder: {
    produceBatchId: 'Please select production batch',
    outputQuantity: 'Please enter output quantity',
    collectionDate: 'Please select collection date'
  },

  rules: {
    produceBatchIdRequired: 'Production batch is required',
    outputQuantityRequired: 'Output quantity is required',
    outputQuantityMin: 'Output quantity must be greater than 0',
    collectionDateRequired: 'Collection date is required'
  },

  section: {
    batchInfo: 'Batch Information',
    resultInfo: 'Result Information'
  }
}
