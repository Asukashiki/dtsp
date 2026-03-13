export default {
  systemName: 'Inventory Management System',
  inboundOutboundManagement: 'Inbound/Outbound Management',

  inbound: {
    title: 'Inbound Management',
    subtitle: 'Manage inbound orders',
    list: 'Inbound List',
    add: 'Add Inbound',
    details: 'Inbound Detail',
    no: 'Inbound No',
    types: 'Type',
    warehouse: 'Warehouse',
    bizNo: 'Biz No',
    operator: 'Operator',
    orderDate: 'Order Date',
    statuss: 'Status',
    detailList: 'Inbound Details',
    addDetail: 'Add Inbound Detail',
    detailRequired: 'Please add at least one detail',
    confirmAudit: 'Are you sure to audit this inbound order?',
    auditBy: 'Audit By',
    auditTime: 'Audit Time',
    auditComment: 'Audit Comment',
    auditInfo: 'Audit Info',
    auditCommentPlaceholder: 'Please enter audit comment',
    approve: 'Approve',
    reject: 'Reject',
    type: {
      general: 'General Inbound',
      transfer: 'Transfer Inbound'
    },
    status: {
      draft: 'Draft',
      pending: 'Pending Approval',
      submitted: 'Pending Approval',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    detail: {
      product: 'Product',
      mainCategory: 'Main Category',
      subCategory: 'Sub Category',
      batchNo: 'Batch No',
      supplier: 'Supplier',
      qty: 'Quantity',
      unit: 'Unit',
      expireDate: 'Expire Date'
    }
  },

  outbound: {
    title: 'Outbound Management',
    subtitle: 'Manage outbound orders',
    list: 'Outbound List',
    add: 'Add Outbound',
    details: 'Outbound Detail',
    no: 'Outbound No',
    type: 'Type',
    types: 'Type',
    warehouse: 'Warehouse',
    receiverType: 'Receiver Type',
    receiverTypes: 'Receiver Type',
    receiver: 'Receiver',
    bizNo: 'Biz No',
    operator: 'Operator',
    orderDate: 'Order Date',
    statuss: 'Status',
    detailList: 'Outbound Details',
    addDetail: 'Add Outbound Detail',
    detailRequired: 'Please add at least one detail',
    confirmAudit: 'Are you sure to audit this outbound order?',
    auditBy: 'Audit By',
    auditTime: 'Audit Time',
    auditComment: 'Audit Comment',
    auditInfo: 'Audit Info',
    auditCommentPlaceholder: 'Please enter audit comment',
    approve: 'Approve',
    reject: 'Reject',
    type: {
      general: 'General Outbound',
      transfer: 'Transfer Outbound'
    },
    receiverType: {
      farmer: 'Farmer',
      coop: 'Cooperative',
      other: 'Other'
    },
    status: {
      draft: 'Draft',
      pending: 'Pending Approval',
      submitted: 'Pending Approval',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    detail: {
      product: 'Product',
      mainCategory: 'Main Category',
      subCategory: 'Sub Category',
      batchNo: 'Batch No',
      qty: 'Quantity',
      unit: 'Unit',
      supplier: 'Supplier',
      expireDate:"Expire Date"
    }
  },

  transfer: {
    title: 'Transfer Management',
    subtitle: 'Manage stock transfer orders',
    list: 'Transfer List',
    add: 'Add Transfer',
    detail: 'Transfer Detail',
    no: 'Transfer No',
    types: 'Transfer Type',
    applyDate: 'Apply Date',
    expectedDate: 'Expected Date',
    applicant: 'Applicant',
    department: 'Department',
    outWarehouse: 'Out Warehouse',
    outTime: 'Out Time',
    inWarehouse: 'In Warehouse',
    inTime: 'In Time',
    status: 'Status',
    remark: 'Remark',
    auditBy: 'Audit By',
    auditTime: 'Audit Time',
    auditComment: 'Audit Comment',
    detailList: 'Transfer Details',
    addDetail: 'Add Transfer Detail',
    detailRequired: 'Please add at least one detail',
    confirmAudit: 'Are you sure to audit this transfer order?',
    approve: 'Approve',
    reject: 'Reject',
    type: {
      stockWarning: 'Stock Warning',
      fullTransfer: 'Full Transfer'
    },
    status: {
      draft: 'Draft',
      pending: 'Pending Approval',
      submitted: 'Pending Approval',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    detail: {
      mainCategory: 'Main Category',
      subCategory: 'Sub Category',
      product: 'Product',
      batchNo: 'Batch No',
      supplier: 'Supplier',
      qty: 'Quantity',
      applyQty: 'Apply Qty',
      realQty: 'Real Qty',
      unit: 'Unit',
      expireDate: 'Expire Date'
    },
    search: {
      type: 'Transfer Type',
      dateRange: 'Apply Date Range',
      outWarehouse: 'Out Warehouse',
      inWarehouse: 'In Warehouse'
    }
  },


  permission: {
    title: '仓库权限分配',
    subtitle: '管理仓库所有权与部门使用权限',
    listTitle: '仓库权限列表',
    loadFailed: '权限数据加载失败',
    saveSuccess: '权限保存成功',
    deleteSuccess: '权限删除成功',
    deleteConfirm: '确定删除该权限记录吗？',
    ownerSection: {
      title: '仓库所有权配置',
      add: '新增所有权',
      edit: '编辑所有权'
    },
    permissionSection: {
      title: '部门使用权配置',
      add: '新增使用权',
      edit: '编辑使用权'
    },
    search: {
      warehouse: '仓库',
      owner: '负责人',
      dept: '部门',
      status: '状态'
    },
    placeholder: {
      warehouse: '请选择仓库',
      owner: '请选择负责人',
      dept: '请选择部门'
    },
    columns: {
      warehouse: '仓库',
      owner: '负责人',
      ownerOrg: '所属部门',
      ownerRole: '角色',
      isPrimary: '主要负责人',
      dept: '部门',
      permissions: '权限范围',
      status: '状态',
      warehouseCode: '仓库编码',
      updateTime: '更新时间',
      actions: '操作'
    },
    form: {
      warehouse: '仓库',
      owner: '负责人',
      ownerRole: '负责人角色',
      isPrimary: '主要负责人',
      dept: '部门',
      status: '状态',
      permissions: '权限范围',
      remark: '备注'
    },
    ownerRole: {
      primary: '主要负责人',
      secondary: '协同负责人'
    },
    status: {
      enabled: '启用',
      disabled: '停用'
    },
    actions: {
      owner: '所有权',
      permission: '使用权',
      view: '查看',
      inbound: '入库',
      outbound: '出库',
      transfer: '调拨',
      adjust: '调整'
    }
  }
}


