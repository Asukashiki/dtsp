export default {
    title: '用户身份认证',
    subtitle: '请选择认证类型',
    description: '完成身份认证后，即可使用对应的系统功能',

    farmer: '农民认证',
    supplier: '供应商认证',
    buyer: '收购商认证',

    farmerTitle: '农民认证申请',
    farmerDesc: '面向个人农户的身份认证，便于接入相关服务',
    farmerSubtitle: '请填写以下信息以完成农民身份认证',

    supplierTitle: '供应商认证申请',
    supplierDesc: '面向供应商主体的身份认证，支持供给侧业务接入',
    supplierSubtitle: '请填写以下信息以完成供应商主体认证',

    buyerTitle: '收购商认证申请',
    buyerDesc: '面向收购主体的身份认证，便于开展交易与协作',
    buyerSubtitle: '请填写以下信息以完成收购主体认证',

    applyNow: '立即申请',
    viewStatus: '查看状态',
    goApply: '去填写',

    status: {
      notCertified: '未认证',
      underReview: '审核中',
      certified: '已认证',
      rejected: '已驳回',
    },

    form: {
      // 通用字段
      name: '真实姓名',
      idNo: '身份证号',
      mobile: '手机号码',
      region: '行政区划',
      address: '详细住址',
      remark: '备注',
      contactName: '联系人姓名',
      contactMobile: '联系人手机',

      // 农民字段
      cropTypes: '种植类型',
      attachments: '证明文件',

      // 供应商/收购商字段
      entityType: '主体类型',
      entityName: '名称',
      uscc: '统一社会信用代码',
      legalPerson: '法定代表人/负责人',
      legalIdNo: '法定代表人身份证号',
      scope: '经营范围/主要产品',
      license: '营业执照',
      principalName: '负责人姓名',
      principalIdNo: '负责人身份证号',
      productTypes: '主要收购产品类型',

      // 审核字段
      auditOpinion: '审核意见',
      auditResult: '审核结果',
      pass: '通过',
      reject: '驳回',
    },

    placeholder: {
      name: '请输入真实姓名',
      idNo: '请输入身份证号',
      mobile: '请输入手机号码',
      region: '请选择行政区划',
      address: '请输入详细住址',
      remark: '备注信息（选填）',
      cropTypes: '请选择种植类型',
      entityName: '请输入主体名称',
      uscc: '请输入统一社会信用代码（18位）',
      legalPerson: '请输入法定代表人/负责人',
      legalIdNo: '请输入身份证号',
      scope: '请输入经营范围或主要产品',
      contactName: '请输入联系人姓名',
      contactMobile: '请输入联系人手机',
      principalName: '请输入负责人姓名',
      principalIdNo: '请输入负责人身份证号',
      productTypes: '请选择产品类型',
      auditOpinion: '请输入审核意见',
    },

    uploadTip: '支持 jpg/png/pdf，最多{count}个文件',
  }
