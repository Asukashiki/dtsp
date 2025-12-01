// 种子信息服务国际化文件
export default {
  // 种子推广信息管理
  promotion: {
    title: '种子推广信息管理',
    subtitle: '管理种子推广内容,向农户、合作社提供本地化研究成果和农业建议',
    list: '推广内容列表',
    add: '新增推广内容',
    edit: '编辑推广内容',
    detail: '推广内容详情',
    delete: '删除推广内容',
    deleteConfirm: '确定删除该推广内容吗？',
    deleteSuccess: '删除成功',
    addSuccess: '新增成功',
    editSuccess: '编辑成功',

    // 搜索筛选
    searchPlaceholder: '搜索标题、推荐品种',
    filterByStatus: '按发布状态筛选',
    allStatus: '全部状态',

    // 发布状态
    status: {
      draft: '草稿',
      published: '已发布',
      expired: '已过期',
    },

    // 表单字段
    form: {
      basicInfo: '基础信息',
      promotionId: '推广内容ID',
      title: '推广标题',
      video: '宣传视频',
      promotionSummary: '推广摘要',
      recommendedVarieties: '推荐品种',
      publishTime: '发布时间',
      validPeriod: '有效期（天）',
      shareLink: '分享链接',
      visitCount: '访问次数',
      createTime: '创建时间',
      updateTime: '更新时间',
    },

    // 表单占位符
    placeholder: {
      title: '请输入推广标题（2-100个字符）',
      promotionSummary: '请输入推广摘要（200-1000个字符）',
      recommendedVarieties: '请输入推荐品种,多个品种用逗号分隔',
      validPeriod: '请输入有效期',
    },

    // 表单验证
    rules: {
      titleRequired: '请输入推广标题',
      titleLength: '推广标题应为2-100个字符',
      videoRequired: '请上传宣传视频',
      promotionSummaryLength: '推广摘要应为200-1000个字符',
      recommendedVarietiesRequired: '请输入推荐品种',
      validPeriodRequired: '请输入有效期',
      validPeriodFormat: '有效期必须为正整数',
    },

    // 列表列
    columns: {
      promotionId: '内容ID',
      title: '推广标题',
      recommendedVarieties: '推荐品种',
      publishTime: '发布时间',
      validPeriod: '有效期',
      visitCount: '访问次数',
      status: '发布状态',
      actions: '操作',
    },

    // 操作按钮
    actions: {
      submit: '发布',
      saveDraft: '保存草稿',
      view: '查看',
      edit: '编辑',
      delete: '删除',
      share: '生成分享链接',
      copyLink: '复制链接',
      preview: '预览视频',
    },

    // 提示信息
    messages: {
      uploadTip: '支持 MP4 格式，单个文件不超过50MB',
      shareSuccess: '分享链接已生成',
      copySuccess: '链接已复制到剪贴板',
      publishConfirm: '确定发布该推广内容吗？',
      expiryWarning: '该推广内容即将过期',
      expired: '该推广内容已过期',
    },
  },
}
