export default {
  // 页面基础标题
  title: 'Breeding Dataset Audit',
  subtitle: 'Review submitted datasets',
  list: 'Audit List',
  detail: 'Audit Details',
  history: 'Audit History',
  auditSuccess: 'Audit Successful',

  // 确认框文案
  confirm: {
    approve: 'Are you sure to approve this dataset?',
    reject: 'Are you sure to reject this dataset?',
    needsRevision: 'Are you sure to mark this dataset as needs revision?'
  },

  // 搜索筛选
  searchPlaceholder: 'Search variety name',
  filterByAuditStatus: 'Filter by audit status',
  filterByDatasetStatus: 'Filter by dataset status',
  allAuditStatus: 'All Audit Status',
  allDatasetStatus: 'All Dataset Status',

  // 审核状态
  auditStatus: {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    needs_revision: 'Needs Revision'
  },

  // 数据集状态(复用编制模块的状态)
  datasetStatus: {
    draft: 'Draft',
    submitted: 'Submitted',
    reviewing: 'Reviewing',
    approved: 'Approved',
    rejected: 'Rejected'
  },

  // 表单字段
  form: {
    basicInfo: 'Dataset Basic Information',
    dataStatistics: 'Data Statistics',
    auditInfo: 'Audit Information',
    submitInfo: 'Submission Information',
    compilationInfo: 'Compilation Information',
    dataDetails: 'Data Details',
    auditOpinion: 'Audit Opinion',
    auditTime: 'Audit Time',
    auditorName: 'Auditor',
    auditorOrgName: 'Audit Organization',
    submitTime: 'Submission Time',
    submitterName: 'Submitter',
    submitOrgName: 'Submission Organization',
    datasetCode: 'Dataset Code',
    trialId: 'Trial ID',
    batchId: 'Breeding Batch ID',
    batchName: 'Breeding Batch Name',
    versionNo: 'Version Number',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    recordCount: 'Record Count',
    remark: 'Remark',
    compiledBy: 'Compiled By',
    compiledByName: 'Compiler Name',
    compiledAt: 'Compilation Time',
    datasetStatus: 'Dataset Status',
    auditStatus: 'Audit Status',
    createdTime: 'Creation Time',
    updatedTime: 'Update Time',
    createdBy: 'Created By',
    submitBy: 'Submitted By',
    submitOrg: 'Submission Organization',
    auditBy: 'Audited By',
    creationInfo: 'Creation Information',
    lockedFlag: 'Lock Status',
    locked: 'Locked',
    unlocked: 'Unlocked',
    lockDataset: 'Lock Dataset',
    lockDatasetTip: 'Lock the dataset after approval, the dataset will be read-only once locked'
  },

  // 表单占位符
  placeholder: {
    auditOpinion: 'Please enter audit opinion (required for rejection/needs revision)',
    selectAuditStatus: 'Please select audit status',
    selectDatasetStatus: 'Please select dataset status'
  },

  // 表单验证规则
  rules: {
    auditOpinionRequired: 'Audit opinion is required for rejection/needs revision'
  },

  // 列表列名
  columns: {
    auditId: 'Audit ID',
    datasetId: 'Dataset ID',
    datasetCode: 'Dataset Code',
    reviewerId: 'Reviewer ID',
    trialId: 'Trial ID',
    trialCount: 'Trial Count',
    batchId: 'Batch ID',
    batchName: 'Batch Name',
    versionNo: 'Version Number',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    recordCount: 'Record Count',
    farmingRecordCount: 'Farming Record Count',
    fieldDataCount: 'Field Data Count',
    envDataCount: 'Environment Data Count',
    labTestCount: 'Lab Test Count',
    yieldDataCount: 'Yield Data Count',
    datasetStatus: 'Dataset Status',
    auditStatus: 'Audit Status',
    submitTime: 'Submission Time',
    submitterName: 'Submitter',
    auditTime: 'Audit Time',
    auditorName: 'Auditor',
    auditOpinion: 'Audit Opinion',
    lockedFlag: 'Lock Status',
    createdTime: 'Creation Time',
    updatedTime: 'Update Time',
    actions: 'Actions'
  },

  // 统计项文案
  statistics: {
    trialCount: 'Trial Count',
    plotCount: 'Plot Count',
    farmingCount: 'Farming Record Count',
    agronomicCount: 'Agronomic Trait Count',
    envCount: 'Environmental Monitoring Count',
    yieldCount: 'Yield Data Count',
    labCount: 'Lab Test Count',
    totalCount: 'Total Data Entries'
  },

  // Tab页标题
  tab: {
    plot: 'Plot & Sowing Information',
    farming: 'Farming Record Data',
    agronomic: 'Agronomic Trait Data',
    environment: 'Environmental Monitoring Data',
    yield: 'Yield/Field Inspection Data',
    lab: 'Lab Test Data'
  },

  // 表格列文案
  table: {
    // 公共列
    common: {
      batchId: 'Batch ID',
      trialId: 'Trial ID',
      plotId: 'Plot ID',
      quantity: 'Quantity',
      unit: 'Unit',
      remark: 'Remark',
      remarks: 'Remarks',
      createdTime: 'Creation Time'
    },
    // 地块及播种信息列
    plot: {
      plotId: 'Plot ID',
      replicationNo: 'Replication No.',
      rowNo: 'Row No.',
      columnNo: 'Column No.',
      varietyCode: 'Variety Code',
      sowingDate: 'Sowing Date',
      seedQuantity: 'Seed Quantity',
      sowingMethod: 'Sowing Method',
      plotAreaM2: 'Plot Area (㎡)',
      gpsLat: 'GPS Latitude',
      gpsLong: 'GPS Longitude',
      region: 'Planting Region'
    },
    // 农事记录列
    farming: {
      farmingRecordId: 'Farming Record ID',
      activityDate: 'Activity Date',
      activityType: 'Activity Type',
      inputName: 'Input Name',
      operatorId: 'Operator ID',
      operationDesc: 'Operation Description'
    },
    // 农艺性状列
    agronomic: {
      traitRecordId: 'Trait Record ID',
      observationDate: 'Observation Date',
      growthStage: 'Growth Stage',
      traitName: 'Trait Name',
      traitValue: 'Trait Value',
      observerId: 'Observer ID',
      plantHeightCm: 'Plant Height (cm)',
      tillerCount: 'Tiller Count'
    },
    // 环境监测列
    environment: {
      envRecordId: 'Environment Record ID',
      collectTime: 'Collection Time',
      dataType: 'Data Type',
      soilPh: 'Soil pH Value',
      soilTemperature: 'Soil Temperature (℃)',
      soilMoisture: 'Soil Moisture (%)',
      airTemperature: 'Air Temperature (℃)',
      airHumidity: 'Air Humidity (%)',
      rainfall: 'Rainfall (mm)'
    },
    // 产量/田间检查列
    yield: {
      inspectionId: 'Inspection ID',
      plotAreaM2: 'Plot Area (㎡)',
      inspectionDate: 'Inspection Date',
      inspectionType: 'Inspection Type',
      grainWeightKg: 'Grain Weight (kg)',
      yieldQtPerHa: 'Yield (tons/ha)',
      moistureContent: 'Moisture Content (%)',
      scoreValue: 'Score Value',
      harvestDate: 'Harvest Date',
      recorderName: 'Recorder Name'
    },
    // 实验室测试列
    lab: {
      testId: 'Test ID',
      sampleId: 'Sample ID',
      sampleType: 'Sample Type',
      germinationRate: 'Germination Rate (%)',
      purityPercent: 'Purity (%)',
      moistureContentPercent: 'Moisture Content (%)',
      proteinPercent: 'Protein Content (%)',
      testDate: 'Test Date',
      testOrganization: 'Test Organization',
      testerName: 'Tester Name',
      passFailFlag: 'Pass/Fail Status',
      pass: 'Pass',
      fail: 'Fail'
    }
  },

  // 操作按钮文案
  actions: {
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    needsRevision: 'Needs Revision',
    audit: 'Audit',
    viewHistory: 'View History'
  },

  // 提示信息
  message: {
    approveSuccess: 'Approved successfully',
    rejectSuccess: 'Rejected successfully',
    needsRevisionSuccess: 'Marked as needs revision successfully',
    datasetCodeGenerated: 'Dataset code generated',
    onlySubmittedCanAudit: 'Only submitted or reviewing datasets can be audited',
    rejectOpinionRequired: 'Rejection reason is required when rejecting',
    needsRevisionOpinionRequired: 'Revision comments are required when marking as needs revision',
    auditOpinionLabel: 'Audit Opinion',
    datasetLocked: 'Dataset is locked and cannot be modified',
    datasetUnlocked: 'Dataset is unlocked and can be modified',
    loadDataFailed: 'Failed to load data, please try again later',
    loadDetailFailed: 'Failed to load detail data'
  },

  // 日志文案（前端调试用，非用户可见）
  log: {
    loadingDataList: 'Loading data list, Trial ID: {trialId}',
    loadPlotFailed: 'Failed to load plot data',
    loadFarmingFailed: 'Failed to load farming record data',
    loadAgronomicFailed: 'Failed to load agronomic trait data',
    loadEnvironmentFailed: 'Failed to load environmental monitoring data',
    loadLabFailed: 'Failed to load lab test data',
    loadYieldFailed: 'Failed to load yield data',
    loadDataSuccess: 'Data list loaded successfully',
    parseRemarkFailed: 'Failed to parse module remarks',
    loadDataFailed: 'Failed to load data',
    loadingStatistics: 'Loading statistics data, Trial ID: {trialId}',
    loadFarmingStatsFailed: 'Failed to load farming record statistics',
    loadFieldStatsFailed: 'Failed to load field data statistics',
    loadEnvStatsFailed: 'Failed to load environment data statistics',
    loadLabStatsFailed: 'Failed to load lab test statistics',
    loadYieldStatsFailed: 'Failed to load yield data statistics',
    loadPlotStatsFailed: 'Failed to load plot data statistics',
    statsApiResult: 'Statistics API response result',
    statsResult: 'Statistics calculation result',
    loadStatsFailed: 'Failed to load statistics data',
    detectedTrialId: 'Detected Trial ID: {trialId}, starting to load related data',
    noTrialIdInDataset: 'No Trial ID found in dataset',
    noTrialId: 'Trial ID is empty, cannot load statistics data',
    statsUpdated: 'Statistics data updated to detail data',
    noAuditRecord: 'No audit record found, using default status',
    loadDetailFailed: 'Failed to load detail data',
    loadYieldError: 'Yield data API returned an exception'
  }
}