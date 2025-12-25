export default {
  // 基础标题/操作
  title: 'Breeding Dataset Compilation',
  subtitle: 'Aggregate breeding batch data and submit for review',
  list: 'Dataset List',
  add: 'Add Dataset',
  compile: 'Compile',
  edit: 'Edit Dataset',
  detail: 'Dataset Details',
  delete: 'Delete Dataset',
  deleteConfirm: 'Are you sure to delete this dataset?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Edited successfully',
  submitSuccess: 'Submitted successfully',
  submitConfirm: 'Are you sure to submit this dataset?',
  pendingCode: 'Pending',

  // 搜索筛选
  searchPlaceholder: 'Search variety name',
  filterByCrop: 'Filter by crop type',
  filterByStatus: 'Filter by dataset status',
  allCrops: 'All Crops',
  allStatus: 'All Status',

  // 数据集状态
  status: {
    draft: 'Draft',
    submitted: 'Submitted',
    reviewing: 'Reviewing',
    approved: 'Approved',
    rejected: 'Rejected',
    needs_revision: 'NeedsRevision',
  },

  // 表单字段
  form: {
    dataDetails: 'Data Details',
    basicInfo: 'Basic Information',
    datasetCode: 'Dataset Code',
    trialId: 'Trial ID',
    batchId: 'Breeding Batch ID',
    batchName: 'Breeding Batch Name',
    versionNo: 'Version Number',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    compiledBy: 'Compiled By',
    compiledByName: 'Compiler Name',
    compiledAt: 'Compilation Time',
    recordCount: 'Record Count',
    status: 'Status',
    compilationInfo: 'Compilation Information',
    statisticsInfo: 'Data Statistics',
    trialCount: 'Trial Records',
    fieldDataCount: 'Field Data Records',
    envDataCount: 'Environment Data Records',
    labTestCount: 'Lab Test Records',
    yieldDataCount: 'Yield Data Records',
    datasetStatus: 'Dataset Status',
    submitInfo: 'Submission Information',
    submitTime: 'Submit Time',
    submitBy: 'Submitted By',
    submitByName: 'Submitter Name',
    submitOrgName: 'Submit Organization',
    auditInfo: 'Audit Information',
    auditTime: 'Audit Time',
    auditBy: 'Audited By',
    auditByName: 'Auditor Name',
    auditOpinion: 'Audit Opinion',
    creationInfo: 'Creation Information',
    createTime: 'Create Time',
    createBy: 'Created By',
    createdTime: 'Created Time',
    createdBy: 'Created By',
    createdByName: 'Creator Name',
    updatedTime: 'Updated Time',
    updatedBy: 'Updated By',
    operatorInfo: 'Operation Information',
    remark: 'Remark',
    // 统计信息子项（对应页面统计卡片）
    statistics: {
      trialCount: 'Trial Records',
      plotCount: 'Plot & Sowing Info Count',
      farmingCount: 'Farming Record Count',
      agronomicCount: 'Agronomic Trait Count',
      envCount: 'Environmental Monitoring Count',
      yieldCount: 'Field Inspection Count',
      labCount: 'Lab Test Count',
      totalCount: 'Total Data Entries'
    }
  },

  // 表单占位符
  placeholder: {
    trialId: 'Please select trial ID',
    batchId: 'Please enter breeding batch ID',
    batchIdAuto: 'Auto-filled based on trial ID',
    batchName: 'Please enter breeding batch name',
    versionNo: 'Please enter version number (default 1.0)',
    cropType: 'Please select crop type',
    varietyName: 'Please enter variety name',
    compiledBy: 'Auto-filled with current user',
    compiledAt: 'Please select compilation time',
    recordCount: 'Please enter record count',
    recordCountAutoCalculate: 'Record count auto-calculated (Field Data + Environment Data + Lab Tests + Yield Data)',
    status: 'Please select status',
    remark: 'Please enter remark (optional)',
    // 表格备注输入框占位符
    remarkInput: 'Please enter remark'
  },

  // 表单验证
  rules: {
    trialIdRequired: 'Trial ID is required',
    batchIdRequired: 'Breeding batch ID is required',
    batchNameRequired: 'Breeding batch name is required',
    cropTypeRequired: 'Crop type is required',
    varietyNameRequired: 'Variety name is required',
    compiledByRequired: 'Compiler is required',
    compiledAtRequired: 'Compilation time is required',
  },

  // 列表列
  columns: {
    datasetCode: 'Dataset Code',
    trialId: 'Trial ID',
    batchId: 'Batch ID',
    batchName: 'Batch Name',
    versionNo: 'Version',
    cropType: 'Crop Type',
    varietyName: 'Variety Name',
    recordCount: 'Records',
    trialCount: 'Trials',
    labTestCount: 'Tests',
    yieldDataCount: 'Yields',
    datasetStatus: 'Status',
    submitTime: 'Submit Time',
    createTime: 'Create Time',
    actions: 'Actions',
  },

  // 操作按钮
  actions: {
    submit: 'Submit',
    statistics: 'Data Statistics',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
  },

  // 提示框文案（tooltip）
  tooltip: {
    batchIdAuto: 'Batch ID will be auto-filled based on trial ID',
    compiledByAuto: 'Auto-filled with current logged-in user',
    cropTypeAuto: 'Crop type auto-filled from trial information',
    varietyNameAuto: 'Variety name auto-filled from trial information',
    codeAfterApproval: 'Official dataset code will be auto-generated after approval'
  },

  // Tab页标题
  tab: {
    plot: 'Plot & Sowing Information',
    farming: 'Farming Record Collection',
    agronomic: 'Agronomic Trait Collection',
    environment: 'Environmental Monitoring Data',
    yield: 'Field Inspection Collection',
    lab: 'Lab Test Collection'
  },

  // 表格列文案
  table: {
    // 通用列
    common: {
      batchId: 'Batch ID',
      trialId: 'Trial ID',
      plotId: 'Plot ID',
      quantity: 'Quantity',
      unit: 'Unit',
      remark: 'Remark',
      remarks: 'Remarks',
      createdTime: 'Created Time'
    },
    // 地块与播种信息列
    plot: {
      plotId: 'Plot ID',
      replicationNo: 'Replication Group No.',
      rowNo: 'Row No.',
      columnNo: 'Column No.',
      varietyCode: 'Variety Code',
      sowingDate: 'Sowing Date',
      seedQuantity: 'Seed Quantity (g)',
      sowingMethod: 'Sowing Method',
      plotAreaM2: 'Plot Area (㎡)',
      gpsLat: 'GPS Latitude',
      gpsLong: 'GPS Longitude',
      region: 'Region'
    },
    // 农事记录数据列
    farming: {
      farmingRecordId: 'Farming Record ID',
      activityDate: 'Activity Date',
      activityType: 'Activity Type',
      inputName: 'Input Name',
      operatorId: 'Operator ID',
      operationDesc: 'Operation Description'
    },
    // 农艺性状数据列
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
    // 环境监测数据列
    environment: {
      envRecordId: 'Environment Record ID',
      stationId: 'Station ID',
      timestamp: 'Timestamp',
      parameterCode: 'Parameter Code',
      value: 'Value',
      unit: 'Unit',
      source: 'Data Source',
      collectTime: 'Collection Time',
      dataType: 'Data Type',
      soilPh: 'Soil pH Value',
      soilTemperature: 'Soil Temperature (℃)',
      soilMoisture: 'Soil Moisture (%)',
      airTemperature: 'Air Temperature (℃)',
      airHumidity: 'Air Humidity (%)',
      rainfall: 'Rainfall (mm)'
    },
    // 田间检查数据列
    yield: {
      inspectionId: 'Inspection ID',
      plotAreaM2: 'Plot Area (㎡)',
      inspectionDate: 'Inspection Date',
      inspectionType: 'Inspection Type',
      grainWeightKg: 'Grain Weight (kg)',
      yieldQtPerHa: 'Yield (qt/ha)',
      moistureContent: 'Moisture Content (%)',
      scoreValue: 'Score Value',
      harvestDate: 'Harvest Date',
      recorderName: 'Recorder Name'
    },
    // 实验室测试数据列
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
      passFailFlag: 'Pass/Fail Flag',
      pass: 'Pass',
      fail: 'Fail'
    }
  },

  // 提示信息
  message: {
    noLabTest: 'At least one lab test record is required to submit',
    noYieldData: 'At least one yield data record is required to submit',
    onlyDraftCanEdit: 'Only draft datasets can be edited',
    onlyDraftCanDelete: 'Only draft datasets can be deleted',
    onlyDraftCanSubmit: 'Only draft datasets can be submitted',
    submitRequirement: 'Note: At least 1 lab test record and 1 yield data record are required to submit for review',
    cannotEditApproved: 'This dataset has been approved and cannot be modified',
    statisticsLoaded: 'Statistics data loaded automatically',
    statisticsFailed: 'Failed to get statistics data',
    getTrialInfoFailed: 'Failed to get trial information, please fill in manually',
    loadFailed: 'Load failed',
    loadDetailFailed: 'Failed to load detail data'
  },

  // 通用公共文案（组件中用到的common前缀key）
  common: {
    back: 'Back',
    noData: 'No Data',
    edit: 'Edit',
    loadFailed: 'Load failed',
    confirm: 'Confirm',
    cancel: 'Cancel',
    operationFailed: 'Operation failed'
  }
}
