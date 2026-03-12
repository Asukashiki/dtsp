export default {
  // 需求确认日志
  title: '需求确认日志',
  subtitle: '管理需求确认记录',
  list: '确认列表',
  detail: '确认详情',
  add: '添加确认',
  edit: '编辑确认',
  delete: '删除确认',
  deleteConfirm: '确定要删除这条确认记录吗？',
  deleteSuccess: '删除成功',
  addSuccess: '添加成功',
  editSuccess: '更新成功',
  batchDeleteConfirm: '确定要删除选中的 {count} 条确认记录吗？',
  batchDeleteSuccess: '批量删除成功',
  pleaseSelectData: '请选择要删除的数据',
  
  // 表单字段
  form: {
    basicInfo: '基本信息',
    fromActor: '发送方',
    toActor: '接收方',
    referenceId: '关联需求记录ID',
    confirmationType: '确认类型',
    confirmedTime: '确认时间',
  },
  
  // 列表列
  columns: {
    fromActor: '发送方',
    toActor: '接收方',
    referenceId: '关联需求记录ID',
    confirmationType: '确认类型',
    confirmedTime: '确认时间',
    createPeople: '创建人',
    createTime: '创建时间',
  },
  
  // 确认类型
  type: {
    receipt: '接收确认',
    delivery: '发送确认',
  },
  
  // 详情 sections
  detailSections: {
    basicInfo: '基本信息',
  },
  
  // 验证规则
  rules: {
    fromActorRequired: '请选择发送方',
    toActorRequired: '请选择接收方',
    referenceIdRequired: '请输入关联需求记录ID',
    confirmationTypeRequired: '请选择确认类型',
  },
  
  // 消息
  messages: {
    noData: '暂无数据',
    deleteFailed: '删除失败',
    saveFailed: '保存失败',
  },
}
