export default {
  // Page titles
  title: 'Agronomic Trait Collection',
  subtitle: 'Record and manage agronomic trait data in breeding trials',
  list: 'Trait Record List',
  add: 'Add Record',
  edit: 'Edit Record',
  detail: 'Record Details',
  
  // Main record fields
  recordId: 'Record ID',
  plotId: 'Plot ID',
  trialId: 'Trial ID',
  batchId: 'Batch ID',
  observationDate: 'Observation Date',
  growthStage: 'Growth Stage',
  observerId: 'Observer',
  photoUrl: 'Photo',
  remarks: 'Remarks',
  traitCount: 'Trait Count',
  
  // Growth stage options
  growthStages: {
    germination: 'Germination',
    seedling: 'Seedling',
    tillering: 'Tillering',
    stem_elongation: 'Stem Elongation',
    booting: 'Booting',
    heading: 'Heading',
    flowering: 'Flowering',
    milk: 'Milk',
    dough: 'Dough',
    maturity: 'Maturity'
  },
  
  // Trait details
  traitDetails: 'Trait Details',
  traitName: 'Trait Name',
  traitCode: 'Trait Code',
  traitValue: 'Trait Value',
  unit: 'Unit',
  addTrait: 'Add Trait',
  removeTrait: 'Remove',
  noTraits: 'No trait data',
  
  // Operation prompts
  selectPlot: 'Please select plot',
  selectObserver: 'Please select observer',
  selectGrowthStage: 'Please select growth stage',
  selectTrait: 'Please select trait',
  enterValue: 'Please enter trait value',
  addAtLeastOneTrait: 'Please add at least one trait',
  
  // Table columns
  columns: {
    recordId: 'Record ID',
    plotId: 'Plot ID',
    trialId: 'Trial ID',
    batchId: 'Batch ID',
    observationDate: 'Observation Date',
    growthStage: 'Growth Stage',
    traitCount: 'Trait Count',
    status: 'Status',
    workflowStatus: 'Workflow Status',
    createBy: 'Created By',
    createTime: 'Create Time',
    actions: 'Actions'
  },
  
  // Card titles
  cards: {
    basicInfo: 'Basic Information',
    traitDetails: 'Trait Details',
    photoInfo: 'Photo Information'
  },
  
  // Message prompts
  deleteConfirm: 'Are you sure to delete the selected records?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Updated successfully',
  uploadSuccess: 'Uploaded successfully',
  uploadFailed: 'Upload failed'
}
