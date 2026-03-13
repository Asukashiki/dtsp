export default {
    systemName: '出入库管理系统',
    inboundOutboundManagement: '出入库管理',

    inbound: {
        title: '入库管理',
        subtitle: '管理入库单据',
        list: '入库单列表',
        add: '新增入库单',
        edit: '编辑入库单',
        details: '入库单详情',
        no: '入库单号',
        types: '入库类型',
        warehouse: '仓库',
        bizNo: '关联业务单号',
        operator: '操作人',
        orderDate: '入库时间',
        statuss: '状态',
        detailList: '入库明细',
        addDetail: '添加入库明细',
        detailRequired: '请至少添加一条明细',
        confirmAudit: '确定要审核通过该入库单吗？',
        auditBy: '审批人',
        auditTime: '审批时间',
        auditComment: '审批意见',
        auditInfo: '审批信息',
        auditCommentPlaceholder: '请输入审批意见',
        approve: '审批',
        reject: '不同意',
        type: {
            general: '一般入库',
            transfer: '调拨入库'
        },
        status: {
            draft: '草稿',
            pending: '待审批',
            submitted: '待审批',
            approved: '已完成',
            rejected: '未通过'
        },
        detail: {
            product: '商品',
            mainCategory: '商品大类',
            subCategory: '商品小类',
            batchNo: '批次号',
            supplier: '供应商',
            qty: '数量',
            unit: '单位',
            expireDate: '有效期'
        }
    },

    outbound: {
        title: '出库管理',
        subtitle: '管理出库单据',
        list: '出库单列表',
        add: '新增出库单',
        edit: '编辑出库单',
        details: '出库单详情',
        no: '出库单号',
        type: '出库类型',
        types: '出库类型',
        warehouse: '仓库',
        receiverType: '接收人类型',
        receiverTypes: '接收人类型',
        receiver: '接收人',
        bizNo: '关联业务单号',
        operator: '操作人',
        orderDate: '出库时间',
        statuss: '状态',
        detailList: '出库明细',
        addDetail: '添加出库明细',
        detailRequired: '请至少添加一条明细',
        confirmAudit: '确定要审核通过该出库单吗？',
        auditBy: '审批人',
        auditTime: '审批时间',
        auditComment: '审批意见',
        auditInfo: '审批信息',
        auditCommentPlaceholder: '请输入审批意见',
        approve: '审批',
        reject: '不同意',
        type: {
            general: '一般出库',
            transfer: '调拨出库'
        },
        receiverType: {
            farmer: '农户',
            coop: '合作社',
            other: '其他'
        },
        status: {
            draft: '草稿',
            pending: '待审批',
            submitted: '待审批',
            approved: '已完成',
            rejected: '未通过'
        },
        detail: {
            product: '商品',
            mainCategory: '商品大类',
            subCategory: '商品小类',
            batchNo: '批次号',
            qty: '数量',
            unit: '单位',
            supplier:"供应商",
            expireDate:"过期时间"
        }
    },

    transfer: {
        title: '调拨管理',
        subtitle: '管理库存调拨单据',
        list: '调拨单列表',
        add: '新增调拨单',
        edit: '编辑调拨单',
        details: '调拨单详情',
        no: '调拨单编号',
        types: '调拨类型',
        applyDate: '调拨申请日期',
        expectedDate: '期望到货日期',
        applicant: '申请人',
        department: '申请人归属部门',
        outWarehouse: '调出仓库',
        outTime: '调出时间',
        inWarehouse: '调入仓库',
        inTime: '调入时间',
        status: '状态',
        remark: '备注',
        auditBy: '审批人',
        auditTime: '审批时间',
        auditComment: '审批意见',
        detailList: '调拨明细',
        addDetail: '添加调拨明细',
        detailRequired: '请至少添加一条明细',
        confirmAudit: '确定要审批该调拨单吗？',
        approve: '审批',
        reject: '不同意',
        type: {
            stockWarning: '库存预警',
            fullTransfer: '满仓调离'
        },
        status: {
            draft: '草稿',
            pending: '待审批',
            submitted: '待审批',
            approved: '已完成',
            rejected: '未通过'
        },
        detail: {
            mainCategory: '商品大类',
            subCategory: '商品小类',
            product: '商品',
            batchNo: '批次号',
            supplier: '供应商',
            qty: '数量',
            applyQty: '申请数量',
            realQty: '实际数量',
            unit: '单位',
            expireDate: '有效期'
        },
        search: {
            type: '调拨类型',
            dateRange: '调拨申请日期',
            outWarehouse: '调出仓库',
            inWarehouse: '调入仓库'
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
