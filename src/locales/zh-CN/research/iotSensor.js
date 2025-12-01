// 物联网传感器维护国际化文件
export default {
  title: '物联网传感器维护',
  subtitle: '管理物联网传感器设备，跟踪传感器状态和校准信息',
  list: '传感器列表',
  add: '新增传感器',
  edit: '编辑传感器',
  detail: '传感器详情',
  delete: '删除传感器',
  deleteConfirm: '确定删除该传感器吗？',
  deleteSuccess: '删除成功',
  addSuccess: '新增成功',
  editSuccess: '编辑成功',
  registrationInfo: '登记信息',

  // 搜索筛选
  searchPlaceholder: '搜索传感器名称、编号',
  filterByType: '按传感器类型筛选',
  allTypes: '全部类型',

  // 传感器类型
  type: {
    temperature: '温度传感器',
    humidity: '湿度传感器',
    light: '光照传感器',
    soil: '土壤传感器',
    gas: '气体传感器',
    other: '其他',
  },

  // 表单字段
  form: {
    iotId: '传感器编号',
    iotName: '传感器名称',
    iotType: '传感器类型',
    manufacturer: '制造商',
    firmwareVersion: '固件版本',
    calibrationDate: '校准日期',
    batteryStatus: '电池状态',
    remark: '备注',
  },

  // 表单占位符
  placeholder: {
    iotId: '请输入传感器编号',
    iotName: '请输入传感器名称',
    iotType: '请选择传感器类型',
    manufacturer: '请输入制造商',
    firmwareVersion: '请输入固件版本',
    calibrationDate: '请选择校准日期',
    batteryStatus: '请输入电池状态，如：80%',
    remark: '请输入备注信息',
  },

  // 表单验证
  rules: {
    iotIdRequired: '请输入传感器编号',
    iotIdLength: '传感器编号长度不能超过32位',
    iotNameRequired: '请输入传感器名称',
    iotNameLength: '传感器名称长度不能超过100位',
    iotTypeRequired: '请选择传感器类型',
    manufacturerRequired: '请输入制造商',
    manufacturerLength: '制造商长度不能超过32位',
    firmwareVersionRequired: '请输入固件版本',
    firmwareVersionLength: '固件版本长度不能超过32位',
    calibrationDateRequired: '请选择校准日期',
    batteryStatusLength: '电池状态长度不能超过64位',
    remarkLength: '备注长度不能超过500位',
  },

  // 列表列
  columns: {
    iotId: '传感器编号',
    iotName: '传感器名称',
    iotType: '传感器类型',
    manufacturer: '制造商',
    firmwareVersion: '固件版本',
    calibrationDate: '校准日期',
    batteryStatus: '电池状态',
    createBy: '登记人',
    orgName: '登记机构',
    createTime: '登记时间',
    updateTime: '更新时间',
    actions: '操作',
  },
}