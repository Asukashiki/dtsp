export default {
  title: 'Pre-Basic Seed Batch Data',
  subtitle: 'Pre-Basic Seed Batch Data',
  add: 'Add',
  detail: 'Result Detail',
  searchPlaceholder: 'Search batch name or variety name',
  submitResult: 'Submit Production Result',
  section: {
    batchInfo: 'Batch Information',
    yieldData: 'Yield Data',
    qualityData: 'Quality Data'
  },
  columns: {
    resultId: 'Result ID',
    produceBatchId: 'Batch ID',
    produceBatchName: 'Batch Name',
    varietyName: 'Variety Name',
    breedBatchName: 'Breeding Batch',
    collectionDate: 'Collection Date',
    outputQuantity: 'Output Quantity',
    operator: 'Operator',
    actions: 'Actions'
  },
  form: {
    batchInfo: 'Batch Information',
    resultInfo: 'Production Result Data',
    produceBatchId: 'Production Batch',
    varietyName: 'Variety',
    breedBatchName: 'Breeding Batch',
    trialName: 'Trial',
    fromSeedLevel: 'Seed Level (From)',
    toSeedLevel: 'Seed Level (To)',
    collectionDate: 'Collection Date',
    outputQuantity: 'Output Quantity (kg)',
    operator: 'Operator',
    qualityGrade: 'Quality Grade',
    moistureContent: 'Moisture Content (%)',
    purity: 'Purity (%)',
    germinationRate: 'Germination Rate (%)',
    remarks: 'Remarks'
  },
  placeholder: {
    produceBatchId: 'Select production batch',
    collectionDate: 'Select collection date',
    outputQuantity: 'Enter output quantity',
    qualityGrade: 'Select quality grade',
    moistureContent: 'Enter moisture content',
    purity: 'Enter purity',
    germinationRate: 'Enter germination rate',
    remarks: 'Enter remarks'
  },
  rules: {
    produceBatchIdRequired: 'Please select production batch',
    collectionDateRequired: 'Please select collection date',
    outputQuantityRequired: 'Please enter output quantity',
    outputQuantityMin: 'Output quantity must be greater than 0',
    qualityGradeRequired: 'Please select quality grade',
    moistureContentRequired: 'Please enter moisture content',
    moistureContentRange: 'Moisture content must be between 0-100',
    purityRequired: 'Please enter purity',
    purityRange: 'Purity must be between 0-100',
    germinationRateRequired: 'Please enter germination rate',
    germinationRateRange: 'Germination rate must be between 0-100'
  }
}
