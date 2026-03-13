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
    details: 'Transfer Detail',
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
  }
}
