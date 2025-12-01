// 种子推广信息管理国际化文件
export default {
  title: '种子推广信息管理',
  subtitle: '管理种子品种推广内容、上传宣传视频、生成分享链接',

  // 按钮和操作
  uploadContent: '上传推广内容',
  generateLink: '生成分享链接',
  copyLink: '复制链接',
  shareLink: '分享链接',
  linkCopied: '链接已复制到剪贴板',

  // 搜索和筛选
  searchPlaceholder: '搜索推广标题',
  filterByStatus: '按状态筛选',
  allStatus: '全部状态',

  // 状态
  status: {
    active: '公示中',
    expired: '已过期',
  },

  // 列表列
  columns: {
    promotionId: '推广ID',
    title: '推广标题',
    recommendedVarieties: '推荐品种',
    publishTime: '发布时间',
    validPeriod: '有效期（天）',
    visitCount: '访问次数',
    shareLink: '分享链接',
    actions: '操作',
  },

  // 表单字段
  form: {
    enterpriseId: '企业ID',
    title: '推广标题',
    videoFile: '宣传视频',
    promotionSummary: '推广摘要',
    recommendedVarieties: '推荐品种',
    validPeriod: '有效期（天）',
    selectVideo: '选择视频文件',
    videoTips: '仅支持MP4格式，文件大小不超过100MB',
    varietiesTips: '多个品种用英文逗号分隔',
  },

  // 表单占位符
  placeholder: {
    title: '请输入推广标题',
    promotionSummary: '请输入推广摘要（选填）',
    recommendedVarieties: '请输入推荐品种，多个品种用英文逗号分隔',
    validPeriod: '请输入有效期天数',
  },

  // 表单验证
  rules: {
    titleRequired: '请输入推广标题',
    videoRequired: '请上传宣传视频',
    varietiesRequired: '请输入推荐品种',
    validPeriodRequired: '请输入有效期',
    validPeriodFormat: '有效期必须为正整数',
  },

  // 消息提示
  messages: {
    uploadSuccess: '推广内容上传成功',
    uploadFailed: '推广内容上传失败',
    deleteConfirm: '确认删除该推广内容吗？',
    deleteSuccess: '删除成功',
    deleteFailed: '删除失败',
    loadFailed: '加载推广内容失败',
    videoSizeExceeded: '视频文件大小不能超过100MB',
    videoFormatError: '只能上传MP4格式的视频文件',
  },

  // 详情页
  detail: {
    basicInfo: '基础信息',
    videoPreview: '视频预览',
    statistics: '统计信息',
  },

  // 卡片展示（移动端）
  card: {
    validUntil: '有效期至',
    views: '访问',
    times: '次',
  },
}