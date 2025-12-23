// 文件名：trait-audit-i18n.js（中文配置）
export default {
  // ==================== 性状审核列表页 ====================
  // 页面基础文案
  title: "性状审核",
  subtitle: "对提交的性状数据进行审核管理",
  listName: "性状审核列表",

  // 搜索区域
  auditStatusLabel: "审核状态",
  pleaseSelect: "请选择",
  queryBtn: "查询",
  resetBtn: "重置",

  // 表格/移动端列名
  plotId: "地块ID",
  trialId: "试验ID",
  batchId: "批次ID",
  observationDate: "观测日期",
  growthStage: "生育期",
  traitCount: "性状数量",
  auditStatus: "审核状态",
  submitter: "提交人",
  submitTime: "提交时间",
  operations: "操作",

  // 按钮文案
  viewBtn: "查看",
  auditBtn: "审核",
  backBtn: "返回",

  // 状态文案
  emptyData: "暂无数据",
  status: {
    pending: "待审核",
    approved: "已通过",
    rejected: "已驳回"
  },

  // 移动端标签文案
  mobileLabels: {
    plotId: "地块ID",
    observationDate: "观测日期",
    growthStage: "生育期",
    traitCount: "性状数量"
  },

  // ==================== 性状审核详情页 ====================
  // 页面基础
  detailTitle: "性状审核详情",

  // 详情分节标题
  cards: {
    basicInfo: "基本信息",
    traitDetails: "性状明细",
    photoInfo: "照片信息",
    systemInfo: "系统信息",
    auditInfo: "审核信息"
  },

  // 性状明细相关
  traitName: "性状名称",
  traitCode: "性状代码",
  traitValue: "性状值",
  unit: "单位",
  noTraits: "暂无性状数据",

  // 审核表单相关
  auditOpinion: "审核意见",
  auditOpinionPlaceholder: "请输入审核意见（驳回时必填）",
  approveBtn: "审核通过",
  rejectBtn: "审核驳回",

  // 审核验证规则
  rules: {
    opinionRequired: "驳回时审核意见不能为空"
  },

  // 审核提示信息
  confirm: {
    approve: "确定要审核通过该性状记录吗？",
    reject: "确定要审核驳回该性状记录吗？",
    submit: "确定要提交该性状记录进入审核流程吗？"
  },

  // 操作结果提示
  message: {
    approveSuccess: "性状记录审核通过成功",
    rejectSuccess: "性状记录审核驳回成功",
    submitSuccess: "性状记录提交审核流程成功",
    loadFailed: "加载数据失败",
    operationFailed: "操作失败",
    missingTraitId: "缺少性状记录ID"
  },

  // 日志提示
  log: {
    noAuditRecord: "未查询到该性状记录的审核信息",
    loadDetailFailed: "加载性状审核详情失败",
    approveFailed: "审核通过操作失败",
    rejectFailed: "审核驳回操作失败",
    submitFailed: "提交审核流程失败"
  },

  // 系统信息
  createBy: "创建人",
  createTime: "创建时间",
  updateBy: "更新人",
  updateTime: "更新时间",
  auditorName: "审核人",
  auditTime: "审核时间"
}