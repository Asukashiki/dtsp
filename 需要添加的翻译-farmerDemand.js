// ============================================
// 需要添加到翻译文件中的内容
// ============================================

// ========== 中文翻译 ==========
// 文件: src/locales/zh-CN/input.js
// 在 farmerDemand 对象中添加以下字段:

farmerDemand: {
  // ... 已有字段 ...

  // ===== 新增: 提交审核相关 =====
  submit: '提交审核',
  submitForAudit: '提交审核',
  submitConfirm: '确认提交该需求到村级审核吗?',
  batchSubmitConfirm: '确认提交选中的 {count} 条需求到村级审核吗?',
  submitSuccess: '提交成功',
  submitFailed: '提交失败',
  batchSubmitResult: '提交完成: 成功 {success} 条, 失败 {fail} 条',
  pleaseSelectData: '请选择要提交的数据',
}

// ========== 英文翻译 ==========
// 文件: src/locales/en-US/input.js
// 在 farmerDemand 对象中添加以下字段:

farmerDemand: {
  // ... existing fields ...

  // ===== New: Submit for Audit =====
  submit: 'Submit',
  submitForAudit: 'Submit for Audit',
  submitConfirm: 'Confirm to submit this demand for village-level audit?',
  batchSubmitConfirm: 'Confirm to submit {count} selected demands for village-level audit?',
  submitSuccess: 'Submitted successfully',
  submitFailed: 'Submission failed',
  batchSubmitResult: 'Submission completed: {success} succeeded, {fail} failed',
  pleaseSelectData: 'Please select data to submit',
}

// ============================================
// 如何添加
// ============================================

/*
1. 打开 src/locales/zh-CN/input.js
2. 找到 farmerDemand 对象
3. 在对象内部添加上面标注为 "新增: 提交审核相关" 的8行代码
4. 保存文件

5. 打开 src/locales/en-US/input.js
6. 找到 farmerDemand 对象
7. 在对象内部添加上面标注为 "New: Submit for Audit" 的8行代码
8. 保存文件
*/
