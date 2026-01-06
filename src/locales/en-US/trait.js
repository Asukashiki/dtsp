// File name: agronomic-trait-collect-i18n-en.js (English configuration)
export default {
  // Page title
  title: 'Agronomic Trait Data Collection',
  subtitle: 'Record and manage agronomic trait data in breeding trials',
  list: 'Trait Record List',
  add: 'Add New Record',
  edit: 'Edit Record',
  detail: 'Record Detail',

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
    germination: 'Germination Stage',
    seedling: 'Seedling Stage',
    tillering: 'Tillering Stage',
    stem_elongation: 'Stem Elongation Stage',
    booting: 'Booting Stage',
    heading: 'Heading Stage',
    flowering: 'Flowering Stage',
    milk: 'Milk Ripening Stage',
    dough: 'Dough Ripening Stage',
    maturity: 'Maturity Stage'
  },

  // Trait details
  traitDetails: 'Trait Details',
  traitName: 'Trait Name',
  traitCode: 'Trait Code',
  traitValue: 'Trait Value',
  unit: 'Unit',
  addTrait: 'Add Trait',
  removeTrait: 'Remove',
  noTraits: 'No Trait Data Available',

  // Operation prompts
  selectPlot: 'Please select a plot',
  selectObserver: 'Please select an observer',
  selectGrowthStage: 'Please select a growth stage',
  selectTrait: 'Please select a trait',
  enterValue: 'Please enter trait value',
  addAtLeastOneTrait: 'Please add at least one trait data',
  invalidConfirm: 'Are you sure to invalidate this trait record?', // Supplement: Invalidation confirmation prompt
  submitAuditConfirm: 'Are you sure to submit this trait record for audit?',

  // Table column names
  columns: {
    recordId: 'Record ID',
    plotId: 'Plot ID',
    trialId: 'Trial ID',
    batchId: 'Batch ID',
    observationDate: 'Observation Date',
    growthStage: 'Growth Stage',
    traitCount: 'Trait Count',
    status: 'Status',
    workflowStatus: 'Audit Status',
    createBy: 'Creator',
    createTime: 'Creation Time',
    actions: 'Actions'
  },

  // Card titles
  cards: {
    basicInfo: 'Basic Information',
    traitDetails: 'Trait Details',
    photoInfo: 'Photo Information'
  },

  // Operation button text (Supplement: Buttons used in code)
  invalid: 'Void', // Supplement: Invalidate button
  submitAudit: 'Submit', // Supplement: Initiate audit button

  // Message prompts
  deleteConfirm: 'Are you sure to delete the selected records?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Edited successfully',
  uploadSuccess: 'Uploaded successfully',
  uploadFailed: 'Upload failed',
  invalidSuccess: 'Trait record invalidated successfully', // Supplement: Invalidation success prompt
  invalidFailed: 'Failed to invalidate trait record', // Supplement: Invalidation failed prompt
  submitAuditSuccess: 'Trait record submitted for audit successfully' // Supplement: Submit audit success prompt
}