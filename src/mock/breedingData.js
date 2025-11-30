/**
 * 育种管理模块Mock数据
 * Breeding Management Mock Data
 */

// ==================== 育种计划管理 Mock数据 ====================

/**
 * 育种计划列表Mock数据
 */
export const mockBreedingPlans = [
  {
    planId: 'BP2025001',
    enterpriseId: 'ENT001',
    planName: '2025年春季小麦育种计划',
    breedingYear: '2025',
    batchId: 'BATCH2025001',
    plantingBase: '奥罗米亚州中部试验基地',
    cropType: '小麦',
    varietyName: '抗旱小麦1号',
    propagationLevel: '育种家种子',
    parentSeedSource: '国家种质库',
    personInCharge: '阿贝贝·特斯法耶',
    startDate: '2025-03-01',
    endDate: '2025-10-30',
    breedingGoal: '选育抗旱、高产小麦新品种，适应半干旱气候条件',
    remarks: '重点关注耐旱性和产量表现',
    status: 'ongoing',
    createTime: '2025-01-15 10:30:00',
    updateTime: '2025-01-20 14:20:00'
  },
  {
    planId: 'BP2025002',
    enterpriseId: 'ENT001',
    planName: '2025年玉米杂交育种项目',
    breedingYear: '2025',
    batchId: 'BATCH2025002',
    plantingBase: '西部高原育种站',
    cropType: '玉米',
    varietyName: '高产玉米杂交系',
    propagationLevel: '原原种',
    parentSeedSource: '自有种质资源',
    personInCharge: '梅莱斯·哈伊卢',
    startDate: '2025-04-15',
    endDate: '2025-11-15',
    breedingGoal: '培育高产、抗病玉米杂交种，提高单产20%',
    remarks: '已完成亲本配对试验',
    status: 'planning',
    createTime: '2025-02-10 09:00:00',
    updateTime: '2025-02-10 09:00:00'
  },
  {
    planId: 'BP2024003',
    enterpriseId: 'ENT002',
    planName: '2024年高粱育种计划',
    breedingYear: '2024',
    batchId: 'BATCH2024003',
    plantingBase: '东部干旱区试验站',
    cropType: '高粱',
    varietyName: '耐旱高粱优质系',
    propagationLevel: '原种',
    parentSeedSource: '地方品种改良',
    personInCharge: '提鲁内·贝克勒',
    startDate: '2024-05-01',
    endDate: '2024-12-20',
    breedingGoal: '选育耐旱、耐瘠薄的优质高粱品种',
    remarks: '已完成收获和数据采集',
    status: 'completed',
    createTime: '2024-03-20 11:15:00',
    updateTime: '2024-12-25 16:40:00'
  },
  {
    planId: 'BP2025004',
    enterpriseId: 'ENT003',
    planName: '苔麸原原种繁育计划',
    breedingYear: '2025',
    batchId: 'BATCH2025004',
    plantingBase: '北部高海拔育种基地',
    cropType: '苔麸',
    varietyName: '优质苔麸地方种',
    propagationLevel: '良种',
    parentSeedSource: '提纯复壮种源',
    personInCharge: '格塔丘·沃尔德',
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    breedingGoal: '保持苔麸地方品种优良性状，扩大繁殖规模',
    remarks: '',
    status: 'ongoing',
    createTime: '2025-04-10 14:00:00',
    updateTime: '2025-04-10 14:00:00'
  }
]

// ==================== 育种材料登记 Mock数据 ====================

/**
 * 育种材料登记列表Mock数据
 */
