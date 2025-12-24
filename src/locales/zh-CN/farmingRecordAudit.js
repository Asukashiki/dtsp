export default {
  title: '农事记录数据采集审核',
  subtitle: '对农事记录数据进行审核管理',
  detailTitle: '农事记录审核详情',
  auditTitle: '农事记录审核操作',
  searchPlaceholder: '请输入关键词搜索',
  
  // 状态选项
  status: {
    placeholder: '请选择审核状态',
    S1: '待审批',
    S2: '已审批', 
    S3: '已退回',
    S10: '作废'
  },
  
  // 管理措施选项
  practices: {
    placeholder: '请选择管理措施',
    fertilization: '施肥',
    irrigation: '灌溉',
    weeding: '除草',
    pest_control: '病虫害防治',
    planting: '播种',
    harvesting: '收获'
  },
  
  // 列表页面
  columns: {
    managementPractice: '管理措施',
    workflowStatus: '审核状态',
    fertilizerType: '肥料类型',
    irrigationType: '灌溉类型',
    createBy: '创建人',
    createTime: '创建时间',
    auditBy: '审核人',
    auditTime: '审核时间'
  },
  
  // 表单字段
  form: {
    managementPractice: '管理措施',
    workflowStatus: '审核状态',
    activityDatetime: '活动日期时间',
    fertilizerType: '肥料类型',
    fertilizerRateKg: '肥料施用量(公斤)',
    ureaRateKg: '尿素施用量(公斤)',
    pesticideType: '农药类型',
    irrigationType: '灌溉类型',
    irrigationFrequency: '灌溉频率',
    weedingDate: '除草日期',
    herbicideUsed: '除草剂使用',
    seedSource: '种子来源',
    createBy: '创建人',
    createTime: '创建时间',
    auditBy: '审核人',
    auditTime: '审核时间',
    auditRemark: '审核意见'
  },
  
  // 分节标题
  sections: {
    basicInfo: '基础信息',
    fertilizerInfo: '肥料信息',
    irrigationInfo: '灌溉信息',
    weedingInfo: '除草信息',
    pesticideInfo: '农药信息',
    createInfo: '创建信息',
    auditInfo: '审核信息',
    remarkInfo: '备注信息'
  },
  
  // 占位符
  placeholder: {
    auditRemark: '请输入审核意见，必填项',
    auditBy: '请输入审核人',
    auditTime: '请选择审核时间'
  },
  
  // 验证规则
  rules: {
    auditRemarkRequired: '审核意见不能为空'
  },
  
  // 操作按钮
  audit: '审批',
  approve: '同意',
  reject: '不同意',
  cancel: '作废',
  
  // 确认消息
  confirmApprove: '确定要同意这条农事记录吗？',
  confirmReject: '确定要退回这条农事记录吗？',
  cancelConfirm: '确定要作废这条农事记录吗？作废后不可恢复！',
  
  // 成功消息
  approveSuccess: '审核通过成功',
  rejectSuccess: '审核退回成功',
  cancelSuccess: '作废成功'
}