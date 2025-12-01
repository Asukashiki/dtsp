// 物联网传感器维护国际化文件
export default {
  title: 'IoT Sensor Maintenance',
  subtitle: 'Manage IoT sensor devices, track sensor status and calibration information',
  list: 'Sensor List',
  add: 'Add Sensor',
  edit: 'Edit Sensor',
  detail: 'Sensor Details',
  delete: 'Delete Sensor',
  deleteConfirm: 'Are you sure you want to delete this sensor?',
  deleteSuccess: 'Deleted successfully',
  addSuccess: 'Added successfully',
  editSuccess: 'Updated successfully',
  registrationInfo: 'Registration Information',

  // Search & Filter
  searchPlaceholder: 'Search sensor name, ID',
  filterByType: 'Filter by sensor type',
  allTypes: 'All Types',

  // Sensor Types
  type: {
    temperature: 'Temperature Sensor',
    humidity: 'Humidity Sensor',
    light: 'Light Sensor',
    soil: 'Soil Sensor',
    gas: 'Gas Sensor',
    other: 'Other',
  },

  // Form Fields
  form: {
    iotId: 'Sensor ID',
    iotName: 'Sensor Name',
    iotType: 'Sensor Type',
    manufacturer: 'Manufacturer',
    firmwareVersion: 'Firmware Version',
    calibrationDate: 'Calibration Date',
    batteryStatus: 'Battery Status',
    remark: 'Remarks',
  },

  // Form Placeholders
  placeholder: {
    iotId: 'Please enter sensor ID',
    iotName: 'Please enter sensor name',
    iotType: 'Please select sensor type',
    manufacturer: 'Please enter manufacturer',
    firmwareVersion: 'Please enter firmware version',
    calibrationDate: 'Please select calibration date',
    batteryStatus: 'Please enter battery status, e.g., 80%',
    remark: 'Please enter remarks',
  },

  // Form Validation Rules
  rules: {
    iotIdRequired: 'Sensor ID is required',
    iotIdLength: 'Sensor ID cannot exceed 32 characters',
    iotNameRequired: 'Sensor name is required',
    iotNameLength: 'Sensor name cannot exceed 100 characters',
    iotTypeRequired: 'Please select sensor type',
    manufacturerRequired: 'Manufacturer is required',
    manufacturerLength: 'Manufacturer cannot exceed 32 characters',
    firmwareVersionRequired: 'Firmware version is required',
    firmwareVersionLength: 'Firmware version cannot exceed 32 characters',
    calibrationDateRequired: 'Please select calibration date',
    batteryStatusLength: 'Battery status cannot exceed 64 characters',
    remarkLength: 'Remarks cannot exceed 500 characters',
  },

  // Table Columns
  columns: {
    iotId: 'Sensor ID',
    iotName: 'Sensor Name',
    iotType: 'Sensor Type',
    manufacturer: 'Manufacturer',
    firmwareVersion: 'Firmware Version',
    calibrationDate: 'Calibration Date',
    batteryStatus: 'Battery Status',
    createBy: 'Registered By',
    orgName: 'Registration Organization',
    createTime: 'Registration Time',
    updateTime: 'Update Time',
    actions: 'Actions',
  },
}