export const mockBreedingMaterials = [
  {
    materialId: 'MAT2025001',
    registrationCode: 'REG-2025-001',
    batchId: 'BATCH2025001',
    warehouseInId: 'WH-IN-20250115-001',
    seedType: '小麦亲本A系',
    quantity: 25.5,
    sourceEntity: '国家农作物种质资源库',
    receiveDate: '2025-01-15',
    labTestReportUrl: '/files/lab-reports/2025/report-001.pdf',
    operator: '泽梅德·穆卢',
    operationOrg: '奥罗米亚种子研究中心',
    operationTime: '2025-01-15 15:30:00'
  },
  {
    materialId: 'MAT2025002',
    registrationCode: 'REG-2025-002',
    batchId: 'BATCH2025001',
    warehouseInId: 'WH-IN-20250120-002',
    seedType: '小麦亲本B系',
    quantity: 30.0,
    sourceEntity: '国家农作物种质资源库',
    receiveDate: '2025-01-20',
    labTestReportUrl: '/files/lab-reports/2025/report-002.pdf',
    operator: '泽梅德·穆卢',
    operationOrg: '奥罗米亚种子研究中心',
    operationTime: '2025-01-20 10:20:00'
  },
  {
    materialId: 'MAT2025003',
    registrationCode: 'REG-2025-003',
    batchId: 'BATCH2025002',
    warehouseInId: 'WH-IN-20250210-003',
    seedType: '玉米杂交亲本雄株',
    quantity: 15.8,
    sourceEntity: '企业自有种质库',
    receiveDate: '2025-02-10',
    labTestReportUrl: '/files/lab-reports/2025/report-003.pdf',
    operator: '阿贝拉·塔德塞',
    operationOrg: '西部育种研究所',
    operationTime: '2025-02-10 14:50:00'
  },
  {
    materialId: 'MAT2025004',
    registrationCode: 'REG-2025-004',
    batchId: 'BATCH2025002',
    warehouseInId: 'WH-IN-20250212-004',
    seedType: '玉米杂交亲本雌株',
    quantity: 18.2,
    sourceEntity: '企业自有种质库',
    receiveDate: '2025-02-12',
    labTestReportUrl: '/files/lab-reports/2025/report-004.pdf',
    operator: '阿贝拉·塔德塞',
    operationOrg: '西部育种研究所',
    operationTime: '2025-02-12 09:30:00'
  },
  {
    materialId: 'MAT2024005',
    registrationCode: 'REG-2024-015',
    batchId: 'BATCH2024003',
    warehouseInId: 'WH-IN-20240505-015',
    seedType: '高粱地方品种',
    quantity: 40.0,
    sourceEntity: '地方农户采集',
    receiveDate: '2024-05-05',
    labTestReportUrl: '/files/lab-reports/2024/report-015.pdf',
    operator: '贝尔哈努·特库',
    operationOrg: '东部试验站',
    operationTime: '2024-05-05 16:00:00'
  }
]

// ==================== 育种跟踪管理 Mock数据 ====================

/**
 * 育种跟踪记录列表Mock数据
 */
export const mockBreedingTrackings = [
  {
    trackingId: 'TRK2025001',
    batchId: 'BATCH2025001',
    stageName: '亲本系准备',
    location: '奥罗米亚州中部试验基地-A区',
    coordinates: '8.9806, 38.7578',
    expectedYield: 120.5,
    actualYield: null,
    fieldInspectionScore: null,
    diseaseObservation: '',
    stageCompletionDate: null,
    recorder: '阿贝贝·特斯法耶',
    recordTime: '2025-03-01 10:00:00',
    updateTime: '2025-03-01 10:00:00'
  },
  {
    trackingId: 'TRK2025002',
    batchId: 'BATCH2025002',
    stageName: '育种家种子',
    location: '西部高原育种站-B1地块',
    coordinates: '9.0333, 37.4500',
    expectedYield: 85.0,
    actualYield: null,
    fieldInspectionScore: 4.2,
    diseaseObservation: '轻微锈病,已进行防治',
    stageCompletionDate: null,
    recorder: '梅莱斯·哈伊卢',
    recordTime: '2025-04-15 14:30:00',
    updateTime: '2025-05-20 11:15:00'
  },
  {
    trackingId: 'TRK2024003',
    batchId: 'BATCH2024003',
    stageName: '原原种繁殖',
    location: '东部干旱区试验站-C区',
    coordinates: '9.6000, 41.8500',
    expectedYield: 200.0,
    actualYield: 215.3,
    fieldInspectionScore: 4.5,
    diseaseObservation: '未发现明显病害',
    stageCompletionDate: '2024-08-20',
    recorder: '提鲁内·贝克勒',
    recordTime: '2024-06-10 09:00:00',
    updateTime: '2024-08-20 16:30:00'
  },
  {
    trackingId: 'TRK2024004',
    batchId: 'BATCH2024003',
    stageName: '原种繁殖',
    location: '东部干旱区试验站-D1地块',
    coordinates: '9.6100, 41.8600',
    expectedYield: 450.0,
    actualYield: 468.7,
    fieldInspectionScore: 4.8,
    diseaseObservation: '生长健壮,无病虫害',
    stageCompletionDate: '2024-12-15',
    recorder: '提鲁内·贝克勒',
    recordTime: '2024-09-01 10:30:00',
    updateTime: '2024-12-15 15:45:00'
  },
  {
    trackingId: 'TRK2025005',
    batchId: 'BATCH2025004',
    stageName: '亲本系准备',
    location: '北部高海拔育种基地',
    coordinates: '10.6000, 37.3900',
    expectedYield: 65.0,
    actualYield: null,
    fieldInspectionScore: null,
    diseaseObservation: '',
    stageCompletionDate: null,
    recorder: '格塔丘·沃尔德',
    recordTime: '2025-06-01 08:00:00',
    updateTime: '2025-06-01 08:00:00'
  }
]

