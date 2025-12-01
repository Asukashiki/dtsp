// 企业审核国际化文件
export default {
    title: '种子企业审核',
    subtitle: '审核企业提交的备案申请材料',
    taskList: '审核任务列表',
    taskDetail: '审核任务详情',
    detailTitle: '审核详情',
    detailSubtitle: '查看企业信息并进行审核',

    // 搜索和筛选
    search: {
      placeholder: '搜索企业名称、统一社会信用代码',
    },
    filter: {
      enterpriseType: '按企业类型筛选',
      urgency: '按紧急程度筛选',
    },

    // 紧急程度
    urgency: {
      high: '高',
      medium: '中',
      low: '低',
    },

    // 表格列
    columns: {
      enterpriseName: '企业名称',
      unifiedSocialCreditCode: '统一社会信用代码',
      enterpriseType: '企业类型',
      seedLicenseNo: '种子许可证号',
      applicationDate: '申请日期',
      currentStage: '当前审核阶段',
      assignedAuditor: '分配审核人',
      auditStatus: '审核状态',
      submissionTime: '提交时间',
      urgency: '紧急程度',
      actions: '操作',
    },

    // 表格提示
    table: {
      noData: '暂无数据',
    },

    // 审核状态
    status: {
      pending: '审核中',
      approved: '已通过',
      rejected: '已驳回',
      published: '已发布',
    },

    // 审核阶段
    stage: {
      initial: '初审',
      recheck: '复审',
      final: '终审',
    },

    // 审核结果
    result: {
      pass: '通过',
      reject: '驳回',
    },

    // 详情页区域标题
    sections: {
      basicInfo: '企业基础信息',
      extraInfo: '企业额外信息',
      documents: '所需文件',
      auditOperation: '审核操作',
    },

    // 企业额外信息
    extraInfo: {
      establishmentDate: '企业成立时间',
      legalPersonName: '法人姓名',
      legalPersonId: '法人ID',
      contactPersonName: '联系人姓名',
      contactPhone: '联系电话',
      email: '邮箱',
    },

    // 所需文件
    documents: {
      businessLicense: '营业执照',
      seedLicense: '种子许可证',
      taxRegistration: '税务登记证',
      factoryPermit: '工厂许可证',
      otherDocuments: '其他证明材料',
      viewDocument: '查看文件',
      download: '下载',
    },

    // 表单字段
    form: {
      auditResult: '审核结果',
      auditOpinion: '审核意见',
      auditor: '审核人',
      auditTime: '审核时间',
      rejectReason: '驳回原因',
    },

    // 表单占位符
    placeholder: {
      auditOpinion: '请输入审核意见',
      rejectReason: '请输入驳回原因',
    },

    // 表单验证
    rules: {
      auditResultRequired: '请选择审核结果',
      auditOpinionRequired: '请输入审核意见',
      rejectReasonRequired: '驳回时必须填写驳回原因',
    },

    // 操作按钮
    actions: {
      submit: '提交审核',
      back: '返回列表',
      backToList: '返回列表',
      audit: '审核',
      search: '搜索',
      reset: '重置',
    },

    // 提示信息
    messages: {
      submitSuccess: '审核提交成功',
      submitFailed: '审核提交失败',
      confirmSubmit: '确定提交审核结果吗？',
    },
  }