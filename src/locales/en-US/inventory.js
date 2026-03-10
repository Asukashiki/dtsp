export default {
  systemName: 'Inventory Management System',
  inboundOutboundManagement: 'Inbound/Outbound Management',

  inbound: {
    title: 'Inbound Management',
    subtitle: 'Manage inbound orders',
    list: 'Inbound List',
    add: 'Add Inbound',
    detail: 'Inbound Detail',
    no: 'Inbound No',
    type: 'Type',
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
      batchNo: 'Batch No',
      supplier: 'Supplier',
      planQty: 'Plan Qty',
      realQty: 'Real Qty',
      unit: 'Unit',
      expireDate: 'Expire Date'
    }
  },

  outbound: {
    title: 'Outbound Management',
    subtitle: 'Manage outbound orders',
    list: 'Outbound List',
    add: 'Add Outbound',
    detail: 'Outbound Detail',
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
      batchNo: 'Batch No',
      applyQty: 'Apply Qty',
      realQty: 'Real Qty',
      unit: 'Unit'
    }
  }
}