// ==================== 辅助数据 ====================

/**
 * 育种批次列表（用于下拉选择）
 */
export const mockBatchList = [
  { batchId: 'BATCH2025001', batchName: 'BATCH2025001 - 2025年春季小麦育种' },
  { batchId: 'BATCH2025002', batchName: 'BATCH2025002 - 2025年玉米杂交育种' },
  { batchId: 'BATCH2025004', batchName: 'BATCH2025004 - 苔麸原原种繁育' },
  { batchId: 'BATCH2024003', batchName: 'BATCH2024003 - 2024年高粱育种（已完成）' }
]

/**
 * 作物类型列表（用于下拉选择）
 * 注意: label需要在使用时通过i18n动态获取
 */
export const mockCropTypes = [
  { value: 'wheat', labelKey: 'common.cropTypes.wheat' },
  { value: 'maize', labelKey: 'common.cropTypes.maize' },
  { value: 'sorghum', labelKey: 'common.cropTypes.sorghum' },
  { value: 'teff', labelKey: 'common.cropTypes.teff' },
  { value: 'barley', labelKey: 'common.cropTypes.barley' },
  { value: 'pulses', labelKey: 'common.cropTypes.pulses' }
]

/**
 * 繁殖级别列表
 * 注意: label需要在使用时通过i18n动态获取
 */
export const mockPropagationLevels = [
  { value: 'breeder', labelKey: 'research.breeding.plan.propagationLevel.breeder' },
  { value: 'preBasic', labelKey: 'research.breeding.plan.propagationLevel.preBasic' },
  { value: 'basic', labelKey: 'research.breeding.plan.propagationLevel.basic' },
  { value: 'certified', labelKey: 'research.breeding.plan.propagationLevel.certified' }
]

/**
 * 阶段名称列表
 * 注意: label需要在使用时通过i18n动态获取
 */
export const mockStageNames = [
  { value: 'parentLinePreparation', labelKey: 'research.breeding.tracking.stageName.parentLinePreparation' },
  { value: 'breederSeed', labelKey: 'research.breeding.tracking.stageName.breederSeed' },
  { value: 'preBasicSeedPropagation', labelKey: 'research.breeding.tracking.stageName.preBasicSeedPropagation' },
  { value: 'basicSeedPropagation', labelKey: 'research.breeding.tracking.stageName.basicSeedPropagation' }
]

/**
 * 计划状态列表
 * 注意: label需要在使用时通过i18n动态获取
 */
export const mockPlanStatus = [
  { value: 'planning', labelKey: 'research.breeding.plan.status.planning' },
  { value: 'ongoing', labelKey: 'research.breeding.plan.status.ongoing' },
  { value: 'completed', labelKey: 'research.breeding.plan.status.completed' },
  { value: 'cancelled', labelKey: 'research.breeding.plan.status.cancelled' }
]
