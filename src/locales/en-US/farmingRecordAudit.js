export default {
  title: 'Farming Record Data Collection Audit',
  subtitle: 'Audit management for farming record data',
  detailTitle: 'Farming Record Audit Detail',
  auditTitle: 'Farming Record Audit Operation',
  searchPlaceholder: 'Please enter keywords to search',
  
  // Status options
  status: {
    placeholder: 'Please select audit status',
    S1: 'Pending Approval',
    S2: 'Approved',
    S3: 'Rejected',
    S10: 'Cancelled'
  },
  
  // Management practice options
  practices: {
    placeholder: 'Please select management practice',
    fertilization: 'Fertilization',
    irrigation: 'Irrigation',
    weeding: 'Weeding',
    pest_control: 'Pest Control',
    planting: 'Planting',
    harvesting: 'Harvesting'
  },
  
  // List page
  columns: {
    managementPractice: 'Management Practice',
    workflowStatus: 'Audit Status',
    fertilizerType: 'Fertilizer Type',
    irrigationType: 'Irrigation Type',
    createBy: 'Created By',
    createTime: 'Create Time',
    auditBy: 'Audited By',
    auditTime: 'Audit Time'
  },
  
  // Form fields
  form: {
    managementPractice: 'Management Practice',
    workflowStatus: 'Audit Status',
    activityDatetime: 'Activity Date Time',
    fertilizerType: 'Fertilizer Type',
    fertilizerRateKg: 'Fertilizer Rate (kg)',
    ureaRateKg: 'Urea Rate (kg)',
    pesticideType: 'Pesticide Type',
    irrigationType: 'Irrigation Type',
    irrigationFrequency: 'Irrigation Frequency',
    weedingDate: 'Weeding Date',
    herbicideUsed: 'Herbicide Used',
    seedSource: 'Seed Source',
    createBy: 'Created By',
    createTime: 'Create Time',
    auditBy: 'Audited By',
    auditTime: 'Audit Time',
    auditRemark: 'Audit Remark'
  },
  
  // Section titles
  sections: {
    basicInfo: 'Basic Information',
    fertilizerInfo: 'Fertilizer Information',
    irrigationInfo: 'Irrigation Information',
    weedingInfo: 'Weeding Information',
    pesticideInfo: 'Pesticide Information',
    createInfo: 'Creation Information',
    auditInfo: 'Audit Information',
    remarkInfo: 'Remark Information'
  },
  
  // Placeholders
  placeholder: {
    auditRemark: 'Please enter audit remark, required field',
    auditBy: 'Please enter auditor',
    auditTime: 'Please select audit time'
  },
  
  // Validation rules
  rules: {
    auditRemarkRequired: 'Audit remark cannot be empty'
  },
  
  // Action buttons
  audit: 'Audit',
  approve: 'Approve',
  reject: 'Reject',
  cancel: 'Cancel',
  
  // Confirmation messages
  confirmApprove: 'Are you sure to approve this farming record?',
  confirmReject: 'Are you sure to reject this farming record?',
  cancelConfirm: 'Are you sure to cancel this farming record? This action cannot be undone!',
  
  // Success messages
  approveSuccess: 'Audit approved successfully',
  rejectSuccess: 'Audit rejected successfully',
  cancelSuccess: 'Cancelled successfully'
}