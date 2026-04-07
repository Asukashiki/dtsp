export default {
  title: 'Seed Multiplication Batch Data',
  subtitle: 'Multiplication Batch Information Collection',
  list: 'Breeding Batch Collection List',
  add: 'Add',
  detail: 'Batch Details',
  searchPlaceholder: 'Search batch ID, distribution ID or variety name',
  section: {
    batchInfo: 'Batch Information',
    collectionData: 'Collection Data'
  },
  columns: {
    batchId: 'Batch ID',
    breedingBatchId: 'Multiplication Batch',
    varietyName: 'Variety Name',
    toMultiplyQuantity: 'Multiplied Quantity',
    collectionDate: 'Collection Date',
    operator: 'Operator',
    actions: 'Actions'
  },
  form: {
    batchInfo: 'Batch Information',
    collectionInfo: 'Collection Information',
    breedingBatchId: 'Multiplication Batch',
    parentalSeedSource: 'Parental Seed Source',
    varietyName: 'Variety Name',
    cropType: 'Crop Type',
    breedingLevel: 'Multiplication Level',
    toMultiplyQuantity: 'Multiplied Quantity',
    collectionDate: 'Collection Date',
    operator: 'Operator'
  },
  placeholder: {
    breedingBatchId: 'Please select breeding batch',
    toMultiplyQuantity: 'Please enter multiplied quantity',
    collectionDate: 'Please select collection date',
    remark: 'Please enter remarks'
  },
  rules: {
    breedingBatchIdRequired: 'Please select breeding batch',
    toMultiplyQuantityRequired: 'Please enter multiplied quantity',
    toMultiplyQuantityMin: 'Quantity must be greater than 0',
    collectionDateRequired: 'Please select collection date'
  }
}
