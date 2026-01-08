// 种子信息服务国际化文件
export default {
  // Seed Promotion Information Management
  promotion: {
    title: 'Seed Promotion Information Management',
    subtitle:
      'Manage seed promotion content to provide localized research results and agricultural advice to farmers and cooperatives',
    list: 'Promotion Content List',
    add: 'Add Promotion Content',
    edit: 'Edit Promotion Content',
    detail: 'Promotion Content Detail',
    delete: 'Delete Promotion Content',
    deleteConfirm: 'Are you sure to delete this promotion content?',
    deleteSuccess: 'Deleted Successfully',
    addSuccess: 'Added Successfully',
    editSuccess: 'Edited Successfully',

    // Search Filter
    searchPlaceholder: 'Search title, recommended varieties',
    filterByStatus: 'Filter by Publication Status',
    allStatus: 'All Status',

    // Publication Status
    status: {
      draft: 'Draft',
      published: 'Published',
      expired: 'Expired',
    },

    // Form Fields
    form: {
      basicInfo: 'Basic Information',
      promotionId: 'Promotion Content ID',
      title: 'Promotion Title',
      video: 'Promotional Video',
      promotionSummary: 'Promotion Summary',
      recommendedVarieties: 'Recommended Varieties',
      publishTime: 'Publish Time',
      validPeriod: 'Valid Period',
      shareLink: 'Share Link',
      visitCount: 'Visit Count',
      createTime: 'Create Time',
      updateTime: 'Update Time',
    },

    // Form Placeholders
    placeholder: {
      title: 'Please enter promotion title (2-100 characters)',
      promotionSummary: 'Please enter promotion summary (200-1000 characters)',
      recommendedVarieties:
        'Please enter recommended varieties, separated by commas',
      validPeriod: 'Please enter valid period',
    },

    // Form Validation
    rules: {
      titleRequired: 'Please enter promotion title',
      titleLength: 'Promotion title should be 2-100 characters',
      videoRequired: 'Please upload promotional video',
      promotionSummaryLength: 'Promotion summary should be 200-1000 characters',
      recommendedVarietiesRequired: 'Please enter recommended varieties',
      validPeriodRequired: 'Please enter valid period',
      validPeriodFormat: 'Valid period must be a positive integer',
    },

    // List Columns
    columns: {
      promotionId: 'Content ID',
      title: 'Promotion Title',
      recommendedVarieties: 'Recommended Varieties',
      publishTime: 'Publish Time',
      validPeriod: 'Valid Period',
      visitCount: 'Visit Count',
      status: 'Publication Status',
      actions: 'Actions',
    },

    // Action Buttons
    actions: {
      submit: 'Publish',
      saveDraft: 'Save Draft',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      share: 'Generate Share Link',
      copyLink: 'Copy Link',
      preview: 'Preview Video',
    },

    // Prompt Messages
    messages: {
      uploadTip: 'Support MP4 format, single file no more than 50MB',
      shareSuccess: 'Share link generated successfully',
      copySuccess: 'Link copied to clipboard',
      publishConfirm: 'Are you sure to publish this promotion content?',
      expiryWarning: 'This promotion content is about to expire',
      expired: 'This promotion content has expired',
    },
  },
}
