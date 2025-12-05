// 环境监测新数据国际化文件 (中文)
// Environment New Data i18n File (Chinese)
export default {
  title: '环境监测数据',
  subtitle: '管理气象站等环境监测设备的数据记录',
  list: '数据列表',
  add: '新增记录',
  edit: '编辑记录',
  detail: '记录详情',
  delete: '删除记录',
  deleteConfirm: '确定要删除该记录吗？',
  deleteSuccess: '删除成功',
  addSuccess: '新增成功',
  editSuccess: '更新成功',

  // Search & Filter
  searchPlaceholder: '搜索气象站ID',
  filterByParameter: '按参数筛选',
  filterByBatch: '按批次筛选',
  allParameters: '全部参数',
  allBatches: '全部批次',

  // Parameter Codes
  parameterCode: {
    RAIN_DAILY: '日降雨量',
    TMAX: '最高温度',
    TMIN: '最低温度',
    HUMIDITY: '湿度',
    WIND_SPEED: '风速',
    SOLAR_RAD: '太阳辐射',
    other: '其他',
  },

  // Form Fields
  form: {
    plotInfo: '地块信息',
    stationInfo: '监测站信息',
    basicInfo: '基本信息',
    measurementInfo: '测量信息',
    envRecordId: '记录ID',
    trialId: '试验ID',
    batchId: '批次ID',
    plotId: '地块ID',
    stationId: '气象站ID',
    timestamp: '采集时间',
    parameterCode: '参数代码',
    value: '测量值',
    unit: '单位',
    source: '数据来源',
    remark: '备注',
  },

  // Form Placeholders
  placeholder: {
    envRecordId: '系统自动生成',
    trialId: '请选择试验',
    batchId: '请选择批次',
    plotId: '请选择地块（可选）',
    stationId: '请输入气象站ID',
    timestamp: '请选择采集时间',
    parameterCode: '请选择参数代码',
    value: '请输入测量值',
    unit: '请输入单位（如：mm、°C）',
    source: '请输入数据来源',
    remark: '请输入备注（可选）',
  },

  // Form Validation Rules
  rules: {
    batchIdRequired: '请选择批次',
    trialIdRequired: '请选择试验',
    stationIdRequired: '气象站ID必填',
    stationIdLength: '气象站ID不能超过50个字符',
    timestampRequired: '请选择采集时间',
    parameterCodeRequired: '请选择参数代码',
    valueRequired: '请输入测量值',
    valueFormat: '请输入有效数值',
    unitRequired: '请输入单位',
    unitLength: '单位不能超过20个字符',
    sourceLength: '数据来源不能超过100个字符',
    remarkLength: '备注不能超过500个字符',
  },

  // Table Columns
  columns: {
    envRecordId: '记录ID',
    trialId: '试验ID',
    batchId: '批次ID',
    batchName: '批次名称',
    plotId: '地块ID',
    plotName: '地块名称',
    stationId: '气象站ID',
    timestamp: '采集时间',
    parameterCode: '参数',
    value: '测量值',
    unit: '单位',
    source: '来源',
    createBy: '创建人',
    createTime: '创建时间',
    updateTime: '更新时间',
    actions: '操作',
  },
}
