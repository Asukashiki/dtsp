export default {
  // 需求确认日志
  title: 'Demand Confirmation',
  subtitle: 'Manage demand confirmation records',
  list: 'Confirmation List',
  detail: 'Confirmation Details',
  add: 'Add Confirmation',
  edit: 'Edit Confirmation',
  delete: 'Delete Confirmation',
  deleteConfirm: 'Are you sure to delete this confirmation?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Updated successfully',
  batchDeleteConfirm: 'Confirm to delete {count} selected confirmations?',
  batchDeleteSuccess: 'Batch deleted successfully',
  pleaseSelectData: 'Please select data to delete',
  
  // 表单字段
  form: {
    basicInfo: 'Basic Information',
    fromActor: 'From Actor',
    toActor: 'To Actor',
    referenceId: 'Reference ID',
    confirmationType: 'Confirmation Type',
    confirmedTime: 'Confirmed Time',
  },
  
  // 列表列
  columns: {
    fromActor: 'From Actor',
    toActor: 'To Actor',
    referenceId: 'Reference ID',
    confirmationType: 'Confirmation Type',
    confirmedTime: 'Confirmed Time',
    createPeople: 'Created By',
    createTime: 'Created Time',
  },
  
  // 确认类型
  type: {
    receipt: 'Receipt',
    delivery: 'Delivery',
  },
  
  // 详情 sections
  detailSections: {
    basicInfo: 'Basic Information',
  },
  
  // 验证规则
  rules: {
    fromActorRequired: 'Please select from actor',
    toActorRequired: 'Please select to actor',
    referenceIdRequired: 'Please enter reference ID',
    confirmationTypeRequired: 'Please select confirmation type',
  },
  
  // 消息
  messages: {
    noData: 'No data',
    deleteFailed: 'Delete failed',
    saveFailed: 'Save failed',
  },
}
