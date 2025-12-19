export default {
  // 页面标题
  title: '农艺性状采集',
  subtitle: '记录和管理育种试验中的农艺性状数据',
  list: '性状记录列表',
  add: '新增记录',
  edit: '编辑记录',
  detail: '记录详情',
  
  // 主记录字段
  recordId: '记录ID',
  plotId: '地块ID',
  trialId: '试验ID',
  batchId: '批次ID',
  observationDate: '观测日期',
  growthStage: '生长阶段',
  observerId: '观测员',
  photoUrl: '照片',
  remarks: '备注',
  traitCount: '性状数量',
  
  // 生长阶段选项
  growthStages: {
    germination: '发芽期',
    seedling: '苗期',
    tillering: '分蘖期',
    stem_elongation: '拔节期',
    booting: '孕穗期',
    heading: '抽穗期',
    flowering: '开花期',
    milk: '乳熟期',
    dough: '蜡熟期',
    maturity: '成熟期'
  },
  
  // 性状明细
  traitDetails: '性状明细',
  traitName: '性状名称',
  traitCode: '性状代码',
  traitValue: '性状值',
  unit: '单位',
  addTrait: '添加性状',
  removeTrait: '移除',
  noTraits: '暂无性状数据',
  
  // 操作提示
  selectPlot: '请选择地块',
  selectObserver: '请选择观测员',
  selectGrowthStage: '请选择生长阶段',
  selectTrait: '请选择性状',
  enterValue: '请输入性状值',
  addAtLeastOneTrait: '请至少添加一条性状数据',
  
  // 表格列名
  columns: {
    recordId: '记录ID',
    plotId: '地块ID',
    trialId: '试验ID',
    batchId: '批次ID',
    observationDate: '观测日期',
    growthStage: '生长阶段',
    traitCount: '性状数量',
    status: '状态',
    workflowStatus: '审核状态',
    createBy: '创建人',
    createTime: '创建时间',
    actions: '操作'
  },
  
  // 卡片标题
  cards: {
    basicInfo: '基本信息',
    traitDetails: '性状明细',
    photoInfo: '照片信息'
  },
  
  // 消息提示
  deleteConfirm: '确定要删除选中的记录吗？',
  deleteSuccess: '删除成功',
  addSuccess: '添加成功',
  editSuccess: '编辑成功',
  uploadSuccess: '上传成功',
  uploadFailed: '上传失败'
}
